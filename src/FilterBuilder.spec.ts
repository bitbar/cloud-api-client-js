import {CloudAPIClient} from './CloudAPIClient';


describe('FilterBuilder', () => {
  const FilterBuilder = CloudAPIClient.FilterBuilder;

  it('Empty instance should return empty string', () => {
    const f = new FilterBuilder();
    expect(f).not.toBeUndefined();
    expect(f).toBeInstanceOf(FilterBuilder);
    expect(f.toString()).toEqual('');
  });

  describe('@gt', () => {
    it('should generate proper string for number', () => {
      const f = new FilterBuilder();
      f.gt('test', 1);
      expect(f.toString()).toEqual('test_gt_1');
    });
  });

  describe('@lt', () => {
    it('should generate proper string for number', () => {
      const f = new FilterBuilder();
      f.lt('test', 1);
      expect(f.toString()).toEqual('test_lt_1');
    });
  });

  describe('@after', () => {
    const test = new Date();

    it('should generate proper string for timestamp', () => {
      const f = new FilterBuilder();
      f.after('test', test.getTime());
      expect(f.toString()).toEqual('test_after_' + test.getTime());
    });

    it('should generate proper string for Date instance', () => {
      const f = new FilterBuilder();
      f.after('test', test);
      expect(f.toString()).toEqual('test_after_' + test.getTime());
    });
  });

  describe('@afterorequal', () => {
    const test = new Date();

    it('should generate proper string for timestamp', () => {
      const f = new FilterBuilder();
      f.afterorequal('test', test.getTime());
      expect(f.toString()).toEqual('test_afterorequal_' + test.getTime());
    });

    it('should generate proper string for Date instance', () => {
      const f = new FilterBuilder();
      f.afterorequal('test', test);
      expect(f.toString()).toEqual('test_afterorequal_' + test.getTime());
    });
  });

  describe('@before', () => {
    const test = new Date();

    it('should generate proper string for timestamp', () => {
      const f = new FilterBuilder();
      f.before('test', test.getTime());
      expect(f.toString()).toEqual('test_before_' + test.getTime());
    });

    it('should generate proper string for Date instance', () => {
      const f = new FilterBuilder();
      f.before('test', test);
      expect(f.toString()).toEqual('test_before_' + test.getTime());
    });
  });

  describe('@beforeorequal', () => {
    const test = new Date();

    it('should generate proper string for timestamp', () => {
      const f = new FilterBuilder();
      f.beforeorequal('test', test.getTime());
      expect(f.toString()).toEqual('test_beforeorequal_' + test.getTime());
    });

    it('should generate proper string for Date instance', () => {
      const f = new FilterBuilder();
      f.beforeorequal('test', test);
      expect(f.toString()).toEqual('test_beforeorequal_' + test.getTime());
    });
  });

  describe('@on', () => {
    const test = new Date();

    it('should generate proper string for timestamp', () => {
      const f = new FilterBuilder();
      f.on('test', test.getTime());
      expect(f.toString()).toEqual('test_on_' + test.getTime());
    });

    it('should generate proper string for Date instance', () => {
      const f = new FilterBuilder();
      f.on('test', test);
      expect(f.toString()).toEqual('test_on_' + test.getTime());
    });

    it('returns unchanged builder if no value provided', () => {
      const f = new FilterBuilder();
      f.on('test', []);
      expect(f.toString()).toEqual('');
    });
  });

  describe('@eq', () => {
    it('should generate proper string for Date', () => {
      const test = new Date()
      const f = new FilterBuilder();
      f.eq('test', test);
      expect(f.toString()).toEqual('test_eq_' + test.getTime());
    });

    it('should generate proper string for timestamp', () => {
      const test = Date.now();
      const f = new FilterBuilder();
      f.eq('test', test);
      expect(f.toString()).toEqual('test_eq_' + test);
    });

    it('should generate proper string for number', () => {
      const test = 101;
      const f = new FilterBuilder();
      f.eq('test', test);
      expect(f.toString()).toEqual('test_eq_' + test);
    });

    it('should generate proper string for true', () => {
      const test = true;
      const f = new FilterBuilder();
      f.eq('test', test);
      expect(f.toString()).toEqual('test_eq_' + test);
    });

    it('should generate proper string for false', () => {
      const test = false;
      const f = new FilterBuilder();
      f.eq('test', test);
      expect(f.toString()).toEqual('test_eq_' + test);
    });

    it('should generate proper string for string', () => {
      const test = 'TEST';
      const f = new FilterBuilder();
      f.eq('test', test);
      expect(f.toString()).toEqual('test_eq_' + test);
    });
  });

  describe('@contains', () => {
    it('should generate proper string', () => {
      const test = 'TEST';
      const f = new FilterBuilder();
      f.contains('test', test);
      expect(f.toString()).toEqual('test_contains_' + test);
    });
  });

  describe('@like', () => {
    it('should generate proper string', () => {
      const test = 'TEST';
      const f = new FilterBuilder();
      f.like('test', test);
      expect(f.toString()).toEqual('test_like_' + test);
    });
  });

  describe('@notlike', () => {
    it('should generate proper string', () => {
      const test = 'TEST';
      const f = new FilterBuilder();
      f.notlike('test', test);
      expect(f.toString()).toEqual('test_notlike_' + test);
    });
  });

  describe('@isnull', () => {
    it('should generate proper string', () => {
      const f = new FilterBuilder();
      f.isnull('test');
      expect(f.toString()).toEqual('test_isnull');
    });
  });

  describe('@isnotnull', () => {
    it('should generate proper string', () => {
      const f = new FilterBuilder();
      f.isnotnull('test');
      expect(f.toString()).toEqual('test_isnotnull');
    });
  });

  describe('@in', () => {
    it('should generate proper string for list of booleans', () => {
      const test = [true, false];
      const f = new FilterBuilder();
      f.in('test', test);
      expect(f.toString()).toEqual('test_in_' + test.join('|'));
    });

    it('should generate proper string for list of dates', () => {
      const test = [new Date(), new Date()];
      const f = new FilterBuilder();
      f.in('test', test);
      expect(f.toString()).toEqual('test_in_' + test.join('|'));
    });

    it('should generate proper string for list of numbers', () => {
      const test = [1, 2, 3];
      const f = new FilterBuilder();
      f.in('test', test);
      expect(f.toString()).toEqual('test_in_' + test.join('|'));
    });

    it('should generate proper string for list of strings', () => {
      const test = ['a', 'b'];
      const f = new FilterBuilder();
      f.in('test', test);
      expect(f.toString()).toEqual('test_in_' + test.join('|'));
    });

    it('should generate proper string for list containing null and another values', () => {
      const f = new FilterBuilder();
      f.in('test', [1, null]);
      expect(f.toString()).toEqual('test_inornull_1');
    });

    it('should generate proper string for list containing only null', () => {
      const f = new FilterBuilder();
      f.in('test', [null]);
      expect(f.toString()).toEqual('test_isnull');
    });
  });

  describe('@notin', () => {
    it('should generate proper string for list of booleans', () => {
      const test = [true, false];
      const f = new FilterBuilder();
      f.notin('test', test);
      expect(f.toString()).toEqual('test_notin_' + test.join('|'));
    });

    it('should generate proper string for list of dates', () => {
      const test = [new Date(), new Date()];
      const f = new FilterBuilder();
      f.notin('test', test);
      expect(f.toString()).toEqual('test_notin_' + test.join('|'));
    });

    it('should generate proper string for list of numbers', () => {
      const test = [1, 2, 3];
      const f = new FilterBuilder();
      f.notin('test', test);
      expect(f.toString()).toEqual('test_notin_' + test.join('|'));
    });

    it('should generate proper string for list of strings', () => {
      const test = ['a', 'b'];
      const f = new FilterBuilder();
      f.notin('test', test);
      expect(f.toString()).toEqual('test_notin_' + test.join('|'));
    });
  });

  describe('@raw', () => {
    it('should generate proper string for single row item', () => {
      const test = 'test_eq_TEST';
      const f = new FilterBuilder();
      f.raw(test);
      expect(f.toString()).toEqual(test);
    });

    it('should generate proper string for list of row items', () => {
      const test = ['test_eq_TEST1', 'test_eq_TEST2'];
      const f = new FilterBuilder();
      f.raw(test);
      expect(f.toString()).toEqual(test.join(';'));
    });

    it('should throw SyntaxError in case of giving invalid filter', () => {
      const test = ['test_eq_TEST1', 'x_test_eq_TEST2'];
      const f = new FilterBuilder();
      expect(
        f.raw.bind(f, test)
      ).toThrow(new SyntaxError('Filter x_test_eq_TEST2 has invalid syntax'));
    });
  });

  describe('@isFilterPart', () => {
    const f = new FilterBuilder();

    describe('should return true for valid strings', () => {
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

      for (const test of testStrings) {
        it(test, () => {
          expect(f.isFilterPart(test)).toEqual(true);
        });
      }
    });

    it('should return false for invalid string', () => {
      expect(f.isFilterPart('x_test_eq_TEST')).toEqual(false);
      expect(f.isFilterPart('test_xx_TEST')).toEqual(false);
    });
  });

});
