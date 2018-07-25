var assert = require('assert');

// testdroid-api-client-js
describe('testdroid-api-client-js', function() {

  var TestdroidCloudAPIClient = require('../dist/testdroid-api-client.js');
  var client = new TestdroidCloudAPIClient.API({
    cloudUrl: 'https://cloud.bitbar.com'
  });

  // require
  it('client is properly created', function() {
    assert.strictEqual(client instanceof TestdroidCloudAPIClient, true);
  });

  // Utils
  describe('Utils', function() {

    // param
    it('param is working', function() {
      assert.strictEqual(
        TestdroidCloudAPIClient.Utils.param({
          one: 1,
          two: 2,
          three: [1, 2, 3]
        }),
        'one=1&two=2&three%5B%5D=1&three%5B%5D=2&three%5B%5D=3'
      );
    });

    // getUrl
    it('getUrl is working', function() {
      assert.strictEqual(
        client.getUrl('/api/test'),
        'https://cloud.bitbar.com/api/test'
      );
    });

    // getUrl
    it('extend is working', function() {
      assert.deepStrictEqual(
        TestdroidCloudAPIClient.Utils.extend({
          a: 1,
          b: {
            ba: 1,
            bb: 2
          },
          c: 3,
          d: 4
        }, {
          a: 1,
          b: {
            ba: 1,
            bb: 3
          },
          c: 4,
          e: 5
        }),
        {
          a: 1,
          b: {
            ba: 1,
            bb: 3
          },
          c: 4,
          d: 4,
          e: 5
        }
      );
    });

  });

  // API
  describe('API', function() {

    var projects = client.me().projects();

    // getAbsoluteResourcePath
    it('getAbsoluteResourcePath', function() {
      assert.strictEqual(
        projects.getAbsoluteResourcePath(),
        'https://cloud.bitbar.com/me/projects'
      );
    });

    // getUrl
    it('getUrl', function() {
      assert.strictEqual(
        projects.getUrl({
          sort: 'displayName_a',
          filter: 's_type_eq_GENERIC'
        }),
        'https://cloud.bitbar.com/me/projects?sort=displayName_a&filter=s_type_eq_GENERIC'
      );
    });

  });

});
