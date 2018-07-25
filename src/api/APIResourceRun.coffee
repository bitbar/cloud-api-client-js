import APIResource from './APIResource'
import APIResourceDeviceSession from './APIResourceDeviceSession'

import APIList from './APIList'


# APIResourceRun
#
# @class
# @extends APIResource
class APIResourceRun extends APIResource

  # /runs/{id}
  #
  # @constructor
  constructor: (parent, id) ->
    unless id?
      throw new Error('Resource ID cannot be null!')

    super(parent)
    @push('runs', id)

  # /runs/{id}/config
  config: ->
    new APIResource(this).push('config')

  # /runs/{id}/device-sessions
  deviceSessions: ->
    new APIList(this).push('device-sessions')

  # /runs/{id}/device-sessions/{id}
  deviceSession: (id) ->
    new APIResourceDeviceSession(this, id)

  # /runs/{id}/steps
  steps: ->
    new APIList(this).push('steps')

  # /runs/{id}/files
  files: ->
    new APIList(this).push('files')

  # /runs/{id}/files.zip
  filesZip: ->
    new APIResource(this).push('files.zip')

  # /runs/{id}/tags
  tags: ->
    new APIList(this).push('tags')

  # /runs/{id}/tag
  tag: (id) ->
    unless id?
      throw new Error('Resource ID cannot be null!')

    new APIResource(this).push('tags', id)



export default APIResourceRun
