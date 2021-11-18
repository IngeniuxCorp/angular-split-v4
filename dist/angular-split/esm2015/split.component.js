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
let SplitComponent = class SplitComponent {
    constructor(splitStateService, cdRef, elementRef, renderer) {
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
    set name(val) {
        if (val)
            this.splitStateService.splitName = val;
    }
    get name() {
        return this.splitStateService.splitName;
    }
    get styleFlexDirection() {
        return this.direction === 'vertical';
    }
    get dragging() {
        // prevent animation of areas when animateAreaToggle is false, or resizing
        return !this.animateAreaToggle || this.isDragging;
    }
    get styleWidth() {
        return (this.width && !isNaN(this.width) && this.width > 0) ? this.width + 'px' : '100%';
    }
    get styleHeight() {
        return (this.height && !isNaN(this.height) && this.height > 0) ? this.height + 'px' : '100%';
    }
    get visibleAreas() {
        return this.areas.filter(a => a.component.visible);
    }
    get nbGutters() {
        return this.visibleAreas.length - 1;
    }
    ngOnChanges(changes) {
        if (changes['gutterSize'] || changes['disabled']) {
            this.refresh();
        }
    }
    ngAfterViewInit() {
        if (!this.saveStates)
            return;
        var state = this.splitStateService.loadState();
        if (state && this.areas.length == state.length)
            this.areas.forEach((a, i) => {
                a.size = state[i].size;
                a.component.visible = state[i].visible;
            });
        this.refresh();
    }
    addArea(component, orderUser, sizeUser, minPixel) {
        this.areas.push({
            component,
            orderUser,
            order: -1,
            sizeUser,
            size: -1,
            minPixel
        });
        // this._saveState();
        this.refresh();
    }
    updateArea(component, orderUser, sizeUser, minPixel) {
        const item = this.areas.find(a => a.component === component);
        if (item) {
            item.orderUser = orderUser;
            item.sizeUser = sizeUser;
            item.minPixel = minPixel;
            // this._saveState();
            this.refresh();
        }
    }
    removeArea(area) {
        const item = this.areas.find(a => a.component === area);
        if (item) {
            const index = this.areas.indexOf(item);
            this.areas.splice(index, 1);
            this.areas.forEach((a, i) => a.order = i * 2);
            // this._saveState();
            this.refresh();
        }
    }
    hideArea(area) {
        const item = this.areas.find(a => a.component === area);
        if (item) {
            this._saveState();
            this.refresh();
        }
    }
    showArea(area) {
        const item = this.areas.find(a => a.component === area);
        if (item) {
            this._saveState();
            this.refresh();
        }
    }
    isLastVisibleArea(area) {
        var visibleAreas = this.areas.filter(a => a.component.visible);
        return visibleAreas.length > 0 ? area === visibleAreas[visibleAreas.length - 1] : false;
    }
    refresh() {
        this.stopDragging();
        let visibleAreas = this.visibleAreas;
        // ORDERS: Set css 'order' property depending on user input or added order
        const nbCorrectOrder = this.areas.filter(a => a.orderUser !== null && !isNaN(a.orderUser)).length;
        if (nbCorrectOrder === this.areas.length) {
            this.areas.sort((a, b) => +a.orderUser - +b.orderUser);
        }
        this.areas.forEach((a, i) => {
            a.order = i * 2;
            a.component.setStyle('order', a.order);
        });
        // SIZES: Set css 'flex-basis' property depending on user input or equal sizes
        const totalSize = visibleAreas.map(a => a.sizeUser).reduce((acc, s) => acc + s, 0);
        const nbCorrectSize = visibleAreas.filter(a => a.sizeUser !== null && !isNaN(a.sizeUser) && a.sizeUser >= this.minPercent).length;
        if (totalSize < 99.99 || totalSize > 100.01 || nbCorrectSize !== visibleAreas.length) {
            const size = Number((100 / visibleAreas.length).toFixed(3));
            visibleAreas.forEach(a => a.size = size);
        }
        else {
            visibleAreas.forEach(a => a.size = Number(a.sizeUser));
        }
        this.refreshStyleSizes();
        this.cdRef.markForCheck();
    }
    refreshStyleSizes() {
        let visibleAreas = this.visibleAreas;
        const f = this.gutterSize * this.nbGutters / visibleAreas.length;
        visibleAreas.forEach(a => a.component.setStyle('flex-basis', `calc( ${a.size}% - ${f}px )`));
        if (BrowserService.isIE()) {
            //ie and edge don't support flex-basis animation
            //fire event right here
            this.notify('visibleTransitionEnd');
        }
    }
    startDragging(startEvent, gutterOrder) {
        startEvent.preventDefault();
        if (this.disabled) {
            return;
        }
        const areaA = this.areas.find(a => a.order === gutterOrder - 1);
        const areaB = this.areas.find(a => a.order === gutterOrder + 1);
        if (!areaA || !areaB) {
            return;
        }
        const prop = (this.direction === 'horizontal') ? 'offsetWidth' : 'offsetHeight';
        this.containerSize = this.elementRef.nativeElement[prop];
        this.areaASize = this.containerSize * areaA.size / 100;
        this.areaBSize = this.containerSize * areaB.size / 100;
        let start;
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
        this.eventsDragFct.push(this.renderer.listen('document', 'mousemove', e => this.dragEvent(e, start, areaA, areaB)));
        this.eventsDragFct.push(this.renderer.listen('document', 'touchmove', e => this.dragEvent(e, start, areaA, areaB)));
        this.eventsDragFct.push(this.renderer.listen('document', 'mouseup', e => this.stopDragging()));
        this.eventsDragFct.push(this.renderer.listen('document', 'touchend', e => this.stopDragging()));
        this.eventsDragFct.push(this.renderer.listen('document', 'touchcancel', e => this.stopDragging()));
        areaA.component.lockEvents();
        areaB.component.lockEvents();
        this.isDragging = true;
        this._coverDisplay.next("block");
        this.notify('start');
    }
    dragEvent(event, start, areaA, areaB) {
        if (!this.isDragging) {
            return;
        }
        let end;
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
    }
    drag(start, end, areaA, areaB) {
        const offsetPixel = (this.direction === 'horizontal') ? (start.x - end.x) : (start.y - end.y);
        const newSizePixelA = this.areaASize - offsetPixel;
        const newSizePixelB = this.areaBSize + offsetPixel;
        if (newSizePixelA <= areaA.minPixel && newSizePixelB < areaB.minPixel) {
            return;
        }
        let newSizePercentA = newSizePixelA / this.containerSize * 100;
        let newSizePercentB = newSizePixelB / this.containerSize * 100;
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
    }
    stopDragging() {
        if (!this.isDragging) {
            return;
        }
        this.areas.forEach(a => a.component.unlockEvents());
        while (this.eventsDragFct.length > 0) {
            const fct = this.eventsDragFct.pop();
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
    }
    _saveState() {
        if (this.saveStates)
            this.splitStateService.saveState(this.areas.map(a => {
                return {
                    size: a.size,
                    visible: a.component.visible
                };
            }));
    }
    notify(type) {
        const data = this.visibleAreas.map(a => a.size);
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
    }
    ngOnDestroy() {
        this.stopDragging();
    }
};
SplitComponent.ctorParameters = () => [
    { type: SplitStateService },
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: Renderer2 }
];
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
        template: `
        <div #cover style="position:absolute;left:0;top:0;right:0;bottom:0;z-index:100;"
            [style.display]="coverDisplay | async"></div>
        <ng-content></ng-content>
        <ng-template ngFor let-area [ngForOf]="areas" let-index="index" let-last="last">
            <split-gutter *ngIf="last === false && area.component.visible && !isLastVisibleArea(area)" 
                          [order]="index*2+1"
                          [direction]="direction"
                          [size]="gutterSize"
                          [disabled]="disabled"
                          (mousedown)="startDragging($event, index*2+1)"
                          (touchstart)="startDragging($event, index*2+1)"></split-gutter>
        </ng-template>`,
        styles: [`
        :host {
            display: flex;
            flex-wrap: nowrap;
            justify-content: flex-start;
            flex-direction: row;
        }

        :host.vertical {
            flex-direction: column;
        }

        split-gutter {
            flex-grow: 0;
            flex-shrink: 0;
            flex-basis: 10px;
            height: 100%;
            background-color: #eeeeee;
            background-position: 50%;
            background-repeat: no-repeat;
        }

        :host.vertical split-gutter {
            width: 100%;
        }

        :host /deep/ split-area {
            transition: flex-basis 0.3s;
        }  

        :host.notrans /deep/ split-area {
            transition: none !important;
        }      

        :host /deep/ split-area.notshow {
            flex-basis: 0 !important;
            overflow: hidden !important;
        }      

        :host.vertical /deep/ split-area.notshow {
            max-width: 0;
            flex-basis: 0 !important;
            overflow: hidden !important;
        }
    `]
    }),
    __metadata("design:paramtypes", [SplitStateService,
        ChangeDetectorRef,
        ElementRef,
        Renderer2])
], SplitComponent);
export { SplitComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zcGxpdC8iLCJzb3VyY2VzIjpbInNwbGl0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUFFLGlCQUFpQixFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQ25GLHVCQUF1QixFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFDekUsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFVBQVUsRUFBZ0IsZUFBZSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBRXBFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUErRWxELElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7SUFtRXZCLFlBQ1ksaUJBQW9DLEVBQ3BDLEtBQXdCLEVBQ3hCLFVBQXNCLEVBQ3RCLFFBQW1CO1FBSG5CLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsVUFBSyxHQUFMLEtBQUssQ0FBbUI7UUFDeEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBdEV0QixjQUFTLEdBQVcsWUFBWSxDQUFDO1FBR2pDLGVBQVUsR0FBVyxFQUFFLENBQUM7UUFDeEIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixzQkFBaUIsR0FBWSxLQUFLLENBQUM7UUFFbEMsY0FBUyxHQUFHLElBQUksWUFBWSxDQUFnQixLQUFLLENBQUMsQ0FBQztRQUNuRCxpQkFBWSxHQUFHLElBQUksWUFBWSxDQUFnQixLQUFLLENBQUMsQ0FBQztRQUN0RCxZQUFPLEdBQUcsSUFBSSxZQUFZLENBQWdCLEtBQUssQ0FBQyxDQUFDO1FBRWxE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Q2pDO0lBQVIsS0FBSyxFQUFFOzs2Q0FBZTtBQUNkO0lBQVIsS0FBSyxFQUFFOzs4Q0FBZ0I7QUFDZjtJQUFSLEtBQUssRUFBRTs7a0RBQXlCO0FBQ3hCO0lBQVIsS0FBSyxFQUFFOztnREFBMkI7QUFDMUI7SUFBUixLQUFLLEVBQUU7O3lEQUFvQztBQUVsQztJQUFULE1BQU0sRUFBRTs7aURBQW9EO0FBQ25EO0lBQVQsTUFBTSxFQUFFOztvREFBdUQ7QUFDdEQ7SUFBVCxNQUFNLEVBQUU7OytDQUFrRDtBQUVsRDtJQUFSLEtBQUssRUFBRTs7a0RBQTZCO0FBRTVCO0lBQVIsS0FBSyxFQUFFOzs7MENBR1A7QUFlUztJQUFULE1BQU0sRUFBRTs4QkFBdUIsVUFBVTs0REFBK0Q7QUFFMUU7SUFBOUIsV0FBVyxDQUFDLGdCQUFnQixDQUFDOzs7d0RBRTdCO0FBRTZCO0lBQTdCLFdBQVcsQ0FBQyxlQUFlLENBQUM7Ozs4Q0FHNUI7QUFFMkI7SUFBM0IsV0FBVyxDQUFDLGFBQWEsQ0FBQzs7O2dEQUUxQjtBQUU0QjtJQUE1QixXQUFXLENBQUMsY0FBYyxDQUFDOzs7aURBRTNCO0FBakRRLGNBQWM7SUE5RDFCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxPQUFPO1FBQ2pCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1FBOEMvQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozt1QkFZUztpQkF6RFY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBNENSO0tBY0osQ0FBQztxQ0FxRWlDLGlCQUFpQjtRQUM3QixpQkFBaUI7UUFDWixVQUFVO1FBQ1osU0FBUztHQXZFdEIsY0FBYyxDQXdXMUI7U0F4V1ksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBDb21wb25lbnQsIENoYW5nZURldGVjdG9yUmVmLCBJbnB1dCwgT3V0cHV0LCBIb3N0QmluZGluZywgRWxlbWVudFJlZiwgU2ltcGxlQ2hhbmdlcyxcclxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBFdmVudEVtaXR0ZXIsIFJlbmRlcmVyMiwgT25EZXN0cm95LCBPbkNoYW5nZXNcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcy9SeCc7XHJcbmltcG9ydCB7IFNwbGl0QXJlYURpcmVjdGl2ZSB9IGZyb20gJy4vc3BsaXRBcmVhLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IFNwbGl0U3RhdGVTZXJ2aWNlLCBTcGxpdEFyZWFTdGF0ZSB9IGZyb20gJy4vc3BsaXRTdGF0ZVNlcnZpY2UnO1xyXG5pbXBvcnQgeyBCcm93c2VyU2VydmljZSB9IGZyb20gXCIuL2Jyb3dzZXJTZXJ2aWNlXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElBcmVhRGF0YSB7XHJcbiAgICBjb21wb25lbnQ6IFNwbGl0QXJlYURpcmVjdGl2ZTtcclxuICAgIHNpemVVc2VyOiBudW1iZXIgfCBudWxsO1xyXG4gICAgc2l6ZTogbnVtYmVyO1xyXG4gICAgb3JkZXJVc2VyOiBudW1iZXIgfCBudWxsO1xyXG4gICAgb3JkZXI6IG51bWJlcjtcclxuICAgIG1pblBpeGVsOiBudW1iZXI7XHJcbn1cclxuXHJcbmludGVyZmFjZSBQb2ludCB7XHJcbiAgICB4OiBudW1iZXI7XHJcbiAgICB5OiBudW1iZXI7XHJcbn1cclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnc3BsaXQnLFxyXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgICBzdHlsZXM6IFtgXHJcbiAgICAgICAgOmhvc3Qge1xyXG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgICAgICBmbGV4LXdyYXA6IG5vd3JhcDtcclxuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xyXG4gICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgOmhvc3QudmVydGljYWwge1xyXG4gICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3BsaXQtZ3V0dGVyIHtcclxuICAgICAgICAgICAgZmxleC1ncm93OiAwO1xyXG4gICAgICAgICAgICBmbGV4LXNocmluazogMDtcclxuICAgICAgICAgICAgZmxleC1iYXNpczogMTBweDtcclxuICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlZWVlO1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiA1MCU7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICA6aG9zdC52ZXJ0aWNhbCBzcGxpdC1ndXR0ZXIge1xyXG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIDpob3N0IC9kZWVwLyBzcGxpdC1hcmVhIHtcclxuICAgICAgICAgICAgdHJhbnNpdGlvbjogZmxleC1iYXNpcyAwLjNzO1xyXG4gICAgICAgIH0gIFxyXG5cclxuICAgICAgICA6aG9zdC5ub3RyYW5zIC9kZWVwLyBzcGxpdC1hcmVhIHtcclxuICAgICAgICAgICAgdHJhbnNpdGlvbjogbm9uZSAhaW1wb3J0YW50O1xyXG4gICAgICAgIH0gICAgICBcclxuXHJcbiAgICAgICAgOmhvc3QgL2RlZXAvIHNwbGl0LWFyZWEubm90c2hvdyB7XHJcbiAgICAgICAgICAgIGZsZXgtYmFzaXM6IDAgIWltcG9ydGFudDtcclxuICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbiAhaW1wb3J0YW50O1xyXG4gICAgICAgIH0gICAgICBcclxuXHJcbiAgICAgICAgOmhvc3QudmVydGljYWwgL2RlZXAvIHNwbGl0LWFyZWEubm90c2hvdyB7XHJcbiAgICAgICAgICAgIG1heC13aWR0aDogMDtcclxuICAgICAgICAgICAgZmxleC1iYXNpczogMCAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgYF0sXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgI2NvdmVyIHN0eWxlPVwicG9zaXRpb246YWJzb2x1dGU7bGVmdDowO3RvcDowO3JpZ2h0OjA7Ym90dG9tOjA7ei1pbmRleDoxMDA7XCJcclxuICAgICAgICAgICAgW3N0eWxlLmRpc3BsYXldPVwiY292ZXJEaXNwbGF5IHwgYXN5bmNcIj48L2Rpdj5cclxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XHJcbiAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1hcmVhIFtuZ0Zvck9mXT1cImFyZWFzXCIgbGV0LWluZGV4PVwiaW5kZXhcIiBsZXQtbGFzdD1cImxhc3RcIj5cclxuICAgICAgICAgICAgPHNwbGl0LWd1dHRlciAqbmdJZj1cImxhc3QgPT09IGZhbHNlICYmIGFyZWEuY29tcG9uZW50LnZpc2libGUgJiYgIWlzTGFzdFZpc2libGVBcmVhKGFyZWEpXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW29yZGVyXT1cImluZGV4KjIrMVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW2RpcmVjdGlvbl09XCJkaXJlY3Rpb25cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtzaXplXT1cImd1dHRlclNpemVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKG1vdXNlZG93bik9XCJzdGFydERyYWdnaW5nKCRldmVudCwgaW5kZXgqMisxKVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKHRvdWNoc3RhcnQpPVwic3RhcnREcmFnZ2luZygkZXZlbnQsIGluZGV4KjIrMSlcIj48L3NwbGl0LWd1dHRlcj5cclxuICAgICAgICA8L25nLXRlbXBsYXRlPmAsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTcGxpdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcclxuICAgIEBJbnB1dCgpIGRpcmVjdGlvbjogc3RyaW5nID0gJ2hvcml6b250YWwnO1xyXG4gICAgQElucHV0KCkgd2lkdGg6IG51bWJlcjtcclxuICAgIEBJbnB1dCgpIGhlaWdodDogbnVtYmVyO1xyXG4gICAgQElucHV0KCkgZ3V0dGVyU2l6ZTogbnVtYmVyID0gMTA7XHJcbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgQElucHV0KCkgYW5pbWF0ZUFyZWFUb2dnbGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBAT3V0cHV0KCkgZHJhZ1N0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxBcnJheTxudW1iZXI+PihmYWxzZSk7XHJcbiAgICBAT3V0cHV0KCkgZHJhZ1Byb2dyZXNzID0gbmV3IEV2ZW50RW1pdHRlcjxBcnJheTxudW1iZXI+PihmYWxzZSk7XHJcbiAgICBAT3V0cHV0KCkgZHJhZ0VuZCA9IG5ldyBFdmVudEVtaXR0ZXI8QXJyYXk8bnVtYmVyPj4oZmFsc2UpO1xyXG5cclxuICAgIEBJbnB1dCgpIHNhdmVTdGF0ZXM6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBASW5wdXQoKSBzZXQgbmFtZSh2YWw6IHN0cmluZykge1xyXG4gICAgICAgIGlmICh2YWwpXHJcbiAgICAgICAgICAgIHRoaXMuc3BsaXRTdGF0ZVNlcnZpY2Uuc3BsaXROYW1lID0gdmFsO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBuYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3BsaXRTdGF0ZVNlcnZpY2Uuc3BsaXROYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2NvdmVyRGlzcGxheSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPihcIm5vbmVcIik7XHJcbiAgICBjb3ZlckRpc3BsYXk6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuX2NvdmVyRGlzcGxheS5hc09ic2VydmFibGUoKTtcclxuXHJcbiAgICBwcml2YXRlIF92aXNpYmxlVHJhbnNpdGlvbkVuZFN1YjogQmVoYXZpb3JTdWJqZWN0PEFycmF5PG51bWJlcj4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxBcnJheTxudW1iZXI+PihbXSk7XHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiBzcGxpdCBhcmVhIHNob3cvaGlkZSBhcmUgZG9uZSB3aXRoIGFuaW1hdGlvbnMgY29tcGxldGVkLlxyXG4gICAgICogTWFrZSBzdXJlIHVzZSBkZWJvdW5jZVRpbWUgYW5kIGRpc3RpbmN0VW50aWxDaGFuZ2UgYmVmb3JlIHN1YnNjcmlwdGlvbixcclxuICAgICAqIHRvIGhhbmRsZSB0aGUgZmFjdCB0aGF0IGFkamFjZW50IHNwbGl0IGFyZWFzIGFsc28gdHJpZ2dlcmluZyB0aGUgZXZlbnQsIGR1cmluZyBzaG93L2hpZGUgb2Ygc2luZ2xlIGFyZWEuXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSB2aXNpYmxlVHJhbnNpdGlvbkVuZDogT2JzZXJ2YWJsZTxBcnJheTxudW1iZXI+PiA9IHRoaXMuX3Zpc2libGVUcmFuc2l0aW9uRW5kU3ViLmFzT2JzZXJ2YWJsZSgpO1xyXG5cclxuICAgIEBIb3N0QmluZGluZygnY2xhc3MudmVydGljYWwnKSBnZXQgc3R5bGVGbGV4RGlyZWN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRpcmVjdGlvbiA9PT0gJ3ZlcnRpY2FsJztcclxuICAgIH1cclxuXHJcbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLm5vdHJhbnMnKSBnZXQgZHJhZ2dpbmcoKSB7XHJcbiAgICAgICAgLy8gcHJldmVudCBhbmltYXRpb24gb2YgYXJlYXMgd2hlbiBhbmltYXRlQXJlYVRvZ2dsZSBpcyBmYWxzZSwgb3IgcmVzaXppbmdcclxuICAgICAgICByZXR1cm4gIXRoaXMuYW5pbWF0ZUFyZWFUb2dnbGUgfHwgdGhpcy5pc0RyYWdnaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0QmluZGluZygnc3R5bGUud2lkdGgnKSBnZXQgc3R5bGVXaWR0aCgpIHtcclxuICAgICAgICByZXR1cm4gKHRoaXMud2lkdGggJiYgIWlzTmFOKHRoaXMud2lkdGgpICYmIHRoaXMud2lkdGggPiAwKSA/IHRoaXMud2lkdGggKyAncHgnIDogJzEwMCUnO1xyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0QmluZGluZygnc3R5bGUuaGVpZ2h0JykgZ2V0IHN0eWxlSGVpZ2h0KCkge1xyXG4gICAgICAgIHJldHVybiAodGhpcy5oZWlnaHQgJiYgIWlzTmFOKHRoaXMuaGVpZ2h0KSAmJiB0aGlzLmhlaWdodCA+IDApID8gdGhpcy5oZWlnaHQgKyAncHgnIDogJzEwMCUnO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0IHZpc2libGVBcmVhcygpOiBJQXJlYURhdGFbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXJlYXMuZmlsdGVyKGEgPT4gYS5jb21wb25lbnQudmlzaWJsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXQgbmJHdXR0ZXJzKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmlzaWJsZUFyZWFzLmxlbmd0aCAtIDE7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBtaW5QZXJjZW50OiBudW1iZXIgPSA1O1xyXG4gICAgYXJlYXM6IEFycmF5PElBcmVhRGF0YT4gPSBbXTtcclxuICAgIHByaXZhdGUgaXNEcmFnZ2luZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBjb250YWluZXJTaXplOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBhcmVhQVNpemU6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIGFyZWFCU2l6ZTogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgZXZlbnRzRHJhZ0ZjdDogQXJyYXk8RnVuY3Rpb24+ID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBzcGxpdFN0YXRlU2VydmljZTogU3BsaXRTdGF0ZVNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxyXG4gICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikgeyB9XHJcblxyXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgICAgICBpZiAoY2hhbmdlc1snZ3V0dGVyU2l6ZSddIHx8IGNoYW5nZXNbJ2Rpc2FibGVkJ10pIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnNhdmVTdGF0ZXMpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgdmFyIHN0YXRlID0gdGhpcy5zcGxpdFN0YXRlU2VydmljZS5sb2FkU3RhdGUoKTtcclxuICAgICAgICBpZiAoc3RhdGUgJiYgdGhpcy5hcmVhcy5sZW5ndGggPT0gc3RhdGUubGVuZ3RoKVxyXG4gICAgICAgICAgICB0aGlzLmFyZWFzLmZvckVhY2goKGEsIGkpID0+IHtcclxuICAgICAgICAgICAgICAgIGEuc2l6ZSA9IHN0YXRlW2ldLnNpemU7XHJcbiAgICAgICAgICAgICAgICBhLmNvbXBvbmVudC52aXNpYmxlID0gc3RhdGVbaV0udmlzaWJsZTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRBcmVhKGNvbXBvbmVudDogU3BsaXRBcmVhRGlyZWN0aXZlLCBvcmRlclVzZXI6IG51bWJlciB8IG51bGwsIHNpemVVc2VyOiBudW1iZXIgfCBudWxsLCBtaW5QaXhlbDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5hcmVhcy5wdXNoKHtcclxuICAgICAgICAgICAgY29tcG9uZW50LFxyXG4gICAgICAgICAgICBvcmRlclVzZXIsXHJcbiAgICAgICAgICAgIG9yZGVyOiAtMSxcclxuICAgICAgICAgICAgc2l6ZVVzZXIsXHJcbiAgICAgICAgICAgIHNpemU6IC0xLFxyXG4gICAgICAgICAgICBtaW5QaXhlbFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIHRoaXMuX3NhdmVTdGF0ZSgpO1xyXG5cclxuICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlQXJlYShjb21wb25lbnQ6IFNwbGl0QXJlYURpcmVjdGl2ZSwgb3JkZXJVc2VyOiBudW1iZXIgfCBudWxsLCBzaXplVXNlcjogbnVtYmVyIHwgbnVsbCwgbWluUGl4ZWw6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmFyZWFzLmZpbmQoYSA9PiBhLmNvbXBvbmVudCA9PT0gY29tcG9uZW50KTtcclxuXHJcbiAgICAgICAgaWYgKGl0ZW0pIHtcclxuICAgICAgICAgICAgaXRlbS5vcmRlclVzZXIgPSBvcmRlclVzZXI7XHJcbiAgICAgICAgICAgIGl0ZW0uc2l6ZVVzZXIgPSBzaXplVXNlcjtcclxuICAgICAgICAgICAgaXRlbS5taW5QaXhlbCA9IG1pblBpeGVsO1xyXG4gICAgICAgICAgICAvLyB0aGlzLl9zYXZlU3RhdGUoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlQXJlYShhcmVhOiBTcGxpdEFyZWFEaXJlY3RpdmUpIHtcclxuICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5hcmVhcy5maW5kKGEgPT4gYS5jb21wb25lbnQgPT09IGFyZWEpO1xyXG5cclxuICAgICAgICBpZiAoaXRlbSkge1xyXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuYXJlYXMuaW5kZXhPZihpdGVtKTtcclxuICAgICAgICAgICAgdGhpcy5hcmVhcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICB0aGlzLmFyZWFzLmZvckVhY2goKGEsIGkpID0+IGEub3JkZXIgPSBpICogMik7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuX3NhdmVTdGF0ZSgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoaWRlQXJlYShhcmVhOiBTcGxpdEFyZWFEaXJlY3RpdmUpIHtcclxuICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5hcmVhcy5maW5kKGEgPT4gYS5jb21wb25lbnQgPT09IGFyZWEpO1xyXG5cclxuICAgICAgICBpZiAoaXRlbSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zYXZlU3RhdGUoKTtcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93QXJlYShhcmVhOiBTcGxpdEFyZWFEaXJlY3RpdmUpIHtcclxuICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5hcmVhcy5maW5kKGEgPT4gYS5jb21wb25lbnQgPT09IGFyZWEpO1xyXG5cclxuICAgICAgICBpZiAoaXRlbSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zYXZlU3RhdGUoKTtcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc0xhc3RWaXNpYmxlQXJlYShhcmVhOiBJQXJlYURhdGEpIHtcclxuICAgICAgICB2YXIgdmlzaWJsZUFyZWFzID0gdGhpcy5hcmVhcy5maWx0ZXIoYSA9PiBhLmNvbXBvbmVudC52aXNpYmxlKTtcclxuICAgICAgICByZXR1cm4gdmlzaWJsZUFyZWFzLmxlbmd0aCA+IDAgPyBhcmVhID09PSB2aXNpYmxlQXJlYXNbdmlzaWJsZUFyZWFzLmxlbmd0aCAtIDFdIDogZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWZyZXNoKCkge1xyXG5cclxuICAgICAgICB0aGlzLnN0b3BEcmFnZ2luZygpO1xyXG5cclxuICAgICAgICBsZXQgdmlzaWJsZUFyZWFzID0gdGhpcy52aXNpYmxlQXJlYXM7XHJcblxyXG4gICAgICAgIC8vIE9SREVSUzogU2V0IGNzcyAnb3JkZXInIHByb3BlcnR5IGRlcGVuZGluZyBvbiB1c2VyIGlucHV0IG9yIGFkZGVkIG9yZGVyXHJcbiAgICAgICAgY29uc3QgbmJDb3JyZWN0T3JkZXIgPSB0aGlzLmFyZWFzLmZpbHRlcihhID0+IGEub3JkZXJVc2VyICE9PSBudWxsICYmICFpc05hTihhLm9yZGVyVXNlcikpLmxlbmd0aDtcclxuICAgICAgICBpZiAobmJDb3JyZWN0T3JkZXIgPT09IHRoaXMuYXJlYXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXJlYXMuc29ydCgoYSwgYikgPT4gK2Eub3JkZXJVc2VyIC0gK2Iub3JkZXJVc2VyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuYXJlYXMuZm9yRWFjaCgoYSwgaSkgPT4ge1xyXG4gICAgICAgICAgICBhLm9yZGVyID0gaSAqIDI7XHJcbiAgICAgICAgICAgIGEuY29tcG9uZW50LnNldFN0eWxlKCdvcmRlcicsIGEub3JkZXIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBTSVpFUzogU2V0IGNzcyAnZmxleC1iYXNpcycgcHJvcGVydHkgZGVwZW5kaW5nIG9uIHVzZXIgaW5wdXQgb3IgZXF1YWwgc2l6ZXNcclxuICAgICAgICBjb25zdCB0b3RhbFNpemUgPSB2aXNpYmxlQXJlYXMubWFwKGEgPT4gYS5zaXplVXNlcikucmVkdWNlKChhY2MsIHMpID0+IGFjYyArIHMsIDApO1xyXG4gICAgICAgIGNvbnN0IG5iQ29ycmVjdFNpemUgPSB2aXNpYmxlQXJlYXMuZmlsdGVyKGEgPT4gYS5zaXplVXNlciAhPT0gbnVsbCAmJiAhaXNOYU4oYS5zaXplVXNlcikgJiYgYS5zaXplVXNlciA+PSB0aGlzLm1pblBlcmNlbnQpLmxlbmd0aDtcclxuXHJcbiAgICAgICAgaWYgKHRvdGFsU2l6ZSA8IDk5Ljk5IHx8IHRvdGFsU2l6ZSA+IDEwMC4wMSB8fCBuYkNvcnJlY3RTaXplICE9PSB2aXNpYmxlQXJlYXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNpemUgPSBOdW1iZXIoKDEwMCAvIHZpc2libGVBcmVhcy5sZW5ndGgpLnRvRml4ZWQoMykpO1xyXG4gICAgICAgICAgICB2aXNpYmxlQXJlYXMuZm9yRWFjaChhID0+IGEuc2l6ZSA9IHNpemUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZpc2libGVBcmVhcy5mb3JFYWNoKGEgPT4gYS5zaXplID0gTnVtYmVyKGEuc2l6ZVVzZXIpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucmVmcmVzaFN0eWxlU2l6ZXMoKTtcclxuICAgICAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVmcmVzaFN0eWxlU2l6ZXMoKSB7XHJcbiAgICAgICAgbGV0IHZpc2libGVBcmVhcyA9IHRoaXMudmlzaWJsZUFyZWFzO1xyXG5cclxuICAgICAgICBjb25zdCBmID0gdGhpcy5ndXR0ZXJTaXplICogdGhpcy5uYkd1dHRlcnMgLyB2aXNpYmxlQXJlYXMubGVuZ3RoO1xyXG4gICAgICAgIHZpc2libGVBcmVhcy5mb3JFYWNoKGEgPT4gYS5jb21wb25lbnQuc2V0U3R5bGUoJ2ZsZXgtYmFzaXMnLCBgY2FsYyggJHthLnNpemV9JSAtICR7Zn1weCApYCkpO1xyXG5cclxuICAgICAgICBpZiAoQnJvd3NlclNlcnZpY2UuaXNJRSgpKSB7XHJcbiAgICAgICAgICAgIC8vaWUgYW5kIGVkZ2UgZG9uJ3Qgc3VwcG9ydCBmbGV4LWJhc2lzIGFuaW1hdGlvblxyXG4gICAgICAgICAgICAvL2ZpcmUgZXZlbnQgcmlnaHQgaGVyZVxyXG4gICAgICAgICAgICB0aGlzLm5vdGlmeSgndmlzaWJsZVRyYW5zaXRpb25FbmQnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXJ0RHJhZ2dpbmcoc3RhcnRFdmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQsIGd1dHRlck9yZGVyOiBudW1iZXIpIHtcclxuICAgICAgICBzdGFydEV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGFyZWFBID0gdGhpcy5hcmVhcy5maW5kKGEgPT4gYS5vcmRlciA9PT0gZ3V0dGVyT3JkZXIgLSAxKTtcclxuICAgICAgICBjb25zdCBhcmVhQiA9IHRoaXMuYXJlYXMuZmluZChhID0+IGEub3JkZXIgPT09IGd1dHRlck9yZGVyICsgMSk7XHJcbiAgICAgICAgaWYgKCFhcmVhQSB8fCAhYXJlYUIpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcHJvcCA9ICh0aGlzLmRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnKSA/ICdvZmZzZXRXaWR0aCcgOiAnb2Zmc2V0SGVpZ2h0JztcclxuICAgICAgICB0aGlzLmNvbnRhaW5lclNpemUgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudFtwcm9wXTtcclxuICAgICAgICB0aGlzLmFyZWFBU2l6ZSA9IHRoaXMuY29udGFpbmVyU2l6ZSAqIGFyZWFBLnNpemUgLyAxMDA7XHJcbiAgICAgICAgdGhpcy5hcmVhQlNpemUgPSB0aGlzLmNvbnRhaW5lclNpemUgKiBhcmVhQi5zaXplIC8gMTAwO1xyXG5cclxuICAgICAgICBsZXQgc3RhcnQ6IFBvaW50O1xyXG4gICAgICAgIGlmIChzdGFydEV2ZW50IGluc3RhbmNlb2YgTW91c2VFdmVudCkge1xyXG4gICAgICAgICAgICBzdGFydCA9IHtcclxuICAgICAgICAgICAgICAgIHg6IHN0YXJ0RXZlbnQuc2NyZWVuWCxcclxuICAgICAgICAgICAgICAgIHk6IHN0YXJ0RXZlbnQuc2NyZWVuWVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhcnRFdmVudCBpbnN0YW5jZW9mIFRvdWNoRXZlbnQpIHtcclxuICAgICAgICAgICAgc3RhcnQgPSB7XHJcbiAgICAgICAgICAgICAgICB4OiBzdGFydEV2ZW50LnRvdWNoZXNbMF0uc2NyZWVuWCxcclxuICAgICAgICAgICAgICAgIHk6IHN0YXJ0RXZlbnQudG91Y2hlc1swXS5zY3JlZW5ZXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9hZGQgdGhlIG92ZXJsYXkgdHJhbnNwYXJlbnQgIGNvdmVyIHRvIGhhbmRsZSBkcmFnZ2luZyBvdmVyIGlmcmFtZXNcclxuXHJcbiAgICAgICAgdGhpcy5ldmVudHNEcmFnRmN0LnB1c2godGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ21vdXNlbW92ZScsIGUgPT4gdGhpcy5kcmFnRXZlbnQoZSwgc3RhcnQsIGFyZWFBLCBhcmVhQikpKTtcclxuICAgICAgICB0aGlzLmV2ZW50c0RyYWdGY3QucHVzaCh0aGlzLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAndG91Y2htb3ZlJywgZSA9PiB0aGlzLmRyYWdFdmVudChlLCBzdGFydCwgYXJlYUEsIGFyZWFCKSkpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRzRHJhZ0ZjdC5wdXNoKHRoaXMucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICdtb3VzZXVwJywgZSA9PiB0aGlzLnN0b3BEcmFnZ2luZygpKSk7XHJcbiAgICAgICAgdGhpcy5ldmVudHNEcmFnRmN0LnB1c2godGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ3RvdWNoZW5kJywgZSA9PiB0aGlzLnN0b3BEcmFnZ2luZygpKSk7XHJcbiAgICAgICAgdGhpcy5ldmVudHNEcmFnRmN0LnB1c2godGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ3RvdWNoY2FuY2VsJywgZSA9PiB0aGlzLnN0b3BEcmFnZ2luZygpKSk7XHJcblxyXG4gICAgICAgIGFyZWFBLmNvbXBvbmVudC5sb2NrRXZlbnRzKCk7XHJcbiAgICAgICAgYXJlYUIuY29tcG9uZW50LmxvY2tFdmVudHMoKTtcclxuXHJcbiAgICAgICAgdGhpcy5pc0RyYWdnaW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9jb3ZlckRpc3BsYXkubmV4dChcImJsb2NrXCIpO1xyXG4gICAgICAgIHRoaXMubm90aWZ5KCdzdGFydCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhZ0V2ZW50KGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCwgc3RhcnQ6IFBvaW50LCBhcmVhQTogSUFyZWFEYXRhLCBhcmVhQjogSUFyZWFEYXRhKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzRHJhZ2dpbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGVuZDogUG9pbnQ7XHJcbiAgICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgTW91c2VFdmVudCkge1xyXG4gICAgICAgICAgICBlbmQgPSB7XHJcbiAgICAgICAgICAgICAgICB4OiBldmVudC5zY3JlZW5YLFxyXG4gICAgICAgICAgICAgICAgeTogZXZlbnQuc2NyZWVuWVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQgaW5zdGFuY2VvZiBUb3VjaEV2ZW50KSB7XHJcbiAgICAgICAgICAgIGVuZCA9IHtcclxuICAgICAgICAgICAgICAgIHg6IGV2ZW50LnRvdWNoZXNbMF0uc2NyZWVuWCxcclxuICAgICAgICAgICAgICAgIHk6IGV2ZW50LnRvdWNoZXNbMF0uc2NyZWVuWVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZHJhZyhzdGFydCwgZW5kLCBhcmVhQSwgYXJlYUIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhZyhzdGFydDogUG9pbnQsIGVuZDogUG9pbnQsIGFyZWFBOiBJQXJlYURhdGEsIGFyZWFCOiBJQXJlYURhdGEpIHtcclxuICAgICAgICBjb25zdCBvZmZzZXRQaXhlbCA9ICh0aGlzLmRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnKSA/IChzdGFydC54IC0gZW5kLngpIDogKHN0YXJ0LnkgLSBlbmQueSk7XHJcblxyXG4gICAgICAgIGNvbnN0IG5ld1NpemVQaXhlbEEgPSB0aGlzLmFyZWFBU2l6ZSAtIG9mZnNldFBpeGVsO1xyXG4gICAgICAgIGNvbnN0IG5ld1NpemVQaXhlbEIgPSB0aGlzLmFyZWFCU2l6ZSArIG9mZnNldFBpeGVsO1xyXG5cclxuICAgICAgICBpZiAobmV3U2l6ZVBpeGVsQSA8PSBhcmVhQS5taW5QaXhlbCAmJiBuZXdTaXplUGl4ZWxCIDwgYXJlYUIubWluUGl4ZWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG5ld1NpemVQZXJjZW50QSA9IG5ld1NpemVQaXhlbEEgLyB0aGlzLmNvbnRhaW5lclNpemUgKiAxMDA7XHJcbiAgICAgICAgbGV0IG5ld1NpemVQZXJjZW50QiA9IG5ld1NpemVQaXhlbEIgLyB0aGlzLmNvbnRhaW5lclNpemUgKiAxMDA7XHJcblxyXG4gICAgICAgIGlmIChuZXdTaXplUGVyY2VudEEgPD0gdGhpcy5taW5QZXJjZW50KSB7XHJcbiAgICAgICAgICAgIG5ld1NpemVQZXJjZW50QSA9IHRoaXMubWluUGVyY2VudDtcclxuICAgICAgICAgICAgbmV3U2l6ZVBlcmNlbnRCID0gYXJlYUEuc2l6ZSArIGFyZWFCLnNpemUgLSB0aGlzLm1pblBlcmNlbnQ7XHJcbiAgICAgICAgfSBlbHNlIGlmIChuZXdTaXplUGVyY2VudEIgPD0gdGhpcy5taW5QZXJjZW50KSB7XHJcbiAgICAgICAgICAgIG5ld1NpemVQZXJjZW50QiA9IHRoaXMubWluUGVyY2VudDtcclxuICAgICAgICAgICAgbmV3U2l6ZVBlcmNlbnRBID0gYXJlYUEuc2l6ZSArIGFyZWFCLnNpemUgLSB0aGlzLm1pblBlcmNlbnQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbmV3U2l6ZVBlcmNlbnRBID0gTnVtYmVyKG5ld1NpemVQZXJjZW50QS50b0ZpeGVkKDMpKTtcclxuICAgICAgICAgICAgbmV3U2l6ZVBlcmNlbnRCID0gTnVtYmVyKChhcmVhQS5zaXplICsgYXJlYUIuc2l6ZSAtIG5ld1NpemVQZXJjZW50QSkudG9GaXhlZCgzKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhcmVhQS5zaXplID0gbmV3U2l6ZVBlcmNlbnRBO1xyXG4gICAgICAgIGFyZWFCLnNpemUgPSBuZXdTaXplUGVyY2VudEI7XHJcblxyXG4gICAgICAgIHRoaXMucmVmcmVzaFN0eWxlU2l6ZXMoKTtcclxuICAgICAgICB0aGlzLm5vdGlmeSgncHJvZ3Jlc3MnKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0b3BEcmFnZ2luZygpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNEcmFnZ2luZykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmFyZWFzLmZvckVhY2goYSA9PiBhLmNvbXBvbmVudC51bmxvY2tFdmVudHMoKSk7XHJcblxyXG4gICAgICAgIHdoaWxlICh0aGlzLmV2ZW50c0RyYWdGY3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBjb25zdCBmY3QgPSB0aGlzLmV2ZW50c0RyYWdGY3QucG9wKCk7XHJcbiAgICAgICAgICAgIGlmIChmY3QpIHtcclxuICAgICAgICAgICAgICAgIGZjdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNvbnRhaW5lclNpemUgPSAwO1xyXG4gICAgICAgIHRoaXMuYXJlYUFTaXplID0gMDtcclxuICAgICAgICB0aGlzLmFyZWFCU2l6ZSA9IDA7XHJcblxyXG4gICAgICAgIHRoaXMuaXNEcmFnZ2luZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NvdmVyRGlzcGxheS5uZXh0KFwibm9uZVwiKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9zYXZlU3RhdGUoKTtcclxuICAgICAgICB0aGlzLm5vdGlmeSgnZW5kJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfc2F2ZVN0YXRlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNhdmVTdGF0ZXMpXHJcbiAgICAgICAgICAgIHRoaXMuc3BsaXRTdGF0ZVNlcnZpY2Uuc2F2ZVN0YXRlKHRoaXMuYXJlYXMubWFwKGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBzaXplOiBhLnNpemUsXHJcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogYS5jb21wb25lbnQudmlzaWJsZVxyXG4gICAgICAgICAgICAgICAgfSBhcyBTcGxpdEFyZWFTdGF0ZTtcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIG5vdGlmeSh0eXBlOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCBkYXRhOiBBcnJheTxudW1iZXI+ID0gdGhpcy52aXNpYmxlQXJlYXMubWFwKGEgPT4gYS5zaXplKTtcclxuXHJcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3N0YXJ0JzpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRyYWdTdGFydC5lbWl0KGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAncHJvZ3Jlc3MnOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZHJhZ1Byb2dyZXNzLmVtaXQoZGF0YSk7XHJcblxyXG4gICAgICAgICAgICBjYXNlICdlbmQnOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZHJhZ0VuZC5lbWl0KGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAndmlzaWJsZVRyYW5zaXRpb25FbmQnOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Zpc2libGVUcmFuc2l0aW9uRW5kU3ViLm5leHQoZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLnN0b3BEcmFnZ2luZygpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==