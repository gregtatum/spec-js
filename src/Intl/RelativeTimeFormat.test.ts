// type RelativeTimeFormatUnit =
// | "year" | "years"
// | "quarter" | "quarters"
// | "month" | "months"
// | "week" | "weeks"
// | "day" | "days"
// | "hour" | "hours"
// | "minute" | "minutes"
// | "second" | "seconds"
// ;

// type RelativeTimeFormatStyle = "long" | "short" | "narrow";

describe('Intl.RelativeTimeFormat quarters', () => {
  const formatAs: Intl.RelativeTimeFormatUnit = 'quarter';

  it('can format the long style', () => {
    const options: Intl.RelativeTimeFormatOptions = {
      style: 'long' as Intl.RelativeTimeFormatStyle,
    };
    const time = new Intl.RelativeTimeFormat('en-US', options);

    expect(time.format(3, formatAs)).toEqual('in 3 quarters');
    expect(time.format(-3, formatAs)).toEqual('3 quarters ago');

    expect(time.format(1, formatAs)).toEqual('in 1 quarter');
    expect(time.format(-1, formatAs)).toEqual('1 quarter ago');
  });

  it('can format the short style', () => {
    const options: Intl.RelativeTimeFormatOptions = {
      style: 'short' as Intl.RelativeTimeFormatStyle,
    };
    const time = new Intl.RelativeTimeFormat('en-US', options);

    expect(time.format(3, formatAs)).toEqual('in 3 qtrs.');
    expect(time.format(-3, formatAs)).toEqual('3 qtrs. ago');

    expect(time.format(1, formatAs)).toEqual('in 1 qtr.');
    expect(time.format(-1, formatAs)).toEqual('1 qtr. ago');
  });

  it('can format the narrow style', () => {
    const options: Intl.RelativeTimeFormatOptions = {
      style: 'narrow' as Intl.RelativeTimeFormatStyle,
    };
    const time = new Intl.RelativeTimeFormat('en-US', options);

    expect(time.format(3, formatAs)).toEqual('in 3 qtrs.');
    expect(time.format(-3, formatAs)).toEqual('3 qtrs. ago');

    expect(time.format(1, formatAs)).toEqual('in 1 qtr.');
    expect(time.format(-1, formatAs)).toEqual('1 qtr. ago');
  });
});

describe('Intl.RelativeTimeFormat hours', () => {
  const formatAs: Intl.RelativeTimeFormatUnit = 'hours';

  it('can format the long style', () => {
    const options: Intl.RelativeTimeFormatOptions = {
      style: 'long' as Intl.RelativeTimeFormatStyle,
    };
    const time = new Intl.RelativeTimeFormat('en-US', options);

    expect(time.format(3, formatAs)).toEqual('in 3 hours');
    expect(time.format(-3, formatAs)).toEqual('3 hours ago');

    expect(time.format(1, formatAs)).toEqual('in 1 hour');
    expect(time.format(-1, formatAs)).toEqual('1 hour ago');
  });

  it('can format the short style', () => {
    const options: Intl.RelativeTimeFormatOptions = {
      style: 'short' as Intl.RelativeTimeFormatStyle,
    };
    const time = new Intl.RelativeTimeFormat('en-US', options);

    expect(time.format(3, formatAs)).toEqual('in 3 hr.');
    expect(time.format(-3, formatAs)).toEqual('3 hr. ago');

    expect(time.format(1, formatAs)).toEqual('in 1 hr.');
    expect(time.format(-1, formatAs)).toEqual('1 hr. ago');
  });

  it('can format the narrow style', () => {
    const options: Intl.RelativeTimeFormatOptions = {
      style: 'narrow' as Intl.RelativeTimeFormatStyle,
    };
    const time = new Intl.RelativeTimeFormat('en-US', options);

    expect(time.format(3, formatAs)).toEqual('in 3 hr.');
    expect(time.format(-3, formatAs)).toEqual('3 hr. ago');

    expect(time.format(1, formatAs)).toEqual('in 1 hr.');
    expect(time.format(-1, formatAs)).toEqual('1 hr. ago');
  });
});

describe('Intl.RelativeTimeFormat API', () => {
  const formatAs: Intl.RelativeTimeFormatUnit = 'hours';

  it('can format a long style to parts', () => {
    const options: Intl.RelativeTimeFormatOptions = {
      style: 'long' as Intl.RelativeTimeFormatStyle,
    };
    const time = new Intl.RelativeTimeFormat('en-US', options);

    expect(time.formatToParts(3, formatAs)).toEqual([
      { type: 'literal', value: 'in ' },
      { type: 'integer', unit: 'hour', value: '3' },
      { type: 'literal', value: ' hours' },
    ]);
  });

  it('can resolve options', () => {
    const time = new Intl.RelativeTimeFormat('en-US', { style: 'long' });

    expect(time.resolvedOptions()).toEqual({
      locale: 'en-US',
      numberingSystem: 'latn',
      numeric: 'always',
      style: 'long',
    });
  });

  it('can list supported locales', () => {
    expect(Intl.RelativeTimeFormat.supportedLocalesOf()).toEqual([]);
  });

  it('can always use numeric', () => {
    const time = new Intl.RelativeTimeFormat('es-ES', {
      style: 'long',
      numeric: 'always',
    });

    expect(time.format(1, 'day')).toEqual('dentro de 1 día');
    expect(time.format(-1, 'day')).toEqual('hace 1 día');
  });

  it('can always use auto numbers', () => {
    const time = new Intl.RelativeTimeFormat('es-ES', {
      style: 'long',
      numeric: 'auto',
    });

    expect(time.format(1, 'day')).toEqual('mañana');
    expect(time.format(-1, 'day')).toEqual('ayer');
  });
});
