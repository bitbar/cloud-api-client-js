import {API} from "../API";
import {APIResourceUser} from "./APIResourceUser";
import {APIList} from "./APIList";
import {APIResource} from "./APIResource";
import {APIResourceBillingPeriod} from "./APIResourceBillingPeriod";
import {APIResourceDeviceGroup} from "./APIResourceDeviceGroup";
import {APIResourceDeviceSessionStandalone} from "./APIResourceDeviceSessionStandalone";
import {APIResourceProject} from "./APIResourceProject";
import {APIResourceFile} from "./APIResourceFile";
import {APIListRuns} from "./APIListRuns";
import {APIListFiles} from "./APIListFiles";
import {APIListNotifications} from "./APIListNotifications";
import {APIResourceNotification} from "./APIResourceNotification";
import {APIResourceAccessGroup} from "./APIResourceAccessGroup";
import {APIListSmartbearTunnels} from "./APIListSmartbearTunnels";
import {APIListServices} from "./APIListServices";
import {APIListDeviceTime} from "./APIListDeviceTime";
import {APIUserResourceAccount} from "./APIUserResourceAccount";


describe('APIResourceUser', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let serviceNumberId: APIResourceUser;
  let serviceWithMeId: APIResourceUser;
  let api: API;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    serviceNumberId = new APIResourceUser(api, 1);
    serviceWithMeId = new APIResourceUser(api, 'me');
  });

  it('should initialize proper endpoint path', () => {
    expect(serviceNumberId.toUrl()).toEqual('/users/1');
  });

  it('should initialize proper endpoint path for "me"', () => {
    expect(serviceWithMeId.toUrl()).toEqual('/me');
  });

  it('should throw error if resource ID is missing', () => {
    expect(() => new APIResourceUser(api, null as any)).toThrow(new Error('Resource ID cannot be null!'));
  });

  it('should throw error if resource ID is not a number', () => {
    expect(() => new APIResourceUser(api, "not a number" as any)).toThrow(new Error('id is not a number'));
  });

  describe('@account', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.account();
      expect(call).toBeInstanceOf(APIUserResourceAccount);
      expect(call.toUrl()).toEqual('/users/1/account');
    });
  });

  describe('@deviceTime', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.deviceTime();
      expect(call).toBeInstanceOf(APIListDeviceTime);
      expect(call.toUrl()).toEqual('/users/1/device-time');
    });
  });

  describe('@deviceTimeSummary', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.deviceTimeSummary();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual('/users/1/device-time-summary');
    });
  });

  describe('@services', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.services();
      expect(call).toBeInstanceOf(APIListServices);
      expect(call.toUrl()).toEqual('/users/1/services');
    });
  });

  describe('@service', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.service(1);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/users/1/services/1');
    });

    it('should throw error if resource ID is nulll', () => {
      expect(() => serviceNumberId.service(null as any)).toThrow(new Error('Resource ID cannot be null!'));
    });
  });

  describe('@billingPeriods', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.billingPeriods();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual('/users/1/billing-periods');
    });
  });

  describe('@billingPeriod', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.billingPeriod(1);
      expect(call).toBeInstanceOf(APIResourceBillingPeriod);
      expect(call.toUrl()).toEqual('/users/1/billing-periods/1');
    });
  });

  describe('@deviceGroups', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.deviceGroups();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual('/users/1/device-groups');
    });
  });

  describe('@deviceGroup', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.deviceGroup(1);
      expect(call).toBeInstanceOf(APIResourceDeviceGroup);
      expect(call.toUrl()).toEqual('/users/1/device-groups/1');
    });
  });

  describe('@deviceSessions', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.deviceSessions();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual('/users/1/device-sessions');
    });
  });

  describe('@deviceSession', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.deviceSession(1);
      expect(call).toBeInstanceOf(APIResourceDeviceSessionStandalone);
      expect(call.toUrl()).toEqual('/users/1/device-sessions/1');
    });
  });

  describe('@projects', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.projects();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual('/users/1/projects');
    });
  });

  describe('@project', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.project(1);
      expect(call).toBeInstanceOf(APIResourceProject);
      expect(call.toUrl()).toEqual('/users/1/projects/1');
    });
  });

  describe('@files', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.files();
      expect(call).toBeInstanceOf(APIListFiles);
      expect(call.toUrl()).toEqual('/users/1/files');
    });
  });

  describe('@file', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.file(1);
      expect(call).toBeInstanceOf(APIResourceFile);
      expect(call.toUrl()).toEqual('/users/1/files/1');
    });
  });

  describe('@runs', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.runs();
      expect(call).toBeInstanceOf(APIListRuns);
      expect(call.toUrl()).toEqual('/users/1/runs');
    });
  });

  describe('@availableFrameworks', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.availableFrameworks();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual('/users/1/available-frameworks');
    });
  });

  describe('@resetApiKey', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.resetApiKey();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/users/1/reset-api-key');
    });
  });

  describe('@restore', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.restore();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/users/1/restore');
    });
  });

  describe('@feedback', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.feedback();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/users/1/feedback');
    });
  });

  describe('@notifications', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.notifications();
      expect(call).toBeInstanceOf(APIListNotifications);
      expect(call.toUrl()).toEqual('/users/1/notifications');
    });
  });

  describe('@notification', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.notification(1);
      expect(call).toBeInstanceOf(APIResourceNotification);
      expect(call.toUrl()).toEqual('/users/1/notifications/1');
    });
  });

  describe('@preferences', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.preferences();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/users/1/preferences');
    });
  });

  describe('@uiPreferences', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.uiPreferences();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/users/1/ui-preferences');
    });
  });

  describe('@deviceUsage', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.deviceUsage();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual('/users/1/device-usage');
    });
  });

  describe('@statistics', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.statistics();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/users/1/statistics');
    });
  });

  describe('@deviceStatistics', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.deviceStatistics();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual('/users/1/device-statistics');
    });
  });

  describe('@accessGroups', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.accessGroups();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual('/users/1/access-groups');
    });
  });

  describe('@accessGroup', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.accessGroup(1);
      expect(call).toBeInstanceOf(APIResourceAccessGroup);
      expect(call.toUrl()).toEqual('/users/1/access-groups/1');
    });
  });

  describe('@smartbearTunnels', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.smartbearTunnels();
      expect(call).toBeInstanceOf(APIListSmartbearTunnels);
      expect(call.toUrl()).toEqual('/users/1/tunnels');
    });
  });

  describe('@smartbearTunnel', () => {
    it('should initialize proper endpoint path', () => {
      const call = serviceNumberId.smartbearTunnel(1);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/users/1/tunnels/1');
    });
  });
});
