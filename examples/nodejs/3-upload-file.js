
import CloudApiClient from '@bitbar/cloud-api-client';

const api = new CloudApiClient.API({
  cloudUrl: 'https://cloud.bitbar.com',
  apiKey: 'PASTE_HERE_YOUR_OWN_KEY'
});


// 3. Upload file

api.me().files().upload({
  dir: '/absolute/dir/where/is/file',
  filename: 'YOUR_GREAT_APP.apk'
}).send().then((response) => {
  console.log(response.status, response.data)
});
