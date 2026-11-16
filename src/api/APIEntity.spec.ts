import {AxiosHeaders} from 'axios';
import {API} from '../API';
import {APIEntity} from './APIEntity';
import {ALLOWED_HTTP_METHODS} from './models/HTTP';


describe('APIEntity', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIEntity;
  let api: API;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    service = new APIEntity(api);
  });

  describe('Instance', () => {
    it('Is created properly', () => {
      expect(service).toBeDefined();
      expect(service).toBeInstanceOf(APIEntity);
      expect(service.root).toBeDefined();
      expect(service.root).toBeInstanceOf(API);
      expect(service.first).toBeUndefined();
    });

    it('Is created properly with nested reference', () => {
      const entity = new APIEntity(api);
      entity.push('test');
      service = new APIEntity(entity);
      expect(service).toBeDefined();
      expect(service).toBeInstanceOf(APIEntity);
      expect(service.root).toBeDefined();
      expect(service.root).toBeInstanceOf(API);
      expect(service.first).toEqual('test');
    });
  });

  describe('@push', () => {
    it('should add url parts to stack', () => {
      const call = service.push('test', 'me', 'properly');
      expect(service.first).toEqual('test');
      expect(service.last).toEqual('properly');
      expect(call).toEqual(service);
    });
  });

  describe('@shift', () => {
    it('should remove first url part to stack', () => {
      service.push('test', 'me', 'properly');
      const call = service.shift();
      expect(service.first).toEqual('me');
      expect(service.last).toEqual('properly');
      expect(call).toEqual(service);
    });
  });

  describe('@restack', () => {
    it('should replace url parts in stack', () => {
      service.push('test', 'me', 'properly');
      const call = service.restack('just', 'this');
      expect(service.first).toEqual('just');
      expect(service.last).toEqual('this');
      expect(call).toEqual(service);
    });
  });

  describe('#last (setter)', () => {
    it('setter should replace last url part in stack', () => {
      service.push('test', 'me', 'properly');
      service.last = 'what';
      expect(service.first).toEqual('test');
      expect(service.last).toEqual('what');
    });
  });

  describe('@toUrl', () => {
    it('should return URL string with joined paths', () => {
      service.push('test', 'me', 'properly');
      const url = service.toUrl();
      expect(url).toEqual(`/test/me/properly`);
    });

    it('should return absolute URL string with joined paths', () => {
      service.push('test', 'me', 'properly');
      const url = service.toUrl(true);
      expect(url).toEqual(`${cloudUrl}/api/test/me/properly`);
    });
  });

  describe('@setRequestConfig', () => {
    it('should merge passed object with existing configuration', () => {
      expect((<any>service).requestConfig.withCredentials).toBeUndefined();
      const call = service.setRequestConfig({
        withCredentials: true
      });
      expect((<any>service).requestConfig.withCredentials).toEqual(true);
      expect(call).toEqual(service);
    });

    it('should deep-merge nested objects, merge arrays by index, and ignore undefined values', () => {
      service.setRequestConfig({
        params: {
          nested: {first: true, retained: true},
          values: [1, 2],
          keep: 'existing'
        }
      });

      service.setRequestConfig({
        params: {
          nested: {second: true},
          values: [3],
          keep: undefined
        }
      });

      expect((<any>service).requestConfig.params).toEqual({
        nested: {first: true, retained: true, second: true},
        values: [3, 2],
        keep: 'existing'
      });
    });

    it('should replace nested Date values instead of merging them as objects', () => {
      const originalDate = new Date('2025-01-01T00:00:00.000Z');
      const replacementDate = new Date('2025-02-01T00:00:00.000Z');
      service.setRequestConfig({params: {date: originalDate}});

      service.setRequestConfig({params: {date: replacementDate}});

      expect((<any>service).requestConfig.params.date).toBe(replacementDate);
    });
  });

  describe('@removeRequestConfig', () => {
    it('should remove requested key from existing configuration', () => {
      service.setRequestConfig({
        withCredentials: true
      });
      expect((<any>service).requestConfig.withCredentials).toEqual(true);
      const call = service.removeRequestConfig('withCredentials');
      expect((<any>service).requestConfig.withCredentials).toBeUndefined();
      expect(call).toEqual(service);
    });
  });

  describe('@headers', () => {
    it('should set headers in existing configuration in standardized way', () => {
      const call = service.headers({
        'Authorization': 'Bearer qazwsx123edc456dsfsdf',
        'some-header': 'test',
        'testheader': 'another'
      });
      expect((<any>service).requestConfig.headers['Authorization']).toEqual('Bearer qazwsx123edc456dsfsdf');
      expect((<any>service).requestConfig.headers.hasOwnProperty('Some-Header')).toBe(true);
      expect((<any>service).requestConfig.headers.hasOwnProperty('Testheader')).toBe(true);
      expect(call).toEqual(service);
    });

    it('should preserve AxiosHeaders when adding JSON content type', () => {
      service.setRequestConfig({
        headers: new AxiosHeaders({Authorization: 'Bearer token'})
      });

      service.jsonData({enabled: true});

      expect((<any>service).requestConfig.headers).toEqual({
        Authorization: 'Bearer token',
        'Content-Type': 'application/json'
      });
    });

    it('should preserve AxiosHeaders when adding normalized headers', () => {
      service.setRequestConfig({
        headers: new AxiosHeaders({Authorization: 'Bearer token'})
      });

      service.headers({'x-request-id': 'request-1'});

      expect((<any>service).requestConfig.headers).toEqual({
        Authorization: 'Bearer token',
        'X-Request-Id': 'request-1'
      });
    });

    it('should merge incoming AxiosHeaders with existing plain headers', () => {
      service.setRequestConfig({headers: {'X-Request-Id': 'request-1'}});

      service.setRequestConfig({
        headers: new AxiosHeaders({Authorization: 'Bearer token'})
      });

      expect((<any>service).requestConfig.headers).toEqual({
        Authorization: 'Bearer token',
        'X-Request-Id': 'request-1'
      });
    });

    it.each([false, null])('should preserve AxiosHeaders suppression value %s', (value) => {
      service.setRequestConfig({
        headers: new AxiosHeaders({Authorization: '******'})
      });

      service.setRequestConfig({
        headers: new AxiosHeaders({Authorization: value})
      });

      expect((<any>service).requestConfig.headers).toEqual({
        Authorization: value
      });
    });
  });

  describe('@method', () => {
    it('should set HTTP method in existing configuration', () => {
      const call = service.method('GET');
      expect((<any>service).requestConfig.method).toEqual('GET');
      expect(call).toEqual(service);
    });

    it('should throw error when method is not allowed', () => {
      const httpMethod = 'PATCH';
      expect(() => service.method(httpMethod)).toThrow(new Error(`Method '${httpMethod}' is not allowed! You can use: ${ALLOWED_HTTP_METHODS.join(', ')}`));
    });
  });

  describe('@get', () => {
    it('should set HTTP GET method in existing configuration', () => {
      const call = service.get();
      expect((<any>service).requestConfig.method).toEqual('GET');
      expect(call).toEqual(service);
    });
  });

  describe('@post', () => {
    it('should set HTTP POST method in existing configuration', () => {
      const call = service.post();
      expect((<any>service).requestConfig.method).toEqual('POST');
      expect(call).toEqual(service);
    });
  });

  describe('@params', () => {
    it('should set params in existing configuration', () => {
      const call = service.params({
        test: 'me',
        properly: 1
      });
      expect((<any>service).requestConfig.params.test).toEqual('me');
      expect((<any>service).requestConfig.params.properly).toEqual(1);
      expect(call).toEqual(service);
    });
  });

  describe('@getParams', () => {
    it('should return empty object if not set', () => {
      const params = service.getParams();
      expect(params).toEqual({});
    });

    it('should return params from existing configuration', () => {
      service.params({
        test: 'me',
      });
      const params = service.getParams();
      expect(params.test).toEqual('me');
    });
  });

  describe('@removeParam', () => {
    it('should remove requested param from existing configuration', () => {
      service.params({
        test: 'me',
        properly: 1
      });
      expect((<any>service).requestConfig.params.test).toEqual('me');
      expect((<any>service).requestConfig.params.properly).toEqual(1);
      const call = service.removeParam('test');
      expect((<any>service).requestConfig.params.test).toBeUndefined();
      expect(call).toEqual(service);
    });
  });

  describe('@data', () => {
    it('should set data in existing configuration', () => {
      const call = service.data({
        test: 'me',
        properly: 1
      });
      expect((<any>service).requestConfig.data.test).toEqual('me');
      expect((<any>service).requestConfig.data.properly).toEqual(1);
      expect(call).toEqual(service);
    });

    it('should replace an existing body with null', () => {
      service.data({enabled: true}).data(null);

      expect((<any>service).requestConfig.data).toBeNull();
    });
  });

  describe('@jsonData', () => {
    it('should set data and content header in existing configuration', () => {
      const call = service.jsonData({
        test: 'me',
        properly: 1
      });
      expect((<any>service).requestConfig.data.test).toEqual('me');
      expect((<any>service).requestConfig.data.properly).toEqual(1);
      expect((<any>service).requestConfig.headers['Content-Type']).toEqual('application/json');
      expect(call).toEqual(service);
    });
  });

  describe('@formData', () => {
    it('should set data in requestConfig', () => {
      const data = {foo: 'bar'};
      service.formData(data);
      expect((<any>service).requestConfig.data).toEqual(data);
    });
  });

  describe('@send', () => {
    it('should create and send HTTP request according to configuration', () => {
      const responseObject = {
        data: []
      };
      jest.spyOn(service.root.axios, 'request').mockReturnValueOnce(Promise.resolve(responseObject));

      service.send().then(response => {
        expect(response).toEqual(responseObject);
      });
    });

    it('should set default content header if none provided', async () => {
      const responseObject = {
        data: []
      };
      jest.spyOn(service.root.axios, 'request').mockReturnValueOnce(Promise.resolve(responseObject));

      await service.send();

      expect(service.root.axios.request).toHaveBeenCalledWith({
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        url: '/',
        signal: (<any>service).abortController.signal
      });
    });

    it('should serialize data if POST default request is detected', async () => {
      const responseObject = {
        data: []
      };
      jest.spyOn(service.root.axios, 'request').mockReturnValueOnce(Promise.resolve(responseObject));
      service.data({
        test: 'me'
      });

      await service.post().send();

      expect(service.root.axios.request).toHaveBeenCalledWith({
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        url: '/',
        method: 'POST',
        data: 'test=me',
        signal: (<any>service).abortController.signal
      });
    });

    it('should attach params serializer if provided', async () => {
      const responseObject = {
        data: []
      };
      jest.spyOn(service.root.axios, 'request').mockReturnValueOnce(Promise.resolve(responseObject));
      service.params({
        test: 'me'
      });

      await service.send();

      expect(service.root.axios.request).toHaveBeenCalledWith({
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        url: '/',
        params: {
          test: 'me'
        },
        paramsSerializer: {
          indexes: false,
        },
        signal: (<any>service).abortController.signal
      });
    });
  });

  describe('@abortRequest', () => {
    it('should set data in existing configuration', () => {
      const spy = jest.spyOn((<any>service).abortController, 'abort');
      service.abortRequest();
      expect(spy).toHaveBeenCalled();
    });
  });
});
