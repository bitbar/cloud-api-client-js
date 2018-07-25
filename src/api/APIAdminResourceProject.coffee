import APIResourceProject from './APIResourceProject'


# APIAdminResourceProject
#
# @class
# @extends APIResourceProject
class APIAdminResourceProject extends APIResourceProject

  # /unarchive
  unarchive: ->
    new APIResource(this).push('unarchive')



export default APIAdminResourceProject
