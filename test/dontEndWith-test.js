'use strict'

const _ = require( '../' )
const Code = require('code')
const Lab = require('lab')
const lab = exports.lab = Lab.script()
const expect = Code.expect
const { suite, it, before, describe, after } = lab

describe('_.dontEndWith mixin', () => {
    it('should change /v1/resource/test/ to /v1/resource/test', done => {
        expect( _.dontEndWith('/v1/resource/test/', '/') ).to.equal( '/v1/resource/test' )
        done()
    })

    it('should leave /v1/resource/test as it is', done => {
        expect( _.dontEndWith('/v1/resource/test', '/') ).to.equal( '/v1/resource/test' )
        done()
    })
})