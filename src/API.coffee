import APIList from './api/APIList'
import APIListDevices from './api/APIListDevices'
import APIListProperties from './api/APIListProperties'
import APIListServices from './api/APIListServices'

import APIResource from './api/APIResource'
import APIResourceDevice from './api/APIResourceDevice'
import APIResourceDeviceGroup from './api/APIResourceDeviceGroup'
import APIResourceDeviceSession from './api/APIResourceDeviceSession'
import APIResourceFile from './api/APIResourceFile'
import APIResourceFileSet from './api/APIResourceFileSet'
import APIResourceLabelGroup from './api/APIResourceLabelGroup'
import APIResourceProject from './api/APIResourceProject'
import APIResourceRun from './api/APIResourceRun'
import APIResourceUser from './api/APIResourceUser'
import APIResourceUserSession from './api/APIResourceUserSession'


# API
# Root for other API resources
#
# @class
class API

  # /me
  me: ->
    new APIResourceUser(this, 'me')

  # /user
  #
  # @param {number} id - Resource ID
  user: (id) ->
    new APIResourceUser(null, id)

  # /admin
  #
  # @todo
  admin: ->
    console.log 'TODO'

  # /user-session
  userSession: ->
    new APIResourceUserSession()

  # /devices
  devices: ->
    new APIListDevices()
    
  # /device/{id}
  #
  # @param {number} id - Resource ID
  device: (id) ->
    new APIResourceDevice(null, id)

  # /device-groups
  deviceGroups: ->
    new APIList().push('device-groups')

  # /device-groups/{id}
  #
  # @param {number} id - Resource ID
  deviceGroup: (id) ->
    new APIResourceDeviceGroup(null, id)

  # /device-status
  deviceStatuses: ->
    new APIList().push('device-status')

  # /device-status/{id}
  #
  # @param {number} id - Resource ID
  deviceStatus: (id) ->
    unless id?
      throw new Error('Resource ID cannot be null!')

    new APIResource().push('device-status', id)

  # /device-sessions
  deviceSessions: ->
    new APIList().push('device-sessions')

  # /device-sessions/{id}
  #
  # @param {number} id - Resource ID
  deviceSession: (id) ->
    new APIResourceDeviceSession(null, id)

  # /files
  files: ->
    new APIList().push('files')

  # /files/{id}
  #
  # @param {number} id - Resource ID
  file: (id) ->
    new APIResourceFile(null, id)

  # /files/{id}/file
  #
  # @param {number} id - Resource ID
  filePath: (id) ->
    unless id?
      throw new Error('Resource ID cannot be null!')

    @file(id).push('file')

  # /file-sets
  fileSets: ->
    new APIList().push('file-sets')

  # /file-sets/{id}
  #
  # @param {number} id - Resource ID
  fileSet: (id) ->
    new APIResourceFileSet(null, id)

  # /runs/config
  runsConfig: ->
    new APIResource().push('runs', 'config')

  # /runs
  runs: ->
    new APIList().push('runs')

  # /run
  #
  # @param {number} id - Resource ID
  run: (id) ->
    new APIResourceRun(null, id)

  # /projects
  projects: ->
    new APIList().push('projects')

  # /projects/{id}
  #
  # @param {number} id - Resource ID
  project: (id) ->
    new APIResourceProject(null, id)

  # /label-groups
  labelGroups: ->
    new APIList().push('label-groups')

  # /label-groups/{id}
  #
  # @param {number} id - Resource ID
  labelGroup: (id) ->
    new APIResourceLabelGroup(null, id)

  # /properties
  properties: ->
    new APIListProperties()

  # /properties/{id}
  #
  # @param {number} id - Resource ID
  property: (id) ->
    unless id?
      throw new Error('Resource ID cannot be null!')

    new APIResource().push('properties', id)

  # /services
  services: ->
    new APIListServices()

  # /sessions
  sessions: ->
    new APIList().push('sessions')

  # /license
  license: ->
    new APIResource().push('license')



export default API
