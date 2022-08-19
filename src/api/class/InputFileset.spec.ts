import API from '../../API';
import APIEntity from '../APIEntity';
import APIList from '../APIList';
import APIResource from '../APIResource';
import InputFileset from './InputFileset';

describe('InputFileset', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let api: API;
  let service: InputFileset;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    service = new InputFileset(api);
  });

  describe('Instance', () => {
    it('Is created properly', () => {
      expect(service).toBeDefined();
      expect(service).toBeInstanceOf(APIResource);
      expect(service).toBeInstanceOf(APIEntity);
      expect(service.root).toBeDefined();
      expect(service.root).toBeInstanceOf(API);
      expect(service.last).toEqual('input-file-set');
    });

    it('should be non requestable', async () => {
      await expect(service.send()).rejects.toBeUndefined();
    });
  });

  describe('@files', () => {
    it('should return hook to files collection endpoint', () => {
      const call = service.files();
      expect(call).toBeInstanceOf(APIList);
      expect(call.first).toEqual('input-file-set');
      expect(call.last).toEqual('files');
    });
  });

  describe('@filesZip', () => {
    it('should return hook to zip file endpoint', () => {
      const call = service.filesZip();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.first).toEqual('input-file-set');
      expect(call.last).toEqual('files.zip');
    });
  });

});
