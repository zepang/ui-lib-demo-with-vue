export function getLastDayOfMonth (date) {
  if (date instanceof Date) {
    date.setDate(0)
    return date.getDate()
  } else {
    throw new Error('date 不是 Date 的实例')
  }
}

export function getDayCountOfMonth (date) {
  return getLastDayOfMonth(date.)
}

export const isDate = function(date) {
  if (date === null || date === undefined) return false;
  if (isNaN(new Date(date).getTime())) return false;
  if (Array.isArray(date)) return false; // deal with `new Date([ new Date() ]) -> new Date()`
  return true;
};
