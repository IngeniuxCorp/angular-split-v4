import { Injectable, EventEmitter, ChangeDetectorRef, ElementRef, Renderer2, Input, Output, HostBinding, Component, ChangeDetectionStrategy, Directive, NgModule } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { CommonModule } from '@angular/common';

class BrowserService {
    static isIE() {
        var ua = window.navigator.userAgent;
        // Test values; Uncomment to check result …
        // IE 10
        // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
        // IE 11
        // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
        // IE 12 / Spartan
        // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
        // Edge (IE 12+)
        // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';
        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }
        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }
        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
            // Edge (IE 12+) => return version number
            return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }
        // other browser
        return false;
    }
}

class CookieService {
    get(cookieName) {
        var cookieList = window.top.document.cookie.split("; ");
        var cookieValue = "";
        for (var i = 0; i < cookieList.length; i++) {
            // separate name-value pairs
            var cookie = decodeURIComponent(cookieList[i]);
            var name = cookie.substring(0, cookie.indexOf("="));
            var value = cookie.substring(cookie.indexOf("=") + 1);
            // Compare the cookie name
            if (cookieName == name) {
                cookieValue = value;
                break;
            }
        }
        if (cookieValue == "undefined" || cookieValue == null)
            cookieValue = "";
        return cookieValue;
    }
    set(name, value) {
        var isPermanent = true;
        // if there are three arguments
        if (arguments.length == 3) {
            isPermanent = arguments[2];
        }
        // Create a cookie string to write to the cookie file
        var cookieToken = name + "=" + decodeURIComponent(value) + ";";
        // if this is a permanent cookie
        if (isPermanent == true) {
            // Set the expiration date of the cookie to be one year from now
            var expDate = new Date();
            expDate.setDate(365 + expDate.getDate());
            cookieToken = cookieToken + " " +
                "expires=" + expDate.toUTCString() + ";";
        }
        window.top.document.cookie = cookieToken;
    }
}

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
class SplitAreaState {
}
let SplitStateService = class SplitStateService {
    constructor(cookieService) {
        this.cookieService = cookieService;
        this.splitName = "AngularSplit";
    }
    saveState(visibleAreaStates) {
        this.cookieService.set(this.splitName, JSON.stringify(visibleAreaStates));
    }
    loadState() {
        const cookieVal = this.cookieService.get(this.splitName);
        return cookieVal ? JSON.parse(cookieVal) : null;
    }
};
SplitStateService.ctorParameters = () => [
    { type: CookieService }
];
SplitStateService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [CookieService])
], SplitStateService);

var __decorate$1 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$1 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
__decorate$1([
    Input(),
    __metadata$1("design:type", String)
], SplitComponent.prototype, "direction", void 0);
__decorate$1([
    Input(),
    __metadata$1("design:type", Number)
], SplitComponent.prototype, "width", void 0);
__decorate$1([
    Input(),
    __metadata$1("design:type", Number)
], SplitComponent.prototype, "height", void 0);
__decorate$1([
    Input(),
    __metadata$1("design:type", Number)
], SplitComponent.prototype, "gutterSize", void 0);
__decorate$1([
    Input(),
    __metadata$1("design:type", Boolean)
], SplitComponent.prototype, "disabled", void 0);
__decorate$1([
    Input(),
    __metadata$1("design:type", Boolean)
], SplitComponent.prototype, "animateAreaToggle", void 0);
__decorate$1([
    Output(),
    __metadata$1("design:type", Object)
], SplitComponent.prototype, "dragStart", void 0);
__decorate$1([
    Output(),
    __metadata$1("design:type", Object)
], SplitComponent.prototype, "dragProgress", void 0);
__decorate$1([
    Output(),
    __metadata$1("design:type", Object)
], SplitComponent.prototype, "dragEnd", void 0);
__decorate$1([
    Input(),
    __metadata$1("design:type", Boolean)
], SplitComponent.prototype, "saveStates", void 0);
__decorate$1([
    Input(),
    __metadata$1("design:type", String),
    __metadata$1("design:paramtypes", [String])
], SplitComponent.prototype, "name", null);
__decorate$1([
    Output(),
    __metadata$1("design:type", Observable)
], SplitComponent.prototype, "visibleTransitionEnd", void 0);
__decorate$1([
    HostBinding('class.vertical'),
    __metadata$1("design:type", Object),
    __metadata$1("design:paramtypes", [])
], SplitComponent.prototype, "styleFlexDirection", null);
__decorate$1([
    HostBinding('class.notrans'),
    __metadata$1("design:type", Object),
    __metadata$1("design:paramtypes", [])
], SplitComponent.prototype, "dragging", null);
__decorate$1([
    HostBinding('style.width'),
    __metadata$1("design:type", Object),
    __metadata$1("design:paramtypes", [])
], SplitComponent.prototype, "styleWidth", null);
__decorate$1([
    HostBinding('style.height'),
    __metadata$1("design:type", Object),
    __metadata$1("design:paramtypes", [])
], SplitComponent.prototype, "styleHeight", null);
SplitComponent = __decorate$1([
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
    __metadata$1("design:paramtypes", [SplitStateService,
        ChangeDetectorRef,
        ElementRef,
        Renderer2])
], SplitComponent);

