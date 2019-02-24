/* global describe, it */

const { extractSourceMapComment } = require('../lib/load-source-map')
const { readFileSync } = require('fs')
require('chai').should()

describe('extractSourceMapComment', () => {
  it('extracts comment from JavaScript with SourceMap URL in it', () => {
    const source = readFileSync('./test/fixtures/source-map-comment-in-file.js', 'utf8')
    extractSourceMapComment(source).should.eql('data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvby5qcyJdLCJuYW1lcyI6WyJmb28iLCJiYXIiXSwibWFwcGluZ3MiOiJ5eUJBQUEsS0FBTUEsQ0FBQUEsR0FBRyxDQUFHLElBQU0sdUJBQUUsQ0FBcEIsQ0FDQSxLQUFNQyxDQUFBQSxHQUFHLHdCQUFHLEVBQUgsQ0FBVCIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGZvbyA9ICgpID0+IHt9XG5jb25zdCBiYXIgPSA5OVxuXG4iXX0=')
    const cssSource = readFileSync('./test/fixtures/source-map-comment-c-style.js', 'utf8')
    extractSourceMapComment(cssSource).should.eql('data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvby5qcyJdLCJuYW1lcyI6WyJmb28iLCJiYXIiXSwibWFwcGluZ3MiOiJ5eUJBQUEsS0FBTUEsQ0FBQUEsR0FBRyxDQUFHLElBQU0sdUJBQUUsQ0FBcEIsQ0FDQSxLQUFNQyxDQUFBQSxHQUFHLHdCQUFHLEVBQUgsQ0FBVCIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGZvbyA9ICgpID0+IHt9XG5jb25zdCBiYXIgPSA5OVxuXG4iXX0=')
  })
})
