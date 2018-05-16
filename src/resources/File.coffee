import APIResource from './APIResource'
import APIPageable from './APIPageable'

class File extends APIResource
  constructor: (api, parent, param) ->
    super(api, parent)

    if isNumeric(param)
      @pushSelector('files', param)
    else if typeof param is 'string'
      if param is 'certificate'
        @pushSelector('certificate')
      else
        @pushSelector('files', param)
    else
      @pushSelector('files')

  upload: (data) ->
    @post(data)

  tags: ->
    a = new APIPageable(@api, this)
    a.pushSelector('tags')

  file: ->
    a = new APIResource(@api, this)
    a.pushSelector('file')

  icon: ->
    a = new APIPageable(@api, this)
    a.pushSelector('icon')

  app: ->
    a = new APIPageable(@api, this)
    a.pushSelector('application')

  data: ->
    a = new APIPageable(@api, this)
    a.pushSelector('data')

  test: ->
    a = new APIPageable(@api, this)
    a.pushSelector('test')



export default File
