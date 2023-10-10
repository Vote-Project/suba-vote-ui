export const jsonToSelectBox = (jsonArray, key, value) => {
  const selectArray = jsonArray.map((object) => {
    return { label: object[key], value: object[value || key] }
  })

  return selectArray
}

export function getNullOrUndefinedAttributes(data) {
  const nullOrUndefinedAttributes = [];
  for (const key in data) {
    if (data[key] === null || data[key] === undefined || data[key] === '') {
      nullOrUndefinedAttributes.push(key);
    }
  }
  return nullOrUndefinedAttributes;
}
