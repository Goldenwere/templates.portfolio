import rfdc from 'rfdc'

import { type DateRange } from '@/src/types/shared/dateRange'

export const deepCopy = rfdc()

/**
 * Runs element.querySelector for every selector in the order they were passed in until an element is found
 * @param element the element to query children from
 * @param selectors the selectors to query for
 * @returns the first child element found from the selectors specified
 */
export const findFirstMatchingChild = ( element: ParentNode, ...selectors: string[] ) => {
  let returnElement: Element | undefined
  selectors.every((selector) => {
    const foundElement = element.querySelector(selector)
    if (!!foundElement) {
      returnElement = foundElement
      return false
    }
    return true
  })
  return returnElement
}

/**
 * Formats the period object into a readable string
 * @param period the period to format
 * @returns the formatted string
 */
export const getFormattedPeriod = (period: DateRange) => {
  return `${period.from}${!!period.to ? ' - ' + period.to : ''}`
}
