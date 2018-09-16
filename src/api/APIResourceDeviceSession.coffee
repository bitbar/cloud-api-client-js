import APIResource from './APIResource'
import APIList from './APIList'

import FilterBuilder from '../FilterBuilder'


# Create non-media files filter
NON_MEDIA_FILES_FILTER = new FilterBuilder()
NON_MEDIA_FILES_FILTER.eq('state', 'READY')
NON_MEDIA_FILES_FILTER.notin('mimetype', [
  # no images
  'image/png', 'image/jpg', 'image/jpeg', 'image/webp', 'image/gif',

  # no videos
  'video/mp4', 'video/avi', 'video/webm', 'video/ogg', 'video/mpeg'
])


# APIResourceDeviceSession
#
# @class
# @extends APIResource
class APIResourceDeviceSession extends APIResource

  # /device-sessions/{id}
  #
  # Constructor
  constructor: (parent, id) ->
    unless id?
      throw new Error('Resource ID cannot be null!')

    super(parent)
    @push('device-sessions', id)

  # /device-sessions/{id}/cluster-logs
  clusterLogs: ->
    new APIResource(this).push('cluster-logs')

  # /device-sessions/{id}/data-availability
  dataAvailability: ->
    new APIResource(this).push('data-availability')

  # /device-sessions/{id}/fixtures.zip
  fixturesZip: ->
    new APIResource(this).push('fixtures.zip')

  # /device-sessions/{id}/junit.xml
  junitXml: ->
    new APIResource(this).push('junit.xml')

  # /device-sessions/{id}/logs
  logs: ->
    new APIResource(this).push('logs')

  # /device-sessions/{id}/performance
  performance: ->
    new APIResource(this).push('performance')

  # /device-sessions/{id}/release
  release: ->
    new APIResource(this).push('release')

  # /device-sessions/{id}/result-data.zip
  resultDataZip: ->
    new APIResource(this).push('result-data.zip')

  # /device-sessions/{id}/screenshots
  screenshots: ->
    new APIList(this).push('screenshots')

  # /device-sessions/{id}/screenshots/{id}
  screenshot: (id) ->
    unless id?
      throw new Error('Resource ID cannot be null!')

    new APIResource(this).push('screenshots', id)

  # /device-sessions/{id}/steps
  steps: ->
    new APIList(this).push('steps')

  # /device-sessions/{id}/steps/{id}
  step: (id) ->
    unless id?
      throw new Error('Resource ID cannot be null!')

    new APIResource(this).push('steps', id)

  # /device-sessions/{id}/steps/current
  currentStep: ->
    @step('current')

  # /device-sessions/{id}/test-case-runs
  testCaseRuns: ->
    new APIList(this).push('test-case-runs')

  # /device-sessions/{id}/retry
  retry: ->
    new APIResource(this).push('retry').post()

  # /device-sessions/{id}/input-file-set
  input: ->
    new InputFileset(this)

  # /device-sessions/{id}/output-file-set
  output: ->
    new OutputFileset(this)

  # Alias for output().videos()
  videos: ->
    @output().videos()



# InputFileset
#
# @class
# @extends APIResource
class InputFileset extends APIResource

  # /input-file-set
  #
  # Constructor
  constructor: (parent) ->
    super(parent)
    @push('input-file-set')

  # /input-file-set/files
  files: ->
    new APIList(this).push('files')

  # /input-file-set/files.zip
  filesZip: ->
    new APIResource(this).push('files.zip')



# OutputFileset
#
# @class
# @extends APIResource
class OutputFileset extends APIResource

  # /output-file-set
  #
  # Constructor
  constructor: (parent) ->
    super(parent)
    @push('output-file-set')

  # /output-file-set/files
  files: ->
    new APIList(this).push('files')

  # /output-file-set/files.zip
  filesZip: ->
    new APIResource(this).push('files.zip')

  # /output-file-set/screenshots
  screenshots: ->
    new APIList(this).push('screenshots')

  # /output-file-set/screenshots/{id}
  screenshot: (id) ->
    unless id?
      throw new Error('Resource ID cannot be null!')

    new APIResource(this).push('screenshots', id)

  # /output-file-set/screenshots/{id}/file/{id}
  screenshotFile: (id) ->
    @screenshot(id).push('file')

  # Filter files out by ready videos
  videos: ->
    @files().params({
      filter: 's_state_eq_READY'
      tag: ['video']
    })

  # Filter files out by non-media
  nonMediaFiles: ->
    @files().filter(NON_MEDIA_FILES_FILTER)



export default APIResourceDeviceSession
