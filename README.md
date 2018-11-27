# Ionic Tooltips
[![npm](https://img.shields.io/npm/l/ionic-tooltips.svg)](https://www.npmjs.com/package/ionic-tooltips/)
[![npm](https://img.shields.io/npm/dt/ionic-tooltips.svg)](https://www.npmjs.com/package/ionic-tooltips)
[![npm](https://img.shields.io/npm/dm/ionic-tooltips.svg)](https://www.npmjs.com/package/ionic-tooltips)

Tooltips module for apps built with Ionic Framework.

## Compatibility

This module is designed to work with `@ionic/angular@^4.0.0-beta.15`.

## Demo

Below is a gif showing the module in action, you can also clone the example project here: https://github.com/zyra/ionic-tooltips-example

![Ionic Tooltips Demo](https://github.com/zyra/ionic-tooltips-example/blob/master/ionic-tooltips.gif?raw=true)

## Examples

(NOTE: you may need to provide a `view` attribute value in the following examples to have it work with Ionic 4 beta 0.15 -- see Usage)

The module can be used to display tooltips for any element in your app. It also provides a special treatment for buttons in the header navigation (inspired by Google's apps).

Here's a quick example to show a tooltip below a button:

```html
<!-- positionV specifies where the tooltip should be displayed vertically, can be either top or bottom -->
<!-- arrow tells the tooltip directive to show an arrow above the tooltip box -->
<ion-button tooltip="I'm a tooltip below a button" positionV="bottom" arrow>
  Press me to see a tooltip
</ion-button>
```

And here's another example to show a tooltip below a nav button:

```html
<ion-header>
  <ion-navbar>
    <ion-title>Page title</ion-title>
    <ion-buttons slot="end">
      <!-- navTooltip tells the tooltip directive that this is a nav button -->
      <ion-button tooltip="Call" navTooltip>
        <ion-icon name="call" slot="icon-only"></ion-icon>
      </ion-button>
    </ion-buttons>
  </ion-navbar>
</ion-header>
```

## Installation

1.  Make sure you have `@angular/animations` installed. If you don't have it, run the following command to install it:

```shell
npm i --save-exact @angular/animations@5
```

2.  Install this module by running the following command:

```shell
npm i ionic-tooltips
```

3.  Import `TooltipsModule` in your `@NgModule`. If you are using lazy module loading, then you need to import it in the modules where it's used.

```ts
import { TooltipsModule } from 'ionic-tooltips';

@NgModule({
   ...
   imports: [
      ...
      TooltipsModule.forRoot()
   ]
})
export class MyModule { ... }
```

4.  Import `BrowserAnimationsModule` in your app's main `@NgModule`.

```ts
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  ...
  imports: [
    ...
    BrowserAnimationsModule
  ]
})
```

Now you're ready to use this module. See information below for usage.

## Usage

The `tooltip` directive takes a string, which will be used as the tooltip text. When using the `tooltip` directive, you can also use the following inputs:

#### `view`

(ViewContainerRef) As of Ionic 4 beta 0.15, Ionic's angular components don't expose `_viewContainerRef` like other ComponentRefs, so you may see a warning `No view container to create tooltip in` if you don't provide a view yourself. You will need to provide the `_viewContainerRef` you want to contain the tooltips. This will commonly be the `ViewContainerRef` for the `ion-app` component (so the tooltip has access to the entire viewport), but you can choose something nested deeper in the `ion-app` component if you wish.

The easiest way to get the `ion-app` `_viewContainerRef` is to have the following ViewChild declaration in your `app.component.ts`:

```ts
import { ViewChild, ViewContainerRef } from '@angular/core';

...

@ViewChild('myApp', { read: ViewContainerRef }) viewContainerApp: ViewContainerRef;

```

And in your `app.component.html`:

```html
<ion-app #myApp>
  <ion-router-outlet></ion-router-outlet>
</ion-app>
```

#### `navTooltip`

(boolean) add this attribute or set it's value to true to specify that the tooltip belongs to a nav button. Defaults to `false`.

#### `positionV`

(string) specifies the vertical position of the tooltip. Can be either `'top'` or `'bottom'`.

#### `positionH`

(string) specifies the horizontal position of the tooltip. Can be either `'right'` or `'left'`.

#### `event`

(string) the event to show the tooltip on. Can be either `'hover'`, `'click'` or `'press'`. Defaults to `'hover'` on desktop, `'press'` on mobile.  
Note: `'hover'` only works on desktop.

#### `desktopEvent`

(string) the event to show the tooltip on when displayed on a desktop . Can be either `'hover'`, `'click'` or `'press'`. Defaults to `'hover'`.  
Note: This only works when the `event` attribute is omitted.

#### `mobileEvent`

(string) the event to show the tooltip on when displayed on a mobile. Can be either `'click'` or `'press'`. Defaults to `'press'`.  
Note: This only works when the `event` attribute is omitted.

#### `arrow`

(boolean) add this attribute or set it's value to true to show an arrow attached to the tooltip. Defaults to `false`.

#### `duration`

(number) number of milliseconds to show the tooltip for. Defaults to `3000`.

#### `active`

(boolean) add this attribute or set it's value to true to display the tooltip. Defaults to `false`.

#### `topOffset`

(number) add this attribute to offset the vertical position of the tooltip. Defaults to `0`.

#### `leftOffset`

(number) add this attribute to offset the horizontal position of the tooltip. Defaults to `0`.

#### `hideOthers`

(boolean) add this attribute to set weather to hide other visible tooltips. Defaults to `false`.
 
<br><br>

## Versioning

We use [SemVer](https://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/zyra/ionic-tooltips/tags).

## Contribution

- **Having an issue**? or looking for support? [Open an issue](https://github.com/zyra/ionic-tooltips/issues/new) and we will get you the help you need.
- Got a **new feature or a bug fix**? Fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details  

## Support this project

If you find this project useful, please star the repository to let people know that it's reliable. Also, share it with friends and colleagues that might find this useful as well. Thank you :smile:
