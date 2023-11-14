import rfdc from 'rfdc'

import { type DateRange } from 'src/types/shared/dateRange'
import { type FilterState } from 'src/types/shared/filter'

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

/**
 * Checks a project's tags to see if any of them match any of the state tags
 * @param state the state to check against
 * @param tags the tags to check
 * @returns 
 * - `true` if any of the project's tags are `true` in the state
 * - `true` if none of the tags in the filter state are `true` (indicating no filters being set in the panel)
 * - `false` if the project has no tags or if none of its tags are toggled to `true` in the filters panel
 */
export const doFiltersMatchTags = (state: FilterState, tags?: string[]) => {
  const anyIsTrue = !!Object.keys(state).find(tag => !!state[tag])
  if (!anyIsTrue) {
    return true
  } else {
    return !!tags?.find(tag => !!state[tag])
  } 
}
