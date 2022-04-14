import {API} from '../API';
import {APIAdminListDevices} from "./APIAdminListDevices";
import {APIAdminListNotificationPlans} from "./APIAdminListNotificationPlans";
import {APIAdminListRuns} from './APIAdminListRuns';
import {APIAdminListServices} from "./APIAdminListServices";
import {APIAdminListStatistics} from "./APIAdminListStatistics";
import {APIAdminResourceAccountService} from './APIAdminResourceAccountService';
import {APIAdminResourceCluster} from './APIAdminResourceCluster';
import {APIAdminResourceDevice} from './APIAdminResourceDevice';
import {APIAdminResourceDeviceModel} from "./APIAdminResourceDeviceModel";
import {APIAdminResourceDeviceSessionStandalone} from './APIAdminResourceDeviceSessionStandalone';
import {APIAdminResourceDeviceTime} from './APIAdminResourceDeviceTime';
import {APIAdminResourceFramework} from "./APIAdminResourceFramework";
import {APIAdminResourceLicense} from "./APIAdminResourceLicense";
import {APIAdminResourceNotificationPlan} from "./APIAdminResourceNotificationPlan";
import {APIAdminResourceRunStandalone} from './APIAdminResourceRunStandalone';
import {APIAdminResourceService} from "./APIAdminResourceService";
import {APIAdminResourceUser} from './APIAdminResourceUser';
import {APIEntity} from './APIEntity';
import {APIList} from './APIList'
import {APIResource} from './APIResource'
import {APIResourceAccessGroup} from './APIResourceAccessGroup';
import {APIResourceDeviceGroup} from "./APIResourceDeviceGroup";
import {APIResourceFile} from './APIResourceFile'
import {APIResourceProject} from './APIResourceProject';


/**
 * APIAdminResource
 *
 * @class
 * @extends APIResource
 */
export class APIAdminResource extends APIResource {

  /**
   * /admin
   *
   * Constructor
   */
  constructor (parent: APIEntity<any> | API) {
    super(parent);
  }

  // /access-groups
  accessGroups () {
    return new APIList(this).push('access-groups');
  }

  // /access-groups/{id}
  accessGroup (id: number) {
    return new APIResourceAccessGroup(this, id);
  }

  // /admin/accounts
  accounts () {
    return new APIList(this).push('admin', 'accounts');
  }

  // /admin/accounts/{id}
  account (id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource(this).push('admin', 'accounts', id);
  }

  // /admin/account-services
  accountServices () {
    return new APIList(this).push('admin', 'account-services');
  }

  // /admin/account-services/{id}
  accountService (id: number) {
    return new APIAdminResourceAccountService(this, id);
  }

  // activities
  activities () {
    return new APIList(this).push('admin', 'activities');
  }

  // /admin/billing-periods
  billingPeriods () {
    return new APIList(this).push('admin', 'billing-periods');
  }

  // /admin/billing-periods/{id}
  billingPeriod (id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource(this).push('admin', 'billing-periods', id);
  }

  // /admin/browsers
  browsers () {
    return new APIList(this).push('admin', 'browsers');
  }

  // /admin/browsers/{id}
  browser (id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource(this).push('admin', 'browsers', id);
  }

  // /clusters
  clusters () {
    return new APIList(this).push('clusters');
  }

  // /clusters/{id}
  cluster (id: number) {
    return new APIAdminResourceCluster(this, id);
  }

  // /admin/country-vat-rates
  countryVatRates () {
    return new APIList(this).push('admin', 'country-vat-rates');
  }

  // /admin/country-vat-rates/{id}
  countryVatRate (id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource(this).push('admin', 'country-vat-rates', id);
  }

  // /admin/devices
  devices () {
    return new APIAdminListDevices(this);
  }

  // /admin/devices/{id}
  device (id: number) {
    return new APIAdminResourceDevice(this, id);
  }

  devicesForModel (id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    const a = this.devices();
    a.params({
      filter: 'deviceModelId_eq_' + id
    });
    return a;
  }

  // /admin/device/statuses
  deviceStatuses () {
    return new APIList(this).push('admin', 'device', 'statuses');
  }

  // /admin/device-models
  deviceModels () {
    return new APIList(this).push('admin', 'device-models');
  }

  // /admin/device-models/{id}
  deviceModel (id: number) {
    return new APIAdminResourceDeviceModel(this, id);
  }

  // /admin/device-problems
  deviceProblems () {
    return new APIList(this).push('admin', 'device-problems');
  }

