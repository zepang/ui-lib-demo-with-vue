export function dateClone (date) {
  if (isDate(date)) {
    return new Date(date)
  } else {
    throw new Error('date 不是一个 Date 实例')
  }
}

export function getLastDayOfMonth (date) {
  date = dateClone(date)
  date.setDate(0)
  return date.getDate()
}

export function getDayCountOfMonth (date) {
  date = dateClone(date)
  date.setMonth(date.getMonth() + 1)
  return getLastDayOfMonth(date)
}

export const isDate = function(date) {
  if (date === null || date === undefined) return false
  if (isNaN(new Date(date).getTime())) return false
  if (Array.isArray(date)) return false
  return true
};

