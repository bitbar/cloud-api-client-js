import APIResource from './APIResource'
import APIResourceRun from './APIResourceRun'

import APIList from './APIList'


# APIResourceFile
#
# @class
# @extends APIResource
class APIResourceProject extends APIResource

  # /projects/{id}
  #
  # @constructor
  constructor: (parent, id) ->
    unless id?
      throw new Error('Resource ID cannot be null!')

    super(parent)
    @push('projects', id)

  # /projects/{id}/runs
  runs: ->
    new APIList(this).push('runs')

  # /projects/{id}/runs/{id}
  run: (id) ->
    new APIResourceRun(this, id)

  # /projects/{id}/runs-extended
  runsExtended: ->
    new APIList(this).push('runs-extended')

  # /projects/{id}/runs-extended/{id}
  runExtended: (id) ->
    unless id?
      throw new Error('Resource ID cannot be null!')

    new APIResource(this).push('runs-extended', id)

  # /projects/{id}/files
  files: ->
    new APIList(this).push('files')

  # /projects/{id}/files.zip
  filesZip: ->
    new APIResource(this).push('files.zip')

  # /projects/{id}/sharings
  sharings: ->
    new APIList(this).push('sharings')

  # /projects/{id}/sharings/{id}
  sharing: (id) ->
    unless id?
      throw new Error('Resource ID cannot be null!')

    new APIResource(this).push('sharings', id)



export default APIResourceProject
