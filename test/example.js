var TestdroidCloudAPIClient = require('../dist/testdroid-api-client.js');
var api = new TestdroidCloudAPIClient.API();


console.log(1, api);

x = api.me();
console.log(2, x);

x = api.me().projects();
console.log(3, x);

x = api.me().project(1).runs();
console.log(4, x);

x = api.me().project(1).runs().sort('create', 'a').search('hello');
console.log(4, x);
