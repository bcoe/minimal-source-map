/* global describe, it */

const { parseBase64VLQSegment } = require('./')

require('chai').should()

describe('parseBase64VLQSegment', () => {
  it('given a VLQ string, returns array of parsed values', () => {
    parseBase64VLQSegment('AAAA').should.eql([0, 0, 0, 0])
    parseBase64VLQSegment('ABCD').should.eql([0, 1, 2, 3])
  })
})
