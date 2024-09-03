
import CloudApiClient from '@bitbar/cloud-api-client';

const api = new CloudApiClient.API({
  cloudUrl: 'https://cloud.bitbar.com',
  apiKey: 'PASTE_HERE_YOUR_OWN_KEY'
});


// 1. Get /me

api.me().get().send().then((response) => {
  console.log(response.status, response.data)
});
