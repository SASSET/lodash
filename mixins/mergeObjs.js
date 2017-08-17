'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _internals  = require( '../data' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Merge multiple objects together without mutating the original object
 * This basically just hands everything off to _.merge, just adds an empty object to the beginning, so
 *      _.merge( {}, ObjsA, ObjsB )
 * would be the same as
 *      _.mergeObjs( ObjsA, ObjsB )
 * 
 * @name        module:_.mergeObjs
 * @function    module:_.mergeObjs
 * @memberof    module:_
 * @param   {...object} [sources] The source objects
 * @returns {object}    Newly merged object
 * @example 
 *  _.mergeObjs( { a: 1 }, { b: 2 }, { c: 3 } )
 *  // => { a: 1, b: 2, c: 3 }
 */
function mergeObjs( sources ){
    return _.merge.apply( this, _.flatten( [ {}, arguments || [] ]))
}

module.exports = mergeObjs
