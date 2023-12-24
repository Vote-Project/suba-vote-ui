import TimedOutModal from 'src/components/Modals/TimedOutModal'
import React from 'react'

export const jsonToSelectBox = (jsonArray, key, value) => {
  const selectArray = jsonArray.map((object) => {
    return { label: object[key], value: object[value || key] }
  })

  return selectArray
}

export function getNullOrUndefinedAttributes(data) {
  const nullOrUndefinedAttributes = []
  for (const key in data) {
    if (data[key] === null || data[key] === undefined || data[key] === '') {
      nullOrUndefinedAttributes.push(key)
    }
  }
  return nullOrUndefinedAttributes
}

export function removeUndisfinedValuesInArray(selectArray) {
  const newData = selectArray.filter(function (element) {
    return element !== undefined
  })

  return newData
}

export const triggerTimedOutModal = () => <TimedOutModal open={true} />
