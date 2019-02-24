# minimal-source-map

Minimal implementation of source-map specification described in:

[Source Map Revision 3 Proposal](https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k)

## Installation

`npm i minimal-source-map`

## API

The main module entry point exposes the following API:

* `getSourceMapFromSource([string] source)`: given a string containing source-code,
  parse source map comment. returns `SourceMap` instance.
* `getSourceMapFromComment([string] comment)`: given a source-map comment, return a 
  `SourceMap` instance.
* `getSourceMapFromObject([object] rawSourceMap)`: given a raw source-map object, return a
  `SourceMap` instance.

### SourceMap class

When a source map is parsed, a `SourceMap` instance is returned with the
following methods:

* `getOriginalPositionFor ([integer] line, integer column)`: given a line and
  column number in transpiled code, return line and column position in original
  source if applicable (_there are cases where there may be no mapping back_).
