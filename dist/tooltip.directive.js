var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ApplicationRef, ComponentFactoryResolver, Directive, ElementRef, HostListener, Input, ViewContainerRef, } from '@angular/core';
import { Platform } from '@ionic/angular';
import { TooltipBox } from './tooltip-box.component';
import { TooltipController } from './tooltip.cotroller';
var Tooltip = /** @class */ (function () {
    function Tooltip(el, appRef, platform, _componentFactoryResolver, tooltipCtrl) {
        this.el = el;
        this.appRef = appRef;
        this.platform = platform;
        this._componentFactoryResolver = _componentFactoryResolver;
        this.tooltipCtrl = tooltipCtrl;
        this.mobileEvent = 'touchstart';
        this.desktopEvent = 'hover';
        this.duration = 3000;
        this._arrow = false;
        this._navTooltip = false;
        this._canShow = true;
        this._active = false;
    }
    Object.defineProperty(Tooltip.prototype, "navTooltip", {
        get: function () {
            return this._navTooltip;
        },
        set: function (val) {
            this._navTooltip = typeof val !== 'boolean' || val !== false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tooltip.prototype, "arrow", {
        get: function () {
            return this._arrow;
        },
        set: function (val) {
            this._arrow = typeof val !== 'boolean' || val !== false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tooltip.prototype, "active", {
        get: function () {
            return this._active;
        },
        set: function (val) {
            this._active = typeof val !== 'boolean' || val !== false;
            this._active ? this.canShow && this.showTooltip() : this.removeTooltip();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tooltip.prototype, "view", {
        get: function () {
            return (this._viewContainer);
        },
        set: function (val) {
            this._viewContainer = val;
        },
        enumerable: true,
        configurable: true
    });
    Tooltip.prototype.ngAfterViewInit = function () {
        // Show the tooltip immediately after initiating view if set to
        if (this._active) {
            this.trigger();
        }
    };
    Tooltip.prototype.ngOnInit = function () {
        // Set default event type by platform if event is not defined
        if (!this.event) {
            this.event = this.platform.is('mobile') ? this.mobileEvent : this.desktopEvent;
        }
    };
    Object.defineProperty(Tooltip.prototype, "canShow", {
        /**
         * @return {boolean} TRUE if the tooltip can be shown
         */
        get: function () {
            return this._canShow && this.tooltip !== '';
        },
        /**
         * Set the canShow property
         * Ensure that tooltip is shown only if the tooltip string is not falsey
         */
        set: function (show) {
            this._canShow = show;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Handles the click/press event and shows a tooltip.
     * If a tooltip already exists, it will just reset it's timer.
     */
    Tooltip.prototype.trigger = function () {
        if (!this.canShow) {
            return;
        }
        if (this.tooltipElement) {
            this._resetTimer();
        }
        else {
            this.showTooltip();
        }
    };
    /**
     * Creates a new tooltip component and adjusts it's properties to show properly.
     */
    Tooltip.prototype.showTooltip = function () {
        var _this = this;
        this._createTooltipComponent();
        var tooltipComponent = this.tooltipElement.instance;
        tooltipComponent.text = this.tooltip;
        tooltipComponent.init.then(function () {
            var tooltipPosition = _this._getTooltipPosition();
            tooltipComponent.posLeft = tooltipPosition.left;
            tooltipComponent.posTop = tooltipPosition.top;
            tooltipComponent.fadeState = 'visible';
            if (_this.arrow) {
                var arrowPosition = void 0;
                if (_this.positionV === 'top') {
                    arrowPosition = 'bottom';
                }
                else if (_this.positionV === 'bottom') {
                    arrowPosition = 'top';
                }
                else if (_this.positionH === 'left') {
                    arrowPosition = 'right';
                }
                else {
                    arrowPosition = 'left';
                }
                tooltipComponent.arrow = arrowPosition;
            }
            if (!_this._active) {
                _this.tooltipTimeout = setTimeout(_this.removeTooltip.bind(_this), _this.duration);
            }
        });
    };
    Tooltip.prototype.onClick = function () {
        if (this.event === 'click') {
            this.trigger();
        }
    };
    Tooltip.prototype.onPress = function () {
        if (this.event === 'touchstart') {
            this.trigger();
        }
    };
    Tooltip.prototype.onMouseEnter = function () {
        if (this.event === 'hover') {
            this.active = true;
        }
    };
    Tooltip.prototype.onMouseLeave = function () {
        if (this.event === 'hover') {
            this.active = false;
        }
    };
    Tooltip.prototype._createTooltipComponent = function () {
        var viewport = this._viewContainer || this.appRef.components[0]._component._viewport;
        var componentFactory = this._componentFactoryResolver.resolveComponentFactory(TooltipBox);
        if (viewport) {
            this.tooltipElement = viewport.createComponent(componentFactory);
            this.tooltipCtrl.addTooltip(this);
        }
        else
            console.warn('No view container to create tooltip in');
    };
    Tooltip.prototype._getTooltipPosition = function () {
        var tooltipNativeElement = this.tooltipElement.instance.getNativeElement(), el = this.el.nativeElement, rect = el.getBoundingClientRect();
        var positionLeft, positionTop, spacing = 10;
        if (this.navTooltip) {
            this.positionV = 'bottom';
            this.arrow = false;
            spacing = 20;
        }
        if (this.positionH === 'right') {
            positionLeft = rect.right + spacing;
        }
        else if (this.positionH === 'left') {
            positionLeft = rect.left - spacing - tooltipNativeElement.offsetWidth;
        }
        else if (this.navTooltip) {
            positionLeft = rect.left + el.offsetWidth / 2;
        }
        else {
            positionLeft = rect.left;
        }
        if (this.positionV === 'top') {
            positionTop = rect.top - spacing - tooltipNativeElement.offsetHeight;
        }
        else if (this.positionV === 'bottom') {
            positionTop = rect.bottom + spacing;
        }
        else {
            positionTop =
                rect.top + el.offsetHeight / 2 - tooltipNativeElement.offsetHeight / 2;
        }
        if (+this.topOffset) {
            positionTop += +this.topOffset;
        }
        if (+this.leftOffset) {
            positionLeft += +this.leftOffset;
        }
        if (positionLeft + tooltipNativeElement.offsetWidth + spacing >
            this.platform.width()) {
            positionLeft =
                this.platform.width() - tooltipNativeElement.offsetWidth - spacing;
        }
        else if (positionLeft + tooltipNativeElement.offsetWidth - spacing < 0) {
            positionLeft = spacing;
        }
        if (positionTop + tooltipNativeElement.offsetHeight + spacing > this.platform.height()) {
            positionTop = this.platform.height() - tooltipNativeElement.offsetHeight - spacing;
        }
        else if (positionTop + tooltipNativeElement.offsetHeight - spacing < 0) {
            positionTop = spacing;
        }
        return {
            left: positionLeft,
            top: positionTop,
        };
    };
    Tooltip.prototype.removeTooltip = function () {
        var _this = this;
        if (!this.tooltipElement) {
            this.tooltipElement = undefined;
            this.tooltipTimeout = undefined;
            return;
        }
        this.tooltipElement.instance.fadeState = 'invisible';
        this.canShow = false;
        // wait for animation to finish then clear everything out
        setTimeout(function () {
            if (_this.tooltipElement &&
                typeof _this.tooltipElement.destroy === 'function') {
                _this.tooltipElement.destroy();
            }
            _this.tooltipCtrl.removeTooltip(_this);
            _this.tooltipElement = _this.tooltipTimeout = undefined;
            _this.canShow = true;
        }, 300);
    };
    Tooltip.prototype._resetTimer = function () {
        var _this = this;
        clearTimeout(this.tooltipTimeout);
        this.tooltipTimeout = setTimeout(function () {
            _this.active = false;
        }, this.duration);
    };
    Tooltip.prototype.ngOnDestroy = function () {
        // if the timer hasn't expired or active is true when the component gets destroyed, the tooltip will remain in the DOM
        // this removes it
        this.removeTooltip();
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Tooltip.prototype, "tooltip", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Tooltip.prototype, "positionV", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Tooltip.prototype, "positionH", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Tooltip.prototype, "event", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Tooltip.prototype, "mobileEvent", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Tooltip.prototype, "desktopEvent", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], Tooltip.prototype, "topOffset", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], Tooltip.prototype, "leftOffset", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Tooltip.prototype, "hideOthers", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], Tooltip.prototype, "navTooltip", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], Tooltip.prototype, "arrow", null);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], Tooltip.prototype, "duration", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], Tooltip.prototype, "active", null);
    __decorate([
        Input(),
        __metadata("design:type", ViewContainerRef),
        __metadata("design:paramtypes", [ViewContainerRef])
    ], Tooltip.prototype, "view", null);
    __decorate([
        HostListener('click'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Tooltip.prototype, "onClick", null);
    __decorate([
        HostListener('touchstart'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Tooltip.prototype, "onPress", null);
    __decorate([
        HostListener('mouseenter'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Tooltip.prototype, "onMouseEnter", null);
    __decorate([
        HostListener('mouseleave'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Tooltip.prototype, "onMouseLeave", null);
    Tooltip = __decorate([
        Directive({
            selector: '[tooltip]',
        }),
        __metadata("design:paramtypes", [ElementRef,
            ApplicationRef,
            Platform,
            ComponentFactoryResolver,
            TooltipController])
    ], Tooltip);
    return Tooltip;
}());
export { Tooltip };
//# sourceMappingURL=tooltip.directive.js.map