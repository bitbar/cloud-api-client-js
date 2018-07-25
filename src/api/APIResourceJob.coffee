import APIResource from './APIResource'
import APIResourceBuild from './APIResourceBuild'

import APIList from './APIList'


# APIResourceFile
#
# @class
# @extends APIResource
class APIResourceJob extends APIResource

  # /jobs/{id}
  #
  # @constructor
  constructor: (parent, id) ->
    unless id?
      throw new Error('Resource ID cannot be null!')

    super(parent)
    @push('jobs', id)

  # /jobs/{id}/builds
  builds: ->
    new APIList(this).push('builds')

  # /jobs/{id}/builds/{id}
  build: (id) ->
    new APIResourceBuild(this, id)



export default APIResourceJob
