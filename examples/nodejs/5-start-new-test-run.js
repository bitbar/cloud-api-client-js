
import CloudApiClient from '@bitbar/cloud-api-client';

const api = new CloudApiClient.API({
  cloudUrl: 'https://cloud.bitbar.com',
  apiKey: 'PASTE_HERE_YOUR_OWN_KEY'
});


// 5. Start a new test run

var config = {
  deviceGroupId: 14, // enter id of your device group - #14 is "Trial Android Devices"
  deviceLanguageCode: 'en_US',
  files: [
    {
      action: 'INSTALL',
      id: 0 // here enter a id that you got after uploading file - response.data in step 3 above
    }
  ],
  frameworkId: 251, // choose framework - #251 is "AppCrawler"
  osType: 'ANDROID',
  projectName: 'Project created with JS API Client'
};

api.runs().post().jsonData(config).send().then((response) => {
  console.log(response.status, response.data);
});
