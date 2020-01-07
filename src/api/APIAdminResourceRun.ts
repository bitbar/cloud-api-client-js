import APIList from './APIList'
import APIResource from './APIResource'
import APIResourceRun from './APIResourceRun'


/**
 * APIAdminResourceRun
 *
 * @class
 * @extends APIResourceRun
 */
class APIAdminResourceRun extends APIResourceRun {

  // /runs/{id}/abort
  public abort () {
    return new APIResource(this).push('abort').post();
  }

  // /runs/{id}/retry
  public retry (ids?: Array<number>) {
    var a = new APIResource(this).push('retry').setRequestConfig({
      timeout: 0
    }).post();

    if (ids != null) {
      a.params({
        deviceRunIds: ids
      });
    }

    return a;
  }

  // /runs/{id}/changebillable
  public changeBillable () {
    return new APIResource(this).push('changebillable');
  }

  // /runs/{id}/changepriority
  public changePriority () {
    return new APIResource(this).push('changepriority');
  }

  // /runs/{id}/screenshot-names
  public screenshotNames () {
    return new APIList(this).push('screenshot-names');
  }

  // /runs/{id}/screenshots
  public screenshots () {
    return new APIList(this).push('screenshots');
  }

  // /runs/{id}/data-availability
  public dataAvailability () {
    return new APIList(this).push('data-availability');
  }

  // /runs/{id}/apps-data.zip
  public appsDataZip () {
    return new APIResource(this).push('apps-data.zip');
  }

  // /runs/{id}/build-logs.zip
  public buildLogsZip (ids?: Array<number>) {
    var a = new APIResource(this).push('build-logs.zip');

    if (ids != null) {
      a.params({
        deviceRunIds: ids
      });
    }

    return a;
  }

  // /runs/{id}/logs.zip
  public logsZip () {
    return new APIResource(this).push('logs.zip');
  }

  // /runs/{id}/performance.zip
  public performanceZip () {
    return new APIResource(this).push('performance.zip');
  }

  // /runs/{id}/screenshots.zip
  public screenshotsZip () {
    return new APIResource(this).push('screenshots.zip');
  }

}

export default APIAdminResourceRun
