// Prepare chai
const chai = require('chai');
const expect = chai.expect;

var CloudAPIClient = require('../dist/cloud-api-client');

// FilterBuilder
describe('FilterBuilder', function () {
  var FilterBuilder = CloudAPIClient.FilterBuilder;

  describe('Instance', function() {
    it('Is created properly', function() {
      var f = new FilterBuilder();
      expect(f).to.not.be.undefined;
      expect(f).to.be.instanceOf(FilterBuilder);
    });
  
    it('Empty instace returns empty string', function() {
      var f = new FilterBuilder();
      expect(f.toString()).to.be.equal('');
    });
  });

  describe('.gt', function() {
    it('Is generating proper string for number', function() {
      var f = new FilterBuilder();
      f.gt('test', 1);
      expect(f.toString()).to.be.equal('n_test_gt_1');
    });
  });

  describe('.lt', function() {
    it('Is generating proper string for number', function() {
      var f = new FilterBuilder();
      f.lt('test', 1);
      expect(f.toString()).to.be.equal('n_test_lt_1');
    });
  });

  describe('.after', function() {
    var test = new Date();

    it('Is generating proper string for timestamp', function() {
      var f = new FilterBuilder();
      f.after('test', test.getTime());
      expect(f.toString()).to.be.equal('d_test_after_' + test.getTime());
    });

    it('Is generating proper string for Date instance', function() {
      var f = new FilterBuilder();
      f.after('test', test);
      expect(f.toString()).to.be.equal('d_test_after_' + test.getTime());
    });
  });

  describe('.before', function() {
    var test = new Date();

    it('Is generating proper string for timestamp', function() {
      var f = new FilterBuilder();
      f.before('test', test.getTime());
      expect(f.toString()).to.be.equal('d_test_before_' + test.getTime());
    });

    it('Is generating proper string for Date instance', function() {
      var f = new FilterBuilder();
      f.before('test', test);
      expect(f.toString()).to.be.equal('d_test_before_' + test.getTime());
    });
  });

  describe('.on', function() {
    var test = new Date();

    it('Is generating proper string for timestamp', function() {
      var f = new FilterBuilder();
      f.on('test', test.getTime());
      expect(f.toString()).to.be.equal('d_test_on_' + test.getTime());
    });

    it('Is generating proper string for Date instance', function() {
      var f = new FilterBuilder();
      f.on('test', test);
      expect(f.toString()).to.be.equal('d_test_on_' + test.getTime());
    });
  });

  describe('.eq', function() {
    it('Is generating proper string for Date', function() {
      var test = new Date()
      var f = new FilterBuilder();
      f.eq('test', test);
      expect(f.toString()).to.be.equal('d_test_eq_' + test.getTime());
    });

    it('Is generating proper string for timestamp', function() {
      var test = Date.now();
      var f = new FilterBuilder();
      f.eq('test', test);
      expect(f.toString()).to.be.equal('d_test_eq_' + test);
    });

    it('Is generating proper string for number', function() {
      var test = 101;
      var f = new FilterBuilder();
      f.eq('test', test);
      expect(f.toString()).to.be.equal('n_test_eq_' + test);
    });

    it('Is generating proper string for true', function() {
      var test = true;
      var f = new FilterBuilder();
      f.eq('test', test);
      expect(f.toString()).to.be.equal('b_test_eq_' + test);
    });

    it('Is generating proper string for false', function() {
      var test = false;
      var f = new FilterBuilder();
      f.eq('test', test);
      expect(f.toString()).to.be.equal('b_test_eq_' + test);
    });

    it('Is generating proper string for string', function() {
      var test = 'TEST';
      var f = new FilterBuilder();
      f.eq('test', test);
      expect(f.toString()).to.be.equal('s_test_eq_' + test);
    });
  });

  describe('.contains', function() {
    it('Is generating proper string', function() {
      var test = 'TEST';
      var f = new FilterBuilder();
      f.contains('test', test);
      expect(f.toString()).to.be.equal('s_test_contains_' + test);
    });
  });

  describe('.isnull', function() {
    it('Is generating proper string for Boolean', function() {
      var f = new FilterBuilder();
      f.isnull('test', Boolean);
      expect(f.toString()).to.be.equal('b_test_isnull');
    });

    it('Is generating proper string for b', function() {
      var f = new FilterBuilder();
      f.isnull('test', 'b');
      expect(f.toString()).to.be.equal('b_test_isnull');
    });

    it('Is generating proper string for Date', function() {
      var f = new FilterBuilder();
      f.isnull('test', Date);
      expect(f.toString()).to.be.equal('d_test_isnull');
    });

    it('Is generating proper string for d', function() {
      var f = new FilterBuilder();
      f.isnull('test', 'd');
      expect(f.toString()).to.be.equal('d_test_isnull');
    });

    it('Is generating proper string for Number', function() {
      var f = new FilterBuilder();
      f.isnull('test', Number);
      expect(f.toString()).to.be.equal('n_test_isnull');
    });

    it('Is generating proper string for n', function() {
      var f = new FilterBuilder();
      f.isnull('test', 'n');
      expect(f.toString()).to.be.equal('n_test_isnull');
    });

    it('Is generating proper string for String', function() {
      var f = new FilterBuilder();
      f.isnull('test', String);
      expect(f.toString()).to.be.equal('s_test_isnull');
    });

    it('Is generating proper string for s', function() {
      var f = new FilterBuilder();
      f.isnull('test', 's');
      expect(f.toString()).to.be.equal('s_test_isnull');
    });

    it('Is throwing TypeError in case of unsupported type', function() {
      var f = new FilterBuilder();
      expect(
        f.isnull.bind(f, 'test', FilterBuilder)
      ).to.throw('Unsupported type').that.is.instanceOf(TypeError);
    });
  });

  describe('.in', function() {
    it('Is generating proper string for list of booleans', function() {
      var test = [true, false];
      var f = new FilterBuilder();
      f.in('test', test);
      expect(f.toString()).to.be.equal('lb_test_in_' + test.join('|'));
    });

    it('Is generating proper string for list of dates', function() {
      var test = [new Date(), new Date()];
      var f = new FilterBuilder();
      f.in('test', test);
      expect(f.toString()).to.be.equal('ld_test_in_' + test.join('|'));
    });

    it('Is generating proper string for list of numbers', function() {
      var test = [1, 2, 3];
      var f = new FilterBuilder();
      f.in('test', test);
      expect(f.toString()).to.be.equal('ln_test_in_' + test.join('|'));
    });

    it('Is generating proper string for list of strings', function() {
      var test = ['a', 'b'];
      var f = new FilterBuilder();
      f.in('test', test);
      expect(f.toString()).to.be.equal('ls_test_in_' + test.join('|'));
    });
  });

  describe('.notin', function() {
    it('Is generating proper string for list of booleans', function() {
      var test = [true, false];
      var f = new FilterBuilder();
      f.notin('test', test);
      expect(f.toString()).to.be.equal('lb_test_notin_' + test.join('|'));
    });

    it('Is generating proper string for list of dates', function() {
      var test = [new Date(), new Date()];
      var f = new FilterBuilder();
      f.notin('test', test);
      expect(f.toString()).to.be.equal('ld_test_notin_' + test.join('|'));
    });

    it('Is generating proper string for list of numbers', function() {
      var test = [1, 2, 3];
      var f = new FilterBuilder();
      f.notin('test', test);
      expect(f.toString()).to.be.equal('ln_test_notin_' + test.join('|'));
    });

    it('Is generating proper string for list of strings', function() {
      var test = ['a', 'b'];
      var f = new FilterBuilder();
      f.notin('test', test);
      expect(f.toString()).to.be.equal('ls_test_notin_' + test.join('|'));
    });
  });

  describe('.raw', function() {
    it('Is generating proper string for single row item', function() {
      var test = 's_test_eq_TEST';
      var f = new FilterBuilder();
      f.raw(test);
      expect(f.toString()).to.be.equal(test);
    });

    it('Is generating proper string for list of row items', function() {
      var test = ['s_test_eq_TEST1', 's_test_eq_TEST2'];
      var f = new FilterBuilder();
      f.raw(test);
      expect(f.toString()).to.be.equal(test.join(';'));
    });

    it('Is throwing SyntaxError in case of giving invalid filter', function() {
      var test = ['s_test_eq_TEST1', 'x_test_eq_TEST2'];
      var f = new FilterBuilder();
      expect(
        f.raw.bind(f, test)
      ).to.throw('Filter x_test_eq_TEST2 has invalid syntax').that.is.instanceOf(SyntaxError);
    });
  });

  describe('.isFilterPart', function() {
    var f = new FilterBuilder();

    describe('Is returning true for valid strings', function() {
      var testStrings = [
        'b_test_eq_true',
        'd_test_on_1537095505651',
        'n_test_eq_101',
        's_test_contains_TEST',
        's_test_isnull',
        'lb_test_in_true|false',
        'ld_test_in_1537095505651|1537095505652',
        'ln_test_notin_1|2|3',
        'ls_test_notin_a|b|c'
      ];

      for(var test of testStrings) {
        it(test, function() {
          expect(f.isFilterPart(test)).to.be.true;
        });
      }
    });

    it('Is returning false for invalid string', function() {
      expect(f.isFilterPart('x_test_eq_TEST')).to.be.false;
      expect(f.isFilterPart('s_test_xx_TEST')).to.be.false;
    });
  });

});
