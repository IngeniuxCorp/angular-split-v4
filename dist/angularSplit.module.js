"use strict";
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
    AngularSplitModule.decorators = [
        { type: core_1.NgModule, args: [{
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
                },] },
    ];
    /** @nocollapse */
    AngularSplitModule.ctorParameters = function () { return []; };
    return AngularSplitModule;
}());
exports.AngularSplitModule = AngularSplitModule;
