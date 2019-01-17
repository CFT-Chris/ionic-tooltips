var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicModule } from '@ionic/angular';
import { Tooltip } from './tooltip.directive';
import { TooltipsModule } from './tooltips.module';
var TestPage = /** @class */ (function () {
    function TestPage(_viewport) {
        this._viewport = _viewport;
        this.active = false;
    }
    TestPage.prototype.getButtonNativeElement = function () {
        return this.button.nativeElement;
    };
    TestPage.prototype.getTooltip = function () {
        return this.tooltip;
    };
    TestPage.prototype.ngAfterViewInit = function () {
        this.tooltip.appRef.components.push({
            _component: this
        });
    };
    __decorate([
        ViewChild('btn'),
        __metadata("design:type", ElementRef)
    ], TestPage.prototype, "button", void 0);
    __decorate([
        ViewChild(Tooltip),
        __metadata("design:type", Tooltip)
    ], TestPage.prototype, "tooltip", void 0);
    TestPage = __decorate([
        Component({
            selector: 'tooltip-view',
            template: '<button #btn tooltip="Hello world" [duration]="1000" [active]="active">Click me</button>'
        }),
        __metadata("design:paramtypes", [ViewContainerRef])
    ], TestPage);
    return TestPage;
}());
describe('Tooltip', function () {
    var de, comp, fixture, tooltip, getTooltipBox;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [TestPage],
            imports: [
                IonicModule.forRoot(),
                BrowserAnimationsModule,
                TooltipsModule
            ]
        }).compileComponents();
    }));
    beforeEach(function () {
        console.log(!!fixture, !!comp, !!de, !!tooltip);
        fixture = TestBed.createComponent(TestPage);
        fixture.autoDetectChanges(true);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
        tooltip = comp.getTooltip();
        getTooltipBox = function () { return tooltip.tooltipElement.instance; };
    });
    it('container page should exist', function () {
        expect(comp).toBeDefined();
        expect(comp instanceof TestPage).toBeTruthy();
    });
    it('should display TooltipBox on click for 1s', function () {
        tooltip.onClick();
        fixture.detectChanges();
        expect(tooltip.tooltipElement).toBeDefined();
        setTimeout(function () {
            fixture.detectChanges();
            expect(tooltip.tooltipElement).toBeUndefined();
        }, 1000);
    });
    it('should display TooltipBox on press for 1s', function () {
        tooltip.event = 'press';
        tooltip.onPress();
        fixture.detectChanges();
        expect(tooltip.tooltipElement).toBeDefined();
        setTimeout(function () {
            fixture.detectChanges();
            expect(tooltip.tooltipElement).toBeUndefined();
        }, 1000);
    });
    it('should display TooltipBox when active', function () {
        tooltip.active = true;
        expect(tooltip.tooltipElement).toBeDefined();
        expect(tooltip.active).toBeTruthy();
    });
    it('should contain "Hello world"', function () {
        tooltip.active = true;
        fixture.detectChanges();
        expect(getTooltipBox().getNativeElement().innerText).toEqual('Hello world');
    });
});
//# sourceMappingURL=tooltip.spec.js.map