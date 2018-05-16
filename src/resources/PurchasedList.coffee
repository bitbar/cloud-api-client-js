import APIPageable from './APIPageable'

class PurchasedList extends APIPageable
  constructor: (api, parent) ->
    super(api, parent)
    @pushSelector('purchased')

  active: =>
    @addHook( (data) ->
      i = 0
      while i < data.length
        if data[i].active
          i++
        else
          data.splice(i, 1)
    )



export default PurchasedList
