import APIResource from './APIResource'
import APIPageable from './APIPageable'

import Label from './Label'

class LabelGroup extends APIResource
  constructor: (api, parent, id) ->
    super(api, parent)
    @api.throwUnlessId(id, 'LabelGroup')
    @pushSelector('label-groups', id)

  labels: ->
    a = new APIPageable(@api, this)
    a.pushSelector('labels')
  label: (id) ->
    new Label(@api, this, id)



export default LabelGroup
