import {CloudAPIClient} from '../src/CloudAPIClient';

// FilterBuilder
describe('FilterBuilder', () => {
  const FilterBuilder = CloudAPIClient.FilterBuilder;

  describe('Instance', () => {
    it('Is created properly', () => {
      const f = new FilterBuilder();
      expect(f).not.toBeUndefined();
      expect(f).toBeInstanceOf(FilterBuilder);
    });

    it('Empty instace returns empty string', () => {
      const f = new FilterBuilder();
      expect(f.toString()).toEqual('');
    });
  });

  describe('.gt', () => {
    it('Is generating proper string for number', () => {
      const f = new FilterBuilder();
      f.gt('test', 1);
      expect(f.toString()).toEqual('test_gt_1');
    });
  });

  describe('.lt', () => {
    it('Is generating proper string for number', () => {
      const f = new FilterBuilder();
      f.lt('test', 1);
      expect(f.toString()).toEqual('test_lt_1');
    });
  });

  describe('.after', () => {
    const test = new Date();

    it('Is generating proper string for timestamp', () => {
      const f = new FilterBuilder();
      f.after('test', test.getTime());
      expect(f.toString()).toEqual('test_after_' + test.getTime());
    });

    it('Is generating proper string for Date instance', () => {
      const f = new FilterBuilder();
      f.after('test', test);
      expect(f.toString()).toEqual('test_after_' + test.getTime());
    });
  });

  describe('.before', () => {
    const test = new Date();

    it('Is generating proper string for timestamp', () => {
      const f = new FilterBuilder();
      f.before('test', test.getTime());
      expect(f.toString()).toEqual('test_before_' + test.getTime());
    });

    it('Is generating proper string for Date instance', () => {
      const f = new FilterBuilder();
      f.before('test', test);
      expect(f.toString()).toEqual('test_before_' + test.getTime());
    });
  });

  describe('.on', () => {
    const test = new Date();

    it('Is generating proper string for timestamp', () => {
      const f = new FilterBuilder();
      f.on('test', test.getTime());
      expect(f.toString()).toEqual('test_on_' + test.getTime());
    });

    it('Is generating proper string for Date instance', () => {
      const f = new FilterBuilder();
      f.on('test', test);
      expect(f.toString()).toEqual('test_on_' + test.getTime());
    });
  });

  describe('.eq', () => {
    it('Is generating proper string for Date', () => {
      const test = new Date()
      const f = new FilterBuilder();
      f.eq('test', test);
      expect(f.toString()).toEqual('test_eq_' + test.getTime());
    });

    it('Is generating proper string for timestamp', () => {
      const test = Date.now();
      const f = new FilterBuilder();
      f.eq('test', test);
      expect(f.toString()).toEqual('test_eq_' + test);
    });

    it('Is generating proper string for number', () => {
      const test = 101;
      const f = new FilterBuilder();
      f.eq('test', test);
      expect(f.toString()).toEqual('test_eq_' + test);
    });

    it('Is generating proper string for true', () => {
      const test = true;
      const f = new FilterBuilder();
      f.eq('test', test);
      expect(f.toString()).toEqual('test_eq_' + test);
    });

    it('Is generating proper string for false', () => {
      const test = false;
      const f = new FilterBuilder();
      f.eq('test', test);
      expect(f.toString()).toEqual('test_eq_' + test);
    });

    it('Is generating proper string for string', () => {
      const test = 'TEST';
      const f = new FilterBuilder();
      f.eq('test', test);
      expect(f.toString()).toEqual('test_eq_' + test);
    });
  });

  describe('.contains', () => {
    it('Is generating proper string', () => {
      const test = 'TEST';
      const f = new FilterBuilder();
      f.contains('test', test);
      expect(f.toString()).toEqual('test_contains_' + test);
    });
  });

  describe('.isnull', () => {
    it('Is generating proper string', () => {
      const f = new FilterBuilder();
      f.isnull('test');
      expect(f.toString()).toEqual('test_isnull');
    });
  });

  describe('.in', () => {
    it('Is generating proper string for list of booleans', () => {
      const test = [true, false];
      const f = new FilterBuilder();
      f.in('test', test);
      expect(f.toString()).toEqual('test_in_' + test.join('|'));
    });

    it('Is generating proper string for list of dates', () => {
      const test = [new Date(), new Date()];
      const f = new FilterBuilder();
      f.in('test', test);
      expect(f.toString()).toEqual('test_in_' + test.join('|'));
    });

    it('Is generating proper string for list of numbers', () => {
      const test = [1, 2, 3];
      const f = new FilterBuilder();
      f.in('test', test);
      expect(f.toString()).toEqual('test_in_' + test.join('|'));
    });

    it('Is generating proper string for list of strings', () => {
      const test = ['a', 'b'];
      const f = new FilterBuilder();
      f.in('test', test);
      expect(f.toString()).toEqual('test_in_' + test.join('|'));
    });
  });

  describe('.notin', () => {
    it('Is generating proper string for list of booleans', () => {
      const test = [true, false];
      const f = new FilterBuilder();
      f.notin('test', test);
      expect(f.toString()).toEqual('test_notin_' + test.join('|'));
    });

    it('Is generating proper string for list of dates', () => {
      const test = [new Date(), new Date()];
      const f = new FilterBuilder();
      f.notin('test', test);
      expect(f.toString()).toEqual('test_notin_' + test.join('|'));
    });

    it('Is generating proper string for list of numbers', () => {
      const test = [1, 2, 3];
      const f = new FilterBuilder();
      f.notin('test', test);
      expect(f.toString()).toEqual('test_notin_' + test.join('|'));
    });

    it('Is generating proper string for list of strings', () => {
      const test = ['a', 'b'];
      const f = new FilterBuilder();
      f.notin('test', test);
      expect(f.toString()).toEqual('test_notin_' + test.join('|'));
    });
  });

  describe('.raw', () => {
    it('Is generating proper string for single row item', () => {
      const test = 'test_eq_TEST';
      const f = new FilterBuilder();
      f.raw(test);
      expect(f.toString()).toEqual(test);
    });

    it('Is generating proper string for list of row items', () => {
      const test = ['test_eq_TEST1', 'test_eq_TEST2'];
      const f = new FilterBuilder();
      f.raw(test);
      expect(f.toString()).toEqual(test.join(';'));
    });

    it('Is throwing SyntaxError in case of giving invalid filter', () => {
      const test = ['test_eq_TEST1', 'x_test_eq_TEST2'];
      const f = new FilterBuilder();
      expect(
        f.raw.bind(f, test)
      ).toThrow(new SyntaxError('Filter x_test_eq_TEST2 has invalid syntax'));
    });
  });

  describe('.isFilterPart', () => {
    const f = new FilterBuilder();

    describe('Is returning true for valid strings', () => {
      const testStrings = [
        'test_eq_true',
        'test_on_1537095505651',
        'test_eq_101',
        'test_contains_TEST',
        'test_isnull',
        'test_in_true|false',
        'test_in_1537095505651|1537095505652',
        'test_notin_1|2|3',
        'test_notin_a|b|c'
      ];

      for(const test of testStrings) {
        it(test, () => {
          expect(f.isFilterPart(test)).toEqual(true);
        });
      }
    });

    it('Is returning false for invalid string', () => {
      expect(f.isFilterPart('x_test_eq_TEST')).toEqual(false);
      expect(f.isFilterPart('test_xx_TEST')).toEqual(false);
    });
  });

});
