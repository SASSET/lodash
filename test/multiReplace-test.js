'use strict'

const _ = require( '../' )
const Code = require('code')
const Lab = require('lab')
const lab = exports.lab = Lab.script()
const expect = Code.expect
const { suite, it, before, describe, after } = lab

describe('_.multiReplace mixin', () => {
    it('should convert test to TesT', done => {
        expect( _.multiReplace( 'test', { t: 'T'} ) === 'TesT' ).to.equal( true )
        done()
    })

    it('should replace Windows with Linux and XP with RHEL (using an array of objects for multiple replacements)', done => {
        expect( _.multiReplace( 'Windows XP', [{ windows: 'Linux'}, {xp: 'RHEL'}], 'i' ) === 'Linux RHEL' ).to.equal( true )
        done()
    })

    it('should not convert abcd to DCBA because the case [i]nsensitive flag was not provided (i)', done => {
        expect( _.multiReplace( 'abcd', { ABCD: 'DCBA'} ) === 'abcd' ).to.equal( true )
        done()
    })

    it('to throw an error when given a string value as the replacements parameter', done => {
        expect(() => _.multiReplace('foo', 'bar')).to.throw( Error )
        done()
    })
})