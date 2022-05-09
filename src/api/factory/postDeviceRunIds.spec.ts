import API from "../../API";
import APIEntity from "../APIEntity";
import APIResource from "../APIResource";
import postDeviceRunIds from "./postDeviceRunIds";

describe('postDeviceRunIds', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let api: API;
  let entity: APIEntity;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    entity = new APIEntity(api);
  });

  it('should return resource', () => {
    const call = postDeviceRunIds(entity, 'test');
    expect(call).toBeInstanceOf(APIResource);
    expect(call.last).toEqual('test');
  });

  it('should return resource with preset query param', () => {
    const ids = [1, 2, 3];
    const call = postDeviceRunIds(entity, 'test', ids);
    expect(call).toBeInstanceOf(APIResource);
    expect(call.last).toEqual('test');
    expect(call.getParams()).toEqual({
      deviceRunIds: ids
    });
  });

});
