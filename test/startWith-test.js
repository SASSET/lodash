'use strict'

const _ = require( '../' )
const Code = require('code')
const Lab = require('lab')
const lab = exports.lab = Lab.script()
const expect = Code.expect
const { suite, it, before, describe, after } = lab

describe('_.startWith mixin', () => {
    it('should change User/john.doe/Documents to /User/john.doe/Documents', done => {
        expect( _.startWith('User/john.doe/Documents', '/') === '/User/john.doe/Documents' ).to.equal( true )
        done()
    })

    it('should leave /User/john.doe/Documents/ as it is', done => {
        expect( _.startWith('/User/john.doe/Documents/', '/') === '/User/john.doe/Documents/' ).to.equal( true )
        done()
    })
})