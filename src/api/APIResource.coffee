import APIEntity from './APIEntity'


# APIResource
#
# @class
# @extends APIEntity
class APIResource extends APIEntity

  # Alias for 'post'
  #
  # @public
  # @see post
  # @returns this
  update: ->
    @post()

  # Set DELETE as HTTP method
  #
  # @public
  # @returns this
  delete: ->
    @method('DELETE')



export default APIResource
