import API from '../API';
import APIListOutputFiles from './APIListOutputFiles';
import APIList from './APIList';
import {IMAGE_FILES_FILTER, NON_MEDIA_FILES_FILTER} from './class';

describe('APIListOutputFiles', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let api: API;
  let service: APIListOutputFiles;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    service = new APIListOutputFiles(api);
  });

  describe('Instance', () => {
    it('Is created properly', () => {
      expect(service).toBeDefined();
      expect(service).toBeInstanceOf(APIList);
      expect(service.root).toBeDefined();
      expect(service.root).toBeInstanceOf(API);
      expect(service.last).toEqual('files');
    });
  });

  describe('@videos', () => {
    it('should return hook to videos collection endpoint', () => {
      const call = service.videos();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual('/files');
      expect(call.getParams()).toEqual({
        filter: 's_state_eq_READY',
        tag: ['video']
      });
    });
  });

  describe('@nonMediaFiles', () => {
    it('should return hook to non media file collection endpoint', () => {
      const call = service.nonMediaFiles();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual('/files');
      expect(call.getParams()).toEqual({
        filter: NON_MEDIA_FILES_FILTER.toString()
      });
    });
  });

  describe('@performance', () => {
    it('should return hook to performance collection endpoint', () => {
      const call = service.performance();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual('/files');
      expect(call.getParams()).toEqual({
        tag: ['performance']
      });
    });
  });

  describe('@images', () => {
    it('should return hook to image file collection endpoint', () => {
      const call = service.images();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual('/files');
      expect(call.getParams()).toEqual({
        filter: IMAGE_FILES_FILTER.toString()
      });
    });
  });
});
