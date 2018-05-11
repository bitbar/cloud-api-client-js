import APIResource from './APIResource'

class BillingPeriod extends APIResource
  constructor: (api, parent, id) ->
    super(api, parent)
    @api.throwUnlessId(id, 'BillingPeriod')
    @pushSelector('billing-periods', id)

  receipt: ->
    a = new APIResource(@api, this)
    a.pushSelector('receipt')



export default BillingPeriod
