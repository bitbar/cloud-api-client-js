import APIResource from './APIResource'

import Utils from '../Utils'

class BillingPeriod extends APIResource
  constructor: (api, parent, id) ->
    super(api, parent)
    Utils.throwUnlessId(id, 'BillingPeriod')
    @pushSelector('billing-periods', id)

  receipt: ->
    a = new APIResource(@api, this)
    a.pushSelector('receipt')



export default BillingPeriod
