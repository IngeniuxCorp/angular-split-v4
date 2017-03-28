"use strict";
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
    return SplitStateService;
}());
SplitStateService.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
SplitStateService.ctorParameters = function () { return [
    { type: cookieService_1.CookieService, },
]; };
exports.SplitStateService = SplitStateService;
