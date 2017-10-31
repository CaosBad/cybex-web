import alt from "alt-instance";
import IntlActions from "actions/IntlActions";
import SettingsActions from "actions/SettingsActions";
import counterpart from "counterpart";
var locale_en = require("json-loader!assets/locales/locale-en");
var locale_cn = require("json-loader!assets/locales/locale-cn");
import ls from "common/localStorage";
let ss = new ls("__graphene__");

counterpart.registerTranslations("cn", locale_cn);
counterpart.registerTranslations("en", locale_en);
counterpart.setFallbackLocale("cn");

import {
    addLocaleData
} from "react-intl";

import en from "react-intl/locale-data/en";
import es from "react-intl/locale-data";
import fr from "react-intl/locale-data/fr";
import ko from "react-intl/locale-data/ko";
import zh from "react-intl/locale-data/zh";
import de from "react-intl/locale-data/de";
import tr from "react-intl/locale-data/tr";
import ru from "react-intl/locale-data/ru";

addLocaleData(en);
// addLocaleData(es);
// addLocaleData(fr);
// addLocaleData(ko);
addLocaleData(zh);
// addLocaleData(de);
// addLocaleData(tr);
// addLocaleData(ru);

class IntlStore {
    constructor() {
        // 初始化默认语言
        this.currentLocale = ss.has("settings_v3") ? ss.get("settings_v3").locale : "cn";

        this.locales = ["cn", "en"];
        this.localesObject = {
            en: locale_en,
            cn: locale_cn
        };

        this.bindListeners({
            onSwitchLocale: IntlActions.switchLocale,
            onGetLocale: IntlActions.getLocale,
            onClearSettings: SettingsActions.clearSettings
        });
    }

    hasLocale(locale) {
        return this.locales.indexOf(locale) !== -1;
    }

    getCurrentLocale() {
        return this.currentLocale;
    }

    onSwitchLocale({
        locale,
        localeData
    }) {
        switch (locale) {
            case "en":
                counterpart.registerTranslations("en", this.localesObject.en);
                break;
            case "cn":
                counterpart.registerTranslations("cn", this.localesObject.cn);
                break;

            default:
                counterpart.registerTranslations(locale, localeData);
                break;
        }

        counterpart.setLocale(locale);
        this.currentLocale = locale;
    }

    onGetLocale(locale) {
        if (this.locales.indexOf(locale) === -1) {
            this.locales.push(locale);
        }
    }

    onClearSettings() {
        this.onSwitchLocale({
            locale: "cn"
        });
    }
}

export default alt.createStore(IntlStore, "IntlStore");
