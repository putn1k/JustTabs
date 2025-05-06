# JustTabs v1.2.2

A simple and lightweight tab plugin

## Overview

+ __No dependencies.__ <br>
The library is written in pure JavaScript and requires no additional dependencies.

+ __Simplicity and functionality.__ <br>
Easily integrate and use the library to implement essential tab functionality.

+ __Accessibility.__ <br>
The plugin follows all accessibility best practices.

+ __CSS customization.__ <br>
Modify the appearance and layout effortlessly using CSS.

## Installation

1. Download the JS library __just-tabs.min.js__ and the stylesheet __just-tabs.min.css__  from the `dist` folder.<br>
Alternatively, install via NPM:

```
npm i justtabs
```

2. Include the files in your project:

```html
<link rel="stylesheet" href="just-tabs.min.css">
<script src="just-tabs.min.js"></script>
```

Or (for module bundlers): 

```javascript
import 'justtabs/dist/just-tabs.min.css';
import JustTabs from 'justtabs';
```

3. Add the following HTML structure:

```html
<div data-jtabs="tabs">
  <ul data-jtabs="nav">
    <li>
      <button type="button"
              data-jtabs="control">Tab 1</button>
    </li>
    <li>
      <button type="button"
              data-jtabs="control">Tab 2</button>
    </li>
    <li>
      <button type="button"
              data-jtabs="control">Tab 3</button>
    </li>
  </ul>
  <div>
    <div data-jtabs="panel">Content 1</div>
    <div data-jtabs="panel">Content 2</div>
    <div data-jtabs="panel">Content 3</div>
  </div>
</div>
```

> The `data-jtabs` attribute is essential for plugin functionality.

4. Initialize the library:

```javascript
new JustTabs( 'tabs' );
```

## Plugin Configuration

The JustTabs constructor accepts two arguments:

* __Required__: A name (string) for the tab instance.
* __Optional__: A configuration object.

### Features

1. Set an active tab on load by specifying `startTabIndex`:

```javascript
new JustTabs( 'tabs', {
	startTabIndex: 1
} );
```

2. Programmatically switch tabs using the `switchTo` method (pass the target tab index):

```javascript
const tabs = new JustTabs( 'tabs' );
tabs.switchTo( 2 );
```

3. Retrieve configuration via `getOptions()`:

```javascript
const tabs = new JustTabs( 'tabs' );
tabs.getOptions(); // Returns full config object
tabs.getOptions('el'); // Returns the root HTML element
```

4. Callback on initialization (`onInit`):

```javascript
new JustTabs( 'tabs', {
	onInit: ( tabs ) => {
		console.log( tabs );
	}
} );
```

5. Callback on tab switch ( `onSwitch`):

```javascript
new JustTabs( 'tabs', {
	onSwitch: ( tabs ) => {
		console.log( tabs );
	}
} );
```