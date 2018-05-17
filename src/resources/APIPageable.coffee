import APIAbstractResource from './APIAbstractResource'

import Utils from '../Utils'

class APIPageable extends APIAbstractResource

  get: (params = {}, _settings = {}) ->
    settings = {
      params: Utils.extend({}, @constantParams, params)
    }
    Utils.extend(settings, _settings)
    super(settings)

  create: (data, params = {}) ->
    @post(data, params)

  delete: ->
    throwError("Can't delete collections")



export default APIPageable
