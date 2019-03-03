import { AfterViewInit, ApplicationRef, ComponentFactoryResolver, ElementRef, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { Platform } from '@ionic/angular';
import { TooltipController } from './tooltip.cotroller';
export declare class Tooltip implements OnInit, AfterViewInit, OnDestroy {
    private el;
    private appRef;
    private platform;
    private _componentFactoryResolver;
    private tooltipCtrl;
    tooltip: string;
    positionV: string;
    positionH: string;
    event: 'touchstart' | 'click' | 'hover';
    mobileEvent: 'touchstart' | 'click';
    desktopEvent: 'touchstart' | 'click' | 'hover';
    topOffset: number;
    leftOffset: number;
    hideOthers: boolean;
    navTooltip: boolean;
    arrow: boolean;
    duration: number;
    active: boolean;
    view: ViewContainerRef;
    private _arrow;
    private _navTooltip;
    private tooltipElement;
    private tooltipTimeout;
    private _canShow;
    private _active;
    private _viewContainer;
    constructor(el: ElementRef, appRef: ApplicationRef, platform: Platform, _componentFactoryResolver: ComponentFactoryResolver, tooltipCtrl: TooltipController);
    ngAfterViewInit(): void;
    ngOnInit(): void;
    /**
     * Set the canShow property
     * Ensure that tooltip is shown only if the tooltip string is not falsey
     */
    /**
    * @return {boolean} TRUE if the tooltip can be shown
    */
    canShow: boolean;
    /**
     * Handles the click/press event and shows a tooltip.
     * If a tooltip already exists, it will just reset it's timer.
     */
    trigger(): void;
    /**
     * Creates a new tooltip component and adjusts it's properties to show properly.
     */
    showTooltip(): void;
    onClick(): void;
    onPress(): void;
    onMouseEnter(): void;
    onMouseLeave(): void;
    private _createTooltipComponent;
    private _getTooltipPosition;
    removeTooltip(): void;
    private _resetTimer;
    ngOnDestroy(): void;
}
