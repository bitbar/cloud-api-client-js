import APIList from './APIList'

import APIResource from './APIResource'
import APIResourceFile from './APIResourceFile'
import APIResourceProject from './APIResourceProject';
import APIResourceAccessGroup from './APIResourceAccessGroup';

import APIAdminResourceCluster from './APIAdminResourceCluster';
import APIAdminResourceDeviceTime from './APIAdminResourceDeviceTime';
import APIAdminResourceRun from './APIAdminResourceRun';
import APIAdminResourceDevice from './APIAdminResourceDevice';
import APIAdminResourceDeviceSession from './APIAdminResourceDeviceSession';
import APIAdminResourceAccountService from './APIAdminResourceAccountService';
import APIAdminResourceUser from './APIAdminResourceUser';


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
    return new APIList(this).push('admin', 'devices');
  }

  // /admin/devices/{id}
  public device (id: number) {
    return new APIAdminResourceDevice(this, id);
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
    return new APIAdminResourceDeviceSession(this, id);
  }

  // /device-status
  public deviceStatuses () {
    return new APIList(this).push('device-status');
  }

  // /device-time
  public deviceTime () {
    return new APIAdminResourceDeviceTime(this);
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
    return new APIList(this).push('admin', 'runs');
  }

  // /runs/{id}
  public run (id: number) {
    return new APIAdminResourceRun(this, id);
  }

  // /users
  public users () {
    return new APIList(this).push('users');
  }

  // /users/{id}
  public user (id: number) {
    return new APIAdminResourceUser(this, id);
  }

}

export default APIAdminResource
