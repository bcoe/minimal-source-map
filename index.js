// implementation of spec defined in see:
// https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k

// handling of Base 64 VLQ
const BASE_64_CHARACTERS =
   'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.split('')
const CHARACTER_TO_INTEGER = {}
BASE_64_CHARACTERS.forEach((c, i) => {
  CHARACTER_TO_INTEGER[c] = i
})

function parseBase64VLQSegment (string) {
  const segments = []
  let pos = 0
  let segment
  while (pos < string.length) {
    [pos, segment] = _parseSegment(string, pos)
    segments.push(segment)
  }
  return segments
}

function _parseSegment (string, pos) {
  const startPos = pos
  let shift = 0
  let signBit = false
  let segment = 0

  while (pos < string.length) {
    let newSegment = CHARACTER_TO_INTEGER[string.charAt(pos)]

    if (pos === startPos) signBit = (newSegment & 0b000001) === 1
    const continuation = (newSegment & 0b100000) === 32

    newSegment = (newSegment & 0b011111)
    if (pos === startPos) newSegment = newSegment >> 1
    newSegment = newSegment << shift
    segment += newSegment

    // update indices.
    shift += (pos === startPos ? 4 : 5)
    pos++
    if (!continuation) break
  }

  return [pos, signBit ? segment * -1 : segment]
}

function extractSourceMapComment (code) {
  const parsed = code.match(/(\/\/|\/\*)# sourceMappingURL=(?<url>.+)/)

  if (parsed === null) {
    return null
  }

  // c-style source map comments leave trailing ' */'
  return parsed.groups.url.replace(' */', '')
}

module.exports = {
  parseBase64VLQSegment, 
  extractSourceMapComment
}
