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
var SplitAreaState = /** @class */ (function () {
    function SplitAreaState() {
    }
    return SplitAreaState;
}());
export { SplitAreaState };
var SplitStateService = /** @class */ (function () {
    function SplitStateService(cookieService) {
        this.cookieService = cookieService;
        this.splitName = "AngularSplit";
    }
    SplitStateService.prototype.saveState = function (visibleAreaStates) {
        this.cookieService.set(this.splitName, JSON.stringify(visibleAreaStates));
    };
    SplitStateService.prototype.loadState = function () {
        var cookieVal = this.cookieService.get(this.splitName);
        return cookieVal ? JSON.parse(cookieVal) : null;
    };
    SplitStateService.ctorParameters = function () { return [
        { type: CookieService }
    ]; };
    SplitStateService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [CookieService])
    ], SplitStateService);
    return SplitStateService;
}());
export { SplitStateService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXRTdGF0ZVNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNwbGl0LyIsInNvdXJjZXMiOlsic3BsaXRTdGF0ZVNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFaEQ7SUFBQTtJQUdBLENBQUM7SUFBRCxxQkFBQztBQUFELENBQUMsQUFIRCxJQUdDOztBQUdEO0lBSUMsMkJBQW9CLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBRmhELGNBQVMsR0FBRyxjQUFjLENBQUM7SUFHM0IsQ0FBQztJQUVELHFDQUFTLEdBQVQsVUFBVSxpQkFBbUM7UUFDNUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRUQscUNBQVMsR0FBVDtRQUNDLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN6RCxPQUFPLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ2pELENBQUM7O2dCQVZrQyxhQUFhOztJQUpwQyxpQkFBaUI7UUFEN0IsVUFBVSxFQUFFO3lDQUt1QixhQUFhO09BSnBDLGlCQUFpQixDQWU3QjtJQUFELHdCQUFDO0NBQUEsQUFmRCxJQWVDO1NBZlksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb29raWVTZXJ2aWNlIH0gZnJvbSAnLi9jb29raWVTZXJ2aWNlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBTcGxpdEFyZWFTdGF0ZSB7XHJcblx0c2l6ZTogbnVtYmVyO1xyXG5cdHZpc2libGU6IGJvb2xlYW47XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFNwbGl0U3RhdGVTZXJ2aWNlIHtcclxuXHJcblx0c3BsaXROYW1lID0gXCJBbmd1bGFyU3BsaXRcIjtcclxuXHJcblx0Y29uc3RydWN0b3IocHJpdmF0ZSBjb29raWVTZXJ2aWNlOiBDb29raWVTZXJ2aWNlKSB7XHJcblx0fVxyXG5cclxuXHRzYXZlU3RhdGUodmlzaWJsZUFyZWFTdGF0ZXM6IFNwbGl0QXJlYVN0YXRlW10pIHtcclxuXHRcdHRoaXMuY29va2llU2VydmljZS5zZXQodGhpcy5zcGxpdE5hbWUsIEpTT04uc3RyaW5naWZ5KHZpc2libGVBcmVhU3RhdGVzKSk7XHJcblx0fVxyXG5cclxuXHRsb2FkU3RhdGUoKTogU3BsaXRBcmVhU3RhdGVbXSB7XHJcblx0XHRjb25zdCBjb29raWVWYWwgPSB0aGlzLmNvb2tpZVNlcnZpY2UuZ2V0KHRoaXMuc3BsaXROYW1lKTtcclxuXHRcdHJldHVybiBjb29raWVWYWwgPyBKU09OLnBhcnNlKGNvb2tpZVZhbCkgOiBudWxsO1xyXG5cdH1cclxufSJdfQ==