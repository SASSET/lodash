'use strict'

const _ = require( '../' )
const Code = require('code')
const Lab = require('lab')
const lab = exports.lab = Lab.script()
const expect = Code.expect
const { suite, it, before, describe, after } = lab

describe('_.randStr mixin', () => {
    it('should not match the same randomly generated string that was generated again', done => {
        expect( _.randStr() ).to.not.equal( _.randStr() )
        done()
    })

    it('should return a random string 15 characters long (when given a numeric value)', done => {
        expect( _.randStr(15).length ).to.equal( 15 )
        done()
    })

    it('should return a random string 15 characters long (when given a numeric value in a string)', done => {
        expect( _.randStr('15').length ).to.equal( 15 )
        done()
    })

    it('should return a random string 20 characters long (when given NO length)', done => {
        expect( _.randStr().length ).to.equal( 20 )
        done()
    })

    it('should throw an error when a non-numeric string value is provided as the length parameter', done => {
        expect(() => _.randStr('foo')).to.throw( Error )
        done()
    })
})
