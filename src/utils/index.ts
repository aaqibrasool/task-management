export const createArraysByProperty = <T>(
  arr: T[],
  property: keyof T
): T[][] => {
  return Array.from(
    arr
      .reduce((map, obj) => {
        const value = obj[property]
        if (map.has(value!)) {
          // Add a non-null assertion operator !
          map.get(value!)!.push(obj) // Add a non-null assertion operator !
        } else {
          map.set(value!, [obj]) // Add a non-null assertion operator !
        }
        return map
      }, new Map<any, T[]>())
      .values()
  )
}
