import APIList from './APIList'
import APIListPurchased from './APIListPurchased'


# APIListServices
#
# @class
# @extends APIList
class APIListServices extends APIList

  # Constructor
  constructor: (parent) ->
    super(parent)
    @push('services')

  # /services/purchased
  purchased: ->
    new APIListPurchased(this)

  # /services/available
  available: ->
    @push('available')

  # /services/active
  active: ->
    if @_stack[0] is 'me'
      @push('active')
    else
      now = Date.now()
      @filter("d_activateTime_before_#{now};d_archiveTime_afterornull_#{now}").sort('name', 'a').all()

  # Get activated
  activated: ->
    now = Date.now()
    @filter("d_startTime_before_#{now};d_endTime_afterornull_#{now}").sort('name', 'a').all()



export default APIListServices
