exports.throwUnlessId = (id, name) ->
  unless id?
    throw new Error name + ' id must be provided!'
  return
