var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TooltipController } from './tooltip.cotroller';
import { TooltipBox } from './tooltip-box.component';
import { Tooltip } from './tooltip.directive';
var TooltipsModule = /** @class */ (function () {
    function TooltipsModule() {
    }
    TooltipsModule_1 = TooltipsModule;
    TooltipsModule.forRoot = function () {
        return {
            ngModule: TooltipsModule_1,
            providers: [TooltipController]
        };
    };
    var TooltipsModule_1;
    TooltipsModule = TooltipsModule_1 = __decorate([
        NgModule({
            entryComponents: [TooltipBox],
            declarations: [Tooltip, TooltipBox],
            imports: [IonicModule],
            exports: [Tooltip]
        })
    ], TooltipsModule);
    return TooltipsModule;
}());
export { TooltipsModule };
//# sourceMappingURL=tooltips.module.js.map