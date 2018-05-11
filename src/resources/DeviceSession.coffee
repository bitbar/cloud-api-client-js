import APIResource from './APIResource'
import APIPageable from './APIPageable'

import FilterBuilder from '../FilterBuilder'

class DeviceSession extends APIResource
  constructor: (api, parent, id) ->
    super(api, parent)
    @api.throwUnlessId(id, 'DeviceSession')
    @pushSelector('device-sessions', id)

  steps: ->
    a = new APIPageable(@api, this)
    a.pushSelector('steps')

  abort: ->
    a = new APIResource(@api, this)
    a.pushSelector('abort')

  release: ->
    a = new APIResource(@api, this)
    a.pushSelector('release')

  connections: ->
    a = new APIResource(@api, this)
    a.pushSelector('connections')

  output: ->
    new OutputFileset(@api, this)

  input: ->
    new InputFileset(@api, this)

  changeBillable: ->
    a = new APIResource(@api, this)
    a.pushSelector('changebillable')

  retry: ->
    a = new APIResource(@api, this)
    a.pushSelector('retry')
    a._post({ timeout: 0 })

  logs: ->
    a = new APIResource(@api, this, 'text')
    a.pushSelector('logs')

  performance: ->
    a = new APIResource(@api, this)
    a.cacheTTL = Date.ms.MINUTE
    a.pushSelector('performance')

  screenshots: ->
    a = new APIPageable(@api, this)
    a.pushSelector('screenshots')
  screenshot: (id) ->
    @api.throwUnlessId(id, 'DeviceSession Screenshot')
    a = new APIResource(@api, this)
    a.pushSelector('screenshots', id)

  videos: ->
    @output().videos()

  testCaseRuns: ->
    a = new APIPageable(@api, this)
    a.cacheTTL = Date.ms.MINUTE
    a.pushSelector('test-case-runs')

  dataAvailability: ->
    a = new APIResource(@api, this)
    a.pushSelector('data-availability')

  clusterLogs: ->
    a = new APIResource(@api, this)
    a.pushSelector('cluster-logs')

  resultDataZip: ->
    a = new APIResource(@api, this)
    a.pushSelector('result-data.zip')



class InputFileset extends APIResource
  constructor: (api, parent) ->
    super(api, parent)
    @pushSelector('input-file-set')

  files: ->
    a = new APIPageable(@api, this)
    a.pushSelector('files')



class OutputFileset extends APIResource
  constructor: (api, parent) ->
    super(api, parent)
    @pushSelector('output-file-set')

  filesZip: ->
    a = new APIResource(@api, this)
    a.pushSelector('files.zip')

  files: ->
    a = new APIPageable(@api, this)
    a.cacheTTL = Date.ms.MINUTE
    a.pushSelector('files')

  note: (id) ->
    @api.throwUnlessId(id, 'DeviceSession Note')
    a = new APIResource(@api, this)
    a.pushSelector('notes', id)
  notes: ->
    a = new APIPageable(@api, this)
    a.pushSelector('notes')

  noteFile: (id) ->
    @note(id).pushSelector('file')

  screenshot: (id) ->
    a = new APIResource(@api, this)
    a.pushSelector('screenshots', id)
  screenshots: ->
    a = new APIPageable(@api, this)
    a.pushSelector('screenshots')

  videos: ->
    @files().setConstantParams({
      filter: 's_state_eq_READY'
      tag: ['video']
    })

  nonMediaFiles: ->
    unless @_nonMediaFilesFilter?
      @_nonMediaFilesFilter = new FilterBuilder()
      @_nonMediaFilesFilter.eq('state', 'READY')
      @_nonMediaFilesFilter.notin('mimetype', [
        # no images
        'image/png', 'image/jpg', 'image/jpeg', 'image/webp', 'image/gif',

        # no videos
        'video/mp4', 'video/avi', 'video/webm', 'video/ogg', 'video/mpeg'
      ])
    @files().setConstantParams({
      filter: @_nonMediaFilesFilter.toString()
    })

  screenshotFile: (id) ->
    @screenshot(id).pushSelector('file')



export default DeviceSession
