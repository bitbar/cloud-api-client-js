import './APIResource'
import './APIPageable'

import './File'

import throwUnlessId from '../Utils'

class FileSet extends APIResource
  constructor: (api, parent, id) ->
    super(api, parent)
    throwUnlessId(id, 'FileSet')
    @pushSelector('file-sets', id)

  files: ->
    a = new APIPageable(@api, this)
    a.pushSelector('files')
  file: (id) ->
    new File(@api, this, id)



export default FileSet
