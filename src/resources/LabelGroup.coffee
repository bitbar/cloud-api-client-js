import './APIResource'
import './APIPageable'

import './Label'

import throwUnlessId from '../Utils'

class LabelGroup extends APIResource
  constructor: (api, parent, id) ->
    super(api, parent)
    throwUnlessId(id, 'LabelGroup')
    @pushSelector('label-groups', id)

  labels: ->
    a = new APIPageable(@api, this)
    a.pushSelector('labels')
  label: (id) ->
    new Label(@api, this, id)



export default LabelGroup
