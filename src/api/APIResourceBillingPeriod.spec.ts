import {API} from "../API";
import {APIResourceBillingPeriod} from "./APIResourceBillingPeriod";
import {APIResource} from "./APIResource";
import {APIResourceUser} from "./APIResourceUser";


describe('APIResourceBillingPeriod', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIResourceBillingPeriod;
  let resourceUser: APIResourceUser;
  let api: API;
  const baseId = 1;
  const baseUrl = `/users/${baseId}/billing-periods/${baseId}`;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    resourceUser = new APIResourceUser(api, baseId);
    service = new APIResourceBillingPeriod(resourceUser, baseId);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual(`${baseUrl}`);
  });

  it('should throw error if resource ID is missing', () => {
    const id: any = undefined;
    expect(() => new APIResourceBillingPeriod(resourceUser, id)).toThrow(new Error('Resource ID cannot be null!'));
  });

  describe('@receipt', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.receipt();
      const requestConfigObject = {"responseType": "arraybuffer"}
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/receipt`);
      expect(call['requestConfig']).toEqual(requestConfigObject);
    });
  });

});
