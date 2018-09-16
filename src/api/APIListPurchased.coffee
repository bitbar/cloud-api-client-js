import APIList from './APIList'


# APIListPurchased
#
# @class
# @extends APIList
class APIListPurchased extends APIList

  # /purchased
  #
  # Constructor
  constructor: (parent) ->
    super(parent)
    @push('purchased')

  # Get active
  #
  # @todo: FIX
  active: =>
    @addHook( (data) ->
      i = 0
      while i < data.length
        if data[i].active
          i++
        else
          data.splice(i, 1)
    )



export default APIListPurchased
