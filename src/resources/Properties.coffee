import APIPageable from './APIPageable'

class Properties extends APIPageable
  constructor: (api, parent) ->
    super(api, parent)
    @pushSelector('properties')

  appBan: (id) ->
    @api.throwUnlessId(id, 'Property AppBan')
    @pushSelector('app-bans')
    @setConstantParams({
      testRunId: id
    })



export default Properties
