export const jsonToSelectBox = (jsonArray, key, value) => {
  const selectArray = jsonArray.map((object) => {
    return { label: object[key], value: object[value || key] }
  })

  return selectArray
}
