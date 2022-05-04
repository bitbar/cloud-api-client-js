import API from "../../API";
import APIEntity from "../APIEntity";
import APIResource from "../APIResource";
import postAdminDeviceSessionChangeBillable from "./postAdminDeviceSessionChangeBillable";

describe('postAdminDeviceSessionChangeBillable', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let api: API;
  let entity: APIEntity;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    entity = new APIEntity(api);
    entity.push('1');
  });

  it('should return resource', () => {
    const call = postAdminDeviceSessionChangeBillable(entity, false);
    expect(call).toBeInstanceOf(APIResource);
    expect(call.toUrl()).toEqual('/admin/device-sessions/1/changebillable');
    expect(call.getParams()).toEqual({
      billable: false
    });
    expect((<any>call).requestConfig.method).toEqual('POST');
  });

  it('should return resource with preset query param', () => {
    const call = postAdminDeviceSessionChangeBillable(entity, true);
    expect(call).toBeInstanceOf(APIResource);
    expect(call).toBeInstanceOf(APIResource);
    expect(call.toUrl()).toEqual('/admin/device-sessions/1/changebillable');
    expect(call.getParams()).toEqual({
      billable: true
    });
    expect((<any>call).requestConfig.method).toEqual('POST');
  });

});
