import './APIAbstractResource'

class APIResource extends APIAbstractResource

  update: (data) ->
    @post(data)



export default APIResource
