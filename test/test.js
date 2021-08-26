import { expect } from 'chai';
import CloudAPIClient from '../src/CloudAPIClient';

// FilterBuilder
describe('FilterBuilder', function () {
  const FilterBuilder = CloudAPIClient.FilterBuilder;

  describe('Instance', function() {
    it('Is created properly', function() {
      const f = new FilterBuilder();
      expect(f).to.not.be.undefined;
      expect(f).to.be.instanceOf(FilterBuilder);
    });

    it('Empty instace returns empty string', function() {
      const f = new FilterBuilder();
      expect(f.toString()).to.be.equal('');
    });
  });

  describe('.gt', function() {
    it('Is generating proper string for number', function() {
      const f = new FilterBuilder();
      f.gt('test', 1);
      expect(f.toString()).to.be.equal('test_gt_1');
    });
  });

  describe('.lt', function() {
    it('Is generating proper string for number', function() {
      const f = new FilterBuilder();
      f.lt('test', 1);
      expect(f.toString()).to.be.equal('test_lt_1');
    });
  });

  describe('.after', function() {
    const test = new Date();

    it('Is generating proper string for timestamp', function() {
      const f = new FilterBuilder();
      f.after('test', test.getTime());
      expect(f.toString()).to.be.equal('test_after_' + test.getTime());
    });

    it('Is generating proper string for Date instance', function() {
      const f = new FilterBuilder();
      f.after('test', test);
      expect(f.toString()).to.be.equal('test_after_' + test.getTime());
    });
  });

  describe('.before', function() {
    const test = new Date();

    it('Is generating proper string for timestamp', function() {
      const f = new FilterBuilder();
      f.before('test', test.getTime());
      expect(f.toString()).to.be.equal('test_before_' + test.getTime());
    });

    it('Is generating proper string for Date instance', function() {
      const f = new FilterBuilder();
      f.before('test', test);
      expect(f.toString()).to.be.equal('test_before_' + test.getTime());
    });
  });

  describe('.on', function() {
    const test = new Date();

    it('Is generating proper string for timestamp', function() {
      const f = new FilterBuilder();
      f.on('test', test.getTime());
      expect(f.toString()).to.be.equal('test_on_' + test.getTime());
    });

    it('Is generating proper string for Date instance', function() {
      const f = new FilterBuilder();
      f.on('test', test);
      expect(f.toString()).to.be.equal('test_on_' + test.getTime());
    });
  });

  describe('.eq', function() {
    it('Is generating proper string for Date', function() {
      const test = new Date()
      const f = new FilterBuilder();
      f.eq('test', test);
      expect(f.toString()).to.be.equal('test_eq_' + test.getTime());
    });

    it('Is generating proper string for timestamp', function() {
      const test = Date.now();
      const f = new FilterBuilder();
      f.eq('test', test);
      expect(f.toString()).to.be.equal('test_eq_' + test);
    });

    it('Is generating proper string for number', function() {
      const test = 101;
      const f = new FilterBuilder();
      f.eq('test', test);
      expect(f.toString()).to.be.equal('test_eq_' + test);
    });

    it('Is generating proper string for true', function() {
      const test = true;
      const f = new FilterBuilder();
      f.eq('test', test);
      expect(f.toString()).to.be.equal('test_eq_' + test);
    });

    it('Is generating proper string for false', function() {
      const test = false;
      const f = new FilterBuilder();
      f.eq('test', test);
      expect(f.toString()).to.be.equal('test_eq_' + test);
    });

    it('Is generating proper string for string', function() {
      const test = 'TEST';
      const f = new FilterBuilder();
      f.eq('test', test);
      expect(f.toString()).to.be.equal('test_eq_' + test);
    });
  });

  describe('.contains', function() {
    it('Is generating proper string', function() {
      const test = 'TEST';
      const f = new FilterBuilder();
      f.contains('test', test);
      expect(f.toString()).to.be.equal('test_contains_' + test);
    });
  });

  describe('.isnull', function() {
    it('Is generating proper string for Boolean', function() {
      const f = new FilterBuilder();
      f.isnull('test', Boolean);
      expect(f.toString()).to.be.equal('test_isnull');
    });

    it('Is generating proper string for b', function() {
      const f = new FilterBuilder();
      f.isnull('test', 'b');
      expect(f.toString()).to.be.equal('test_isnull');
    });

    it('Is generating proper string for Date', function() {
      const f = new FilterBuilder();
      f.isnull('test', Date);
      expect(f.toString()).to.be.equal('test_isnull');
    });

    it('Is generating proper string for d', function() {
      const f = new FilterBuilder();
      f.isnull('test', 'd');
      expect(f.toString()).to.be.equal('test_isnull');
    });

    it('Is generating proper string for Number', function() {
      const f = new FilterBuilder();
      f.isnull('test', Number);
      expect(f.toString()).to.be.equal('test_isnull');
    });

    it('Is generating proper string for n', function() {
      const f = new FilterBuilder();
      f.isnull('test', 'n');
      expect(f.toString()).to.be.equal('test_isnull');
    });

    it('Is generating proper string for String', function() {
      const f = new FilterBuilder();
      f.isnull('test', String);
      expect(f.toString()).to.be.equal('test_isnull');
    });

    it('Is generating proper string for s', function() {
      const f = new FilterBuilder();
      f.isnull('test', 's');
      expect(f.toString()).to.be.equal('test_isnull');
    });
  });

  describe('.in', function() {
    it('Is generating proper string for list of booleans', function() {
      const test = [true, false];
      const f = new FilterBuilder();
      f.in('test', test);
      expect(f.toString()).to.be.equal('test_in_' + test.join('|'));
    });

    it('Is generating proper string for list of dates', function() {
      const test = [new Date(), new Date()];
      const f = new FilterBuilder();
      f.in('test', test);
      expect(f.toString()).to.be.equal('test_in_' + test.join('|'));
    });

    it('Is generating proper string for list of numbers', function() {
      const test = [1, 2, 3];
      const f = new FilterBuilder();
      f.in('test', test);
      expect(f.toString()).to.be.equal('test_in_' + test.join('|'));
    });

    it('Is generating proper string for list of strings', function() {
      const test = ['a', 'b'];
      const f = new FilterBuilder();
      f.in('test', test);
      expect(f.toString()).to.be.equal('test_in_' + test.join('|'));
    });
  });

  describe('.notin', function() {
    it('Is generating proper string for list of booleans', function() {
      const test = [true, false];
      const f = new FilterBuilder();
      f.notin('test', test);
      expect(f.toString()).to.be.equal('test_notin_' + test.join('|'));
    });

    it('Is generating proper string for list of dates', function() {
      const test = [new Date(), new Date()];
      const f = new FilterBuilder();
      f.notin('test', test);
      expect(f.toString()).to.be.equal('test_notin_' + test.join('|'));
    });

    it('Is generating proper string for list of numbers', function() {
      const test = [1, 2, 3];
      const f = new FilterBuilder();
      f.notin('test', test);
      expect(f.toString()).to.be.equal('test_notin_' + test.join('|'));
    });

    it('Is generating proper string for list of strings', function() {
      const test = ['a', 'b'];
      const f = new FilterBuilder();
      f.notin('test', test);
      expect(f.toString()).to.be.equal('test_notin_' + test.join('|'));
    });
  });

  describe('.raw', function() {
    it('Is generating proper string for single row item', function() {
      const test = 'test_eq_TEST';
      const f = new FilterBuilder();
      f.raw(test);
      expect(f.toString()).to.be.equal(test);
    });

    it('Is generating proper string for list of row items', function() {
      const test = ['test_eq_TEST1', 'test_eq_TEST2'];
      const f = new FilterBuilder();
      f.raw(test);
      expect(f.toString()).to.be.equal(test.join(';'));
    });

    it('Is throwing SyntaxError in case of giving invalid filter', function() {
      const test = ['test_eq_TEST1', 'x_test_eq_TEST2'];
      const f = new FilterBuilder();
      expect(
        f.raw.bind(f, test)
      ).to.throw('Filter x_test_eq_TEST2 has invalid syntax').that.is.instanceOf(SyntaxError);
    });
  });

  describe('.isFilterPart', function() {
    const f = new FilterBuilder();

    describe('Is returning true for valid strings', function() {
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
        it(test, function() {
          expect(f.isFilterPart(test)).to.be.true;
        });
      }
    });

    it('Is returning false for invalid string', function() {
      expect(f.isFilterPart('x_test_eq_TEST')).to.be.false;
      expect(f.isFilterPart('test_xx_TEST')).to.be.false;
    });
  });

});
