export function camlToParam (str) {
  let newStr = str.replace(/([A-Z])/g, function (cur) {
    return `-${cur.toLowerCase()}`
  })
  return newStr
}
