import APIResource from './APIResource'

import DeviceGroup from './DeviceGroup'
import APIPageable from './APIPageable'
import File from './File'
import Run from './Run'

class Project extends APIResource
  constructor: (api, parent, id) ->
    super(api, parent)
    @api.throwUnlessId(id, 'Project')
    @pushSelector('projects', id)

  publicDeviceGroups: ->
    a = new APIResource(@api, this)
    a.pushSelector('public-device-groups')
  publicDeviceGroup: (id) ->
    a = new DeviceGroup(@api, this, id)
    a[a.length - 1] = 'public-device-groups'
    a

  deviceGroups: ->
    a = new APIPageable(@api, this)
    a.pushSelector('device-groups')
  deviceGroup: (id) ->
    new DeviceGroup(@api, this, id)

  config: ->
    a = new APIResource(@api, this)
    a.pushSelector('config')

  files: ->
    a = new APIPageable(@api, this)
    a.pushSelector('files')
  file: (id) ->
    new File(@api, this, id)

  filesZip: ->
    a = new APIPageable(@api, this)
    a.pushSelector('files.zip')

  icon: ->
    a = new APIResource(@api, this)
    a.pushSelector('icon')

  sharings: ->
    a = new APIPageable(@api, this)
    a.pushSelector('sharings')
  sharing: (id) ->
    @api.throwUnlessId(id, 'Project Sharing')
    a = new APIResource(@api, this)
    a.pushSelector('sharings', id)

  trends: ->
    a = new APIResource(@api, this)
    a.pushSelector('trends')

  runs: ->
    a = new APIPageable(@api, this)
    a.pushSelector('runs')
  run: (id) ->
    new Run(@api, this, id)

  runsExtended: ->
    a = new APIPageable(@api, this)
    a.pushSelector('runs-extended')
  runExtended: (id) ->
    @api.throwUnlessId(id, 'Project RunExtended')
    a = new APIResource(@api, this)
    a.pushSelector('runs-extended', id)

  reports: (type) ->
    a = new APIPageable(@api, this, false)
    a.pushSelector('reports', type)

  configParameters: ->
    a = new APIPageable(@api, this)
    a.pushSelector('config/parameters')
  configParameter: (id) ->
    @api.throwUnlessId(id, 'Project ConfigParameter')
    a = new APIResource(@api, this)
    a.pushSelector('config/parameters', id)

  unarchive: ->
    a = new APIResource(@api, this)
    a.pushSelector('unarchive')

  frameworks: ->
    a = new APIPageable(@api, this)
    a.pushSelector('frameworks')

  availableFrameworks: ->
    a = new APIPageable(@api, this)
    a.pushSelector('available-frameworks')
  


export default Project
