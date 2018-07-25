import APIResource from './APIResource'
import APIResourceBillingPeriod from './APIResourceBillingPeriod'
import APIResourceJob from './APIResourceJob'
import APIResourceDeviceGroup from './APIResourceDeviceGroup'
import APIResourceDeviceSession from './APIResourceDeviceSession'
import APIResourceManualSession from './APIResourceManualSession'
import APIResourceProject from './APIResourceProject'
import APIResourceFileSet from './APIResourceFileSet'
import APIResourceFile from './APIResourceFile'
import APIResourceNotification from './APIResourceNotification'

import APIList from './APIList'
import APIListDeviceTime from './APIListDeviceTime'
import APIListServices from './APIListServices'
import APIListRuns from './APIListRuns'
import APIListNotifications from './APIListNotifications'


# APIResourceUser
#
# @class
# @extends APIResource
class APIResourceUser extends APIResource

  # /users/{id} | /me
  #
  # @constructor
  constructor: (parent, id) ->
    unless id?
      throw new Error('Resource ID cannot be null!')

    super(parent)

    if id is 'me'
      @push('me')
    else
      @push('users', id)

  # /users/{id}/device-time
  deviceTime: ->
    new APIListDeviceTime(this)

  # /users/{id}/services
  services: ->
    new APIListServices(this)

  # /users/{id}/services/{id}
  service: (id) ->
    unless id?
      throw new Error('Resource ID cannot be null!')

    new APIResource(this).push('services', id)

  # /users/{id}/account-services/{id}/billing-period
  accountServiceBillingPeriod: (id) ->
    unless id?
      throw new Error('Resource ID cannot be null!')

    new APIResource(this).push('account-services', id, 'billing-period')

  # /users/{id}/billing-periods
  billingPeriods: ->
    new APIList(this).push('billing-periods')

  # /users/{id}/billing-periods/{id}
  billingPeriod: (id) ->
    new APIResourceBillingPeriod(this, id)

  # /users/{id}/jobs
  jobs: ->
    new APIList(this).push('jobs')

  # /users/{id}/jobs/{id}
  job: (id) ->
    new APIResourceJob(this, id)

  # /users/{id}/device-groups
  deviceGroups: ->
    new APIList(this).push('device-groups')

  # /users/{id}/device-groups/{id}
  deviceGroup: (id) ->
    new APIResourceDeviceGroup(this, id)

  # /users/{id}/device-sessions
  deviceSessions: ->
    new APIList(this).push('device-sessions')

  # /users/{id}/device-sessions/{id}
  deviceSession: (id) ->
    new APIResourceDeviceSession(this, id)

  # /users/{id}/device-sessions/{id} - for Manual Device Sessions only
  manualSession: (id) ->
    new APIResourceManualSession(this, id)

  # /users/{id}/projects
  projects: ->
    new APIList(this).push('projects')

  # /users/{id}/projects/{id}
  project: (id) ->
    new APIResourceProject(this, id)

  # /users/{id}/file-sets
  fileSets: ->
    new APIList(this).push('file-sets')

  # /users/{id}/file-sets/{id}
  fileSet: (id) ->
    new APIResourceFileSet(this, id)

  # /users/{id}/files
  files: ->
    new APIList(this).push('files')

  # /users/{id}/files/{id}
  file: (id) ->
    new APIResourceFile(this, id)

  # /users/{id}/runs
  runs: ->
    new APIListRuns(this)

  # /users/{id}/available-build-executors
  availableBuildExecutors: ->
    new APIList(this).push('available-build-executors')

  # /users/{id}/available-frameworks
  availableFrameworks: ->
    new APIList(this).push('available-frameworks')

  # /users/{id}/
  # /users/{id}/reset-api-key
  resetApiKey: ->
    new APIResource(this).push('reset-api-key')

  # /users/{id}/restore
  restore: ->
    new APIResource(this).push('restore')

  # /users/{id}/account/additional-users
  accountAdditionalUsers: ->
    new APIList(this).push('account', 'additional-users')

  # /users/{id}/account/additional-users/{id}
  accountAdditionalUser: (id) ->
    unless id?
      throw new Error('Resource ID cannot be null!')

    new APIResource(this).push('account', 'additional-users', id)

  # /users/{id}/feedback
  feedback: ->
    new APIResource(this).push('feedback')

  # /users/{id}/notifications
  notifications: ->
    new APIListNotifications(this)

  # /users/{id}/notifications/{id}
  notification: (id) ->
    new APIResourceNotification(this, id)

  # /users/{id}/receipts
  receipts: ->
    new APIList(this).push('receipts')

  # /users/{id}/ui-preferences
  uiPreferences: ->
    new APIResource(this).push('ui-preferences')

  # /users/{id}/integrations
  integrations: ->
    new APIList(this).push('integrations')

  # /users/{id}/integrations/{id}
  integration: (id) ->
    unless id?
      throw new Error('Resource ID cannot be null!')

    new APIResource(this).push('integrations', id)

  # /users/{id}/device-usage
  deviceUsage: ->
    new APIList(this).push('device-usage')

  # /users/{id}/statistics
  statistics: ->
    new APIList(this).push('statistics')



export default APIResourceUser
