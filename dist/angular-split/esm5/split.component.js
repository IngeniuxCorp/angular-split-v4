var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ChangeDetectorRef, Input, Output, HostBinding, ElementRef, SimpleChanges, ChangeDetectionStrategy, EventEmitter, Renderer2, OnDestroy, OnChanges } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { SplitStateService, SplitAreaState } from './splitStateService';
import { BrowserService } from "./browserService";
var SplitComponent = /** @class */ (function () {
    function SplitComponent(splitStateService, cdRef, elementRef, renderer) {
        this.splitStateService = splitStateService;
        this.cdRef = cdRef;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.direction = 'horizontal';
        this.gutterSize = 10;
        this.disabled = false;
        this.animateAreaToggle = false;
        this.dragStart = new EventEmitter(false);
        this.dragProgress = new EventEmitter(false);
        this.dragEnd = new EventEmitter(false);
        this.saveStates = false;
        this._coverDisplay = new BehaviorSubject("none");
        this.coverDisplay = this._coverDisplay.asObservable();
        this._visibleTransitionEndSub = new BehaviorSubject([]);
        /**
         * This event is fired when split area show/hide are done with animations completed.
         * Make sure use debounceTime and distinctUntilChange before subscription,
         * to handle the fact that adjacent split areas also triggering the event, during show/hide of single area.
         */
        this.visibleTransitionEnd = this._visibleTransitionEndSub.asObservable();
        this.minPercent = 5;
        this.areas = [];
        this.isDragging = false;
        this.containerSize = 0;
        this.areaASize = 0;
        this.areaBSize = 0;
        this.eventsDragFct = [];
    }
    Object.defineProperty(SplitComponent.prototype, "name", {
        get: function () {
            return this.splitStateService.splitName;
        },
        set: function (val) {
            if (val)
                this.splitStateService.splitName = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "styleFlexDirection", {
        get: function () {
            return this.direction === 'vertical';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "dragging", {
        get: function () {
            // prevent animation of areas when animateAreaToggle is false, or resizing
            return !this.animateAreaToggle || this.isDragging;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "styleWidth", {
        get: function () {
            return (this.width && !isNaN(this.width) && this.width > 0) ? this.width + 'px' : '100%';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "styleHeight", {
        get: function () {
            return (this.height && !isNaN(this.height) && this.height > 0) ? this.height + 'px' : '100%';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "visibleAreas", {
        get: function () {
            return this.areas.filter(function (a) { return a.component.visible; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "nbGutters", {
        get: function () {
            return this.visibleAreas.length - 1;
        },
        enumerable: true,
        configurable: true
    });
    SplitComponent.prototype.ngOnChanges = function (changes) {
        if (changes['gutterSize'] || changes['disabled']) {
            this.refresh();
        }
    };
    SplitComponent.prototype.ngAfterViewInit = function () {
        if (!this.saveStates)
            return;
        var state = this.splitStateService.loadState();
        if (state && this.areas.length == state.length)
            this.areas.forEach(function (a, i) {
                a.size = state[i].size;
                a.component.visible = state[i].visible;
            });
        this.refresh();
    };
    SplitComponent.prototype.addArea = function (component, orderUser, sizeUser, minPixel) {
        this.areas.push({
            component: component,
            orderUser: orderUser,
            order: -1,
            sizeUser: sizeUser,
            size: -1,
            minPixel: minPixel
        });
        // this._saveState();
        this.refresh();
    };
    SplitComponent.prototype.updateArea = function (component, orderUser, sizeUser, minPixel) {
        var item = this.areas.find(function (a) { return a.component === component; });
        if (item) {
            item.orderUser = orderUser;
            item.sizeUser = sizeUser;
            item.minPixel = minPixel;
            // this._saveState();
            this.refresh();
        }
    };
    SplitComponent.prototype.removeArea = function (area) {
        var item = this.areas.find(function (a) { return a.component === area; });
        if (item) {
            var index = this.areas.indexOf(item);
            this.areas.splice(index, 1);
            this.areas.forEach(function (a, i) { return a.order = i * 2; });
            // this._saveState();
            this.refresh();
        }
    };
    SplitComponent.prototype.hideArea = function (area) {
        var item = this.areas.find(function (a) { return a.component === area; });
        if (item) {
            this._saveState();
            this.refresh();
        }
    };
    SplitComponent.prototype.showArea = function (area) {
        var item = this.areas.find(function (a) { return a.component === area; });
        if (item) {
            this._saveState();
            this.refresh();
        }
    };
    SplitComponent.prototype.isLastVisibleArea = function (area) {
        var visibleAreas = this.areas.filter(function (a) { return a.component.visible; });
        return visibleAreas.length > 0 ? area === visibleAreas[visibleAreas.length - 1] : false;
    };
    SplitComponent.prototype.refresh = function () {
        var _this = this;
        this.stopDragging();
        var visibleAreas = this.visibleAreas;
        // ORDERS: Set css 'order' property depending on user input or added order
        var nbCorrectOrder = this.areas.filter(function (a) { return a.orderUser !== null && !isNaN(a.orderUser); }).length;
        if (nbCorrectOrder === this.areas.length) {
            this.areas.sort(function (a, b) { return +a.orderUser - +b.orderUser; });
        }
        this.areas.forEach(function (a, i) {
            a.order = i * 2;
            a.component.setStyle('order', a.order);
        });
        // SIZES: Set css 'flex-basis' property depending on user input or equal sizes
        var totalSize = visibleAreas.map(function (a) { return a.sizeUser; }).reduce(function (acc, s) { return acc + s; }, 0);
        var nbCorrectSize = visibleAreas.filter(function (a) { return a.sizeUser !== null && !isNaN(a.sizeUser) && a.sizeUser >= _this.minPercent; }).length;
        if (totalSize < 99.99 || totalSize > 100.01 || nbCorrectSize !== visibleAreas.length) {
            var size_1 = Number((100 / visibleAreas.length).toFixed(3));
            visibleAreas.forEach(function (a) { return a.size = size_1; });
        }
        else {
            visibleAreas.forEach(function (a) { return a.size = Number(a.sizeUser); });
        }
        this.refreshStyleSizes();
        this.cdRef.markForCheck();
    };
    SplitComponent.prototype.refreshStyleSizes = function () {
        var visibleAreas = this.visibleAreas;
        var f = this.gutterSize * this.nbGutters / visibleAreas.length;
        visibleAreas.forEach(function (a) { return a.component.setStyle('flex-basis', "calc( " + a.size + "% - " + f + "px )"); });
        if (BrowserService.isIE()) {
            //ie and edge don't support flex-basis animation
            //fire event right here
            this.notify('visibleTransitionEnd');
        }
    };
    SplitComponent.prototype.startDragging = function (startEvent, gutterOrder) {
        var _this = this;
        startEvent.preventDefault();
        if (this.disabled) {
            return;
        }
        var areaA = this.areas.find(function (a) { return a.order === gutterOrder - 1; });
        var areaB = this.areas.find(function (a) { return a.order === gutterOrder + 1; });
        if (!areaA || !areaB) {
            return;
        }
        var prop = (this.direction === 'horizontal') ? 'offsetWidth' : 'offsetHeight';
        this.containerSize = this.elementRef.nativeElement[prop];
        this.areaASize = this.containerSize * areaA.size / 100;
        this.areaBSize = this.containerSize * areaB.size / 100;
        var start;
        if (startEvent instanceof MouseEvent) {
            start = {
                x: startEvent.screenX,
                y: startEvent.screenY
            };
        }
        else if (startEvent instanceof TouchEvent) {
            start = {
                x: startEvent.touches[0].screenX,
                y: startEvent.touches[0].screenY
            };
        }
        else {
            return;
        }
        //add the overlay transparent  cover to handle dragging over iframes
        this.eventsDragFct.push(this.renderer.listen('document', 'mousemove', function (e) { return _this.dragEvent(e, start, areaA, areaB); }));
        this.eventsDragFct.push(this.renderer.listen('document', 'touchmove', function (e) { return _this.dragEvent(e, start, areaA, areaB); }));
        this.eventsDragFct.push(this.renderer.listen('document', 'mouseup', function (e) { return _this.stopDragging(); }));
        this.eventsDragFct.push(this.renderer.listen('document', 'touchend', function (e) { return _this.stopDragging(); }));
        this.eventsDragFct.push(this.renderer.listen('document', 'touchcancel', function (e) { return _this.stopDragging(); }));
        areaA.component.lockEvents();
        areaB.component.lockEvents();
        this.isDragging = true;
        this._coverDisplay.next("block");
        this.notify('start');
    };
    SplitComponent.prototype.dragEvent = function (event, start, areaA, areaB) {
        if (!this.isDragging) {
            return;
        }
        var end;
        if (event instanceof MouseEvent) {
            end = {
                x: event.screenX,
                y: event.screenY
            };
        }
        else if (event instanceof TouchEvent) {
            end = {
                x: event.touches[0].screenX,
                y: event.touches[0].screenY
            };
        }
        else {
            return;
        }
        this.drag(start, end, areaA, areaB);
    };
    SplitComponent.prototype.drag = function (start, end, areaA, areaB) {
        var offsetPixel = (this.direction === 'horizontal') ? (start.x - end.x) : (start.y - end.y);
        var newSizePixelA = this.areaASize - offsetPixel;
        var newSizePixelB = this.areaBSize + offsetPixel;
        if (newSizePixelA <= areaA.minPixel && newSizePixelB < areaB.minPixel) {
            return;
        }
        var newSizePercentA = newSizePixelA / this.containerSize * 100;
        var newSizePercentB = newSizePixelB / this.containerSize * 100;
        if (newSizePercentA <= this.minPercent) {
            newSizePercentA = this.minPercent;
            newSizePercentB = areaA.size + areaB.size - this.minPercent;
        }
        else if (newSizePercentB <= this.minPercent) {
            newSizePercentB = this.minPercent;
            newSizePercentA = areaA.size + areaB.size - this.minPercent;
        }
        else {
            newSizePercentA = Number(newSizePercentA.toFixed(3));
            newSizePercentB = Number((areaA.size + areaB.size - newSizePercentA).toFixed(3));
        }
        areaA.size = newSizePercentA;
        areaB.size = newSizePercentB;
        this.refreshStyleSizes();
        this.notify('progress');
    };
    SplitComponent.prototype.stopDragging = function () {
        if (!this.isDragging) {
            return;
        }
        this.areas.forEach(function (a) { return a.component.unlockEvents(); });
        while (this.eventsDragFct.length > 0) {
            var fct = this.eventsDragFct.pop();
            if (fct) {
                fct();
            }
        }
        this.containerSize = 0;
        this.areaASize = 0;
        this.areaBSize = 0;
        this.isDragging = false;
        this._coverDisplay.next("none");
        this._saveState();
        this.notify('end');
    };
    SplitComponent.prototype._saveState = function () {
        if (this.saveStates)
            this.splitStateService.saveState(this.areas.map(function (a) {
                return {
                    size: a.size,
                    visible: a.component.visible
                };
            }));
    };
    SplitComponent.prototype.notify = function (type) {
        var data = this.visibleAreas.map(function (a) { return a.size; });
        switch (type) {
            case 'start':
                return this.dragStart.emit(data);
            case 'progress':
                return this.dragProgress.emit(data);
            case 'end':
                return this.dragEnd.emit(data);
            case 'visibleTransitionEnd':
                return this._visibleTransitionEndSub.next(data);
        }
    };
    SplitComponent.prototype.ngOnDestroy = function () {
        this.stopDragging();
    };
    SplitComponent.ctorParameters = function () { return [
        { type: SplitStateService },
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SplitComponent.prototype, "direction", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], SplitComponent.prototype, "width", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], SplitComponent.prototype, "height", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], SplitComponent.prototype, "gutterSize", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SplitComponent.prototype, "disabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SplitComponent.prototype, "animateAreaToggle", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], SplitComponent.prototype, "dragStart", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], SplitComponent.prototype, "dragProgress", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], SplitComponent.prototype, "dragEnd", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SplitComponent.prototype, "saveStates", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], SplitComponent.prototype, "name", null);
    __decorate([
        Output(),
        __metadata("design:type", Observable)
    ], SplitComponent.prototype, "visibleTransitionEnd", void 0);
    __decorate([
        HostBinding('class.vertical'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], SplitComponent.prototype, "styleFlexDirection", null);
    __decorate([
        HostBinding('class.notrans'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], SplitComponent.prototype, "dragging", null);
    __decorate([
        HostBinding('style.width'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], SplitComponent.prototype, "styleWidth", null);
    __decorate([
        HostBinding('style.height'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], SplitComponent.prototype, "styleHeight", null);
    SplitComponent = __decorate([
        Component({
            selector: 'split',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: "\n        <div #cover style=\"position:absolute;left:0;top:0;right:0;bottom:0;z-index:100;\"\n            [style.display]=\"coverDisplay | async\"></div>\n        <ng-content></ng-content>\n        <ng-template ngFor let-area [ngForOf]=\"areas\" let-index=\"index\" let-last=\"last\">\n            <split-gutter *ngIf=\"last === false && area.component.visible && !isLastVisibleArea(area)\" \n                          [order]=\"index*2+1\"\n                          [direction]=\"direction\"\n                          [size]=\"gutterSize\"\n                          [disabled]=\"disabled\"\n                          (mousedown)=\"startDragging($event, index*2+1)\"\n                          (touchstart)=\"startDragging($event, index*2+1)\"></split-gutter>\n        </ng-template>",
            styles: ["\n        :host {\n            display: flex;\n            flex-wrap: nowrap;\n            justify-content: flex-start;\n            flex-direction: row;\n        }\n\n        :host.vertical {\n            flex-direction: column;\n        }\n\n        split-gutter {\n            flex-grow: 0;\n            flex-shrink: 0;\n            flex-basis: 10px;\n            height: 100%;\n            background-color: #eeeeee;\n            background-position: 50%;\n            background-repeat: no-repeat;\n        }\n\n        :host.vertical split-gutter {\n            width: 100%;\n        }\n\n        :host /deep/ split-area {\n            transition: flex-basis 0.3s;\n        }  \n\n        :host.notrans /deep/ split-area {\n            transition: none !important;\n        }      \n\n        :host /deep/ split-area.notshow {\n            flex-basis: 0 !important;\n            overflow: hidden !important;\n        }      \n\n        :host.vertical /deep/ split-area.notshow {\n            max-width: 0;\n            flex-basis: 0 !important;\n            overflow: hidden !important;\n        }\n    "]
        }),
        __metadata("design:paramtypes", [SplitStateService,
            ChangeDetectorRef,
            ElementRef,
            Renderer2])
    ], SplitComponent);
    return SplitComponent;
}());
export { SplitComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zcGxpdC8iLCJzb3VyY2VzIjpbInNwbGl0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUFFLGlCQUFpQixFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQ25GLHVCQUF1QixFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFDekUsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFVBQVUsRUFBZ0IsZUFBZSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBRXBFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUErRWxEO0lBbUVJLHdCQUNZLGlCQUFvQyxFQUNwQyxLQUF3QixFQUN4QixVQUFzQixFQUN0QixRQUFtQjtRQUhuQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQ3hCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQXRFdEIsY0FBUyxHQUFXLFlBQVksQ0FBQztRQUdqQyxlQUFVLEdBQVcsRUFBRSxDQUFDO1FBQ3hCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsc0JBQWlCLEdBQVksS0FBSyxDQUFDO1FBRWxDLGNBQVMsR0FBRyxJQUFJLFlBQVksQ0FBZ0IsS0FBSyxDQUFDLENBQUM7UUFDbkQsaUJBQVksR0FBRyxJQUFJLFlBQVksQ0FBZ0IsS0FBSyxDQUFDLENBQUM7UUFDdEQsWUFBTyxHQUFHLElBQUksWUFBWSxDQUFnQixLQUFLLENBQUMsQ0FBQztRQUVsRCxlQUFVLEdBQVksS0FBSyxDQUFDO1FBVzdC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O29EQUUxQjtJQUU0QjtRQUE1QixXQUFXLENBQUMsY0FBYyxDQUFDOzs7cURBRTNCO0lBakRRLGNBQWM7UUE5RDFCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1lBOEMvQyxRQUFRLEVBQUUsb3hCQVlTO3FCQXpEVix1bENBNENSO1NBY0osQ0FBQzt5Q0FxRWlDLGlCQUFpQjtZQUM3QixpQkFBaUI7WUFDWixVQUFVO1lBQ1osU0FBUztPQXZFdEIsY0FBYyxDQXdXMUI7SUFBRCxxQkFBQztDQUFBLEFBeFdELElBd1dDO1NBeFdZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gICAgQ29tcG9uZW50LCBDaGFuZ2VEZXRlY3RvclJlZiwgSW5wdXQsIE91dHB1dCwgSG9zdEJpbmRpbmcsIEVsZW1lbnRSZWYsIFNpbXBsZUNoYW5nZXMsXHJcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgRXZlbnRFbWl0dGVyLCBSZW5kZXJlcjIsIE9uRGVzdHJveSwgT25DaGFuZ2VzXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24sIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMvUngnO1xyXG5pbXBvcnQgeyBTcGxpdEFyZWFEaXJlY3RpdmUgfSBmcm9tICcuL3NwbGl0QXJlYS5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBTcGxpdFN0YXRlU2VydmljZSwgU3BsaXRBcmVhU3RhdGUgfSBmcm9tICcuL3NwbGl0U3RhdGVTZXJ2aWNlJztcclxuaW1wb3J0IHsgQnJvd3NlclNlcnZpY2UgfSBmcm9tIFwiLi9icm93c2VyU2VydmljZVwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQXJlYURhdGEge1xyXG4gICAgY29tcG9uZW50OiBTcGxpdEFyZWFEaXJlY3RpdmU7XHJcbiAgICBzaXplVXNlcjogbnVtYmVyIHwgbnVsbDtcclxuICAgIHNpemU6IG51bWJlcjtcclxuICAgIG9yZGVyVXNlcjogbnVtYmVyIHwgbnVsbDtcclxuICAgIG9yZGVyOiBudW1iZXI7XHJcbiAgICBtaW5QaXhlbDogbnVtYmVyO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgUG9pbnQge1xyXG4gICAgeDogbnVtYmVyO1xyXG4gICAgeTogbnVtYmVyO1xyXG59XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3NwbGl0JyxcclxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gICAgc3R5bGVzOiBbYFxyXG4gICAgICAgIDpob3N0IHtcclxuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICAgICAgZmxleC13cmFwOiBub3dyYXA7XHJcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcclxuICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIDpob3N0LnZlcnRpY2FsIHtcclxuICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNwbGl0LWd1dHRlciB7XHJcbiAgICAgICAgICAgIGZsZXgtZ3JvdzogMDtcclxuICAgICAgICAgICAgZmxleC1zaHJpbms6IDA7XHJcbiAgICAgICAgICAgIGZsZXgtYmFzaXM6IDEwcHg7XHJcbiAgICAgICAgICAgIGhlaWdodDogMTAwJTtcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2VlZWVlZTtcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogNTAlO1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgOmhvc3QudmVydGljYWwgc3BsaXQtZ3V0dGVyIHtcclxuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICA6aG9zdCAvZGVlcC8gc3BsaXQtYXJlYSB7XHJcbiAgICAgICAgICAgIHRyYW5zaXRpb246IGZsZXgtYmFzaXMgMC4zcztcclxuICAgICAgICB9ICBcclxuXHJcbiAgICAgICAgOmhvc3Qubm90cmFucyAvZGVlcC8gc3BsaXQtYXJlYSB7XHJcbiAgICAgICAgICAgIHRyYW5zaXRpb246IG5vbmUgIWltcG9ydGFudDtcclxuICAgICAgICB9ICAgICAgXHJcblxyXG4gICAgICAgIDpob3N0IC9kZWVwLyBzcGxpdC1hcmVhLm5vdHNob3cge1xyXG4gICAgICAgICAgICBmbGV4LWJhc2lzOiAwICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW4gIWltcG9ydGFudDtcclxuICAgICAgICB9ICAgICAgXHJcblxyXG4gICAgICAgIDpob3N0LnZlcnRpY2FsIC9kZWVwLyBzcGxpdC1hcmVhLm5vdHNob3cge1xyXG4gICAgICAgICAgICBtYXgtd2lkdGg6IDA7XHJcbiAgICAgICAgICAgIGZsZXgtYmFzaXM6IDAgIWltcG9ydGFudDtcclxuICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbiAhaW1wb3J0YW50O1xyXG4gICAgICAgIH1cclxuICAgIGBdLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2ICNjb3ZlciBzdHlsZT1cInBvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDt0b3A6MDtyaWdodDowO2JvdHRvbTowO3otaW5kZXg6MTAwO1wiXHJcbiAgICAgICAgICAgIFtzdHlsZS5kaXNwbGF5XT1cImNvdmVyRGlzcGxheSB8IGFzeW5jXCI+PC9kaXY+XHJcbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG4gICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtYXJlYSBbbmdGb3JPZl09XCJhcmVhc1wiIGxldC1pbmRleD1cImluZGV4XCIgbGV0LWxhc3Q9XCJsYXN0XCI+XHJcbiAgICAgICAgICAgIDxzcGxpdC1ndXR0ZXIgKm5nSWY9XCJsYXN0ID09PSBmYWxzZSAmJiBhcmVhLmNvbXBvbmVudC52aXNpYmxlICYmICFpc0xhc3RWaXNpYmxlQXJlYShhcmVhKVwiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtvcmRlcl09XCJpbmRleCoyKzFcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtkaXJlY3Rpb25dPVwiZGlyZWN0aW9uXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBbc2l6ZV09XCJndXR0ZXJTaXplXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChtb3VzZWRvd24pPVwic3RhcnREcmFnZ2luZygkZXZlbnQsIGluZGV4KjIrMSlcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICh0b3VjaHN0YXJ0KT1cInN0YXJ0RHJhZ2dpbmcoJGV2ZW50LCBpbmRleCoyKzEpXCI+PC9zcGxpdC1ndXR0ZXI+XHJcbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5gLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgU3BsaXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XHJcbiAgICBASW5wdXQoKSBkaXJlY3Rpb246IHN0cmluZyA9ICdob3Jpem9udGFsJztcclxuICAgIEBJbnB1dCgpIHdpZHRoOiBudW1iZXI7XHJcbiAgICBASW5wdXQoKSBoZWlnaHQ6IG51bWJlcjtcclxuICAgIEBJbnB1dCgpIGd1dHRlclNpemU6IG51bWJlciA9IDEwO1xyXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIEBJbnB1dCgpIGFuaW1hdGVBcmVhVG9nZ2xlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgQE91dHB1dCgpIGRyYWdTdGFydCA9IG5ldyBFdmVudEVtaXR0ZXI8QXJyYXk8bnVtYmVyPj4oZmFsc2UpO1xyXG4gICAgQE91dHB1dCgpIGRyYWdQcm9ncmVzcyA9IG5ldyBFdmVudEVtaXR0ZXI8QXJyYXk8bnVtYmVyPj4oZmFsc2UpO1xyXG4gICAgQE91dHB1dCgpIGRyYWdFbmQgPSBuZXcgRXZlbnRFbWl0dGVyPEFycmF5PG51bWJlcj4+KGZhbHNlKTtcclxuXHJcbiAgICBASW5wdXQoKSBzYXZlU3RhdGVzOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgQElucHV0KCkgc2V0IG5hbWUodmFsOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodmFsKVxyXG4gICAgICAgICAgICB0aGlzLnNwbGl0U3RhdGVTZXJ2aWNlLnNwbGl0TmFtZSA9IHZhbDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNwbGl0U3RhdGVTZXJ2aWNlLnNwbGl0TmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9jb3ZlckRpc3BsYXkgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oXCJub25lXCIpO1xyXG4gICAgY292ZXJEaXNwbGF5OiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLl9jb3ZlckRpc3BsYXkuYXNPYnNlcnZhYmxlKCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfdmlzaWJsZVRyYW5zaXRpb25FbmRTdWI6IEJlaGF2aW9yU3ViamVjdDxBcnJheTxudW1iZXI+PiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8QXJyYXk8bnVtYmVyPj4oW10pO1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gc3BsaXQgYXJlYSBzaG93L2hpZGUgYXJlIGRvbmUgd2l0aCBhbmltYXRpb25zIGNvbXBsZXRlZC5cclxuICAgICAqIE1ha2Ugc3VyZSB1c2UgZGVib3VuY2VUaW1lIGFuZCBkaXN0aW5jdFVudGlsQ2hhbmdlIGJlZm9yZSBzdWJzY3JpcHRpb24sXHJcbiAgICAgKiB0byBoYW5kbGUgdGhlIGZhY3QgdGhhdCBhZGphY2VudCBzcGxpdCBhcmVhcyBhbHNvIHRyaWdnZXJpbmcgdGhlIGV2ZW50LCBkdXJpbmcgc2hvdy9oaWRlIG9mIHNpbmdsZSBhcmVhLlxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCkgdmlzaWJsZVRyYW5zaXRpb25FbmQ6IE9ic2VydmFibGU8QXJyYXk8bnVtYmVyPj4gPSB0aGlzLl92aXNpYmxlVHJhbnNpdGlvbkVuZFN1Yi5hc09ic2VydmFibGUoKTtcclxuXHJcbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLnZlcnRpY2FsJykgZ2V0IHN0eWxlRmxleERpcmVjdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kaXJlY3Rpb24gPT09ICd2ZXJ0aWNhbCc7XHJcbiAgICB9XHJcblxyXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5ub3RyYW5zJykgZ2V0IGRyYWdnaW5nKCkge1xyXG4gICAgICAgIC8vIHByZXZlbnQgYW5pbWF0aW9uIG9mIGFyZWFzIHdoZW4gYW5pbWF0ZUFyZWFUb2dnbGUgaXMgZmFsc2UsIG9yIHJlc2l6aW5nXHJcbiAgICAgICAgcmV0dXJuICF0aGlzLmFuaW1hdGVBcmVhVG9nZ2xlIHx8IHRoaXMuaXNEcmFnZ2luZztcclxuICAgIH1cclxuXHJcbiAgICBASG9zdEJpbmRpbmcoJ3N0eWxlLndpZHRoJykgZ2V0IHN0eWxlV2lkdGgoKSB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLndpZHRoICYmICFpc05hTih0aGlzLndpZHRoKSAmJiB0aGlzLndpZHRoID4gMCkgPyB0aGlzLndpZHRoICsgJ3B4JyA6ICcxMDAlJztcclxuICAgIH1cclxuXHJcbiAgICBASG9zdEJpbmRpbmcoJ3N0eWxlLmhlaWdodCcpIGdldCBzdHlsZUhlaWdodCgpIHtcclxuICAgICAgICByZXR1cm4gKHRoaXMuaGVpZ2h0ICYmICFpc05hTih0aGlzLmhlaWdodCkgJiYgdGhpcy5oZWlnaHQgPiAwKSA/IHRoaXMuaGVpZ2h0ICsgJ3B4JyA6ICcxMDAlJztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldCB2aXNpYmxlQXJlYXMoKTogSUFyZWFEYXRhW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFyZWFzLmZpbHRlcihhID0+IGEuY29tcG9uZW50LnZpc2libGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0IG5iR3V0dGVycygpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZpc2libGVBcmVhcy5sZW5ndGggLSAxO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbWluUGVyY2VudDogbnVtYmVyID0gNTtcclxuICAgIGFyZWFzOiBBcnJheTxJQXJlYURhdGE+ID0gW107XHJcbiAgICBwcml2YXRlIGlzRHJhZ2dpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgY29udGFpbmVyU2l6ZTogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgYXJlYUFTaXplOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBhcmVhQlNpemU6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIGV2ZW50c0RyYWdGY3Q6IEFycmF5PEZ1bmN0aW9uPiA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgc3BsaXRTdGF0ZVNlcnZpY2U6IFNwbGl0U3RhdGVTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcclxuICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHsgfVxyXG5cclxuICAgIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ2d1dHRlclNpemUnXSB8fCBjaGFuZ2VzWydkaXNhYmxlZCddKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5zYXZlU3RhdGVzKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIHZhciBzdGF0ZSA9IHRoaXMuc3BsaXRTdGF0ZVNlcnZpY2UubG9hZFN0YXRlKCk7XHJcbiAgICAgICAgaWYgKHN0YXRlICYmIHRoaXMuYXJlYXMubGVuZ3RoID09IHN0YXRlLmxlbmd0aClcclxuICAgICAgICAgICAgdGhpcy5hcmVhcy5mb3JFYWNoKChhLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBhLnNpemUgPSBzdGF0ZVtpXS5zaXplO1xyXG4gICAgICAgICAgICAgICAgYS5jb21wb25lbnQudmlzaWJsZSA9IHN0YXRlW2ldLnZpc2libGU7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkQXJlYShjb21wb25lbnQ6IFNwbGl0QXJlYURpcmVjdGl2ZSwgb3JkZXJVc2VyOiBudW1iZXIgfCBudWxsLCBzaXplVXNlcjogbnVtYmVyIHwgbnVsbCwgbWluUGl4ZWw6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuYXJlYXMucHVzaCh7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudCxcclxuICAgICAgICAgICAgb3JkZXJVc2VyLFxyXG4gICAgICAgICAgICBvcmRlcjogLTEsXHJcbiAgICAgICAgICAgIHNpemVVc2VyLFxyXG4gICAgICAgICAgICBzaXplOiAtMSxcclxuICAgICAgICAgICAgbWluUGl4ZWxcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyB0aGlzLl9zYXZlU3RhdGUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZUFyZWEoY29tcG9uZW50OiBTcGxpdEFyZWFEaXJlY3RpdmUsIG9yZGVyVXNlcjogbnVtYmVyIHwgbnVsbCwgc2l6ZVVzZXI6IG51bWJlciB8IG51bGwsIG1pblBpeGVsOiBudW1iZXIpIHtcclxuICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5hcmVhcy5maW5kKGEgPT4gYS5jb21wb25lbnQgPT09IGNvbXBvbmVudCk7XHJcblxyXG4gICAgICAgIGlmIChpdGVtKSB7XHJcbiAgICAgICAgICAgIGl0ZW0ub3JkZXJVc2VyID0gb3JkZXJVc2VyO1xyXG4gICAgICAgICAgICBpdGVtLnNpemVVc2VyID0gc2l6ZVVzZXI7XHJcbiAgICAgICAgICAgIGl0ZW0ubWluUGl4ZWwgPSBtaW5QaXhlbDtcclxuICAgICAgICAgICAgLy8gdGhpcy5fc2F2ZVN0YXRlKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZUFyZWEoYXJlYTogU3BsaXRBcmVhRGlyZWN0aXZlKSB7XHJcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuYXJlYXMuZmluZChhID0+IGEuY29tcG9uZW50ID09PSBhcmVhKTtcclxuXHJcbiAgICAgICAgaWYgKGl0ZW0pIHtcclxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmFyZWFzLmluZGV4T2YoaXRlbSk7XHJcbiAgICAgICAgICAgIHRoaXMuYXJlYXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgdGhpcy5hcmVhcy5mb3JFYWNoKChhLCBpKSA9PiBhLm9yZGVyID0gaSAqIDIpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLl9zYXZlU3RhdGUoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGlkZUFyZWEoYXJlYTogU3BsaXRBcmVhRGlyZWN0aXZlKSB7XHJcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuYXJlYXMuZmluZChhID0+IGEuY29tcG9uZW50ID09PSBhcmVhKTtcclxuXHJcbiAgICAgICAgaWYgKGl0ZW0pIHtcclxuICAgICAgICAgICAgdGhpcy5fc2F2ZVN0YXRlKCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd0FyZWEoYXJlYTogU3BsaXRBcmVhRGlyZWN0aXZlKSB7XHJcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuYXJlYXMuZmluZChhID0+IGEuY29tcG9uZW50ID09PSBhcmVhKTtcclxuXHJcbiAgICAgICAgaWYgKGl0ZW0pIHtcclxuICAgICAgICAgICAgdGhpcy5fc2F2ZVN0YXRlKCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNMYXN0VmlzaWJsZUFyZWEoYXJlYTogSUFyZWFEYXRhKSB7XHJcbiAgICAgICAgdmFyIHZpc2libGVBcmVhcyA9IHRoaXMuYXJlYXMuZmlsdGVyKGEgPT4gYS5jb21wb25lbnQudmlzaWJsZSk7XHJcbiAgICAgICAgcmV0dXJuIHZpc2libGVBcmVhcy5sZW5ndGggPiAwID8gYXJlYSA9PT0gdmlzaWJsZUFyZWFzW3Zpc2libGVBcmVhcy5sZW5ndGggLSAxXSA6IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVmcmVzaCgpIHtcclxuXHJcbiAgICAgICAgdGhpcy5zdG9wRHJhZ2dpbmcoKTtcclxuXHJcbiAgICAgICAgbGV0IHZpc2libGVBcmVhcyA9IHRoaXMudmlzaWJsZUFyZWFzO1xyXG5cclxuICAgICAgICAvLyBPUkRFUlM6IFNldCBjc3MgJ29yZGVyJyBwcm9wZXJ0eSBkZXBlbmRpbmcgb24gdXNlciBpbnB1dCBvciBhZGRlZCBvcmRlclxyXG4gICAgICAgIGNvbnN0IG5iQ29ycmVjdE9yZGVyID0gdGhpcy5hcmVhcy5maWx0ZXIoYSA9PiBhLm9yZGVyVXNlciAhPT0gbnVsbCAmJiAhaXNOYU4oYS5vcmRlclVzZXIpKS5sZW5ndGg7XHJcbiAgICAgICAgaWYgKG5iQ29ycmVjdE9yZGVyID09PSB0aGlzLmFyZWFzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLmFyZWFzLnNvcnQoKGEsIGIpID0+ICthLm9yZGVyVXNlciAtICtiLm9yZGVyVXNlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmFyZWFzLmZvckVhY2goKGEsIGkpID0+IHtcclxuICAgICAgICAgICAgYS5vcmRlciA9IGkgKiAyO1xyXG4gICAgICAgICAgICBhLmNvbXBvbmVudC5zZXRTdHlsZSgnb3JkZXInLCBhLm9yZGVyKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gU0laRVM6IFNldCBjc3MgJ2ZsZXgtYmFzaXMnIHByb3BlcnR5IGRlcGVuZGluZyBvbiB1c2VyIGlucHV0IG9yIGVxdWFsIHNpemVzXHJcbiAgICAgICAgY29uc3QgdG90YWxTaXplID0gdmlzaWJsZUFyZWFzLm1hcChhID0+IGEuc2l6ZVVzZXIpLnJlZHVjZSgoYWNjLCBzKSA9PiBhY2MgKyBzLCAwKTtcclxuICAgICAgICBjb25zdCBuYkNvcnJlY3RTaXplID0gdmlzaWJsZUFyZWFzLmZpbHRlcihhID0+IGEuc2l6ZVVzZXIgIT09IG51bGwgJiYgIWlzTmFOKGEuc2l6ZVVzZXIpICYmIGEuc2l6ZVVzZXIgPj0gdGhpcy5taW5QZXJjZW50KS5sZW5ndGg7XHJcblxyXG4gICAgICAgIGlmICh0b3RhbFNpemUgPCA5OS45OSB8fCB0b3RhbFNpemUgPiAxMDAuMDEgfHwgbmJDb3JyZWN0U2l6ZSAhPT0gdmlzaWJsZUFyZWFzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb25zdCBzaXplID0gTnVtYmVyKCgxMDAgLyB2aXNpYmxlQXJlYXMubGVuZ3RoKS50b0ZpeGVkKDMpKTtcclxuICAgICAgICAgICAgdmlzaWJsZUFyZWFzLmZvckVhY2goYSA9PiBhLnNpemUgPSBzaXplKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2aXNpYmxlQXJlYXMuZm9yRWFjaChhID0+IGEuc2l6ZSA9IE51bWJlcihhLnNpemVVc2VyKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnJlZnJlc2hTdHlsZVNpemVzKCk7XHJcbiAgICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlZnJlc2hTdHlsZVNpemVzKCkge1xyXG4gICAgICAgIGxldCB2aXNpYmxlQXJlYXMgPSB0aGlzLnZpc2libGVBcmVhcztcclxuXHJcbiAgICAgICAgY29uc3QgZiA9IHRoaXMuZ3V0dGVyU2l6ZSAqIHRoaXMubmJHdXR0ZXJzIC8gdmlzaWJsZUFyZWFzLmxlbmd0aDtcclxuICAgICAgICB2aXNpYmxlQXJlYXMuZm9yRWFjaChhID0+IGEuY29tcG9uZW50LnNldFN0eWxlKCdmbGV4LWJhc2lzJywgYGNhbGMoICR7YS5zaXplfSUgLSAke2Z9cHggKWApKTtcclxuXHJcbiAgICAgICAgaWYgKEJyb3dzZXJTZXJ2aWNlLmlzSUUoKSkge1xyXG4gICAgICAgICAgICAvL2llIGFuZCBlZGdlIGRvbid0IHN1cHBvcnQgZmxleC1iYXNpcyBhbmltYXRpb25cclxuICAgICAgICAgICAgLy9maXJlIGV2ZW50IHJpZ2h0IGhlcmVcclxuICAgICAgICAgICAgdGhpcy5ub3RpZnkoJ3Zpc2libGVUcmFuc2l0aW9uRW5kJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGFydERyYWdnaW5nKHN0YXJ0RXZlbnQ6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50LCBndXR0ZXJPcmRlcjogbnVtYmVyKSB7XHJcbiAgICAgICAgc3RhcnRFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBhcmVhQSA9IHRoaXMuYXJlYXMuZmluZChhID0+IGEub3JkZXIgPT09IGd1dHRlck9yZGVyIC0gMSk7XHJcbiAgICAgICAgY29uc3QgYXJlYUIgPSB0aGlzLmFyZWFzLmZpbmQoYSA9PiBhLm9yZGVyID09PSBndXR0ZXJPcmRlciArIDEpO1xyXG4gICAgICAgIGlmICghYXJlYUEgfHwgIWFyZWFCKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHByb3AgPSAodGhpcy5kaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJykgPyAnb2Zmc2V0V2lkdGgnIDogJ29mZnNldEhlaWdodCc7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXJTaXplID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnRbcHJvcF07XHJcbiAgICAgICAgdGhpcy5hcmVhQVNpemUgPSB0aGlzLmNvbnRhaW5lclNpemUgKiBhcmVhQS5zaXplIC8gMTAwO1xyXG4gICAgICAgIHRoaXMuYXJlYUJTaXplID0gdGhpcy5jb250YWluZXJTaXplICogYXJlYUIuc2l6ZSAvIDEwMDtcclxuXHJcbiAgICAgICAgbGV0IHN0YXJ0OiBQb2ludDtcclxuICAgICAgICBpZiAoc3RhcnRFdmVudCBpbnN0YW5jZW9mIE1vdXNlRXZlbnQpIHtcclxuICAgICAgICAgICAgc3RhcnQgPSB7XHJcbiAgICAgICAgICAgICAgICB4OiBzdGFydEV2ZW50LnNjcmVlblgsXHJcbiAgICAgICAgICAgICAgICB5OiBzdGFydEV2ZW50LnNjcmVlbllcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9IGVsc2UgaWYgKHN0YXJ0RXZlbnQgaW5zdGFuY2VvZiBUb3VjaEV2ZW50KSB7XHJcbiAgICAgICAgICAgIHN0YXJ0ID0ge1xyXG4gICAgICAgICAgICAgICAgeDogc3RhcnRFdmVudC50b3VjaGVzWzBdLnNjcmVlblgsXHJcbiAgICAgICAgICAgICAgICB5OiBzdGFydEV2ZW50LnRvdWNoZXNbMF0uc2NyZWVuWVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vYWRkIHRoZSBvdmVybGF5IHRyYW5zcGFyZW50ICBjb3ZlciB0byBoYW5kbGUgZHJhZ2dpbmcgb3ZlciBpZnJhbWVzXHJcblxyXG4gICAgICAgIHRoaXMuZXZlbnRzRHJhZ0ZjdC5wdXNoKHRoaXMucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICdtb3VzZW1vdmUnLCBlID0+IHRoaXMuZHJhZ0V2ZW50KGUsIHN0YXJ0LCBhcmVhQSwgYXJlYUIpKSk7XHJcbiAgICAgICAgdGhpcy5ldmVudHNEcmFnRmN0LnB1c2godGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ3RvdWNobW92ZScsIGUgPT4gdGhpcy5kcmFnRXZlbnQoZSwgc3RhcnQsIGFyZWFBLCBhcmVhQikpKTtcclxuICAgICAgICB0aGlzLmV2ZW50c0RyYWdGY3QucHVzaCh0aGlzLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAnbW91c2V1cCcsIGUgPT4gdGhpcy5zdG9wRHJhZ2dpbmcoKSkpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRzRHJhZ0ZjdC5wdXNoKHRoaXMucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICd0b3VjaGVuZCcsIGUgPT4gdGhpcy5zdG9wRHJhZ2dpbmcoKSkpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRzRHJhZ0ZjdC5wdXNoKHRoaXMucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICd0b3VjaGNhbmNlbCcsIGUgPT4gdGhpcy5zdG9wRHJhZ2dpbmcoKSkpO1xyXG5cclxuICAgICAgICBhcmVhQS5jb21wb25lbnQubG9ja0V2ZW50cygpO1xyXG4gICAgICAgIGFyZWFCLmNvbXBvbmVudC5sb2NrRXZlbnRzKCk7XHJcblxyXG4gICAgICAgIHRoaXMuaXNEcmFnZ2luZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fY292ZXJEaXNwbGF5Lm5leHQoXCJibG9ja1wiKTtcclxuICAgICAgICB0aGlzLm5vdGlmeSgnc3RhcnQnKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYWdFdmVudChldmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQsIHN0YXJ0OiBQb2ludCwgYXJlYUE6IElBcmVhRGF0YSwgYXJlYUI6IElBcmVhRGF0YSkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc0RyYWdnaW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBlbmQ6IFBvaW50O1xyXG4gICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIE1vdXNlRXZlbnQpIHtcclxuICAgICAgICAgICAgZW5kID0ge1xyXG4gICAgICAgICAgICAgICAgeDogZXZlbnQuc2NyZWVuWCxcclxuICAgICAgICAgICAgICAgIHk6IGV2ZW50LnNjcmVlbllcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50IGluc3RhbmNlb2YgVG91Y2hFdmVudCkge1xyXG4gICAgICAgICAgICBlbmQgPSB7XHJcbiAgICAgICAgICAgICAgICB4OiBldmVudC50b3VjaGVzWzBdLnNjcmVlblgsXHJcbiAgICAgICAgICAgICAgICB5OiBldmVudC50b3VjaGVzWzBdLnNjcmVlbllcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmRyYWcoc3RhcnQsIGVuZCwgYXJlYUEsIGFyZWFCKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYWcoc3RhcnQ6IFBvaW50LCBlbmQ6IFBvaW50LCBhcmVhQTogSUFyZWFEYXRhLCBhcmVhQjogSUFyZWFEYXRhKSB7XHJcbiAgICAgICAgY29uc3Qgb2Zmc2V0UGl4ZWwgPSAodGhpcy5kaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJykgPyAoc3RhcnQueCAtIGVuZC54KSA6IChzdGFydC55IC0gZW5kLnkpO1xyXG5cclxuICAgICAgICBjb25zdCBuZXdTaXplUGl4ZWxBID0gdGhpcy5hcmVhQVNpemUgLSBvZmZzZXRQaXhlbDtcclxuICAgICAgICBjb25zdCBuZXdTaXplUGl4ZWxCID0gdGhpcy5hcmVhQlNpemUgKyBvZmZzZXRQaXhlbDtcclxuXHJcbiAgICAgICAgaWYgKG5ld1NpemVQaXhlbEEgPD0gYXJlYUEubWluUGl4ZWwgJiYgbmV3U2l6ZVBpeGVsQiA8IGFyZWFCLm1pblBpeGVsKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBuZXdTaXplUGVyY2VudEEgPSBuZXdTaXplUGl4ZWxBIC8gdGhpcy5jb250YWluZXJTaXplICogMTAwO1xyXG4gICAgICAgIGxldCBuZXdTaXplUGVyY2VudEIgPSBuZXdTaXplUGl4ZWxCIC8gdGhpcy5jb250YWluZXJTaXplICogMTAwO1xyXG5cclxuICAgICAgICBpZiAobmV3U2l6ZVBlcmNlbnRBIDw9IHRoaXMubWluUGVyY2VudCkge1xyXG4gICAgICAgICAgICBuZXdTaXplUGVyY2VudEEgPSB0aGlzLm1pblBlcmNlbnQ7XHJcbiAgICAgICAgICAgIG5ld1NpemVQZXJjZW50QiA9IGFyZWFBLnNpemUgKyBhcmVhQi5zaXplIC0gdGhpcy5taW5QZXJjZW50O1xyXG4gICAgICAgIH0gZWxzZSBpZiAobmV3U2l6ZVBlcmNlbnRCIDw9IHRoaXMubWluUGVyY2VudCkge1xyXG4gICAgICAgICAgICBuZXdTaXplUGVyY2VudEIgPSB0aGlzLm1pblBlcmNlbnQ7XHJcbiAgICAgICAgICAgIG5ld1NpemVQZXJjZW50QSA9IGFyZWFBLnNpemUgKyBhcmVhQi5zaXplIC0gdGhpcy5taW5QZXJjZW50O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5ld1NpemVQZXJjZW50QSA9IE51bWJlcihuZXdTaXplUGVyY2VudEEudG9GaXhlZCgzKSk7XHJcbiAgICAgICAgICAgIG5ld1NpemVQZXJjZW50QiA9IE51bWJlcigoYXJlYUEuc2l6ZSArIGFyZWFCLnNpemUgLSBuZXdTaXplUGVyY2VudEEpLnRvRml4ZWQoMykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYXJlYUEuc2l6ZSA9IG5ld1NpemVQZXJjZW50QTtcclxuICAgICAgICBhcmVhQi5zaXplID0gbmV3U2l6ZVBlcmNlbnRCO1xyXG5cclxuICAgICAgICB0aGlzLnJlZnJlc2hTdHlsZVNpemVzKCk7XHJcbiAgICAgICAgdGhpcy5ub3RpZnkoJ3Byb2dyZXNzJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdG9wRHJhZ2dpbmcoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzRHJhZ2dpbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5hcmVhcy5mb3JFYWNoKGEgPT4gYS5jb21wb25lbnQudW5sb2NrRXZlbnRzKCkpO1xyXG5cclxuICAgICAgICB3aGlsZSAodGhpcy5ldmVudHNEcmFnRmN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgY29uc3QgZmN0ID0gdGhpcy5ldmVudHNEcmFnRmN0LnBvcCgpO1xyXG4gICAgICAgICAgICBpZiAoZmN0KSB7XHJcbiAgICAgICAgICAgICAgICBmY3QoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jb250YWluZXJTaXplID0gMDtcclxuICAgICAgICB0aGlzLmFyZWFBU2l6ZSA9IDA7XHJcbiAgICAgICAgdGhpcy5hcmVhQlNpemUgPSAwO1xyXG5cclxuICAgICAgICB0aGlzLmlzRHJhZ2dpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9jb3ZlckRpc3BsYXkubmV4dChcIm5vbmVcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fc2F2ZVN0YXRlKCk7XHJcbiAgICAgICAgdGhpcy5ub3RpZnkoJ2VuZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3NhdmVTdGF0ZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5zYXZlU3RhdGVzKVxyXG4gICAgICAgICAgICB0aGlzLnNwbGl0U3RhdGVTZXJ2aWNlLnNhdmVTdGF0ZSh0aGlzLmFyZWFzLm1hcChhID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2l6ZTogYS5zaXplLFxyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6IGEuY29tcG9uZW50LnZpc2libGVcclxuICAgICAgICAgICAgICAgIH0gYXMgU3BsaXRBcmVhU3RhdGU7XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgIH1cclxuXHJcbiAgICBub3RpZnkodHlwZTogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3QgZGF0YTogQXJyYXk8bnVtYmVyPiA9IHRoaXMudmlzaWJsZUFyZWFzLm1hcChhID0+IGEuc2l6ZSk7XHJcblxyXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdzdGFydCc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kcmFnU3RhcnQuZW1pdChkYXRhKTtcclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ3Byb2dyZXNzJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRyYWdQcm9ncmVzcy5lbWl0KGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAnZW5kJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRyYWdFbmQuZW1pdChkYXRhKTtcclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ3Zpc2libGVUcmFuc2l0aW9uRW5kJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl92aXNpYmxlVHJhbnNpdGlvbkVuZFN1Yi5uZXh0KGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy5zdG9wRHJhZ2dpbmcoKTtcclxuICAgIH1cclxufVxyXG4iXX0=