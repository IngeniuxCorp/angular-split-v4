"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var split_component_1 = require("./split.component");
var splitArea_directive_1 = require("./splitArea.directive");
var splitGutter_directive_1 = require("./splitGutter.directive");
var splitStateService_1 = require("./splitStateService");
var cookieService_1 = require("./cookieService");
var AngularSplitModule = (function () {
    function AngularSplitModule() {
    }
    return AngularSplitModule;
}());
AngularSplitModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule
        ],
        declarations: [
            split_component_1.SplitComponent,
            splitArea_directive_1.SplitAreaDirective,
            splitGutter_directive_1.SplitGutterDirective
        ],
        exports: [
            split_component_1.SplitComponent,
            splitArea_directive_1.SplitAreaDirective,
            splitGutter_directive_1.SplitGutterDirective
        ],
        providers: [splitStateService_1.SplitStateService, cookieService_1.CookieService]
    })
], AngularSplitModule);
exports.AngularSplitModule = AngularSplitModule;
//# sourceMappingURL=C:/dev/angular-split-igx_v4/angularSplit.module.js.map