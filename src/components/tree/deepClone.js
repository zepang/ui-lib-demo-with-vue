function typeOf (obj) {
  const map = {
    '[object Boolean]'  : 'boolean',
    '[object Number]'   : 'number',
    '[object String]'   : 'string',
    '[object Function]' : 'function',
    '[object Array]'    : 'array',
    '[object Date]'     : 'date',
    '[object RegExp]'   : 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]'     : 'null',
    '[object Object]'   : 'object'
  }
  return map[Object.prototype.toString.call(obj)]
}

function deepClone (data) {
  let obj

  if (typeOf(data) === 'array') {
    obj = []
    for (let i = 0; i < data.length; i++) {
      obj.push(data[i])
    }
  } else if (typeOf(data) === 'object') {
    obj = {}
    for (let key in data) {
      obj[key] = deepClone(data[key])
    }
  } else {
    return data
  }

  return obj
}

export default deepClone