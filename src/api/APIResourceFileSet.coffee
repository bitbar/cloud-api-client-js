import APIResource from './APIResource'
import APIResourceFile from './APIResourceFile'

import APIList from './APIList'


# APIResourceFileSet
#
# @class
# @extends APIResource
class APIResourceFileSet extends APIResource

  # /file-sets/{id}
  #
  # Constructor
  constructor: (parent, id) ->
    unless id?
      throw new Error('Resource ID cannot be null!')

    super(parent)
    @push('file-sets', id)

  # /file-sets/{id}/files
  files: ->
    new APIList(this).push('files')

  # /file-sets/{id}/file/{id}
  file: (id) ->
    new APIResourceFile(this, id)



export default APIResourceFileSet
