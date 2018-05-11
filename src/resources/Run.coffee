import APIResource from './APIResource'
import APIPageable from './APIPageable'

import File from './File'
import DeviceSession from './DeviceSession'

class Run extends APIResource
  constructor: (api, parent, id) ->
    super(api, parent)
    @api.throwUnlessId(id, 'Run')
    @pushSelector('runs', id)

  files: ->
    a = new APIPageable(@api, this)
    a.pushSelector('files')
  file: (name) ->
    new File(@api, this, name)

  tags: ->
    a = new APIPageable(@api, this)
    a.pushSelector('tags')
  tag: (id) ->
    @api.throwUnlessId(id, 'Run Tag')
    a = new APIResource(@api, this)
    a.pushSelector('tags', id)

  deviceSessions: ->
    a = new APIPageable(@api, this)
    a.pushSelector('device-sessions')
  deviceSession: (id) ->
    new DeviceSession(@api, this, id)

  changeBillable: ->
    a = new APIResource(@api, this)
    a.pushSelector('changebillable')

  changePriority: ->
    a = new APIResource(@api, this)
    a.pushSelector('changepriority')

  videoRecording: (id) ->
    @api.throwUnlessId(id, 'Run ScreenRecording')
    a = new APIResource(@api, this)
    a.pushSelector('video-recording', id)

  reports: (type) ->
    a = new APIPageable(@api, this, false)
    a.pushSelector('reports', type)

  steps: ->
    a = new APIPageable(@api, this)
    a.pushSelector('steps')

  screenRecordings: ->
    a = new APIPageable(@api, this)
    a.pushSelector('screen-recordings')

  screenshotNames: ->
    a = new APIPageable(@api, this)
    a.pushSelector('screenshot-names')

  screenshots: ->
    a = new APIPageable(@api, this)
    a.pushSelector('screenshots')


  # Actions specific to Test runs
  abort: ->
    @pushSelector('abort')
    @_post()

  retry: (ids) ->
    @pushSelector('retry')
    params = { timeout: 0 }
    if ids?
      params.params = { deviceRunIds: ids }
    @_post(params)

  buildLogs: (ids) ->
    @pushSelector('build-logs.zip')
    params = {}
    if ids?
      params.params = { deviceRunIds: ids }
    @_post(params)

  config: ->
    a = new APIResource(@api, this)
    a.pushSelector('config')


  # Downloading stuff
  appsDataZip: ->
    a = new APIPageable(@api, this)
    a.pushSelector('apps-data.zip')

  screenshotsZip: ->
    a = new APIPageable(@api, this)
    a.pushSelector('screenshots.zip')

  performanceZip: ->
    a = new APIPageable(@api, this)
    a.pushSelector('performance.zip')

  logsZip: ->
    a = new APIPageable(@api, this)
    a.pushSelector('logs.zip')

  filesZip: ->
    a = new APIPageable(@api, this)
    a.pushSelector('files.zip')

  buildLogsZip: ->
    a = new APIPageable(@api, this)
    a.pushSelector('build-logs.zip')

  zipDataAvailability: ->
    a = new APIPageable(@api, this)
    a.pushSelector('data-availability')
  


export default Run
