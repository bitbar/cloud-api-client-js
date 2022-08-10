import {API} from "../API";
import {APIResourceLabelGroup} from "./APIResourceLabelGroup";
import {APIResource} from "./APIResource";
import {APIList} from "./APIList";

describe('APIResourceLabelGroup', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIResourceLabelGroup;
  let api: API;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    service = new APIResourceLabelGroup(api, 1);
  });


  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual('/label-groups/1');
  });

  it('should throw error if resource ID is missing', () => {
    expect(() => new APIResourceLabelGroup(api, null as any)).toThrow(new Error('Resource ID cannot be null!'));
  });

  describe('@labels', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.labels();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual('/label-groups/1/labels');
    });
  });

  describe('@label', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.label(1);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/label-groups/1/labels/1');
    });
  });

});
