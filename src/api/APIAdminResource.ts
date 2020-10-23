import APIList from './APIList'

import APIResource from './APIResource'
import APIResourceFile from './APIResourceFile'

import APIAdminResourceCluster from './APIAdminResourceCluster';
import APIAdminResourceDeviceTime from './APIAdminResourceDeviceTime';
import APIAdminResourceRun from './APIAdminResourceRun';
import APIAdminResourceDevice from './APIAdminResourceDevice';
import APIAdminResourceDeviceSession from './APIAdminResourceDeviceSession';
import APIResourceProject from './APIResourceProject';
import APIResourceAccessGroup from './APIResourceAccessGroup';


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

  private withAdmin () {
    return new APIResource(this).push('admin');
  }

  // /clusters
  public clusters () {
    return new APIList(this).push('clusters');
  }

  // /clusters/{id}
  public cluster (id: number) {
    return new APIAdminResourceCluster(this, id);
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
    return new APIResource(this).push('admin', 'device-models', id);
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
    return new APIAdminResourceDeviceTime(this.withAdmin());
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

  // /runs
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

  // /access-groups
  public accessGroups () {
    return new APIList(this).push('access-groups');
  }

  // /access-groups/{id}
  public accessGroup (id: number) {
    return new APIResourceAccessGroup(this, id);
  }

}

export default APIAdminResource
