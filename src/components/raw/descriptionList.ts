import { type ProjectListingInfo } from '@/src/types/shared/project'
import { getFormattedPeriod } from '@/src/utilities/dom'

/**
 * Queries for description list nodes and inflates them with extra functionality
 * @param _window the reference to the window
 */
export const inflateDescriptionListEmbeds = (_window: Window, _projectInfo: ProjectListingInfo) => {
  _window.document.querySelectorAll('dl').forEach((_element) => {
    new DescriptionListElement(_element, _projectInfo)
  })
}

/**
 * Inflates description list elements with extra functionality, namely tags and time period
 */
export class DescriptionListElement {
  element: HTMLDListElement

  constructor(_element: HTMLDListElement, _projectInfo: ProjectListingInfo) {
    this.element = _element

    this._inflatePeriod(_projectInfo)
    this._inflateTags()
  }

  /**
   * Searches for the presence of a .period element wrapping around <dt> and <dd>,
   * and inflates the inner <dd> element by replacing the first instance of $PERIOD with formatted period
   * @param _projectInfo the project info in which the project's time period is defined.
   */
  _inflatePeriod = (_projectInfo: ProjectListingInfo) => {
    const periodWrapper = this.element.querySelector('.period')
    if (!!periodWrapper) {
      if (!!_projectInfo.period) {
        const periodDescriptionElement = periodWrapper.querySelector('dd')
        if (!!periodDescriptionElement) {
          periodDescriptionElement.innerHTML = periodDescriptionElement.innerHTML.replace('$PERIOD', getFormattedPeriod(_projectInfo.period))
        } else {
          console.warn('Found a .period element but not an inner dd element to format on. The .period class should be on a div wrapping around <dt> and <dd>')
        }
      } else {
        console.warn('Found a .period element but the project information is missing a period.')
      }
    }
  }

  /**
   * Searches for the presence of a .tags element wrapping around <dt> and <dd>,
   * and inflates the inner <dd> element by replacing the inner key-value JSON object with an array of span elements,
   * where the span's inner text corresponds to the keys of the JSON object,
   * and the span's class corresponds to the values of the JSON object.
   */
  _inflateTags = () => {
    const tagsWrapper = this.element.querySelector('.tags')
    if (!!tagsWrapper) {
      let originalContent: { [key: string]: string } = {  }
      try {
        const tagsDescriptionElement = tagsWrapper.querySelector('dd')
        if (!!tagsDescriptionElement) {
          originalContent = JSON.parse(tagsDescriptionElement.innerHTML)
          const formattedText = Object.keys(originalContent).map((key) => (
            `<span class="tag ${originalContent[key]}">${key}</span>`
          )).join('')
          tagsDescriptionElement.innerHTML = formattedText
        } else {
          console.warn('Found a .tags element but not an inner dd element to format on. The .tags class should be on a div wrapping around <dt> and <dd>.')
        }
      } catch (err) {
        console.error('Found a .tags element but the inner dd element was improperly formatted. The <dd> element should contain a valid JSON object.')
        console.error(originalContent)
        console.error(err)
      }
    }
  }
}
