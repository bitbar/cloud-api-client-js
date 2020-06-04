import APIResource from './APIResource'
import APIResourceAccount from './APIResourceAccount';
import APIResourceBillingPeriod from './APIResourceBillingPeriod'
import APIResourceJob from './APIResourceJob'
import APIResourceDeviceGroup from './APIResourceDeviceGroup'
import APIResourceDeviceSession from './APIResourceDeviceSession'
import APIResourceProject from './APIResourceProject'
import APIResourceFile from './APIResourceFile'
import APIResourceNotification from './APIResourceNotification'
import APIResourceAccessGroup from './APIResourceAccessGroup'

import APIList from './APIList'
import APIListDeviceTime from './APIListDeviceTime'
import APIListFiles from './APIListFiles'
import APIListServices from './APIListServices'
import APIListRuns from './APIListRuns'
import APIListNotifications from './APIListNotifications'


/**
 * APIResourceUser
 *
 * @class
 * @extends APIResource
 */
class APIResourceUser extends APIResource {

  /**
   * /users/{id} | /me
   *
   * Constructor
   */
  constructor (parent: object, id: number | 'me') {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);

    if (id === 'me') {
      this.push('me');
    } else if (typeof id === 'number') {
      this.push('users', id);
    } else {
      throw new TypeError('id is not a number');
    }
  }

  // /users/{id}/account
  public account () {
    return new APIResourceAccount(this);
  }

  // /users/{id}/device-time
  public deviceTime () {
    return new APIListDeviceTime(this);
  }

  // /users/{id}/services
  public services () {
    return new APIListServices(this);
  }

  // /users/{id}/services/{id}
  public service (id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource(this).push('services', id);
  }

  // /users/{id}/account-services/{id}/billing-period
  public accountServiceBillingPeriod (id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource(this).push('account-services', id, 'billing-period');
  }

  // /users/{id}/billing-periods
  public billingPeriods () {
    return new APIList(this).push('billing-periods');
  }

  // /users/{id}/billing-periods/{id}
  public billingPeriod (id: number) {
    return new APIResourceBillingPeriod(this, id);
  }

  // /users/{id}/jobs
  public jobs () {
    return new APIList(this).push('jobs');
  }

  // /users/{id}/jobs/{id}
  public job (id: number) {
    return new APIResourceJob(this, id);
  }

  // /users/{id}/device-groups
  public deviceGroups () {
    return new APIList(this).push('device-groups');
  }

  // /users/{id}/device-groups/{id}
  public deviceGroup (id: number) {
    return new APIResourceDeviceGroup(this, id);
  }

  // /users/{id}/device-sessions
  public deviceSessions () {
    return new APIList(this).push('device-sessions');
  }

  // /users/{id}/device-sessions/{id}
  public deviceSession (id: number) {
    return new APIResourceDeviceSession(this, id);
  }

  // /users/{id}/projects
  public projects () {
    return new APIList(this).push('projects');
  }

  // /users/{id}/projects/{id}
  public project (id: number) {
    return new APIResourceProject(this, id);
  }

  // /users/{id}/files
  public files () {
    return new APIListFiles(this);
  }

  // /users/{id}/files/{id}
  public file (id: number) {
    return new APIResourceFile(this, id);
  }

  // /users/{id}/runs
  public runs () {
    return new APIListRuns(this);
  }

  // /users/{id}/available-build-executors
  public availableBuildExecutors () {
    return new APIList(this).push('available-build-executors');
  }

  // /users/{id}/available-frameworks
  public availableFrameworks () {
    return new APIList(this).push('available-frameworks');
  }

  /**
   * /users/{id}/
   * /users/{id}/reset-api-key
   */
  public resetApiKey () {
    return new APIResource(this).push('reset-api-key');
  }

  // /users/{id}/restore
  public restore () {
    return new APIResource(this).push('restore');
  }

  // /users/{id}/account/additional-users
  public accountAdditionalUsers () {
    return new APIList(this) .push('account', 'additional-users');
  }

  // /users/{id}/account/additional-users/{id}
  public accountAdditionalUser (id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource(this).push('account', 'additional-users', id);
  }

  // /users/{id}/feedback
  public feedback () {
    return new APIResource(this).push('feedback');
  }

  // /users/{id}/notifications
  public notifications () {
    return new APIListNotifications(this);
  }

  // /users/{id}/notifications/{id}
  public notification (id: number) {
    return new APIResourceNotification(this, id);
  }

  // /users/{id}/receipts
  public receipts () {
    return new APIList(this).push('receipts');
  }

  // /users/{id}/preferences
  public preferences () {
    return new APIResource(this).push('preferences');
  }

  // /users/{id}/ui-preferences
  public uiPreferences () {
    return new APIResource(this).push('ui-preferences');
  }

  // /users/{id}/integrations
  public integrations () {
    return new APIList(this).push('integrations');
  }

  // /users/{id}/integrations/{id}
  public integration (id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource(this).push('integrations', id);
  }

  // /users/{id}/device-usage
  public deviceUsage () {
    return new APIList(this).push('device-usage');
  }

  // /users/{id}/statistics
  public statistics () {
    return new APIList(this).push('statistics');
  }

  // /users/{id}/statistics
  public deviceStatistics () {
    return new APIList(this).push('device-statistics');
  }

  // /users/{id}/access-groups
  public accessGroups () {
    return new APIList(this).push('access-groups');
  }

  // /users/{id}/access-groups/{id}
  public accessGroup (id: number) {
    return new APIResourceAccessGroup(this, id);
  }

}

export default APIResourceUser
