/*
 * This file is part of the Fxp package.
 *
 * (c) François Pluchino <francois.pluchino@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import BasePlugin from './plugin';

let locales = {};

/**
 * Base class for i18n plugin.
 */
export default class BaseI18nPlugin extends BasePlugin
{
    /**
     * Get the language configuration.
     *
     * @param {string} [locale] The ISO code of language
     *
     * @returns {object} The language configuration
     */
    locale(locale) {
        let localeKeys;

        if (undefined === locale) {
            locale = this.options.locale;
        }

        if (undefined === locales[locale]) {
            localeKeys = Object.keys(locales);
            locale = localeKeys.length > 0 ? localeKeys[0] : 'en';
        }

        return locales[locale];
    }

    /**
     * Get the map of locales.
     * The map consists of the key containing the ISO code of the language
     * and an object containing the translations for each ISO code.
     *
     * Example:
     * {
     *     'en': {
     *         'foo.bar': 'My message'
     *     }
     * }
     *
     * @param {object} translations The translations map defined in a language ISO code key
     */
    static set locales(translations) {
        let keys, i, val;

        if (typeof translations === 'object') {
            keys = Object.keys(translations);

            for (i = 0; i < keys.length; ++i) {
                val = translations[keys[i]];

                if (typeof val === 'object') {
                    locales[keys[i]] = val;
                }
            }
        }
    }

    /**
     * Get the map of locales.
     * The map consists of the key containing the ISO code of the language
     * and an object containing the translations for each ISO code.
     *
     * @returns {object}
     */
    static get locales() {
        return locales;
    }
}
