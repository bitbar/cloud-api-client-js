import API from "../../API";
import APIEntity from "../APIEntity";
import APIList from "../APIList";
import APIResource from "../APIResource";
import {NON_MEDIA_FILES_FILTER} from "./NonMedia.filter";
import OutputFileset from "./OutputFileset";

describe('OutputFileset', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let api: API;
  let service: OutputFileset;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    service = new OutputFileset(api);
  });

  describe('Instance', () => {
    it('Is created properly', () => {
      expect(service).toBeDefined();
      expect(service).toBeInstanceOf(APIResource);
      expect(service).toBeInstanceOf(APIEntity);
      expect(service.root).toBeDefined();
      expect(service.root).toBeInstanceOf(API);
      expect(service.last).toEqual('output-file-set');
    });

    it('should be non requestable', async () => {
      await expect(service.send()).rejects.toBeUndefined();
    });
  });

  describe('@files', () => {
    it('should return hook to files collection endpoint', () => {
      const call = service.files();
      expect(call).toBeInstanceOf(APIList);
      expect(call.first).toEqual('output-file-set');
      expect(call.last).toEqual('files');
    });
  });

  describe('@file', () => {
    it('should return hook to file resource endpoint', () => {
      const call = service.file(1);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/output-file-set/files/1');
    });

    it('should return hook to file resource endpoint', () => {
      const call = service.file(1);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/output-file-set/files/1');
    });
  });

  describe('@filesZip', () => {
    it('should return hook to zip file endpoint', () => {
      const call = service.filesZip();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.first).toEqual('output-file-set');
      expect(call.last).toEqual('files.zip');
    });
  });

  describe('@screenshots', () => {
    it('should return hook to screenshot collection endpoint', () => {
      const call = service.screenshots();
      expect(call).toBeInstanceOf(APIList);
      expect(call.first).toEqual('output-file-set');
      expect(call.last).toEqual('screenshots');
    });
  });

  describe('@screenshot', () => {
    it('should return hook to screenshot resource endpoint', () => {
      const call = service.screenshot(1);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/output-file-set/screenshots/1');
    });
  });

  describe('@screenshotFile', () => {
    it('should return hook to screenshot file resource endpoint', () => {
      const call = service.screenshotFile(1);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/output-file-set/screenshots/1/file');
    });
  });

  describe('@videos', () => {
    it('should return hook to videos collection endpoint', () => {
      const call = service.videos();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual('/output-file-set/files');
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
      expect(call.toUrl()).toEqual('/output-file-set/files');
      expect(call.getParams()).toEqual({
        filter: NON_MEDIA_FILES_FILTER.toString()
      });
    });
  });

});
