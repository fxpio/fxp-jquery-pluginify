/*
 * This file is part of the Fxp package.
 *
 * (c) François Pluchino <francois.pluchino@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import BasePlugin from './plugin';

const LANGUAGES = {};

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
        if (undefined === locale) {
            locale = this.options.locale;
        }

        if (undefined === LANGUAGES[locale]) {
            locale = 'en';
        }

        return LANGUAGES[locale];
    }

    /**
     * Add the language configuration.
     *
     * @param {string} locale       The locale code
     * @param {object} translations The translation messages
     */
    static addLocale(locale, translations) {
        LANGUAGES[locale] = translations;
    }
}
