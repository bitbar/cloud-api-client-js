import APIPageable from './APIPageable'

import Utils from '../Utils'

class Properties extends APIPageable
  constructor: (api, parent) ->
    super(api, parent)
    @pushSelector('properties')

  appBan: (id) ->
    Utils.throwUnlessId(id, 'Property AppBan')
    @pushSelector('app-bans')
    @setConstantParams({
      testRunId: id
    })



export default Properties
