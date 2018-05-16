var assert = require('assert');

// testdroid-api-client-js
describe('testdroid-api-client-js', function() {

  var client = require('../dist/testdroid-api-client.min.js');

  // require
  describe('typeof', function() {
    it('testdroid-api-client-js should be typeof object', function() {
      assert.equal(typeof client, 'object');
    });
  });


});
