var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { CookieService } from './cookieService';
export class SplitAreaState {
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
export { SplitStateService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXRTdGF0ZVNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNwbGl0LyIsInNvdXJjZXMiOlsic3BsaXRTdGF0ZVNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFaEQsTUFBTSxPQUFPLGNBQWM7Q0FHMUI7QUFHRCxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFpQjtJQUk3QixZQUFvQixhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUZoRCxjQUFTLEdBQUcsY0FBYyxDQUFDO0lBRzNCLENBQUM7SUFFRCxTQUFTLENBQUMsaUJBQW1DO1FBQzVDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUVELFNBQVM7UUFDUixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDekQsT0FBTyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNqRCxDQUFDO0NBQ0QsQ0FBQTs7WUFYbUMsYUFBYTs7QUFKcEMsaUJBQWlCO0lBRDdCLFVBQVUsRUFBRTtxQ0FLdUIsYUFBYTtHQUpwQyxpQkFBaUIsQ0FlN0I7U0FmWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvb2tpZVNlcnZpY2UgfSBmcm9tICcuL2Nvb2tpZVNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNwbGl0QXJlYVN0YXRlIHtcclxuXHRzaXplOiBudW1iZXI7XHJcblx0dmlzaWJsZTogYm9vbGVhbjtcclxufVxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgU3BsaXRTdGF0ZVNlcnZpY2Uge1xyXG5cclxuXHRzcGxpdE5hbWUgPSBcIkFuZ3VsYXJTcGxpdFwiO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIGNvb2tpZVNlcnZpY2U6IENvb2tpZVNlcnZpY2UpIHtcclxuXHR9XHJcblxyXG5cdHNhdmVTdGF0ZSh2aXNpYmxlQXJlYVN0YXRlczogU3BsaXRBcmVhU3RhdGVbXSkge1xyXG5cdFx0dGhpcy5jb29raWVTZXJ2aWNlLnNldCh0aGlzLnNwbGl0TmFtZSwgSlNPTi5zdHJpbmdpZnkodmlzaWJsZUFyZWFTdGF0ZXMpKTtcclxuXHR9XHJcblxyXG5cdGxvYWRTdGF0ZSgpOiBTcGxpdEFyZWFTdGF0ZVtdIHtcclxuXHRcdGNvbnN0IGNvb2tpZVZhbCA9IHRoaXMuY29va2llU2VydmljZS5nZXQodGhpcy5zcGxpdE5hbWUpO1xyXG5cdFx0cmV0dXJuIGNvb2tpZVZhbCA/IEpTT04ucGFyc2UoY29va2llVmFsKSA6IG51bGw7XHJcblx0fVxyXG59Il19