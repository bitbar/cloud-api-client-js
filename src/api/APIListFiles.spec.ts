import FormData from 'form-data';
import fs from 'fs';
import API from '../API';
import APIListFiles from './APIListFiles';

describe('APIListFiles', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  const upload = {
    dir: 'user',
    filename: 'test.png'
  }
  let service: APIListFiles;

  beforeEach(() => {
    const api = new API({
      baseURL: '',
      cloudUrl
    });

    service = new APIListFiles(api);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual('/files');
  });

  describe('@upload', () => {
    it('should throw error if used in browser', () => {
      // @ts-ignore
      global.isNodeJs = false;
      try {
        service.upload(upload);
      } catch (error) {
        expect(error).toBeDefined();
      }
      // @ts-ignore
      global.isNodeJs = true;
    });

    it('should set form data sending', () => {
      const responseObject = {
        data: []
      };
      jest.spyOn(service.root.axios, 'request').mockReturnValueOnce(Promise.resolve(responseObject));
      jest.spyOn(fs, 'createReadStream');
      const result = service.upload(upload);
      expect(result).toBeInstanceOf(APIListFiles);
      expect(result.toUrl()).toEqual('/files');
      expect((<any>result).requestConfig.headers['Content-Type']).toContain('multipart/form-data; boundary=--------------------------');
      expect((<any>result).requestConfig.data).toBeInstanceOf(FormData);
    });
  });

});
