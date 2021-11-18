var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, Input, Output, ElementRef, Renderer2, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { SplitComponent } from './split.component';
var SplitAreaDirective = /** @class */ (function () {
    function SplitAreaDirective(elementRef, renderer, split) {
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
    Object.defineProperty(SplitAreaDirective.prototype, "order", {
        set: function (v) {
            this._order = !isNaN(v) ? v : null;
            this.split.updateArea(this, this._order, this._size, this._minSizePixel);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitAreaDirective.prototype, "size", {
        set: function (v) {
            this._size = !isNaN(v) ? v : null;
            this.split.updateArea(this, this._order, this._size, this._minSizePixel);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitAreaDirective.prototype, "minSizePixel", {
        set: function (v) {
            this._minSizePixel = (!isNaN(v) && v > 0) ? v : 0;
            this.split.updateArea(this, this._order, this._size, this._minSizePixel);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitAreaDirective.prototype, "visible", {
        get: function () {
            return this._visible;
        },
        set: function (v) {
            this.visibility = v ? "block" : "none";
            this._visible = v;
            if (this.visible) {
                this.split.showArea(this);
            }
            else {
                this.split.hideArea(this);
            }
        },
        enumerable: true,
        configurable: true
    });
    SplitAreaDirective.prototype.ngOnInit = function () {
        this.split.addArea(this, this._order, this._size, this._minSizePixel);
    };
    SplitAreaDirective.prototype.lockEvents = function () {
        this.eventsLockFct.push(this.renderer.listen(this.elementRef.nativeElement, 'selectstart', function (e) { return false; }));
        this.eventsLockFct.push(this.renderer.listen(this.elementRef.nativeElement, 'dragstart', function (e) { return false; }));
    };
    SplitAreaDirective.prototype.unlockEvents = function () {
        while (this.eventsLockFct.length > 0) {
            var fct = this.eventsLockFct.pop();
            if (fct) {
                fct();
            }
        }
    };
    SplitAreaDirective.prototype.setStyle = function (key, value) {
        this.renderer.setStyle(this.elementRef.nativeElement, key, value);
    };
    SplitAreaDirective.prototype.ngOnDestroy = function () {
        this.split.removeArea(this);
    };
    SplitAreaDirective.prototype.onSizingTransitionEnd = function (evt) {
        //note that all css property transition end could trigger transitionend events
        //this limit only flex-basis transition to trigger the event
        if (!evt || evt.propertyName == "flex-basis")
            this.split.notify("visibleTransitionEnd");
    };
    SplitAreaDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: SplitComponent }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], SplitAreaDirective.prototype, "order", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], SplitAreaDirective.prototype, "size", null);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], SplitAreaDirective.prototype, "minSizePixel", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], SplitAreaDirective.prototype, "visible", null);
    SplitAreaDirective = __decorate([
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
        __metadata("design:paramtypes", [ElementRef,
            Renderer2,
            SplitComponent])
    ], SplitAreaDirective);
    return SplitAreaDirective;
}());
export { SplitAreaDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXRBcmVhLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc3BsaXQvIiwic291cmNlcyI6WyJzcGxpdEFyZWEuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQ2xFLFlBQVksRUFDZixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFjbkQ7SUF1Q0ksNEJBQW9CLFVBQXNCLEVBQzlCLFFBQW1CLEVBQ25CLEtBQXFCO1FBRmIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUM5QixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBdkN6QixXQUFNLEdBQWtCLElBQUksQ0FBQztRQU03QixVQUFLLEdBQWtCLElBQUksQ0FBQztRQU01QixrQkFBYSxHQUFXLENBQUMsQ0FBQztRQU0xQixhQUFRLEdBQVksSUFBSSxDQUFDO1FBZWpDLGVBQVUsR0FBVyxPQUFPLENBQUM7UUFFN0Isa0JBQWEsR0FBb0IsRUFBRSxDQUFDO0lBSUMsQ0FBQztJQXRDN0Isc0JBQUkscUNBQUs7YUFBVCxVQUFVLENBQVM7WUFDeEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDbkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDN0UsQ0FBQzs7O09BQUE7SUFHUSxzQkFBSSxvQ0FBSTthQUFSLFVBQVMsQ0FBTTtZQUNwQixJ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UUFDNUQsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsWUFBWSxJQUFJLFlBQVk7WUFDeEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUNsRCxDQUFDOztnQkFuQytCLFVBQVU7Z0JBQ3BCLFNBQVM7Z0JBQ1osY0FBYzs7SUF0Q3hCO1FBQVIsS0FBSyxFQUFFOzs7bURBR1A7SUFHUTtRQUFSLEtBQUssRUFBRTs7O2tEQUdQO0lBR1E7UUFBUixLQUFLLEVBQUU7OzswREFHUDtJQUdRO1FBQVIsS0FBSyxFQUFFOzs7cURBU1A7SUE5QlEsa0JBQWtCO1FBWjlCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLElBQUksRUFBRTtnQkFDRixtQkFBbUIsRUFBRSxLQUFLO2dCQUMxQixxQkFBcUIsRUFBRSxLQUFLO2dCQUM1QixvQkFBb0IsRUFBRSxVQUFVO2dCQUNoQyxvQkFBb0IsRUFBRSxRQUFRO2dCQUM5QixnQkFBZ0IsRUFBRSxRQUFRO2dCQUMxQixpQkFBaUIsRUFBRSxVQUFVO2dCQUM3QixpQkFBaUIsRUFBRSwrQkFBK0I7YUFDckQ7U0FDSixDQUFDO3lDQXdDa0MsVUFBVTtZQUNwQixTQUFTO1lBQ1osY0FBYztPQXpDeEIsa0JBQWtCLENBMkU5QjtJQUFELHlCQUFDO0NBQUEsQUEzRUQsSUEyRUM7U0EzRVksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIERpcmVjdGl2ZSwgSW5wdXQsIE91dHB1dCwgRWxlbWVudFJlZiwgUmVuZGVyZXIyLCBPbkluaXQsIE9uRGVzdHJveSxcclxuICAgIEV2ZW50RW1pdHRlclxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgU3BsaXRDb21wb25lbnQgfSBmcm9tICcuL3NwbGl0LmNvbXBvbmVudCc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnc3BsaXQtYXJlYScsXHJcbiAgICBob3N0OiB7XHJcbiAgICAgICAgJ1tzdHlsZS5mbGV4LWdyb3ddJzogJ1wiMFwiJyxcclxuICAgICAgICAnW3N0eWxlLmZsZXgtc2hyaW5rXSc6ICdcIjBcIicsXHJcbiAgICAgICAgJ1tzdHlsZS5vdmVyZmxvdy14XSc6ICdcImhpZGRlblwiJyxcclxuICAgICAgICAnW3N0eWxlLm92ZXJmbG93LXldJzogJ1wiYXV0b1wiJyxcclxuICAgICAgICAnW3N0eWxlLmhlaWdodF0nOiAnXCIxMDAlXCInLFxyXG4gICAgICAgICdbY2xhc3Mubm90c2hvd10nOiAnIXZpc2libGUnLFxyXG4gICAgICAgICcodHJhbnNpdGlvbmVuZCknOiAnb25TaXppbmdUcmFuc2l0aW9uRW5kKCRldmVudCknXHJcbiAgICB9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTcGxpdEFyZWFEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcblxyXG4gICAgcHJpdmF0ZSBfb3JkZXI6IG51bWJlciB8IG51bGwgPSBudWxsO1xyXG4gICAgQElucHV0KCkgc2V0IG9yZGVyKHY6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX29yZGVyID0gIWlzTmFOKHYpID8gdiA6IG51bGw7XHJcbiAgICAgICAgdGhpcy5zcGxpdC51cGRhdGVBcmVhKHRoaXMsIHRoaXMuX29yZGVyLCB0aGlzLl9zaXplLCB0aGlzLl9taW5TaXplUGl4ZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3NpemU6IG51bWJlciB8IG51bGwgPSBudWxsO1xyXG4gICAgQElucHV0KCkgc2V0IHNpemUodjogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fc2l6ZSA9ICFpc05hTih2KSA/IHYgOiBudWxsO1xyXG4gICAgICAgIHRoaXMuc3BsaXQudXBkYXRlQXJlYSh0aGlzLCB0aGlzLl9vcmRlciwgdGhpcy5fc2l6ZSwgdGhpcy5fbWluU2l6ZVBpeGVsKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9taW5TaXplUGl4ZWw6IG51bWJlciA9IDA7XHJcbiAgICBASW5wdXQoKSBzZXQgbWluU2l6ZVBpeGVsKHY6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX21pblNpemVQaXhlbCA9ICghaXNOYU4odikgJiYgdiA+IDApID8gdiA6IDA7XHJcbiAgICAgICAgdGhpcy5zcGxpdC51cGRhdGVBcmVhKHRoaXMsIHRoaXMuX29yZGVyLCB0aGlzLl9zaXplLCB0aGlzLl9taW5TaXplUGl4ZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3Zpc2libGU6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgQElucHV0KCkgc2V0IHZpc2libGUodjogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMudmlzaWJpbGl0eSA9IHYgPyBcImJsb2NrXCIgOiBcIm5vbmVcIjtcclxuICAgICAgICB0aGlzLl92aXNpYmxlID0gdjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMudmlzaWJsZSkgeyBcclxuICAgICAgICAgICAgdGhpcy5zcGxpdC5zaG93QXJlYSh0aGlzKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNwbGl0LmhpZGVBcmVhKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldCB2aXNpYmxlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92aXNpYmxlO1xyXG4gICAgfVxyXG5cclxuICAgIHZpc2liaWxpdHk6IHN0cmluZyA9IFwiYmxvY2tcIjtcclxuXHJcbiAgICBldmVudHNMb2NrRmN0OiBBcnJheTxGdW5jdGlvbj4gPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXHJcbiAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxyXG4gICAgICAgIHByaXZhdGUgc3BsaXQ6IFNwbGl0Q29tcG9uZW50KSB7IH1cclxuXHJcbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5zcGxpdC5hZGRBcmVhKHRoaXMsIHRoaXMuX29yZGVyLCB0aGlzLl9zaXplLCB0aGlzLl9taW5TaXplUGl4ZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2NrRXZlbnRzKCkge1xyXG4gICAgICAgIHRoaXMuZXZlbnRzTG9ja0ZjdC5wdXNoKHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnc2VsZWN0c3RhcnQnLCBlID0+IGZhbHNlKSk7XHJcbiAgICAgICAgdGhpcy5ldmVudHNMb2NrRmN0LnB1c2godGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdkcmFnc3RhcnQnLCBlID0+IGZhbHNlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVubG9ja0V2ZW50cygpIHtcclxuICAgICAgICB3aGlsZSAodGhpcy5ldmVudHNMb2NrRmN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgY29uc3QgZmN0ID0gdGhpcy5ldmVudHNMb2NrRmN0LnBvcCgpO1xyXG4gICAgICAgICAgICBpZiAoZmN0KSB7XHJcbiAgICAgICAgICAgICAgICBmY3QoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0U3R5bGUoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBrZXksIHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy5zcGxpdC5yZW1vdmVBcmVhKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uU2l6aW5nVHJhbnNpdGlvbkVuZChldnQ6IFRyYW5zaXRpb25FdmVudCkge1xyXG4gICAgICAgIC8vbm90ZSB0aGF0IGFsbCBjc3MgcHJvcGVydHkgdHJhbnNpdGlvbiBlbmQgY291bGQgdHJpZ2dlciB0cmFuc2l0aW9uZW5kIGV2ZW50c1xyXG4gICAgICAgIC8vdGhpcyBsaW1pdCBvbmx5IGZsZXgtYmFzaXMgdHJhbnNpdGlvbiB0byB0cmlnZ2VyIHRoZSBldmVudFxyXG4gICAgICAgIGlmICghZXZ0IHx8IGV2dC5wcm9wZXJ0eU5hbWUgPT0gXCJmbGV4LWJhc2lzXCIpXHJcbiAgICAgICAgICAgIHRoaXMuc3BsaXQubm90aWZ5KFwidmlzaWJsZVRyYW5zaXRpb25FbmRcIik7XHJcbiAgICB9XHJcbn1cclxuIl19