var __decorate$2 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$2 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let SplitAreaDirective = class SplitAreaDirective {
    constructor(elementRef, renderer, split) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.split = split;
        this._order = null;
        this._size = null;
        this._minSizePixel = 0;
        this._visible = true;
        this.visibility = "block";
        this.eventsLockFct = [];
    }
    set order(v) {
        this._order = !isNaN(v) ? v : null;
        this.split.updateArea(this, this._order, this._size, this._minSizePixel);
    }
    set size(v) {
        this._size = !isNaN(v) ? v : null;
        this.split.updateArea(this, this._order, this._size, this._minSizePixel);
    }
    set minSizePixel(v) {
        this._minSizePixel = (!isNaN(v) && v > 0) ? v : 0;
        this.split.updateArea(this, this._order, this._size, this._minSizePixel);
    }
    set visible(v) {
        this.visibility = v ? "block" : "none";
        this._visible = v;
        if (this.visible) {
            this.split.showArea(this);
        }
        else {
            this.split.hideArea(this);
        }
    }
    get visible() {
        return this._visible;
    }
    ngOnInit() {
        this.split.addArea(this, this._order, this._size, this._minSizePixel);
    }
    lockEvents() {
        this.eventsLockFct.push(this.renderer.listen(this.elementRef.nativeElement, 'selectstart', e => false));
        this.eventsLockFct.push(this.renderer.listen(this.elementRef.nativeElement, 'dragstart', e => false));
    }
    unlockEvents() {
        while (this.eventsLockFct.length > 0) {
            const fct = this.eventsLockFct.pop();
            if (fct) {
                fct();
            }
        }
    }
    setStyle(key, value) {
        this.renderer.setStyle(this.elementRef.nativeElement, key, value);
    }
    ngOnDestroy() {
        this.split.removeArea(this);
    }
    onSizingTransitionEnd(evt) {
        //note that all css property transition end could trigger transitionend events
        //this limit only flex-basis transition to trigger the event
        if (!evt || evt.propertyName == "flex-basis")
            this.split.notify("visibleTransitionEnd");
    }
};
SplitAreaDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: SplitComponent }
];
__decorate$2([
    Input(),
    __metadata$2("design:type", Number),
    __metadata$2("design:paramtypes", [Number])
], SplitAreaDirective.prototype, "order", null);
__decorate$2([
    Input(),
    __metadata$2("design:type", Object),
    __metadata$2("design:paramtypes", [Object])
], SplitAreaDirective.prototype, "size", null);
__decorate$2([
    Input(),
    __metadata$2("design:type", Number),
    __metadata$2("design:paramtypes", [Number])
], SplitAreaDirective.prototype, "minSizePixel", null);
__decorate$2([
    Input(),
    __metadata$2("design:type", Boolean),
    __metadata$2("design:paramtypes", [Boolean])
], SplitAreaDirective.prototype, "visible", null);
SplitAreaDirective = __decorate$2([
    Directive({
        selector: 'split-area',
        host: {
            '[style.flex-grow]': '"0"',
            '[style.flex-shrink]': '"0"',
            '[style.overflow-x]': '"hidden"',
            '[style.overflow-y]': '"auto"',
            '[style.height]': '"100%"',
            '[class.notshow]': '!visible',
            '(transitionend)': 'onSizingTransitionEnd($event)'
        }
    }),
    __metadata$2("design:paramtypes", [ElementRef,
        Renderer2,
        SplitComponent])
], SplitAreaDirective);

