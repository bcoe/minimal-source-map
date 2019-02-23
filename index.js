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
  const intValue = CHARACTER_TO_INTEGER[string.charAt(pos)]
  pos++
  return [pos, intValue]
}

module.exports = {
  parseBase64VLQSegment
}
