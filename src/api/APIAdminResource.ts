import APIList from './APIList'

import APIResource from './APIResource'
import APIResourceFile from './APIResourceFile'
import APIResourceProject from './APIResourceProject';
import APIResourceAccessGroup from './APIResourceAccessGroup';

import APIAdminListRuns from './APIAdminListRuns';

import APIAdminResourceCluster from './APIAdminResourceCluster';
import APIAdminResourceDeviceTime from './APIAdminResourceDeviceTime';
import APIAdminResourceRunStandalone from './APIAdminResourceRunStandalone';
import APIAdminResourceDevice from './APIAdminResourceDevice';
import APIAdminResourceAccountService from './APIAdminResourceAccountService';
import APIAdminResourceUser from './APIAdminResourceUser';
import APIAdminResourceDeviceSessionStandalone from './APIAdminResourceDeviceSessionStandalone';
import APIAdminListDevices from "./APIAdminListDevices";
import APIResourceDeviceGroup from "./APIResourceDeviceGroup";
import APIAdminResourceFramework from "./APIAdminResourceFramework";


/**
 * APIAdminResource
 *
 * @class
 * @extends APIResource
 */
class APIAdminResource extends APIResource {

  /**
   * /admin
   *
   * Constructor
   */
  constructor (parent: object) {
    super(parent);
  }

  // /access-groups
  public accessGroups () {
    return new APIList(this).push('access-groups');
  }

  // /access-groups/{id}
  public accessGroup (id: number) {
    return new APIResourceAccessGroup(this, id);
  }

  // /admin/accounts
  public accounts () {
    return new APIList(this).push('admin', 'accounts');
  }

  // /admin/accounts/{id}
  public account (id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource(this).push('admin', 'accounts', id);
  }

  // /admin/account-services
  public accountServices () {
    return new APIList(this).push('admin', 'account-services');
  }

  // /admin/account-services/{id}
  public accountService (id: number) {
    return new APIAdminResourceAccountService(this, id);
  }

  // activities
  public activities () {
    return new APIList(this).push('admin', 'activities');
  }

  // /admin/billing-periods
  public billingPeriods () {
    return new APIList(this).push('admin', 'billing-periods');
  }

  // /admin/billing-periods/{id}
  public billingPeriod (id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource(this).push('admin', 'billing-periods', id);
  }

  public pools () {
    return new APIList(this).push('admin', 'pools');
  }

  public pool (id: number) {
    return new APIResource(this).push('admin', 'pools', id);
  }

  // /clusters
  public clusters () {
    return new APIList(this).push('clusters');
  }

  // /clusters/{id}
  public cluster (id: number) {
    return new APIAdminResourceCluster(this, id);
  }

  // /admin/country-vat-rates
  public countryVatRates () {
    return new APIList(this).push('admin', 'country-vat-rates');
  }

  // /admin/country-vat-rates/{id}
  public countryVatRate (id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource(this).push('admin', 'country-vat-rates', id);
  }

  // /admin/devices
  public devices () {
    return new APIAdminListDevices(this);
  }

  // /admin/devices/{id}
  public device (id: number) {
    return new APIAdminResourceDevice(this, id);
  }

  public devicesForModel (id: number) {
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
  public deviceStatuses () {
    return new APIList(this).push('admin', 'device', 'statuses');
  }

  // /admin/device-models
  public deviceModels () {
    return new APIList(this).push('admin', 'device-models');
  }

  // /admin/device-models/{id}
  public deviceModel (id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource(this).push('admin', 'device-models', id);
  }

  // /admin/device-problems
  public deviceProblems () {
    return new APIList(this).push('admin', 'device-problems');
  }

  // /admin/device-model-criteria
  public deviceModelCriterias () {
    return new APIList(this).push('admin', 'device-model-criteria');
  }

  // /admin/device-model-criteria/{id}
  public deviceModelCriteria (id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource(this).push('admin', 'device-model-criteria', id);
  }

  // /device-sessions
  public deviceSessions () {
    return new APIList(this).push('admin', 'device-sessions');
  }

  // /device-sessions/{id}
  public deviceSession (id: number) {
    return new APIAdminResourceDeviceSessionStandalone(this, id);
  }

  // /device-time
  public deviceTime () {
    return new APIAdminResourceDeviceTime(this);
  }

  // /device-time-summary
  public deviceTimeSummary () {
    return new APIList(this).push('admin', 'device-time-summary');
  }

  // /device-types
  public deviceTypes () {
    return new APIList(this).push('admin', 'device-types');
  }

  // /device-types/{id}
  public deviceType (id: number) {
    return new APIResource(this).push('admin', 'device-types', id);
  }

  // /device-groups
  public deviceGroups () {
    return new APIList(this).push('device-groups');
  }
  // /device-groups/{id}
  public deviceGroup (id: number) {
    return new APIResourceDeviceGroup(this, id);
  }

  // /admin/interactive-queue
  public interactiveQueue () {
    return new APIList(this).push('admin', 'interactive-queue');
  }

  // /files
  public files () {
    return new APIList(this).push('files');
  }

  // /files/{id}
  public file (id: number) {
    return new APIResourceFile(this, id);
  }

  // /admin/overview
  public overview () {
    return new APIResource(this).push('admin', 'overview');
  }

  // /projects
  public projects () {
    return new APIList(this).push('projects');
  }

  // /projects/{id}
  public project (id: number) {
    return new APIResourceProject(this, id);
  }

  // /admin/runs
  public runs () {
    return new APIAdminListRuns(this);
  }

  // /runs/{id}
  public run (id: number) {
    return new APIAdminResourceRunStandalone(this, id);
  }

  // /users
  public users () {
    return new APIList(this).push('users');
  }

  // /admin/users
  public createUser () {
    return new APIList(this).push('admin', 'users').post();
  }

  // /users/{id}
  public user (id: number) {
    return new APIAdminResourceUser(this, id);
  }

  // /admin/maintenance
  public maintenance () {
    return new APIResource(this).push('admin', 'maintenance');
  }

  // /admin/emails
  public emails () {
    return new APIList(this).push('admin', 'emails');
  }

  // /admin/emails/{id}/resend
  public resendEmail (id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }
    return new APIResource(this).push('admin', 'emails', id, 'resend').post();
  }

  // /admin/frameworks
  public frameworks () {
    return new APIList(this).push('admin', 'frameworks')
  }

  // /admin/frameworks/{id}
  public framework (id: number) {
    return new APIAdminResourceFramework(this, id)
  }

  // /admin/frameworks/available-labels
  public frameworkAvailableLabels () {
    const a = this.frameworks();
    a.push('available-labels');
    return a;
  }

  // /admin/errors
  public errors () {
    return new APIList(this).push('admin', 'errors')
  }

}

export default APIAdminResource
