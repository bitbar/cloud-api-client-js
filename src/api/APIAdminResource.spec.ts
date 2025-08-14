import {API} from '../API';
import {APIAdminListDevices} from './APIAdminListDevices';
import {APIAdminListRuns} from './APIAdminListRuns';
import {APIAdminListServices} from './APIAdminListServices';
import {APIAdminListStatistics} from './APIAdminListStatistics';
import {APIAdminResource} from './APIAdminResource';
import {APIAdminResourceAccount} from './APIAdminResourceAccount';
import {APIAdminResourceAccountService} from './APIAdminResourceAccountService';
import {APIAdminResourceCluster} from './APIAdminResourceCluster';
import {APIAdminResourceDevice} from './APIAdminResourceDevice';
import {APIAdminResourceDeviceModel} from './APIAdminResourceDeviceModel';
import {APIAdminResourceDeviceSessionStandalone} from './APIAdminResourceDeviceSessionStandalone';
import {APIAdminResourceDeviceTime} from './APIAdminResourceDeviceTime';
import {APIAdminResourceFramework} from './APIAdminResourceFramework';
import {APIAdminResourceLicense} from './APIAdminResourceLicense';
import {APIAdminResourceRunStandalone} from './APIAdminResourceRunStandalone';
import {APIAdminResourceService} from './APIAdminResourceService';
import {APIAdminResourceUser} from './APIAdminResourceUser';
import {APIList} from './APIList';
import {APIResource} from './APIResource';
import {APIResourceAccessGroup} from './APIResourceAccessGroup';
import {APIResourceDeviceGroup} from './APIResourceDeviceGroup';
import {APIResourceFile} from './APIResourceFile';
import {APIResourceProject} from './APIResourceProject';


