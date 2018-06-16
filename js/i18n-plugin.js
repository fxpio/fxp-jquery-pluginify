/*
 * This file is part of the Fxp package.
 *
 * (c) François Pluchino <francois.pluchino@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import BasePlugin from './plugin';

const LOCALES = {};

let globalLocale;

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
        if (!locale) {
            locale = this.options.locale;

            if (!locale) {
                if (undefined === globalLocale) {
                    let lang = document.querySelector('html').lang;
                    globalLocale = lang ? lang : null;
                }

                locale = globalLocale;
            }
        }

        if (typeof locale === 'string') {
            locale = locale.toLowerCase().replace('-', '_');

            if (locale.indexOf('_') >= 0 && undefined === this.constructor.locales[locale]) {
                locale = locale.substr(0, locale.indexOf('_'));
            }
        }

        if (undefined === this.constructor.locales[locale]) {
            let localeKeys = Object.keys(this.constructor.locales);
            locale = localeKeys.length > 0 ? localeKeys[0] : 'en';
        }

        return this.constructor.locales[locale];
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

        // Force the initialisation of i18n options
        this.defaultOptions = {};

        if (typeof translations === 'object') {
            keys = Object.keys(translations);

            for (i = 0; i < keys.length; ++i) {
                val = translations[keys[i]];

                if (typeof val === 'object') {
                    if (undefined === LOCALES[this.name]) {
                        LOCALES[this.name] = {};
                    }

                    LOCALES[this.name][keys[i]] = val;
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
        if (undefined === LOCALES[this.name]) {
            LOCALES[this.name] = {};
        }

        return LOCALES[this.name];
    }

    /**
     * @inheritDoc
     */
    static get defaultOptions() {
        return super.defaultOptions;
    }

    /**
     * @inheritDoc
     */
    static set defaultOptions(options) {
        if (undefined === options.locale) {
            options.locale = null;
        }

        super.defaultOptions = options;
    }
}
