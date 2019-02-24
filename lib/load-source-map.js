/*

Given JavaScript source, create a SourceMap instance.

https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.lmz475t4mvbx

*/

function extractSourceMapComment (code) {
  const parsed = code.match(/(\/\/|\/\*)# sourceMappingURL=(?<url>.+)/)

  if (parsed === null) {
    return null
  }

  // c-style source map comments leave trailing ' */'
  return parsed.groups.url.replace(' */', '')
}

module.exports = {
  extractSourceMapComment
}