  // /admin/device-model-criteria
  deviceModelCriterias () {
    return new APIList(this).push('admin', 'device-model-criteria');
  }

  // /admin/device-model-criteria/{id}
  deviceModelCriteria (id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource(this).push('admin', 'device-model-criteria', id);
  }

  // /device-sessions
  deviceSessions () {
    return new APIList(this).push('admin', 'device-sessions');
  }

  // /device-sessions/{id}
  deviceSession (id: number) {
    return new APIAdminResourceDeviceSessionStandalone(this, id);
  }

  // /device-time
  deviceTime () {
    return new APIAdminResourceDeviceTime(this);
  }

  // /device-time-summary
  deviceTimeSummary () {
    return new APIList(this).push('admin', 'device-time-summary');
  }

  // /device-types
  deviceTypes () {
    return new APIList(this).push('admin', 'device-types');
  }

  // /device-types/{id}
  deviceType (id: number) {
    return new APIResource(this).push('admin', 'device-types', id);
  }

  // /device-groups
  deviceGroups () {
    return new APIList(this).push('device-groups');
  }
  // /device-groups/{id}
  deviceGroup (id: number) {
    return new APIResourceDeviceGroup(this, id);
  }

  // /admin/emails
  emails () {
    return new APIList(this).push('admin', 'emails');
  }

  // /admin/emails/{id}/resend
  resendEmail (id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }
    return new APIResource(this).push('admin', 'emails', id, 'resend').post();
  }

  // /admin/errors
  errors () {
    return new APIList(this).push('admin', 'errors')
  }

  // /files
  files () {
    return new APIList(this).push('files');
  }

  // /files/{id}
  file (id: number) {
    return new APIResourceFile(this, id);
  }

  // /admin/frameworks
  frameworks () {
    return new APIList(this).push('admin', 'frameworks')
  }

  // /admin/frameworks/{id}
  framework (id: number) {
    return new APIAdminResourceFramework(this, id)
  }

  // /admin/frameworks/available-labels
  frameworkAvailableLabels () {
    const a = this.frameworks();
    a.push('available-labels');
    return a;
  }

  // /admin/interactive-queue
  interactiveQueue () {
    return new APIList(this).push('admin', 'interactive-queue');
  }

  // /admin/licenses
  licenses () {
    return new APIList(this).push('admin', 'licenses')
  }

  // /admin/licenses/{id}
  license (id: number) {
    return new APIAdminResourceLicense(this, id)
  }

  // /admin/maintenance
  maintenance () {
    return new APIResource(this).push('admin', 'maintenance');
  }

  // /admin/market-shares
  marketShares () {
    return new APIList(this).push('admin', 'market-shares')
  }

  // /admin/notification-plans
  notificationPlans () {
    return new APIAdminListNotificationPlans(this)
  }

  // /admin/notification-plans/{id}
  notificationPlan (id: number) {
    return new APIAdminResourceNotificationPlan(this, id)
  }

  // /admin/overview
  overview () {
    return new APIResource(this).push('admin', 'overview');
  }

  pools () {
    return new APIList(this).push('admin', 'pools');
  }

  pool (id: number) {
    return new APIResource(this).push('admin', 'pools', id);
  }

  // /projects
  projects () {
    return new APIList(this).push('projects');
  }

  // /projects/{id}
  project (id: number) {
    return new APIResourceProject(this, id);
  }

  // /admin/roles
  roles () {
    return new APIList(this).push('admin', 'roles')
  }

  // /admin/runs
  runs () {
    return new APIAdminListRuns(this);
  }

  // /runs/{id}
  run (id: number) {
    return new APIAdminResourceRunStandalone(this, id);
  }

  // /admin/samples
  samples () {
    return new APIList(this).push('admin', 'samples')
  }

  // /admin/samples/{id}
  sample (id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }
    return new APIResource(this).push('admin', 'samples', id);
  }

  // /admin/services
  services () {
    return new APIAdminListServices(this)
  }

  // /admin/services/{id}
  service (id: number) {
    return new APIAdminResourceService(this, id)
  }

  // /admin/settings
  settings () {
    return new APIResource(this).push('admin', 'settings')
  }

  // /admin/statistics
  statistics () {
    return new APIAdminListStatistics(this)
  }

  // /users
  users () {
    return new APIList(this).push('users');
  }

  // /admin/users
  createUser () {
    return new APIList(this).push('admin', 'users').post();
  }

  // /users/{id}
  user (id: number) {
    return new APIAdminResourceUser(this, id);
  }

}

export default APIAdminResource
