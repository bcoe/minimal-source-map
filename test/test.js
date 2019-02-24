/* global describe, it */

const { parseBase64VLQSegment, extractSourceMapComment } = require('..')
const { readFileSync } = require('fs')
require('chai').should()

describe('parseBase64VLQSegment', () => {
  it('given a VLQ string, returns array of parsed values', () => {
    // values are all 0s.
    parseBase64VLQSegment('AAAA').should.eql([0, 0, 0, 0])
    // simple values, no continuation or sign.
    parseBase64VLQSegment('ACEG').should.eql([0, 1, 2, 3])
    // leading digit is negative. [char in the array that is odd]
    parseBase64VLQSegment('BTDdATD').should.eql([-0, -9, -1, -14, 0, -9, -1])
    // second digit is negative.
    parseBase64VLQSegment('AdjA').should.eql([0, -14, -1])
    // leading digit has continuation [anything bigger than g should continue]
    parseBase64VLQSegment('gAgBgChAhB').should.eql([0, 16, 32, -0, -16])
    // third digit has continuation - note that according to this other one, that you
    // cannot set the continuation from the third - it has to continue left to right
    parseBase64VLQSegment('gAgBggBg8pb').should.eql([0, 16, 512, 447424])
  })
})

describe('parseBase64VLQSegment', () => {
  it('extracts comment from JavaScript with SourceMap URL in it', () => {
    const source = readFileSync('./test/fixtures/source-map-comment-in-file.js', 'utf8')
    extractSourceMapComment(source).should.eql('data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvby5qcyJdLCJuYW1lcyI6WyJmb28iLCJiYXIiXSwibWFwcGluZ3MiOiJ5eUJBQUEsS0FBTUEsQ0FBQUEsR0FBRyxDQUFHLElBQU0sdUJBQUUsQ0FBcEIsQ0FDQSxLQUFNQyxDQUFBQSxHQUFHLHdCQUFHLEVBQUgsQ0FBVCIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGZvbyA9ICgpID0+IHt9XG5jb25zdCBiYXIgPSA5OVxuXG4iXX0=')
    const cssSource = readFileSync('./test/fixtures/source-map-comment-c-style.js', 'utf8')
    extractSourceMapComment(cssSource).should.eql('data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvby5qcyJdLCJuYW1lcyI6WyJmb28iLCJiYXIiXSwibWFwcGluZ3MiOiJ5eUJBQUEsS0FBTUEsQ0FBQUEsR0FBRyxDQUFHLElBQU0sdUJBQUUsQ0FBcEIsQ0FDQSxLQUFNQyxDQUFBQSxHQUFHLHdCQUFHLEVBQUgsQ0FBVCIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGZvbyA9ICgpID0+IHt9XG5jb25zdCBiYXIgPSA5OVxuXG4iXX0=')
  })
})
