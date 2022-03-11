
/**
 * Escapes RegExp special characters
 * - For example, changes c++ to c\+\+
 * @param {String} string
 * @returns Escaped string
 */
export const escapeRegExp = (string) => {
  return string.replace(/[.*+?#^${}()|[\]\\]/g, '\\$&')
}

const specials = ['+', '.', '-', '€', '#']

/**
 * Adds tokens to word
 * - Special character at the start - '\B{word}\b'
 * - Special character at the end - '\b{word}\B'
 * - Both - todo
 * - Neither - '\b{word}\b'
 * @param {String} word
 * @returns word with tokens
 */
export const tokenWord = (word) => {
  const escapedWord = escapeRegExp(word)
  //Starts with special character
  if(specials.includes(word.charAt(0))) {
    return `\\B${escapedWord}\\b`
  }

  //Ends with special character
  if(specials.includes(word.charAt(word.length-1))) {
    return `\\b${escapedWord}\\B`
  }

  return `\\b${escapedWord}\\b`
}

/**
 * Creates pattern from highlight array
 * - ['C++', 'Customer', '.NET'] - '\bC\+\+\B|\bCustomer\b|\B\.NET\b'
 * @param {[String]} highlights
 * @returns pattern
 */
export const patternHighlights = (highlights) => {
  const pattern = highlights.map(highlight => tokenWord(highlight)).join('|')
  return pattern
}

/**
 * Splits highlight words from text.
 * @param {String} text
 * @param {[String]} highlights
 * @returns splitted text
 */
export const splitTextByHighlights = (text, highlights) => {
  const pattern = patternHighlights(highlights)
  const splittedText = text.split(new RegExp(`(${pattern})`, 'gi'))
  return splittedText
}