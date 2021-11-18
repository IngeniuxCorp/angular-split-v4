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
let AngularSplitModule = class AngularSplitModule {
};
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
export { AngularSplitModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhclNwbGl0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc3BsaXQvIiwic291cmNlcyI6WyJhbmd1bGFyU3BsaXQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFrQmhELElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQWtCO0NBQUcsQ0FBQTtBQUFyQixrQkFBa0I7SUFoQjlCLFFBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRTtZQUNMLFlBQVk7U0FDZjtRQUNELFlBQVksRUFBRTtZQUNWLGNBQWM7WUFDZCxrQkFBa0I7WUFDbEIsb0JBQW9CO1NBQ3ZCO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsY0FBYztZQUNkLGtCQUFrQjtZQUNsQixvQkFBb0I7U0FDdkI7UUFDRCxTQUFTLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxhQUFhLENBQUM7S0FDaEQsQ0FBQztHQUNXLGtCQUFrQixDQUFHO1NBQXJCLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBTcGxpdENvbXBvbmVudCB9IGZyb20gJy4vc3BsaXQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU3BsaXRBcmVhRGlyZWN0aXZlIH0gZnJvbSAnLi9zcGxpdEFyZWEuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgU3BsaXRHdXR0ZXJEaXJlY3RpdmUgfSBmcm9tICcuL3NwbGl0R3V0dGVyLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IFNwbGl0U3RhdGVTZXJ2aWNlIH0gZnJvbSAnLi9zcGxpdFN0YXRlU2VydmljZSc7XHJcbmltcG9ydCB7IENvb2tpZVNlcnZpY2UgfSBmcm9tICcuL2Nvb2tpZVNlcnZpY2UnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBDb21tb25Nb2R1bGVcclxuICAgIF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICBTcGxpdENvbXBvbmVudCxcclxuICAgICAgICBTcGxpdEFyZWFEaXJlY3RpdmUsXHJcbiAgICAgICAgU3BsaXRHdXR0ZXJEaXJlY3RpdmVcclxuICAgIF0sXHJcbiAgICBleHBvcnRzOiBbXHJcbiAgICAgICAgU3BsaXRDb21wb25lbnQsXHJcbiAgICAgICAgU3BsaXRBcmVhRGlyZWN0aXZlLFxyXG4gICAgICAgIFNwbGl0R3V0dGVyRGlyZWN0aXZlXHJcbiAgICBdLCBcclxuICAgIHByb3ZpZGVyczogW1NwbGl0U3RhdGVTZXJ2aWNlLCBDb29raWVTZXJ2aWNlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQW5ndWxhclNwbGl0TW9kdWxlIHt9XHJcbiJdfQ==