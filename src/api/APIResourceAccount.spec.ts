import {API} from '../API';
import {APIResourceAccount} from './APIResourceAccount';
import {APIResource} from './APIResource';
import {APIList} from './APIList';
import {APIResourceBillingPeriod} from './APIResourceBillingPeriod';


describe('APIResourceAccount', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIResourceAccount;
  let api: API;
  const baseId = 1;
  const baseUrl = `/accounts/${baseId}`;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    service = new APIResourceAccount(api, baseId);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual(`${baseUrl}`);
  });

  it('should throw error if resource ID is missing', () => {
    const id: any = undefined;
    expect(() => new APIResourceAccount(api, id)).toThrow(new Error('Resource ID cannot be null!'));
  });

  describe('@concurrencyStatus', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.concurrencyStatus();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/concurrency-status`);
    });
  });

  describe('@deviceTime', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.deviceTime();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/device-time`);
    });
  });

  describe('@deviceTimeSummary', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.deviceTimeSummary();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/device-time-summary`);
    });
  });

  describe('@preferences', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.preferences();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/preferences`);
    });
  });

  describe('@users', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.users();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/users`);
    });
  });

  describe('@removeUser', () => {
    it('should initialize proper endpoint path', () => {
      const userId = 123;
      const call = service.removeUser(userId);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/users/${userId}`);
    });
  });

  describe('@disableUser', () => {
    it('should initialize proper endpoint path', () => {
      const userId = 123;
      const call = service.disableUser(userId);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/users/${userId}/disable`);
    });
  });

  describe('@enableUser', () => {
    it('should initialize proper endpoint path', () => {
      const userId = 123;
      const call = service.enableUser(userId);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/users/${userId}/enable`);
    });
  });

  describe('@resendActivation', () => {
    it('should initialize proper endpoint path', () => {
      const userId = 123;
      const call = service.resendActivation(userId);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/users/${userId}/resend-activation`);
    });
  });

  describe('@billingPeriods', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.billingPeriods();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/billing-periods`);
    });
  });

  describe('@billingPeriod', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.billingPeriod(1);
      expect(call).toBeInstanceOf(APIResourceBillingPeriod);
      expect(call.toUrl()).toEqual(`${baseUrl}/billing-periods/1`);
    });
  });

  describe('@serviceBillingPeriod', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.serviceBillingPeriod(1);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/account-services/1/billing-period`);
    });

    it('should throw error if resource ID is nulll', () => {
      const id: any = undefined;
      expect(() => service.serviceBillingPeriod(id)).toThrow(new Error('Resource ID cannot be null!'));
    });
  });

  describe('@visualTestAccess', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.visualTestAccess();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/visual-tests/access`);
    });
  });

  describe('@accountServices', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.accountServices();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/account-services`);
    });
  });

  describe('@accountService', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.accountService(1);
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/account-services/1`);
    });
  });

  describe('@userUsageDetails', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.userUsageDetails();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/user-usage-details`);
    });
  });

  describe('@usageDetails', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.usageDetails();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/usage-details`);
    });
  });

  describe('@usageDetailsSummary', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.usageDetailsSummary();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/usage-details-summary`);
    });
  });

});
