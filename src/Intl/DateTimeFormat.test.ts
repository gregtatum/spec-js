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

describe('Intl.DateTimeFormat basic style formatting', () => {
  it('can format the full style', () => {
    const options: Intl.DateTimeFormatOptions = {
      dateStyle: 'full',
      timeStyle: 'full',
      timeZone: 'America/Chicago',
    };
    const dtf = new Intl.DateTimeFormat('en-US', options);
    expect(dtf.format(0)).toEqual(
      'Wednesday, December 31, 1969 at 6:00:00 PM Central Standard Time',
    );
  });

  it('can format the long style', () => {
    const options: Intl.DateTimeFormatOptions = {
      dateStyle: 'long',
      timeStyle: 'long',
      timeZone: 'America/Chicago',
    };
    const dtf = new Intl.DateTimeFormat('en-US', options);
    expect(dtf.format(0)).toEqual('December 31, 1969 at 6:00:00 PM CST');
  });

  it('can format the medium style', () => {
    const options: Intl.DateTimeFormatOptions = {
      dateStyle: 'medium',
      timeStyle: 'medium',
      timeZone: 'America/Chicago',
    };
    const dtf = new Intl.DateTimeFormat('en-US', options);
    expect(dtf.format(0)).toEqual('Dec 31, 1969, 6:00:00 PM');
  });

  it('can format the short style', () => {
    const options: Intl.DateTimeFormatOptions = {
      dateStyle: 'short',
      timeStyle: 'short',
      timeZone: 'America/Chicago',
    };
    const dtf = new Intl.DateTimeFormat('en-US', options);
    expect(dtf.format(0)).toEqual('12/31/69, 6:00 PM');
  });
});

describe('Intl.DateTimeFormat style with hour cycles', () => {
  it('ignores hour cycle when using date style', () => {
    const options: Intl.DateTimeFormatOptions = {
      dateStyle: 'long',
      timeZone: 'America/Chicago',
      hourCycle: 'h12',
    };
    const dtf = new Intl.DateTimeFormat('en-US', options);

    expect(dtf.format(0)).toEqual('December 31, 1969');
  });

  const midnight = 6 * 60 * 60 * 1000;

  it('defaults to h12 for en-US', () => {
    const options: Intl.DateTimeFormatOptions = {
      timeStyle: 'long',
      timeZone: 'America/Chicago',
    };
    const dtf = new Intl.DateTimeFormat('en-US', options);

    expect(dtf.format(midnight)).toEqual('12:00:00 AM CST');
  });

  it('can manually set it to h12 for en-US', () => {
    const options: Intl.DateTimeFormatOptions = {
      timeStyle: 'long',
      timeZone: 'America/Chicago',
      hourCycle: 'h12',
    };
    const dtf = new Intl.DateTimeFormat('en-US', options);

    expect(dtf.format(midnight)).toEqual('12:00:00 AM CST');
  });

  it('can manually set it to h11 for en-US', () => {
    const options: Intl.DateTimeFormatOptions = {
      timeStyle: 'long',
      timeZone: 'America/Chicago',
      hourCycle: 'h11',
    };
    const dtf = new Intl.DateTimeFormat('en-US', options);

    expect(dtf.format(midnight)).toEqual('0:00:00 AM CST');
  });

  it('can manually set it to h23 for en-US', () => {
    const options: Intl.DateTimeFormatOptions = {
      timeStyle: 'long',
      timeZone: 'America/Chicago',
      hourCycle: 'h23',
    };
    const dtf = new Intl.DateTimeFormat('en-US', options);

    expect(dtf.format(midnight)).toEqual('00:00:00 CST');
  });

  it('can manually set it to h24 for en-US', () => {
    const options: Intl.DateTimeFormatOptions = {
      timeStyle: 'long',
      timeZone: 'America/Chicago',
      hourCycle: 'h24',
    };
    const dtf = new Intl.DateTimeFormat('en-US', options);

    expect(dtf.format(midnight)).toEqual('24:00:00 CST');
  });

  it('hour12 can change the default hour locale preference', () => {
    const options: Intl.DateTimeFormatOptions = {
      timeStyle: 'long',
      timeZone: 'America/Chicago',
      hour12: false,
    };
    const dtf = new Intl.DateTimeFormat('en-US', options);

    expect(dtf.format(midnight)).toEqual('24:00:00 CST');
  });

  it('hour12 wins over hourCycle', () => {
    const options: Intl.DateTimeFormatOptions = {
      timeStyle: 'long',
      timeZone: 'America/Chicago',
      hourCycle: 'h24',
      hour12: true,
    };
    const dtf = new Intl.DateTimeFormat('en-US', options);

    expect(dtf.format(midnight)).toEqual('12:00:00 AM CST');
  });
});
