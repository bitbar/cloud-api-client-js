import APIListTestRunDeviceSessions from './APIListTestRunDeviceSessions';
import API from '../API';
import APIResourceRunCommon from './APIResourceRunCommon';


describe('APIListTestRunDeviceSessions', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIListTestRunDeviceSessions;
  let api: API;
  const baseId = 1;
  const baseUrl = `/runs/${baseId}`;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    const parent = new APIResourceRunCommon(api, baseId);

    service = new APIListTestRunDeviceSessions(parent);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual(`${baseUrl}/device-sessions`);
  });
});