describe('APIAdminResource', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIAdminResource;
  let api: API;
  const baseUrl = '/admin';

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    service = new APIAdminResource(api);
  });

  describe('@accessGroups', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.accessGroups();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual('/access-groups');
    });
  });

  describe('@accessGroup', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.accessGroup(1);
      expect(call).toBeInstanceOf(APIResourceAccessGroup);
    });
  });

  describe('@accounts', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.accounts();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/accounts`);
    });
  });

  describe('@account', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.account(1);
      expect(call).toBeInstanceOf(APIAdminResourceAccount);
      expect(call.toUrl()).toEqual(`${baseUrl}/accounts/1`);
    });

    it('should throw error if resource ID is missing', () => {
      const id: any = undefined;
      expect(() => service.account(id)).toThrow(new Error('Resource ID cannot be null!'));
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
      expect(call).toBeInstanceOf(APIAdminResourceAccountService);
    });
  });

  describe('@activities', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.activities();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/activities`);
    });
  });

  describe('@administrators', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.administrators();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/administrators`);
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
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/billing-periods/1`);
    });

    it('should throw error if resource ID is missing', () => {
      const id: any = undefined;
      expect(() => service.billingPeriod(id)).toThrow(new Error('Resource ID cannot be null!'));
    });
  });

  describe('@browsers', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.browsers();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/browsers`);
    });
  });

  describe('@browser', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.browser(1);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/browsers/1`);
    });

    it('should throw error if resource ID is missing', () => {
      const id: any = undefined;
      expect(() => service.browser(id)).toThrow(new Error('Resource ID cannot be null!'));
    });
  });

  describe('@clusters', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.clusters();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual('/clusters');
    });
  });

  describe('@cluster', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.cluster(1);
      expect(call).toBeInstanceOf(APIAdminResourceCluster);
    });
  });

  describe('@devices', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.devices();
      expect(call).toBeInstanceOf(APIAdminListDevices);
    });
  });

  describe('@device', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.device(1);
      expect(call).toBeInstanceOf(APIAdminResourceDevice);
    });
  });

  describe('@devicesForModel', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.devicesForModel(1);
      expect(call).toBeInstanceOf(APIAdminListDevices);
      expect((<any>call).requestConfig.params.filter).toEqual('deviceModelId_eq_1');
    });

    it('should throw error if resource ID is missing', () => {
      const id: any = undefined;
      expect(() => service.devicesForModel(id)).toThrow(new Error('Resource ID cannot be null!'));
    });
  });

  describe('@deviceStatuses', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.deviceStatuses();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/device/statuses`);
    });
  });

  describe('@deviceModels', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.deviceModels();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/device-models`);
    });
  });

  describe('@deviceModel', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.deviceModel(1);
      expect(call).toBeInstanceOf(APIAdminResourceDeviceModel);
    });
  });

  describe('@deviceProblems', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.deviceProblems();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/device-problems`);
    });
  });

  describe('@deviceModelCriterias', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.deviceModelCriterias();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/device-model-criteria`);
    });
  });

  describe('@deviceModelCriteria', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.deviceModelCriteria(1);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/device-model-criteria/1`);
    });

    it('should throw error if resource ID is missing', () => {
      const id: any = undefined;
      expect(() => service.deviceModelCriteria(id)).toThrow(new Error('Resource ID cannot be null!'));
    });
  });

  describe('@deviceSessions', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.deviceSessions();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/device-sessions`);
    });
  });

  describe('@deviceSession', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.deviceSession(1);
      expect(call).toBeInstanceOf(APIAdminResourceDeviceSessionStandalone);
    });
  });

  describe('@deviceTime', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.deviceTime();
      expect(call).toBeInstanceOf(APIAdminResourceDeviceTime);
    });
  });

  describe('@deviceTimeSummary', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.deviceTimeSummary();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/device-time-summary`);
    });
  });

  describe('@deviceTypes', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.deviceTypes();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/device-types`);
    });
  });

  describe('@deviceType', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.deviceType(1);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/device-types/1`);
    });
  });

  describe('@deviceGroups', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.deviceGroups();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual('/device-groups');
    });
  });

  describe('@deviceGroup', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.deviceGroup(1);
      expect(call).toBeInstanceOf(APIResourceDeviceGroup);
    });
  });

  describe('@emails', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.emails();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/emails`);
    });
  });

  describe('@resendEmail', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.resendEmail(1);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/emails/1/resend`);
      expect((<any>call).requestConfig.method).toEqual('POST');
    });

    it('should throw error if resource ID is missing', () => {
      const id: any = undefined;
      expect(() => service.resendEmail(id)).toThrow(new Error('Resource ID cannot be null!'));
    });
  });

  describe('@files', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.files();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual('/files');
    });
  });

  describe('@file', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.file(1);
      expect(call).toBeInstanceOf(APIResourceFile);
    });
  });

  describe('@frameworks', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.frameworks();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/frameworks`);
    });
  });

  describe('@framework', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.framework(1);
      expect(call).toBeInstanceOf(APIAdminResourceFramework);
    });
  });

  describe('@frameworkAvailableLabels', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.frameworkAvailableLabels();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/frameworks/available-labels`);
    });
  });

  describe('@interactiveQueue', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.interactiveQueue();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/interactive-queue`);
    });
  });

  describe('@license', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.licenses();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/licenses`);
    });
  });

  describe('@license', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.license(1);
      expect(call).toBeInstanceOf(APIAdminResourceLicense);
    });
  });

  describe('@maintenance', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.maintenance();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/maintenance`);
    });
  });

  describe('@overview', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.overview();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/overview`);
    });
  });

  describe('@pools', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.pools();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/pools`);
    });
  });

  describe('@pool', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.pool(1);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/pools/1`);
    });
  });

  describe('@projects', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.projects();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual('/projects');
    });
  });

  describe('@project', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.project(1);
      expect(call).toBeInstanceOf(APIResourceProject);
    });
  });

  describe('@roles', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.roles();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/roles`);
    });
  });

  describe('@runs', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.runs();
      expect(call).toBeInstanceOf(APIAdminListRuns);
    });
  });

  describe('@run', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.run(1);
      expect(call).toBeInstanceOf(APIAdminResourceRunStandalone);
    });
  });

  describe('@samples', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.samples();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/samples`);
    });
  });

  describe('@sample', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.sample(1);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/samples/1`);
    });

    it('should throw error if resource ID is missing', () => {
      const id: any = undefined;
      expect(() => service.sample(id)).toThrow(new Error('Resource ID cannot be null!'));
    });
  });

  describe('@services', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.services();
      expect(call).toBeInstanceOf(APIAdminListServices);
    });
  });

  describe('@service', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.service(1);
      expect(call).toBeInstanceOf(APIAdminResourceService);
    });
  });

  describe('@settings', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.settings();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/settings`);
    });
  });

  describe('@statistics', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.statistics();
      expect(call).toBeInstanceOf(APIAdminListStatistics);
    });
  });

  describe('@users', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.users();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual('/users');
    });
  });

  describe('@createUser', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.createUser();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/users`);
      expect((<any>call).requestConfig.method).toEqual('POST');
    });
  });

  describe('@user', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.user(1);
      expect(call).toBeInstanceOf(APIAdminResourceUser);
    });
  });

});
