import { MarkedExtension, TokenizerAndRendererExtension } from 'marked'
import GithubSlugger from 'github-slugger'

let slugger: GithubSlugger
let sectionLevel = 1
const sectionRegexps = new Array(7).fill(undefined).map((_, i) => new RegExp(`^ {0,3}(#{${i + 1}} )[^]*?(?:\\n(?=\\1)|$)`))

export const headingSectionsExtension = (): MarkedExtension => {
  return {
    hooks: {
      preprocess(src) {
        slugger = new GithubSlugger()
        return src
      },
      postprocess(html) {
        return html
      }
    },
    extensions: [{
      name: 'headingSections',
      level: 'block',
      start(src: string) {
        // Match when # is at the beginning of a line.
        return src.match(/^ {0,3}#/m)?.index
      },
      tokenizer(src: string) {
        const match = sectionRegexps[sectionLevel].exec(src)
        if (!match) {
          return
        }
  
        sectionLevel++
        // Tokenize text inside the section.
        // Only add sectionBlock token for headers one level up from current level.
        const tokens = this.lexer.blockTokens(match[0])
        sectionLevel--
  
        return {
          type: 'headingSections',
          raw: match[0],
          level: sectionLevel + 1,
          tokens,
        }
      },
      renderer(token) {
        return `<section>\n${this.parser.parse(token.tokens!)}</section>\n`
      },
    }],
  }
}
