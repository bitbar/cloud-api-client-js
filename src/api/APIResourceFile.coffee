import APIResource from './APIResource'
import APIList from './APIList'


# APIResourceFile
#
# @class
# @extends APIResource
class APIResourceFile extends APIResource

  # /files/{id}
  #
  # Constructor
  constructor: (parent, id) ->
    unless id?
      throw new Error('Resource ID cannot be null!')

    super(parent)
    @push('files', id)

  # /files/{id}/file
  file: ->
    new APIResource(this).push('file')

  # /files/{id}/icon
  icon: ->
    new APIResource(this).push('icon')

  # /files/{id}/tags
  tags: ->
    new APIList(this).push('tags')



export default APIResourceFile
