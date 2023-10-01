export const jsonToSelectBox = (jsonArray, key) => {
  const selectArray = jsonArray.map((object) => {
    return { label: object[key], value: object[key] }
  })

  return selectArray
}
