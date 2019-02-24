# minimal-source-map

Minimal implementation of source-map specification described in:

[Source Map Revision 3 Proposal](https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k)

## Installation

`npm i minimal-source-map`

## API

* *parseBase64VLQSegment(string)*: given a Base 64 VLQ segment, e.g,, 
    `ABCD` from mappings, return 1,4 or 5 variable length array of integers.
  * TODO: throw exceptions if wrong number of elements is returned.
  * [See: Proposed Format](https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.qz3o9nc69um5).
* *extractSourceMapComment(string)*: given a string representing JavaScript
  source, extract a comment of the format `//# sourceMappingURL=`.
  * [See: Linking Generated Code](https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.lmz475t4mvbx).