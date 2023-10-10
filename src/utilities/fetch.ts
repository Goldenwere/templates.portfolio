import DOMPurify from 'dompurify'
import { marked } from 'marked'
import yaml from 'js-yaml'
import { deepCopy } from './content'

import {
  type ProjectContentInfo,
  type ProjectListingInfo,
} from '@/src/types/shared/project'
import { type Project } from '@/src/types/views/project'

export const contentInfoRegex = new RegExp(/^(!CONTENT)({\n)((  .{0,}\n){0,})(})/gm)
export const listingInfoRegex = new RegExp(/^(!LISTING)({\n)((  .{0,}\n){0,})(})/gm)

/**
 * Config used for DOMPurify.
 * This config allows for most HTML elements and a handful of attributes
 * necessary for the site to load intended markdown/etc
 */
const domPurifyConfig = {
  ALLOW_ARIA_ATTR: true,
  ALLOWED_ATTR: [
    'allowfullscreen',
    'allow',
    'alt',
    'class',
    'href',
    'src',
    'style',
    'title',
  ],
  ALLOWED_TAGS: [
    'a',
    'p',
    'span',

    'b',
    'em',
    'i',
    'mark',
    's',
    'sub',
    'sup',
    'small',
    'strike',
    'strong',
    'u',

    'abbr',
    'audio',
    'blockquote',
    'cite',
    'code',
    'details',
    'data',
    'dfn',
    'div',
    'iframe',
    'img',
    'pre',
    'summary',
    'samp',
    'time',
    'track',
    'var',
    'video',

    'figcaption',
    'figure',

    'br',
    'hr',
    'wbr',

    'ol',
    'ul',
    'li',

    'dd',
    'dl',
    'dt',
  ],
}

/**
 * Fetches a file and returns the blob content of the file
 * @param path the path of the file to load
 * @returns the blob of the file
 */
export const fetchAndReturnBlob = async (path: string) => {
  const response = await fetch(path)
  const blob = await response.blob()
  return blob
}

/**
 * Fetches and sanitizes text files
 * @param path the path of the text file to load
 * @returns the content of the text file after sanitizing
 */
export const fetchAndReturnText = async (path: string) => {
  const blob = await fetchAndReturnBlob(path)
  const text = await blob.text()
  const sanitized = DOMPurify.sanitize(text, domPurifyConfig)
  return sanitized
}

/**
 * Fetches and builds a project from markdown
 * @param path the path of the markdown document to load
 * @returns the project parsed from the markdown document
 */
export const fetchAndReturnProject = async (path: string): Promise<Project> => {
  const document = await fetchAndReturnText(path)

  const contentInfoSrc = contentInfoRegex.exec(document)
  const listingInfoSrc = listingInfoRegex.exec(document)

  let contentInfo: ProjectContentInfo | undefined = undefined
  let listingInfo: ProjectListingInfo | undefined = undefined
  let content = document

  if (!!contentInfoSrc) {
    content = content.replace(contentInfoRegex, '')
    try {
      contentInfo = yaml.load(contentInfoSrc[3]) as any
    } catch (err) {
      console.log(err)
    }
  }
  if (!!listingInfoSrc) {
    content = content.replace(listingInfoRegex, '')
    try {
      listingInfo = yaml.load(listingInfoSrc[3]) as any
    } catch (err) {
      console.log(err)
    }
  }

  content = marked.parse(content)

  return patchSharedFields({
    content,
    contentInfo,
    listingInfo,
  })
}

/**
 * Fetches, sanitizes, and parses YAML files
 * @param path the path of the YAML file to load
 * @returns the content of the YAML file after sanitizing then parsing
 */
export const fetchAndParseYaml = async (path: string) => {
  const text = await fetchAndReturnText(path)
  return yaml.load(text)
}

/**
 * Checks for missing fields in a `Project`'s info fields and patches them with corresponding fields if defined in the other `Project`'s info fields.
 * For example, if the contentInfo is missing period, it will pull from listingInfo instead, if defined, and visa versa.
 * @param project the project model to patch
 */
export const patchSharedFields = async (project: Partial<Project>) => {
  const patched = deepCopy(project)
  if (!!patched.contentInfo) {
    if (!patched.contentInfo.period) {
      patched.contentInfo.period = patched.listingInfo?.period
    }
  }
  if (!!patched.listingInfo) {
    if (!patched.listingInfo.period) {
      patched.listingInfo.period = patched.contentInfo?.period
    }
  }
  return patched
}

/**
 * Fetches content type from an image
 * @param path the path of the file to check
 * @returns the Content-Type header of the file
 */
export const getContentType = async (path: string) => {
  const response = await fetch(path, {method: 'HEAD'})
  return response.headers.get('Content-Type')
}

/**
 * Determines if a url is a valid image
 * @param url the url of the image
 * @returns true if valid image, false otherwise
 */
export const isValidImage = async (url?: string): Promise<boolean> => {
  if (!url) {
    return false
  }
  const contentType = await getContentType(url)
  return contentType?.startsWith('image') || false
}

/**
 * Creates a Promise which waits for a condition to be true
 * @param condition the condition which should be met
 * @param interval the period of time (ms) to wait between attempts
 * @param tries the number of attempts (up to and including this number) to try before determining the condition couldn't be met
 * @returns A Promise which will resolve when the condition is met or reject if timed out after a period of `(interval * tries)`
 */
export const awaitCondition = (condition: () => boolean, interval: number = 100, tries: number = 100) => {
  return new Promise<void>((resolve, reject) => {
    let _attempts = 1
    const wait: any = () => {
      _attempts += 1
      console.log(condition())
      if (condition()) {
        return resolve()
      } else if (_attempts > tries) {
        reject()
      } else {
        setTimeout(wait, interval)
      }
    }
    wait()
  })
}

/**
 * Methods related to local storage
 */
export const storage = {
  /**
   * Retrieves a value from local storage
   * @param key the key of the local storage item
   * @returns the parsed object or null
   */
  read: <T>(key: string) => {
    const value = window.localStorage.getItem(key)
    return !!value
      ? JSON.parse(value) as T
      : null
  },

  /**
   * Stores a value to local storage
   * @param key the key of the local storage item
   * @param value the object to store
   */
  write: <T>(key: string, value: T) => {
    window.localStorage.setItem(key, JSON.stringify(value))
  },
}
