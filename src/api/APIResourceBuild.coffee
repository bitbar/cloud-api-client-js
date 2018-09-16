import APIResource from './APIResource'
import APIList from './APIList'


# APIResourceBuild
#
# @class
# @extends APIResource
class APIResourceBuild extends APIResource

  # /builds/{id}
  #
  # Constructor
  constructor: (parent, id) ->
    unless id?
      throw new Error('Resource ID cannot be null!')

    super(parent)
    @push('builds', id)

  # /builds/{id}/abort
  abort: ->
    new APIResource(this).push('abort')

  # /builds/{id}/output-file-set/files
  outputFiles: ->
    new APIList(this).push('output-file-set', 'files')



export default APIResourceBuild
