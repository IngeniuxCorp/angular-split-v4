var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplitComponent } from './split.component';
import { SplitAreaDirective } from './splitArea.directive';
import { SplitGutterDirective } from './splitGutter.directive';
import { SplitStateService } from './splitStateService';
import { CookieService } from './cookieService';
var AngularSplitModule = /** @class */ (function () {
    function AngularSplitModule() {
    }
    AngularSplitModule = __decorate([
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
    return AngularSplitModule;
}());
export { AngularSplitModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhclNwbGl0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc3BsaXQvIiwic291cmNlcyI6WyJhbmd1bGFyU3BsaXQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFrQmhEO0lBQUE7SUFBaUMsQ0FBQztJQUFyQixrQkFBa0I7UUFoQjlCLFFBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRTtnQkFDTCxZQUFZO2FBQ2Y7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsY0FBYztnQkFDZCxrQkFBa0I7Z0JBQ2xCLG9CQUFvQjthQUN2QjtZQUNELE9BQU8sRUFBRTtnQkFDTCxjQUFjO2dCQUNkLGtCQUFrQjtnQkFDbEIsb0JBQW9CO2FBQ3ZCO1lBQ0QsU0FBUyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsYUFBYSxDQUFDO1NBQ2hELENBQUM7T0FDVyxrQkFBa0IsQ0FBRztJQUFELHlCQUFDO0NBQUEsQUFBbEMsSUFBa0M7U0FBckIsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IFNwbGl0Q29tcG9uZW50IH0gZnJvbSAnLi9zcGxpdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTcGxpdEFyZWFEaXJlY3RpdmUgfSBmcm9tICcuL3NwbGl0QXJlYS5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBTcGxpdEd1dHRlckRpcmVjdGl2ZSB9IGZyb20gJy4vc3BsaXRHdXR0ZXIuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgU3BsaXRTdGF0ZVNlcnZpY2UgfSBmcm9tICcuL3NwbGl0U3RhdGVTZXJ2aWNlJztcclxuaW1wb3J0IHsgQ29va2llU2VydmljZSB9IGZyb20gJy4vY29va2llU2VydmljZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW1xyXG4gICAgICAgIENvbW1vbk1vZHVsZVxyXG4gICAgXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIFNwbGl0Q29tcG9uZW50LFxyXG4gICAgICAgIFNwbGl0QXJlYURpcmVjdGl2ZSxcclxuICAgICAgICBTcGxpdEd1dHRlckRpcmVjdGl2ZVxyXG4gICAgXSxcclxuICAgIGV4cG9ydHM6IFtcclxuICAgICAgICBTcGxpdENvbXBvbmVudCxcclxuICAgICAgICBTcGxpdEFyZWFEaXJlY3RpdmUsXHJcbiAgICAgICAgU3BsaXRHdXR0ZXJEaXJlY3RpdmVcclxuICAgIF0sIFxyXG4gICAgcHJvdmlkZXJzOiBbU3BsaXRTdGF0ZVNlcnZpY2UsIENvb2tpZVNlcnZpY2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBbmd1bGFyU3BsaXRNb2R1bGUge31cclxuIl19