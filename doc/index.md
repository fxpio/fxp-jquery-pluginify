Getting Started
===============

Installation
------------

```
npm install @fxp/jquery-pluginify --save
```

Usage
-----

Create a ES2015 class and use jquery-pluginify:

```js
import pluginify from '@fxp/jquery-pluginify';

class FooBar {

    /**
     * Constructor.
     *
     * @param {HTMLElement} element The DOM element
     * @param {object}      options The options
     */
    constructor(element, options) {
        // ...
    }

    /**
     * The baz method.
     */
    baz(argument1, argument2) {
        // ...
    }

    //...
}

pluginify('fooBar', 'vendor.foobar', FooBar, true, 'data-foo-bar');
```

**Available arguments:**

- **pluginName** (String): The name of jquery plugin defined in $.fn
- **dataName** (String): The key name of jquery data
- **ClassName** (function): The class name
- **shorthand** (optional boolean): Check if the shorthand of jquery plugin must be added
- **dataApiAttr** (String|null): The DOM data attribute name to init the jquery plugin with Data API, NULL to disable

Example
-------

```html
<html>
    <body>
        <div data-foo-bar="true">
            <span>Example with Data API</span>
        </div>
    </body>
</html>
```

The Jquery plugin is automatically initiallised with the HTML Data API, and it can be accessible with the standard code of jquery plugins:

```js
$('[data-foo-bar="true"]').fooBar('baz', 'value1', 'value2');
```
