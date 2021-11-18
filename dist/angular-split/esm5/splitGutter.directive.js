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
var SplitGutterDirective = /** @class */ (function () {
    function SplitGutterDirective(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this._disabled = false;
    }
    Object.defineProperty(SplitGutterDirective.prototype, "order", {
        set: function (v) {
            this.setStyle('order', v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitGutterDirective.prototype, "direction", {
        set: function (v) {
            this._direction = v;
            this.refreshStyle();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitGutterDirective.prototype, "size", {
        set: function (v) {
            this.setStyle('flex-basis', v + 'px');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitGutterDirective.prototype, "disabled", {
        set: function (v) {
            this._disabled = v;
            this.refreshStyle();
        },
        enumerable: true,
        configurable: true
    });
    SplitGutterDirective.prototype.refreshStyle = function () {
        var state = this._disabled === true ? 'disabled' : this._direction;
        this.setStyle('cursor', this.getCursor(state));
        this.setStyle('background-image', "url(\"" + this.getImage(state) + "\")");
    };
    SplitGutterDirective.prototype.setStyle = function (key, value) {
        this.renderer.setStyle(this.elementRef.nativeElement, key, value);
    };
    SplitGutterDirective.prototype.getCursor = function (state) {
        switch (state) {
            case 'disabled':
                return 'default';
            case 'vertical':
                return 'row-resize';
            case 'horizontal':
                return 'col-resize';
        }
    };
    SplitGutterDirective.prototype.getImage = function (state) {
        switch (state) {
            case 'disabled':
                return '';
            case 'vertical':
                return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFCAMAAABl/6zIAAAABlBMVEUAAADMzMzIT8AyAAAAAXRSTlMAQObYZgAAABRJREFUeAFjYGRkwIMJSeMHlBkOABP7AEGzSuPKAAAAAElFTkSuQmCC';
            case 'horizontal':
                return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==';
        }
    };
    SplitGutterDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
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
    return SplitGutterDirective;
}());
export { SplitGutterDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXRHdXR0ZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zcGxpdC8iLCJzb3VyY2VzIjpbInNwbGl0R3V0dGVyLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBS3hFO0lBc0JJLDhCQUFvQixVQUFzQixFQUN0QixRQUFtQjtRQURuQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFQL0IsY0FBUyxHQUFZLEtBQUssQ0FBQztJQU9PLENBQUM7SUFyQmxDLHNCQUFJLHVDQUFLO2FBQVQsVUFBVSxDQUFTO1lBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzlCLENBQUM7OztPQUFBO0lBR1Esc0JBQUksMkNBQVM7YUFBYixVQUFjLENBQVM7WUFDNUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3hCLENBQUM7OztPQUFBO0lBRVEsc0JBQUksc0NBQUk7YUFBUixVQUFTLENBQUM7WUFDZixJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDMUMsQ0FBQzs7O09BQUE7SUFHUSxzQkFBSSwwQ0FBUTthQUFaLFVBQWEsQ0FBVTtZQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEIsQ0FBQzs7O09BQUE7SUFLTywyQ0FBWSxHQUFwQjtRQUNJLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7UUFFckUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLEVBQUUsV0FBUyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxRQUFLLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBRU8sdUNBQVEsR0FBaEIsVUFBaUIsR0FBVyxFQUFFLEtBQVU7UUFDcEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFTyx3Q0FBUyxHQUFqQixVQUFrQixLQUFhO1FBQzNCLFFBQU8sS0FBSyxFQUFFO1lBQ1YsS0FBSyxVQUFVO2dCQUNYLE9BQU8sU0FBUyxDQUFDO1lBRXJCLEtBQUssVUFBVTtnQkFDWCxPQUFPLFlBQVksQ0FBQztZQUV4QixLQUFLLFlBQVk7Z0JBQ2IsT0FBTyxZQUFZLENBQUM7U0FDM0I7SUFDTCxDQUFDO0lBRU8sdUNBQVEsR0FBaEIsVUFBaUIsS0FBYTtRQUMxQixRQUFPLEtBQUssRUFBRTtZQUNWLEtBQUssVUFBVTtnQkFDWCxPQUFPLEVBQUUsQ0FBQztZQUVkLEtBQUssVUFBVTtnQkFDWCxPQUFPLHdLQUF3SyxDQUFDO1lBRXBMLEtBQUssWUFBWTtnQkFDYixPQUFPLG9KQUFvSixDQUFDO1NBQ25LO0lBQ0wsQ0FBQzs7Z0JBdEMrQixVQUFVO2dCQUNaLFNBQVM7O0lBckI5QjtRQUFSLEtBQUssRUFBRTs7O3FEQUVQO0lBR1E7UUFBUixLQUFLLEVBQUU7Ozt5REFHUDtJQUVRO1FBQVIsS0FBSyxFQUFFOzs7b0RBRVA7SUFHUTtRQUFSLEtBQUssRUFBRTs7O3dEQUdQO0lBcEJRLG9CQUFvQjtRQUhoQyxTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsY0FBYztTQUMzQixDQUFDO3lDQXVCa0MsVUFBVTtZQUNaLFNBQVM7T0F2QjlCLG9CQUFvQixDQTZEaEM7SUFBRCwyQkFBQztDQUFBLEFBN0RELElBNkRDO1NBN0RZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIEVsZW1lbnRSZWYsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ3NwbGl0LWd1dHRlcidcclxufSlcclxuZXhwb3J0IGNsYXNzIFNwbGl0R3V0dGVyRGlyZWN0aXZlIHtcclxuXHJcbiAgICBASW5wdXQoKSBzZXQgb3JkZXIodjogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdHlsZSgnb3JkZXInLCB2KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9kaXJlY3Rpb246IHN0cmluZztcclxuICAgIEBJbnB1dCgpIHNldCBkaXJlY3Rpb24odjogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fZGlyZWN0aW9uID0gdjtcclxuICAgICAgICB0aGlzLnJlZnJlc2hTdHlsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIHNldCBzaXplKHYpIHtcclxuICAgICAgICB0aGlzLnNldFN0eWxlKCdmbGV4LWJhc2lzJywgdiArICdweCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSBzZXQgZGlzYWJsZWQodjogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuX2Rpc2FibGVkID0gdjtcclxuICAgICAgICB0aGlzLnJlZnJlc2hTdHlsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge31cclxuXHJcbiAgICBwcml2YXRlIHJlZnJlc2hTdHlsZSgpIHtcclxuICAgICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuX2Rpc2FibGVkID09PSB0cnVlID8gJ2Rpc2FibGVkJyA6IHRoaXMuX2RpcmVjdGlvbjtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRTdHlsZSgnY3Vyc29yJywgdGhpcy5nZXRDdXJzb3Ioc3RhdGUpKTtcclxuICAgICAgICB0aGlzLnNldFN0eWxlKCdiYWNrZ3JvdW5kLWltYWdlJywgYHVybChcIiR7IHRoaXMuZ2V0SW1hZ2Uoc3RhdGUpIH1cIilgKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFN0eWxlKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwga2V5LCB2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRDdXJzb3Ioc3RhdGU6IHN0cmluZykge1xyXG4gICAgICAgIHN3aXRjaChzdGF0ZSkge1xyXG4gICAgICAgICAgICBjYXNlICdkaXNhYmxlZCc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2RlZmF1bHQnO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAndmVydGljYWwnOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdyb3ctcmVzaXplJztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ2hvcml6b250YWwnOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdjb2wtcmVzaXplJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRJbWFnZShzdGF0ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3dpdGNoKHN0YXRlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2Rpc2FibGVkJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiAnJztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ3ZlcnRpY2FsJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiAnZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFCNEFBQUFGQ0FNQUFBQmwvNnpJQUFBQUJsQk1WRVVBQUFETXpNeklUOEF5QUFBQUFYUlNUbE1BUU9iWVpnQUFBQlJKUkVGVWVBRmpZR1Jrd0lNSlNlTUhsQmtPQUJQN0FFR3pTdVBLQUFBQUFFbEZUa1N1UW1DQyc7XHJcblxyXG4gICAgICAgICAgICBjYXNlICdob3Jpem9udGFsJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiAnZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFBVUFBQUFlQ0FZQUFBRGtmdFM5QUFBQUlrbEVRVlFvVTJNNGMrYk1meEFHQWdZWW13R3JJSWlEanJFTGpwbzVhaVplTXdGK3lObk9zNUtTdmdBQUFBQkpSVTVFcmtKZ2dnPT0nO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=