var __decorate$3 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$3 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let SplitGutterDirective = class SplitGutterDirective {
    constructor(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this._disabled = false;
    }
    set order(v) {
        this.setStyle('order', v);
    }
    set direction(v) {
        this._direction = v;
        this.refreshStyle();
    }
    set size(v) {
        this.setStyle('flex-basis', v + 'px');
    }
    set disabled(v) {
        this._disabled = v;
        this.refreshStyle();
    }
    refreshStyle() {
        const state = this._disabled === true ? 'disabled' : this._direction;
        this.setStyle('cursor', this.getCursor(state));
        this.setStyle('background-image', `url("${this.getImage(state)}")`);
    }
    setStyle(key, value) {
        this.renderer.setStyle(this.elementRef.nativeElement, key, value);
    }
    getCursor(state) {
        switch (state) {
            case 'disabled':
                return 'default';
            case 'vertical':
                return 'row-resize';
            case 'horizontal':
                return 'col-resize';
        }
    }
    getImage(state) {
        switch (state) {
            case 'disabled':
                return '';
            case 'vertical':
                return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFCAMAAABl/6zIAAAABlBMVEUAAADMzMzIT8AyAAAAAXRSTlMAQObYZgAAABRJREFUeAFjYGRkwIMJSeMHlBkOABP7AEGzSuPKAAAAAElFTkSuQmCC';
            case 'horizontal':
                return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==';
        }
    }
};
SplitGutterDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
__decorate$3([
    Input(),
    __metadata$3("design:type", Number),
    __metadata$3("design:paramtypes", [Number])
], SplitGutterDirective.prototype, "order", null);
__decorate$3([
    Input(),
    __metadata$3("design:type", String),
    __metadata$3("design:paramtypes", [String])
], SplitGutterDirective.prototype, "direction", null);
__decorate$3([
    Input(),
    __metadata$3("design:type", Object),
    __metadata$3("design:paramtypes", [Object])
], SplitGutterDirective.prototype, "size", null);
__decorate$3([
    Input(),
    __metadata$3("design:type", Boolean),
    __metadata$3("design:paramtypes", [Boolean])
], SplitGutterDirective.prototype, "disabled", null);
SplitGutterDirective = __decorate$3([
    Directive({
        selector: 'split-gutter'
    }),
    __metadata$3("design:paramtypes", [ElementRef,
        Renderer2])
], SplitGutterDirective);

var __decorate$4 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let AngularSplitModule = class AngularSplitModule {
};
AngularSplitModule = __decorate$4([
    NgModule({
        imports: [
            CommonModule
        ],
        declarations: [
            SplitComponent,
            SplitAreaDirective,
            SplitGutterDirective
        ],
        exports: [
            SplitComponent,
            SplitAreaDirective,
            SplitGutterDirective
        ],
        providers: [SplitStateService, CookieService]
    })
], AngularSplitModule);

/*
 * Public API Surface of ng2-grid-livescroll
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AngularSplitModule, BrowserService, CookieService, SplitAreaDirective, SplitAreaState, SplitComponent, SplitGutterDirective, SplitStateService };
//# sourceMappingURL=angular-split.js.map
