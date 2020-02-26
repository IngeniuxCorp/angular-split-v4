/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
 /* tslint:disable */


import * as import0 from '@angular/core';
import * as import1 from '../../src/angularSplit.module';
import * as import2 from '@angular/common';
import * as import3 from '../../src/cookieService';
import * as import4 from '../../src/splitStateService';
class AngularSplitModuleInjector extends import0.ɵNgModuleInjector<import1.AngularSplitModule> {
  _CommonModule_0:import2.CommonModule;
  _AngularSplitModule_1:import1.AngularSplitModule;
  __NgLocalization_2:import2.NgLocaleLocalization;
  __CookieService_3:import3.CookieService;
  __SplitStateService_4:import4.SplitStateService;
  constructor(parent:import0.Injector) {
    super(parent,([] as any[]),([] as any[]));
  }
  get _NgLocalization_2():import2.NgLocaleLocalization {
    if ((this.__NgLocalization_2 == null)) { (this.__NgLocalization_2 = new import2.NgLocaleLocalization(this.parent.get(import0.LOCALE_ID))); }
    return this.__NgLocalization_2;
  }
  get _CookieService_3():import3.CookieService {
    if ((this.__CookieService_3 == null)) { (this.__CookieService_3 = new import3.CookieService()); }
    return this.__CookieService_3;
  }
  get _SplitStateService_4():import4.SplitStateService {
    if ((this.__SplitStateService_4 == null)) { (this.__SplitStateService_4 = new import4.SplitStateService(this._CookieService_3)); }
    return this.__SplitStateService_4;
  }
  createInternal():import1.AngularSplitModule {
    this._CommonModule_0 = new import2.CommonModule();
    this._AngularSplitModule_1 = new import1.AngularSplitModule();
    return this._AngularSplitModule_1;
  }
  getInternal(token:any,notFoundResult:any):any {
    if ((token === import2.CommonModule)) { return this._CommonModule_0; }
    if ((token === import1.AngularSplitModule)) { return this._AngularSplitModule_1; }
    if ((token === import2.NgLocalization)) { return this._NgLocalization_2; }
    if ((token === import3.CookieService)) { return this._CookieService_3; }
    if ((token === import4.SplitStateService)) { return this._SplitStateService_4; }
    return notFoundResult;
  }
  destroyInternal():void {
  }
}
export const AngularSplitModuleNgFactory:import0.NgModuleFactory<import1.AngularSplitModule> = new import0.NgModuleFactory<any>(AngularSplitModuleInjector,import1.AngularSplitModule);
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiYzovQ29kZS9hbmd1bGFyLXNwbGl0LXY0L3NyYy9hbmd1bGFyU3BsaXQubW9kdWxlLm5nZmFjdG9yeS50cyIsInZlcnNpb24iOjMsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5nOi8vL2M6L0NvZGUvYW5ndWxhci1zcGxpdC12NC9zcmMvYW5ndWxhclNwbGl0Lm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIgIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
