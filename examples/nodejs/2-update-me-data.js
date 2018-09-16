
const CloudApiClient = require('@bitbar/cloud-api-client');

const api = new CloudApiClient.API({
  cloudUrl: 'https://cloud.bitbar.com',
  apiKey: 'PASTE_HERE_YOUR_OWN_KEY'
});


// 2. Update organization

api.me().post().data({
  organization: 'Hello World'
}).send().then((response) => {
  console.log(response.status, response.data)
});
