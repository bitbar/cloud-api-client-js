import './resources/APIResource'
import './resources/APIPageable'

import './resources/User'
import './resources/Devices'
import './resources/Device'
import './resources/File'
import './resources/FileSet'
import './resources/Run'
import './resources/Project'
import './resources/LabelGroup'
import './resources/Properties'
import './resources/Services'
import './resources/DeviceSession'
import './resources/DeviceGroup'
import './resources/UserSession'

import throwUnlessId from './Utils'

#
# API
#
class API

  user: (id) ->
    new User(this, null, id)
  me: ->
    new User(this, undefined, 'me')

  admin: ->
    new Admin(this)

  devices: ->
    new Devices(this)
  device: (id) ->
    new Device(this, null, id)

  files: ->
    a = new APIPageable(this)
    a.pushSelector('files')
  file: (id) ->
    new File(this, null, id)

  filesets: ->
    a = new APIPageable(this)
    a.pushSelector('file-sets')
  fileset: (id) ->
    new FileSet(this, null, id)

  runsConfig: ->
    a = new APIResource(this)
    a.pushSelector('runs')
    a.pushSelector('config')

  runs: ->
    a = new APIPageable(this)
    a.pushSelector('runs')
  run: (id) ->
    new Run(this, null, id)

  projects: ->
    a = new APIPageable(this)
    a.pushSelector('projects')
  project: (id) ->
    new Project(this, null, id)

  labelGroups: ->
    a = new APIPageable(this)
    a.pushSelector('label-groups')
  labelGroup: (id) ->
    new LabelGroup(this, null, id)

  deviceStatuses: ->
    a = new APIPageable(this)
    a.pushSelector('device-status')
  deviceStatus: (id) ->
    throwUnlessId(id, 'Device Status')
    a = new APIResource(this)
    a.pushSelector('device-status', id)

  property: (id) ->
    throwUnlessId(id, 'Properties')
    a = new APIResource(this, undefined)
    a.pushSelector('properties', id)
  properties: ->
    new Properties(this)

  services: ->
    new Services(this)

  filePath: (id) ->
    throwUnlessId(id, 'Files Path')
    a = new APIPageable(this)
    a.pushSelector('files', id)
    a.pushSelector('file')

  deviceSessions: ->
    a = new APIPageable(this)
    a.pushSelector('device-sessions')
  deviceSession: (id) ->
    new DeviceSession(this, null, id)

  sessions: ->
    a = new APIPageable(this)
    a.pushSelector('sessions')

  deviceGroups: ->
    a = new APIPageable(this)
    a.pushSelector('device-groups')

  deviceGroup: (id) ->
    new DeviceGroup(this, null, id)

  userSessions: ->
    a = new APIPageable(this)
    a.pushSelector('user-session')
  userSession: ->
    new UserSession(this)

  license: ->
    a = new APIResource(this)
    a.cacheTTL = Date.ms.HOUR
    a.pushSelector('license')

  sso: (name) ->
    a = new APIResource(this)
    a.pushSelector('user-sessions')
    a.pushSelector(name + '-login')
    a.getAbsoluteResourcePath()



export default API
