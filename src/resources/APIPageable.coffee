import APIAbstractResource from './APIAbstractResource'

class APIPageable extends APIAbstractResource

  get: (params = {}, _settings = {}) ->
    settings = {
      params: $.extend({}, @constantParams, params)
    }
    $.extend(settings, _settings)
    super(settings)

  create: (data, params = {}) ->
    @post(data, params)

  delete: ->
    throwError("Can't delete collections")



export default APIPageable
