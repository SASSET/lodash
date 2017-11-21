'use strict'

const _ = require( '../' )
const Code = require('code')
const Lab = require('lab')
const lab = exports.lab = Lab.script()
const expect = Code.expect
const { suite, it, before, describe, after } = lab

const slugTests = [
  {
    options: null,
    tests: {
      'Hello World'     : 'HELLO-WORLD',
      'HELLO, WORLD!!'  : 'HELLO-WORLD!!',
      'H3ll0 W0rld'     : 'H3LL0-W0RLD',
      'Th1s 15 @ T35T!' : 'TH1S-15-@-T35T!'
    }
  },
  {
    options: { 
      replacement: '_' 
    },
    tests: {
      'Hello World'     : 'HELLO_WORLD',
      'HELLO, WORLD!!'  : 'HELLO_WORLD!!',
      'H3ll0 W0rld'     : 'H3LL0_W0RLD',
      'Th1s 15 @ T35T!' : 'TH1S_15_@_T35T!'
    }
  }
]

describe('_.toSlug mixin', () => {

  _.forEach( slugTests, slugtest => {
    describe(`(with options: ${(_.isObject(slugtest.options) ? JSON.stringify(slugtest.options) : slugtest.options)})`, () => {

      _.forEach( slugtest.tests, ( expected, orig ) => {
        it(`should return "${expected}" when given "${orig}"`, done => {
          expect( _.toSlug( orig, slugtest.options ) ).to.equal( expected )
          done()
        })
      })
    })
  })
})