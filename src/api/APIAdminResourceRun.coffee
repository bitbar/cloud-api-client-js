import APIResource from './APIResource'
import APIResourceRun from './APIResourceRun'


# APIAdminResourceRun
#
# @class
# @extends APIResourceRun
class APIAdminResourceRun extends APIResourceRun

  # /runs/{id}/abort
  abort: ->
    new APIResource(this).push('abort').post()

  # /runs/{id}/retry
  retry: (ids) ->
    a = new APIResource(this).push('retry').config({
      timeout: 0
    }).post()
    if ids?
      a.params({
        deviceRunIds: ids
      })
    a

  # /runs/{id}/changebillable
  changeBillable: ->
    new APIResource(this).push('changebillable')

  # /runs/{id}/changepriority
  changePriority: ->
    new APIResource(this).push('changepriority')

  # /runs/{id}/screenshot-names
  screenshotNames: ->
    new APIList(this).push('screenshot-names')

  # /runs/{id}/screenshots
  screenshots: ->
    new APIList(this).push('screenshots')

  # /runs/{id}/data-availability
  dataAvailability: ->
    new APIList(this).push('data-availability')

  # /runs/{id}/apps-data.zip
  appsDataZip: ->
    new APIResource(this).push('apps-data.zip')

  # /runs/{id}/build-logs.zip
  buildLogsZip: (ids) ->
    a = new APIResource(this).push('build-logs.zip')
    if ids?
      a.params({
        deviceRunIds: ids
      })
    a

  # /runs/{id}/logs.zip
  logsZip: ->
    new APIResource(this).push('logs.zip')

  # /runs/{id}/performance.zip
  performanceZip: ->
    new APIResource(this).push('performance.zip')

  # /runs/{id}/screenshots.zip
  screenshotsZip: ->
    new APIResource(this).push('screenshots.zip')



export default APIAdminResourceRun
