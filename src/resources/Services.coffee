import './APIPageable'

import './Purchased'
import './PurchasedList'

class Services extends APIPageable

  constructor: (api, parent) ->
    super(api, parent)
    @pushSelector('services')

  purchased: (id) ->
    if id?
      new Purchased(@api, this, id)
    else
      new PurchasedList(@api, this)

  available: ->
    @pushSelector('available')

  active: ->
    if @[0] is 'me'
      @pushSelector('active')
    else
      @setConstantParams({
        sort: 'name_a',
        limit: 0,
        filter: 'd_activateTime_before_' + Date.now() +
          ';d_archiveTime_afterornull_' + Date.now()
      })

  activated: ->
    @setConstantParams({
      sort: 'name_a',
      limit: 0,
      filter: 'd_startTime_before_' + Date.now() + ';d_endTime_afterornull_' + Date.now()
    })



export default Services
