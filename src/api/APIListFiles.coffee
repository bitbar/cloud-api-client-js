import APIList from './APIList'

# APIListFiles
#
# @class
# @extends APIList
class APIListFiles extends APIList

  # Constructor
  constructor: (parent) ->
    super(parent)
    @push('files')

  # Siplifies process of uploading
  upload: (obj) ->
    # For NodeJS
    if global.isNodeJs
      fs = require('fs')
      FormData = require('form-data')

      form = new FormData()
      form.append('file', fs.createReadStream(obj.dir + '/' + obj.filename), {
        filename: obj.filename
      })

    # Browser
    # @todo
    else
      throw new Error('Not supported yet!')

    @post().headers(form.getHeaders()).data(form)



export default APIListFiles
