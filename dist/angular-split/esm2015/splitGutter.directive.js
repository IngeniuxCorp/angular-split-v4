var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';
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
__decorate([
    Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], SplitGutterDirective.prototype, "order", null);
__decorate([
    Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], SplitGutterDirective.prototype, "direction", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], SplitGutterDirective.prototype, "size", null);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], SplitGutterDirective.prototype, "disabled", null);
SplitGutterDirective = __decorate([
    Directive({
        selector: 'split-gutter'
    }),
    __metadata("design:paramtypes", [ElementRef,
        Renderer2])
], SplitGutterDirective);
export { SplitGutterDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXRHdXR0ZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zcGxpdC8iLCJzb3VyY2VzIjpbInNwbGl0R3V0dGVyLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBS3hFLElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQW9CO0lBc0I3QixZQUFvQixVQUFzQixFQUN0QixRQUFtQjtRQURuQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFQL0IsY0FBUyxHQUFZLEtBQUssQ0FBQztJQU9PLENBQUM7SUFyQmxDLElBQUksS0FBSyxDQUFDLENBQVM7UUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUdRLElBQUksU0FBUyxDQUFDLENBQVM7UUFDNUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFUSxJQUFJLElBQUksQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFHUSxJQUFJLFFBQVEsQ0FBQyxDQUFVO1FBQzVCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBS08sWUFBWTtRQUNoQixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBRXJFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsUUFBUSxDQUFDLGtCQUFrQixFQUFFLFFBQVMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUUsSUFBSSxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVPLFFBQVEsQ0FBQyxHQUFXLEVBQUUsS0FBVTtRQUNwQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVPLFNBQVMsQ0FBQyxLQUFhO1FBQzNCLFFBQU8sS0FBSyxFQUFFO1lBQ1YsS0FBSyxVQUFVO2dCQUNYLE9BQU8sU0FBUyxDQUFDO1lBRXJCLEtBQUssVUFBVTtnQkFDWCxPQUFPLFlBQVksQ0FBQztZQUV4QixLQUFLLFlBQVk7Z0JBQ2IsT0FBTyxZQUFZLENBQUM7U0FDM0I7SUFDTCxDQUFDO0lBRU8sUUFBUSxDQUFDLEtBQWE7UUFDMUIsUUFBTyxLQUFLLEVBQUU7WUFDVixLQUFLLFVBQVU7Z0JBQ1gsT0FBTyxFQUFFLENBQUM7WUFFZCxLQUFLLFVBQVU7Z0JBQ1gsT0FBTyx3S0FBd0ssQ0FBQztZQUVwTCxLQUFLLFlBQVk7Z0JBQ2IsT0FBTyxvSkFBb0osQ0FBQztTQUNuSztJQUNMLENBQUM7Q0FDSixDQUFBOztZQXZDbUMsVUFBVTtZQUNaLFNBQVM7O0FBckI5QjtJQUFSLEtBQUssRUFBRTs7O2lEQUVQO0FBR1E7SUFBUixLQUFLLEVBQUU7OztxREFHUDtBQUVRO0lBQVIsS0FBSyxFQUFFOzs7Z0RBRVA7QUFHUTtJQUFSLEtBQUssRUFBRTs7O29EQUdQO0FBcEJRLG9CQUFvQjtJQUhoQyxTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsY0FBYztLQUMzQixDQUFDO3FDQXVCa0MsVUFBVTtRQUNaLFNBQVM7R0F2QjlCLG9CQUFvQixDQTZEaEM7U0E3RFksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgRWxlbWVudFJlZiwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnc3BsaXQtZ3V0dGVyJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgU3BsaXRHdXR0ZXJEaXJlY3RpdmUge1xyXG5cclxuICAgIEBJbnB1dCgpIHNldCBvcmRlcih2OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnNldFN0eWxlKCdvcmRlcicsIHYpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2RpcmVjdGlvbjogc3RyaW5nO1xyXG4gICAgQElucHV0KCkgc2V0IGRpcmVjdGlvbih2OiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9kaXJlY3Rpb24gPSB2O1xyXG4gICAgICAgIHRoaXMucmVmcmVzaFN0eWxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KCkgc2V0IHNpemUodikge1xyXG4gICAgICAgIHRoaXMuc2V0U3R5bGUoJ2ZsZXgtYmFzaXMnLCB2ICsgJ3B4Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIEBJbnB1dCgpIHNldCBkaXNhYmxlZCh2OiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSB2O1xyXG4gICAgICAgIHRoaXMucmVmcmVzaFN0eWxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7fVxyXG5cclxuICAgIHByaXZhdGUgcmVmcmVzaFN0eWxlKCkge1xyXG4gICAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5fZGlzYWJsZWQgPT09IHRydWUgPyAnZGlzYWJsZWQnIDogdGhpcy5fZGlyZWN0aW9uO1xyXG5cclxuICAgICAgICB0aGlzLnNldFN0eWxlKCdjdXJzb3InLCB0aGlzLmdldEN1cnNvcihzdGF0ZSkpO1xyXG4gICAgICAgIHRoaXMuc2V0U3R5bGUoJ2JhY2tncm91bmQtaW1hZ2UnLCBgdXJsKFwiJHsgdGhpcy5nZXRJbWFnZShzdGF0ZSkgfVwiKWApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0U3R5bGUoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBrZXksIHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEN1cnNvcihzdGF0ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3dpdGNoKHN0YXRlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2Rpc2FibGVkJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiAnZGVmYXVsdCc7XHJcblxyXG4gICAgICAgICAgICBjYXNlICd2ZXJ0aWNhbCc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3Jvdy1yZXNpemUnO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAnaG9yaXpvbnRhbCc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2NvbC1yZXNpemUnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEltYWdlKHN0YXRlOiBzdHJpbmcpIHtcclxuICAgICAgICBzd2l0Y2goc3RhdGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnZGlzYWJsZWQnOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAndmVydGljYWwnOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUI0QUFBQUZDQU1BQUFCbC82eklBQUFBQmxCTVZFVUFBQURNek16SVQ4QXlBQUFBQVhSU1RsTUFRT2JZWmdBQUFCUkpSRUZVZUFGallHUmt3SU1KU2VNSGxCa09BQlA3QUVHelN1UEtBQUFBQUVsRlRrU3VRbUNDJztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ2hvcml6b250YWwnOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUFVQUFBQWVDQVlBQUFEa2Z0UzlBQUFBSWtsRVFWUW9VMk00YytiTWZ4QUdBZ1lZbXdHcklJaURqckVManBvNWFpWmVNd0YreU5uT3M1S1N2Z0FBQUFCSlJVNUVya0pnZ2c9PSc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==