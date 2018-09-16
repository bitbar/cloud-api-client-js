import axios from 'axios'
import 'finka'

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

import {version} from '../package.json'

if global.isNodeJs
  # Set User-Agent
  axios.defaults.headers.common['User-Agent'] = "Bitbar Cloud API Client for JavaScript v#{version}"

# Disable max content length
axios.defaults.maxContentLength = 1073741824 # 1GB


# API
# Root for other API resources
class API

  # Mark as root
  root: true

  # Main config
  config: null

  # axios instance
  axios: null

  # Constructor
  constructor: (config) ->
    unless config?
      throw new Error('config cannot be empty!')

    @config = {}

    # Validate and correct cloudUrl if needed
    if config.cloudUrl?
      if typeof config.cloudUrl is 'string' and config.cloudUrl.length > 1
        @config.baseURL = config.cloudUrl.replace(/\/+$/, '') + '/api'
      else
        throw new Error('Invalid config.cloudUrl!')
    else
      throw new Error('config.cloudUrl is required!')

    # Check v2
    if config.v2
      @config.baseURL += '/v2'

    # Check if apiKey is set
    if config.apiKey?
      if typeof config.apiKey is 'string' and /^[A-Za-z0-9]{32}$/.test(config.apiKey)
        @config.auth = {
          username: config.apiKey
          password: ''
        }
      else
        throw new Error('Invalid config.apiKey!')

    # Create axios instance
    @axios = axios.create(@config)

    this
    

  # /me
  me: ->
    new APIResourceUser(this, 'me')

  # /user
  #
  # @param {number} id - Resource ID
  user: (id) ->
    new APIResourceUser(this, id)

  # /admin
  #
  # @todo Implement
  admin: ->
    console.log 'TODO'

  # /user-session
  userSession: ->
    new APIResourceUserSession(this)

  # /devices
  devices: ->
    new APIListDevices(this)
    
  # /device/{id}
  #
  # @param {number} id - Resource ID
  device: (id) ->
    new APIResourceDevice(this, id)

  # /device-groups
  deviceGroups: ->
    new APIList(this).push('device-groups')

  # /device-groups/{id}
  #
  # @param {number} id - Resource ID
  deviceGroup: (id) ->
    new APIResourceDeviceGroup(this, id)

  # /device-status
  deviceStatuses: ->
    new APIList(this).push('device-status')

  # /device-status/{id}
  #
  # @param {number} id - Resource ID
  deviceStatus: (id) ->
    unless id?
      throw new Error('Resource ID cannot be null!')

    new APIResource(this).push('device-status', id)

  # /device-sessions
  deviceSessions: ->
    new APIList(this).push('device-sessions')

  # /device-sessions/{id}
  #
  # @param {number} id - Resource ID
  deviceSession: (id) ->
    new APIResourceDeviceSession(this, id)

  # /files
  files: ->
    new APIList(this).push('files')

  # /files/{id}
  #
  # @param {number} id - Resource ID
  file: (id) ->
    new APIResourceFile(this, id)

  # /files/{id}/file
  #
  # @param {number} id - Resource ID
  filePath: (id) ->
    unless id?
      throw new Error('Resource ID cannot be null!')

    @file(id).push('file')

  # /file-sets
  fileSets: ->
    new APIList(this).push('file-sets')

  # /file-sets/{id}
  #
  # @param {number} id - Resource ID
  fileSet: (id) ->
    new APIResourceFileSet(this, id)

  # /runs/config
  runsConfig: ->
    new APIResource(this).push('runs', 'config')

  # /runs
  runs: ->
    new APIList(this).push('runs')

  # /run
  #
  # @param {number} id - Resource ID
  run: (id) ->
    new APIResourceRun(this, id)

  # /projects
  projects: ->
    new APIList(this).push('projects')

  # /projects/{id}
  #
  # @param {number} id - Resource ID
  project: (id) ->
    new APIResourceProject(this, id)

  # /label-groups
  labelGroups: ->
    new APIList(this).push('label-groups')

  # /label-groups/{id}
  #
  # @param {number} id - Resource ID
  labelGroup: (id) ->
    new APIResourceLabelGroup(this, id)

  # /properties
  properties: ->
    new APIListProperties(this)

  # /properties/{id}
  #
  # @param {number} id - Resource ID
  property: (id) ->
    unless id?
      throw new Error('Resource ID cannot be null!')

    new APIResource(this).push('properties', id)

  # /services
  services: ->
    new APIListServices(this)

  # /sessions
  sessions: ->
    new APIList(this).push('sessions')

  # /license
  license: ->
    new APIResource(this).push('license')



export default API
