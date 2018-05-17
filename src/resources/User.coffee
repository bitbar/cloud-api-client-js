import APIResource from './APIResource'
import APIPageable from './APIPageable'

import DeviceGroup from './DeviceGroup'
import DeviceSession from './DeviceSession'
import Project from './Project'
import FileSet from './FileSet'
import File from './File'
import BillingPeriod from './BillingPeriod'
import Run from './Run'
import Services from './Services'
import Service from './Service'
import Account from './Account'
import Notifications from './Notifications'
import Notification from './Notification'
import Job from './Job'

import Utils from '../Utils'

class User extends APIResource
  constructor: (api, parent, id) ->
    super(api, parent)
    Utils.throwUnlessId(id, 'User')

    if id is 'me'
      @pushSelector('me')
    else
      @pushSelector('users', id)

  deviceGroups: ->
    a = new APIPageable(@api, this)
    a.pushSelector('device-groups')
  deviceGroup: (id) ->
    new DeviceGroup(@api, this, id)

  deviceSessions: ->
    a = new APIPageable(@api, this)
    a.pushSelector('device-sessions')

  deviceUsage: ->
    a = new APIPageable(@api, this)
    a.pushSelector('device-usage')

  deviceSession: (id) ->
    new DeviceSession(@api, this, id)

  projects: ->
    a = new APIPageable(@api, this)
    a.pushSelector('projects')
  project: (id) ->
    new Project(@api, this, id)

  availableProjectTypes: ->
    a = new APIPageable(@api, this)
    a.pushSelector('available-project-types-extended')

  filesets: ->
    a = new APIPageable(@api, this)
    a.pushSelector('file-sets')
  fileset: (id) ->
    new FileSet(@api, this, id)

  files: ->
    a = new APIPageable(@api, this)
    a.pushSelector('files')
  file: (id) ->
    new File(@api, this, id)

  billingPeriods: ->
    a = new APIPageable(@api, this)
    a.pushSelector('billing-periods')
  billingPeriod: (id) ->
    new BillingPeriod(@api, this, id)

  runsConfig: ->
    a = new APIResource(@api, this)
    a.pushSelector('runs')
    a.pushSelector('config')

  runs: ->
    a = new APIPageable(@api, this)
    a.pushSelector('runs')
  run: (id) ->
    new Run(this, undefined, id)

  services: ->
    new Services(@api, this)
  service: (id) ->
    new Service(@api, this, id)

  filePath: (id) ->
    a = new APIPageable(@api, this)
    a.pushSelector('files', id)
    a.pushSelector('file')

  deviceTime: ->
    a = new APIPageable(@api, this)
    a.pushSelector('device-time')

  uiPreferences: ->
    a = new APIPageable(@api, this)
    a.pushSelector('ui-preferences')

  account: ->
    new Account(@api, this)

  receipts: ->
    a = new APIPageable(@api, this)
    a.pushSelector('receipts')
  receipt: (id) ->
    Utils.throwUnlessId(id, 'User Receipt')
    a = new APIResource(@api, this)
    a.pushSelector('receipts', id)

  resetApiKey: ->
    a = new APIPageable(@api, this)
    a.pushSelector('reset-api-key')

  integrations: ->
    a = new APIPageable(@api, this)
    a.pushSelector('integrations')
  integration: (id) ->
    a = new APIResource(@api, this)
    a.pushSelector('integrations', id)

  notifications: ->
    new Notifications(@api, this)
  notification: (id) ->
    new Notification(@api, this, id)
  
  statistics: ->
    a = new APIPageable(@api, this)
    a.pushSelector('statistics')

  restore: ->
    @pushSelector('restore')
    @_post()

  jobs: ->
    a = new APIPageable(@api, this)
    a.pushSelector('jobs')
  job: (id) ->
    new Job(@api, this, id)



export default User
