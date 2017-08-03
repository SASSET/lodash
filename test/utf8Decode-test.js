'use strict'

const _ = require( '../' )
const Code = require('code')
const Lab = require('lab')
const lab = exports.lab = Lab.script()
const expect = Code.expect
const { suite, it, before, describe, after } = lab

describe('_.utf8Decode mixin', () => {
    it('should return "test" when given "test"', done => {
        expect( _.utf8Decode('test') === 'test' ).to.equal( true )
        done()
    })

    it('should return an empty string when given a NULL value', done => {
        expect( _.utf8Decode( null ) === null ).to.equal( true )
        done()
    })

    it('should return undefined when given an undefined value', done => {
        expect( typeof _.utf8Decode( ) === 'undefined' ).to.equal( true )
        done()
    })

    it('should return a string of numbers when given a numerical value', done => {
        expect( _.utf8Decode( 123 ) === '123' ).to.equal( true )
        done()
    })

    it('should return 55296 when given 0xD800', done => {
        expect( _.utf8Decode( 0xD800 ) === '55296' ).to.equal( true )
        done()
    })

    it('Should decode TÃ©lÃ©com to Télécom', done => {
        expect( _.utf8Decode('TÃ©lÃ©com') === 'Télécom' ).to.equal( true )
        done()
    })
})