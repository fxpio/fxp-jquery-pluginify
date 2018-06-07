/*
 * This file is part of the Fxp package.
 *
 * (c) François Pluchino <francois.pluchino@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import $ from 'jquery';

let defaultOptions = {};

/**
 * Base class for plugin.
 */
export default class BasePlugin
{
    /**
     * Constructor.
     *
     * @param {HTMLElement} element The DOM element
     * @param {object}      options The options
     */
    constructor(element, options = {}) {
        this.guid     = $.guid;
        this.options  = $.extend(true, {}, defaultOptions, options);
        this.$element = $(element);
    }

    /**
     * Destroy the instance.
     */
    destroy() {
        let self = this;

        Object.keys(self).forEach(function(key) {
            delete self[key];
        });
    }

    /**
     * Set the default options.
     * The new values are merged with the existing values.
     *
     * @param {object} options
     */
    static set defaultOptions(options) {
        defaultOptions = $.extend(true, defaultOptions, options);
    }

    /**
     * Get the default options.
     *
     * @return {object}
     */
    static get defaultOptions() {
        return defaultOptions;
    }
}
