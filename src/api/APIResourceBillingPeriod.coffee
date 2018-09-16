import APIResource from './APIResource'


# APIResourceBillingPeriod
#
# @class
# @extends APIResource
class APIResourceBillingPeriod extends APIResource

  # /billing-periods/{id}
  #
  # Constructor
  constructor: (parent, id) ->
    unless id?
      throw new Error('Resource ID cannot be null!')

    super(parent)
    @push('billing-periods', id)

  # /billing-periods/{id}/receipt
  receipt: ->
    new APIResource(this).push('receipt')



export default APIResourceBillingPeriod
