'use strict'

const _ = require( '../' )
const Code = require('code')
const Lab = require('lab')
const lab = exports.lab = Lab.script()
const expect = Code.expect
const { suite, it, before, describe, after } = lab

describe('_.dontStartWith mixin', () => {
    it('should change .unhide-me to unhide-me', done => {
        expect( _.dontStartWith('.unhide-me', '.') ).to.equal( 'unhide-me' )
        done()
    })

    it('should leave unhide-me as it is', done => {
        expect( _.dontStartWith('unhide-me', '.') ).to.equal( 'unhide-me' )
        done()
    })
})