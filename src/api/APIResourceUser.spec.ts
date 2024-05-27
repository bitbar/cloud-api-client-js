import {API} from '../API';
import {APIResourceUser} from './APIResourceUser';
import {APIList} from './APIList';
import {APIResource} from './APIResource';
import {APIResourceBillingPeriod} from './APIResourceBillingPeriod';
import {APIResourceDeviceGroup} from './APIResourceDeviceGroup';
import {APIResourceDeviceSessionStandalone} from './APIResourceDeviceSessionStandalone';
import {APIResourceProject} from './APIResourceProject';
import {APIResourceFile} from './APIResourceFile';
import {APIListRuns} from './APIListRuns';
import {APIListFiles} from './APIListFiles';
import {APIListNotifications} from './APIListNotifications';
import {APIResourceNotification} from './APIResourceNotification';
import {APIResourceAccessGroup} from './APIResourceAccessGroup';
import {APIListSmartbearTunnels} from './APIListSmartbearTunnels';
import {APIListServices} from './APIListServices';
import {APIListDeviceTime} from './APIListDeviceTime';
import {APIUserResourceAccount} from './APIUserResourceAccount';


describe('APIResourceUser', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let serviceNumberId: APIResourceUser;
  let serviceWithMeId: APIResourceUser;
  let api: API;
  const baseId = 1;
  const baseUrl = `/users/${baseId}`

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    serviceNumberId = new APIResourceUser(api, baseId);
    serviceWithMeId = new APIResourceUser(api, 'me');
  });

  it('should initialize proper endpoint path', () => {
    expect(serviceNumberId.toUrl()).toEqual(`${baseUrl}`);
  });

  it('should initialize proper endpoint path for "me"', () => {
    expect(serviceWithMeId.toUrl()).toEqual('/me');
  });

  it('should throw error if resource ID is missing', () => {
    const id: any = undefined;
    expect(() => new APIResourceUser(api, id)).toThrow(new Error('Resource ID cannot be null!'));
  });

  it('should throw error if resource ID is not a number', () => {
    const id: any = 'not a number';
    expect(() => new APIResourceUser(api, id)).toThrow(new Error('id is not a number'));
  });

  describe('@account', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.account();
      expect(call).toBeInstanceOf(APIUserResourceAccount);
      expect(call.toUrl()).toEqual(`${baseUrl}/account`);
    });
  });

  describe('@deviceTime', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.deviceTime();
      expect(call).toBeInstanceOf(APIListDeviceTime);
      expect(call.toUrl()).toEqual(`${baseUrl}/device-time`);
    });
  });

  describe('@deviceTimeSummary', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.deviceTimeSummary();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/device-time-summary`);
    });
  });

  describe('@services', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.services();
      expect(call).toBeInstanceOf(APIListServices);
      expect(call.toUrl()).toEqual(`${baseUrl}/services`);
    });
  });

  describe('@service', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.service(1);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/services/1`);
    });

    it('should throw error if resource ID is nulll', () => {
      const id: any = undefined;
      expect(() => serviceNumberId.service(id)).toThrow(new Error('Resource ID cannot be null!'));
    });
  });

  describe('@billingPeriods', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.billingPeriods();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/billing-periods`);
    });
  });

  describe('@billingPeriod', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.billingPeriod(1);
      expect(call).toBeInstanceOf(APIResourceBillingPeriod);
      expect(call.toUrl()).toEqual(`${baseUrl}/billing-periods/1`);
    });
  });

  describe('@deviceGroups', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.deviceGroups();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/device-groups`);
    });
  });

  describe('@deviceGroup', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.deviceGroup(1);
      expect(call).toBeInstanceOf(APIResourceDeviceGroup);
      expect(call.toUrl()).toEqual(`${baseUrl}/device-groups/1`);
    });
  });

  describe('@deviceSessions', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.deviceSessions();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/device-sessions`);
    });
  });

  describe('@deviceSession', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.deviceSession(1);
      expect(call).toBeInstanceOf(APIResourceDeviceSessionStandalone);
      expect(call.toUrl()).toEqual(`${baseUrl}/device-sessions/1`);
    });
  });

  describe('@projects', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.projects();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/projects`);
    });
  });

  describe('@markAccountOwner', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.markAccountOwner();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/mark-account-owner`);
    });
  });

  describe('@project', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.project(1);
      expect(call).toBeInstanceOf(APIResourceProject);
      expect(call.toUrl()).toEqual(`${baseUrl}/projects/1`);
    });
  });

  describe('@files', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.files();
      expect(call).toBeInstanceOf(APIListFiles);
      expect(call.toUrl()).toEqual(`${baseUrl}/files`);
    });
  });

  describe('@file', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.file(1);
      expect(call).toBeInstanceOf(APIResourceFile);
      expect(call.toUrl()).toEqual(`${baseUrl}/files/1`);
    });
  });

  describe('@runs', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.runs();
      expect(call).toBeInstanceOf(APIListRuns);
      expect(call.toUrl()).toEqual(`${baseUrl}/runs`);
    });
  });

  describe('@availableFrameworks', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.availableFrameworks();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/available-frameworks`);
    });
  });

  describe('@resetApiKey', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.resetApiKey();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/reset-api-key`);
    });
  });

  describe('@restore', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.restore();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/restore`);
    });
  });

  describe('@feedback', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.feedback();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/feedback`);
    });
  });

  describe('@notifications', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.notifications();
      expect(call).toBeInstanceOf(APIListNotifications);
      expect(call.toUrl()).toEqual(`${baseUrl}/notifications`);
    });
  });

  describe('@notification', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.notification(1);
      expect(call).toBeInstanceOf(APIResourceNotification);
      expect(call.toUrl()).toEqual(`${baseUrl}/notifications/1`);
    });
  });

  describe('@preferences', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.preferences();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/preferences`);
    });
  });

  describe('@uiPreferences', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.uiPreferences();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/ui-preferences`);
    });
  });

  describe('@deviceUsage', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.deviceUsage();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/device-usage`);
    });
  });

  describe('@statistics', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.statistics();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/statistics`);
    });
  });

  describe('@deviceStatistics', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.deviceStatistics();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/device-statistics`);
    });
  });

  describe('@accessGroups', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.accessGroups();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/access-groups`);
    });
  });

  describe('@accessGroup', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.accessGroup(1);
      expect(call).toBeInstanceOf(APIResourceAccessGroup);
      expect(call.toUrl()).toEqual(`${baseUrl}/access-groups/1`);
    });
  });

  describe('@smartbearTunnels', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.smartbearTunnels();
      expect(call).toBeInstanceOf(APIListSmartbearTunnels);
      expect(call.toUrl()).toEqual(`${baseUrl}/tunnels`);
    });
  });

  describe('@smartbearTunnel', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.smartbearTunnel(1);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/tunnels/1`);
    });
  });

  describe('@deleteAccount', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.deleteAccount();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/delete`);
    });
  });
});
