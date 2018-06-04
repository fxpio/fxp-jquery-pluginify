/*
 * This file is part of the Fxp package.
 *
 * (c) François Pluchino <francois.pluchino@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import $ from 'jquery';

/**
 * Define the class as Jquery plugin.
 *
 * @param {String}      pluginName  The name of jquery plugin defined in $.fn
 * @param {String}      dataName    The key name of jquery data
 * @param {function}    ClassName   The class name
 * @param {boolean}     [shorthand] Check if the shorthand of jquery plugin must be added
 * @param {String|null} dataApiAttr The DOM data attribute selector name to init the jquery plugin with Data API, NULL to disable
 */
export default function (pluginName, dataName, ClassName, shorthand = false, dataApiAttr = null) {
    let old = $.fn[pluginName];

    $.fn[pluginName] = function(options = {}, ...args) {
        return this.each((i, element) => {
            let $this = $(element),
                data = $this.data(dataName);

            if (!data && options === 'destroy') {
                return;
            }

            if (typeof options === 'object') {
                if(!data) {
                    $this.data(dataName, new ClassName(element, options));
                }

            } else if (data && data[options]) {
                return data[options].apply(data, args);
            }
        });
    };

    // Shorthand
    if(shorthand) {
        $[pluginName] = (options) => $({})[pluginName](options);
    }

    // No conflict
    $.fn[pluginName].noConflict = () => $.fn[pluginName] = old;

    // Data API
    if (null !== dataApiAttr) {
        $(window).on('load', function () {
            $(dataApiAttr).each(function () {
                let $this = $(this);
                $.fn[pluginName].call($this, $this.data());
            });
        });
    }
}
