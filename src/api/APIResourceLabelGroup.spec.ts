import {API} from "../API";
import {APIResourceLabelGroup} from "./APIResourceLabelGroup";
import {APIResource} from "./APIResource";
import {APIList} from "./APIList";

describe('APIResourceLabelGroup', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIResourceLabelGroup;
  let api: API;
  const baseId = 1;
  const baseUrl = `/label-groups/${baseId}`

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    service = new APIResourceLabelGroup(api, baseId);
  });


  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual(`${baseUrl}`);
  });

  it('should throw error if resource ID is missing', () => {
    const id: any = undefined;
    expect(() => new APIResourceLabelGroup(api, id)).toThrow(new Error('Resource ID cannot be null!'));
  });

  describe('@labels', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.labels();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/labels`);
    });
  });

  describe('@label', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.label(1);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/labels/1`);
    });
  });

});
