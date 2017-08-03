'use strict'

const _ = require( '../' )
const Code = require('code')
const Lab = require('lab')
const lab = exports.lab = Lab.script()
const expect = Code.expect
const { suite, it, before, describe, after } = lab

describe('_.isFloat mixin', () => {
    describe('should return true when', () => {
        it('given 1.2 (number)', done => {
            expect( _.isFloat( 1.2 ) ).to.equal( true )
            done()
        })

        it('given 123 (number)', done => {
            expect( _.isFloat( 123 ) ).to.equal( true )
            done()
        })

        it('given 0 (number)', done => {
            expect( _.isFloat( 0 ) ).to.equal( true )
            done()
        })

        it('given .0123456789 (number)', done => {
            expect( _.isFloat( .0123456789 ) ).to.equal( true )
            done()
        })

        it('given 0.123 (number) with strict enabled', done => {
            expect( _.isFloat( 0.123, true ) ).to.equal( true )
            done()
        })

        it('given 999.12 (number) with strict enabled', done => {
            expect( _.isFloat( 999.12, true ) ).to.equal( true )
            done()
        })
    })

    describe('should return false when', () => {
        it('given 123 (number) with strict enabled', done => {
            expect( _.isFloat( 123, true ) ).to.equal( false )
            done()
        })

        it('given null', done => {
            expect( _.isFloat( null ) ).to.equal( false )
            done()
        })

        it('given nothing (undefined)', done => {
            expect( _.isFloat( ) ).to.equal( false )
            done()
        })

        it('given "foobar" (string)', done => {
            expect( _.isFloat( 'foobar' ) ).to.equal( false )
            done()
        })

        it('given "123" (string)', done => {
            expect( _.isFloat( '123' ) ).to.equal( false )
            done()
        })

        it('given 0 (number) with strict enabled', done => {
            expect( _.isFloat( 0, true ) ).to.equal( false )
            done()
        })

        it('given [1,2] (array)', done => {
            expect( _.isFloat( [1,2] ) ).to.equal( false )
            done()
        })

        it('given {a:1,b:2} (object)', done => {
            expect( _.isFloat( {a:1,b:2} ) ).to.equal( false )
            done()
        })

        it('given new Date() (date)', done => {
            expect( _.isFloat( new Date() ) ).to.equal( false )
            done()
        })
    })

    /*
    it('should return true when ', done => {
        expect( _.type([]) === 'array' ).to.equal( true )
        done()
    })

    it('should identify an object as an object', done => {
        expect( _.type({}) === 'object' ).to.equal( true )
        done()
    })

    it('should identify a string as a string', done => {
        expect( _.type('test') === 'string' ).to.equal( true )
        done()
    })

    it('should identify a number as a number', done => {
        expect( _.type( 5 ) === 'number' ).to.equal( true )
        done()
    })

    it('should return undefined when no param is provided', done => {
        expect( _.type(  ) === 'undefined' ).to.equal( true )
        done()
    })

    it('should identify a null value', done => {
        expect( _.type( null ) === 'null' ).to.equal( true )
        done()
    })
    */
})
