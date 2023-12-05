import {API} from '../API';
import {APIList} from './APIList'
import {APIListDeviceTime} from './APIListDeviceTime'
import {APIListFiles} from './APIListFiles'
import {APIListNotifications} from './APIListNotifications'
import {APIListRuns} from './APIListRuns'
import {APIListServices} from './APIListServices'
import {APIListSmartbearTunnels} from './APIListSmartbearTunnels'
import {APIResource} from './APIResource'
import {APIResourceAccessGroup} from './APIResourceAccessGroup'
import {APIResourceBillingPeriod} from './APIResourceBillingPeriod'
import {APIResourceDeviceGroup} from './APIResourceDeviceGroup'
import {APIResourceDeviceSessionStandalone} from './APIResourceDeviceSessionStandalone'
import {APIResourceFile} from './APIResourceFile'
import {APIResourceNotification} from './APIResourceNotification'
import {APIResourceProject} from './APIResourceProject'
import {APIUserResourceAccount} from './APIUserResourceAccount'
import {AccessGroup, AccessGroupsData} from './models/AccessGroup';
import {BillingPeriod} from './models/BillingPeriod';
import {DeviceGroup, DeviceGroupData, DeviceGroupIdsData, DeviceGroupWithPublicParams} from './models/DeviceGroup';
import {DeviceStatistics} from './models/DeviceStatistics';
import {DeviceUsage} from './models/DeviceUsage';
import {Framework} from './models/Framework';
import {Project, UserProjectData, UserProjectQueryParams} from './models/Project';
import {Service} from './models/Service';
import {User} from './models/User';
import {UserDeviceTimeSummary} from './models/UserDeviceTimeSummary';
import {UiPreferencesData, UserPreference} from './models/UserPreference';
import {StatisticQueryParams, UserStatistics} from './models/UserStatistics';
import {DeviceSession, DeviceSessionData, DeviceSessionQueryParams} from './models/DeviceSession';
import {CollectionBasicQueryParams, NoData, NoQueryParams} from './models/HTTP';
import {DeviceStatisticQueryParam, DeviceTimeSummaryQueryParams, DeviceUsageQueryParams} from './models/Device';

export class APIResourceUser extends APIResource<User> {

  /**
   * /users/{id} | /me
   */
  constructor(parent: API, id: number | 'me') {
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
  account() {
    return new APIUserResourceAccount(this);
  }

  // /users/{id}/device-time
  deviceTime() {
    return new APIListDeviceTime(this);
  }

  // /users/{id}/device-time-summary
  deviceTimeSummary() {
    return new APIList<UserDeviceTimeSummary, DeviceTimeSummaryQueryParams, NoData>(this).push('device-time-summary');
  }

  // /users/{id}/services
  services() {
    return new APIListServices(this);
  }

  // /users/{id}/services/{id}
  service(id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource<Service, NoQueryParams, NoData>(this).push('services', id);
  }

  // /users/{id}/billing-periods
  billingPeriods() {
    return new APIList<BillingPeriod, CollectionBasicQueryParams, NoData>(this).push('billing-periods');
  }

  // /users/{id}/billing-periods/{id}
  billingPeriod(id: number) {
    return new APIResourceBillingPeriod(this, id);
  }

  // /users/{id}/device-groups
  deviceGroups() {
    return new APIList<DeviceGroup, DeviceGroupWithPublicParams, DeviceGroupIdsData | Omit<DeviceGroupData, 'displayName'>>(this).push('device-groups');
  }

  // /users/{id}/device-groups/{id}
  deviceGroup(id: number) {
    return new APIResourceDeviceGroup(this, id);
  }

  // /users/{id}/device-sessions
  deviceSessions() {
    return new APIList<DeviceSession, DeviceSessionQueryParams, DeviceSessionData>(this).push('device-sessions');
  }

  // /users/{id}/device-sessions/{id}
  deviceSession(id: number) {
    return new APIResourceDeviceSessionStandalone(this, id);
  }

  // /users/{id}/projects
  projects() {
    return new APIList<Project, UserProjectQueryParams, UserProjectData>(this).push('projects');
  }

  // /users/{id}/projects/{id}
  project(id: number) {
    return new APIResourceProject(this, id);
  }

  // /users/{id}/files
  files() {
    return new APIListFiles(this);
  }

  // /users/{id}/files/{id}
  file(id: number) {
    return new APIResourceFile(this, id);
  }

  // /users/{id}/runs
  runs() {
    return new APIListRuns(this);
  }

  // /users/{id}/available-frameworks
  availableFrameworks() {
    return new APIList<Framework, CollectionBasicQueryParams, NoData>(this).push('available-frameworks');
  }

  /**
   * /users/{id}/reset-api-key
   */
  resetApiKey() {
    return new APIResource<User, NoQueryParams, NoData>(this).push('reset-api-key');
  }

  // /users/{id}/restore
  restore() {
    return new APIResource<User, NoQueryParams, NoData>(this).push('restore');
  }

  // /users/{id}/feedback
  feedback() {
    return new APIResource(this).push('feedback');
  }

  // /users/{id}/notifications
  notifications() {
    return new APIListNotifications(this);
  }

  // /users/{id}/notifications/{id}
  notification(id: number) {
    return new APIResourceNotification(this, id);
  }

  // /users/{id}/preferences
  preferences() {
    return new APIResource<UserPreference, NoQueryParams, UserPreference>(this).push('preferences');
  }

  // /users/{id}/ui-preferences
  uiPreferences() {
    return new APIResource<string, NoQueryParams, UiPreferencesData>(this).push('ui-preferences');
  }

  // /users/{id}/device-usage
  deviceUsage() {
    return new APIList<DeviceUsage, DeviceUsageQueryParams, NoData>(this).push('device-usage');
  }

  // /users/{id}/statistics
  statistics() {
    return new APIResource<UserStatistics, StatisticQueryParams, NoData>(this).push('statistics');
  }

  // /users/{id}/device-statistics
  deviceStatistics() {
    return new APIList<DeviceStatistics, DeviceStatisticQueryParam, NoData>(this).push('device-statistics');
  }

  // /users/{id}/access-groups
  accessGroups() {
    return new APIList<AccessGroup, CollectionBasicQueryParams, AccessGroupsData>(this).push('access-groups');
  }

  // /users/{id}/access-groups/{id}
  accessGroup(id: number) {
    return new APIResourceAccessGroup(this, id);
  }

  // /users/{id}/tunnels/{id}
  smartbearTunnel(id: number) {
    return new APIResource(this).push('tunnels', id);
  }

  // /users/{id}/tunnels
  smartbearTunnels() {
    return new APIListSmartbearTunnels(this);
  }

  deleteAccount() {
    return new APIResource(this).push('delete');
  }
}

export default APIResourceUser
