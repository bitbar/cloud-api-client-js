import APIPageable from './APIPageable'

import { throwUnlessId } from '../Utils'

class Properties extends APIPageable
  constructor: (api, parent) ->
    super(api, parent)
    @pushSelector('properties')

  appBan: (id) ->
    throwUnlessId(id, 'Property AppBan')
    @pushSelector('app-bans')
    @setConstantParams({
      testRunId: id
    })



export default Properties
