// interface DateTimeFormatOptions {
//   localeMatcher?: "best fit" | "lookup";
//   weekday?: "long" | "short" | "narrow";
//   era?: "long" | "short" | "narrow";
//   year?: "numeric" | "2-digit";
//   month?: "numeric" | "2-digit" | "long" | "short" | "narrow";
//   day?: "numeric" | "2-digit";
//   hour?: "numeric" | "2-digit";
//   minute?: "numeric" | "2-digit";
//   second?: "numeric" | "2-digit";
//   timeZoneName?: "long" | "short";
//   formatMatcher?: "best fit" | "basic";
//   hour12?: boolean;
//   timeZone?: string;
// }

interface DisplayNameOptions {
  localeMatcher: 'lookup' | 'best fit';
  style: 'narrow' | 'short' | 'long';
  type: 'language' | 'region' | 'script' | 'currency';
  fallback: 'code' | 'none';
}

declare class IntlDisplayNames {
  constructor(locales: string[], options: Partial<DisplayNameOptions>);
  of(thing: string): void;
  resolvedOptions(): Partial<DisplayNameOptions>;
}

describe('Intl.DisplayNames', () => {
  const DisplayNames: typeof IntlDisplayNames = (Intl as any).DisplayNames;
  it('gives localized regions', () => {
    const regionNames = new DisplayNames(['en'], { type: 'region' });
    expect(regionNames.of('419')).toEqual('Latin America');
    expect(regionNames.of('BZ')).toEqual('Belize');
    expect(regionNames.of('US')).toEqual('United States');
    expect(regionNames.of('BA')).toEqual('Bosnia & Herzegovina');
    expect(regionNames.of('MM')).toEqual('Myanmar (Burma)');
  });

  it('gives localized languages', () => {
    const languageNames = new DisplayNames(['es-ES'], { type: 'language' });
    expect(languageNames.of('fr')).toEqual('francés');
    expect(languageNames.of('de')).toEqual('alemán');
    expect(languageNames.of('fr-CA')).toEqual('francés canadiense');
    expect(languageNames.of('zh-Hant')).toEqual('chino tradicional');
    expect(languageNames.of('en-US')).toEqual('inglés estadounidense');
    expect(languageNames.of('zh-TW')).toEqual('chino (Taiwán)');
  });
});
