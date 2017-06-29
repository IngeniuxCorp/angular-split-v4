"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var cookieService_1 = require("./cookieService");
var SplitAreaState = (function () {
    function SplitAreaState() {
    }
    return SplitAreaState;
}());
exports.SplitAreaState = SplitAreaState;
var SplitStateService = (function () {
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
    SplitStateService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [cookieService_1.CookieService])
    ], SplitStateService);
    return SplitStateService;
}());
exports.SplitStateService = SplitStateService;
