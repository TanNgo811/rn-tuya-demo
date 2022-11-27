import type {i18n, InitOptions, TFunction} from 'i18next';
import i18next from 'i18next';
import {initReactI18next, useTranslation} from 'react-i18next';

export class Localization {
  public readonly useTranslation = useTranslation;

  private translateFunction?: TFunction;

  public readonly initialize = async (
    options: InitOptions = {},
  ): Promise<void> => {
    options.fallbackLng = options.fallbackLng ?? options.fallbackLng;
    this.translateFunction = await i18next.use(initReactI18next).init({
      ns: '',
      defaultNS: '',
      interpolation: {
        prefix: '{{',
        suffix: '}}',
      },
      resources: {},
      ...options,
    });
  };

  public readonly translate: TFunction = (key, params): any => {
    if (typeof this.translateFunction === 'function') {
      return this.translateFunction(key, params);
    }
    return key;
  };

  public readonly changeLanguage = async (lang: string): Promise<TFunction> => {
    return i18next.changeLanguage(lang);
  };

  public addLanguage = (
    lang: string,
    resources: Parameters<i18n['addResources']>[2],
  ): Localization => {
    i18next.addResources(lang, '', resources);
    return this;
  };
}

export const localization: Localization = new Localization();
