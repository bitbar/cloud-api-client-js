import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIList, DEFAULT_LIMIT, DEFAULT_OFFSET} from './APIList';
import {FilterBuilder} from '../FilterBuilder';
import {APIOrder} from './models/HTTP';


describe('APIList', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIList;
  let api: API;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    service = new APIList(api);
  });

  describe('Instance', () => {
    describe('Instance', () => {
      it('Is created properly', () => {
        expect(service).toBeDefined();
        expect(service).toBeInstanceOf(APIList);
        expect(service).toBeInstanceOf(APIEntity);
        expect(service.root).toBeDefined();
        expect(service.root).toBeInstanceOf(API);
        expect(service.first).toBeUndefined();
      });
    });
  });

  describe('@create', () => {
    it('should add url parts to stack', async () => {
      const data = {
        test: 'me',
        properly: 1
      };
      const responseObject = {
        data: []
      };
      jest.spyOn(service.root.axios, 'request').mockReturnValueOnce(Promise.resolve(responseObject));
      await service.create(data);

      expect((<any>service).requestConfig.data.test).toEqual('me');
      expect((<any>service).requestConfig.data.properly).toEqual(1);
      expect((<any>service).requestConfig.method).toEqual('POST');

      expect(service.root.axios.request).toHaveBeenCalledWith({
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        url: '/',
        method: 'POST',
        data: 'test=me&properly=1'
      });
    });
  });

  describe('@sort', () => {
    it('should set sort param with default value in existing configuration', () => {
      const call = service.sort('test');
      expect((<any>service).requestConfig.params.sort).toEqual(`test_${APIOrder.asc}`);
      expect(call).toEqual(service);
    });

    it('should set sort param in existing configuration', () => {
      const call = service.sort('test', APIOrder.desc);
      expect((<any>service).requestConfig.params.sort).toEqual(`test_${APIOrder.desc}`);
      expect(call).toEqual(service);
    });
  });

  describe('@limit', () => {
    it('should set limit param with default value in existing configuration', () => {
      const call = service.limit();
      expect((<any>service).requestConfig.params.limit).toEqual(DEFAULT_LIMIT);
      expect(call).toEqual(service);
    });

    it('should set limit param in existing configuration', () => {
      const call = service.limit(0);
      expect((<any>service).requestConfig.params.limit).toEqual(0);
      expect(call).toEqual(service);
    });

    it('should throw error if param is not a natural number', () => {
      const param = -1;
      expect(() => service.limit(param)).toThrow(new Error(`Limit '${param}' is invalid!`));
    });
  });

  describe('@getLimit', () => {
    it('should return default limit param value if not set', () => {
      const limit = service.getLimit();
      expect(limit).toEqual(DEFAULT_LIMIT);
    });

    it('should return limit param value', () => {
      service.noLimit();
      const limit = service.getLimit();
      expect(limit).toEqual(0);
    });
  });

  describe('@noLimit', () => {
    it('should set limit param to zero in existing configuration', () => {
      const call = service.noLimit();
      expect((<any>service).requestConfig.params.limit).toEqual(0);
      expect(call).toEqual(service);
    });
  });

  describe('@offset', () => {
    it('should set offset param with default value in existing configuration', () => {
      const call = service.offset();
      expect((<any>service).requestConfig.params.offset).toEqual(DEFAULT_OFFSET);
      expect(call).toEqual(service);
    });

    it('should set offset param in existing configuration', () => {
      const call = service.offset(0);
      expect((<any>service).requestConfig.params.offset).toEqual(0);
      expect(call).toEqual(service);
    });

    it('should throw error if param is not a natural number', () => {
      const param = -1;
      expect(() => service.offset(param)).toThrow(new Error(`Offset '${param}' is invalid!`));
    });
  });

  describe('@between', () => {
    it('should set limit and offset params in existing configuration', () => {
      const call = service.between(3, 10);
      expect((<any>service).requestConfig.params.offset).toEqual(3);
      expect((<any>service).requestConfig.params.limit).toEqual(8);
      expect(call).toEqual(service);
    });

    it('should throw error if param is not a natural number', () => {
      const from = -1;
      const to = 1;
      expect(() => service.between(from, to)).toThrow(new Error(`From '${from}' is invalid!`));
    });

    it('should throw error if param is not a natural number', () => {
      const from = 1;
      const to = -1;
      expect(() => service.between(from, to)).toThrow(new Error(`To '${to}' is invalid!`));
    });
  });

  describe('@only', () => {
    it('should set limit and offset params in existing configuration', () => {
      const call = service.only(3);
      expect((<any>service).requestConfig.params.offset).toEqual(3);
      expect((<any>service).requestConfig.params.limit).toEqual(1);
      expect(call).toEqual(service);
    });

    it('should throw error if param is not a natural number', () => {
      const param = -1;
      expect(() => service.only(param)).toThrow(new Error(`Index '${param}' is invalid!`));
    });
  });

  describe('@page', () => {
    it('should set limit and offset params in existing configuration', () => {
      const call = service.page();
      expect((<any>service).requestConfig.params.offset).toEqual(0);
      expect((<any>service).requestConfig.params.limit).toEqual(DEFAULT_LIMIT);
      expect(call).toEqual(service);
    });

    it('should set limit and offset params in existing configuration', () => {
      const call = service.page(3);
      expect((<any>service).requestConfig.params.offset).toEqual(2 * DEFAULT_LIMIT);
      expect((<any>service).requestConfig.params.limit).toEqual(DEFAULT_LIMIT);
      expect(call).toEqual(service);
    });

    it('should throw error if param is not a natural number', () => {
      const param = -1;
      expect(() => service.page(param)).toThrow(new Error(`Page '${param}' is invalid!`));
    });

    it('should throw error if param is not a natural number', () => {
      const param = 0;
      expect(() => service.page(param)).toThrow(new Error(`Page '${param}' is invalid!`));
    });
  });

  describe('@search', () => {
    it('should set search param in existing configuration', () => {
      const call = service.search('test');
      expect((<any>service).requestConfig.params.search).toEqual('test');
      expect(call).toEqual(service);
    });

    it('should throw error if param isn\'t a string', () => {
      const param: any = 1;
      expect(() => service.search(param)).toThrow(new Error('Search query must be a string!'));
    });
  });

  describe('@filter', () => {
    it('should set filter param in existing configuration', () => {
      const call = service.filter('test');
      expect((<any>service).requestConfig.params.filter).toEqual('test');
      expect(call).toEqual(service);
    });

    it('should set filter param in existing configuration', () => {
      const fb = new FilterBuilder();
      fb.like('test', 'me');
      const call = service.filter(fb);
      expect((<any>service).requestConfig.params.filter).toEqual('test_like_me');
      expect(call).toEqual(service);
    });

    it('should throw error if param isn\'t a string or FilterBuilder', () => {
      const param: any = 1;
      expect(() => service.filter(param)).toThrow(new Error('Filter must be either string or instance of FilterBuilder'));
    });
  });

});
