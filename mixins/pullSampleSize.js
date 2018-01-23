'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _internals  = require( '../data' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Pulls an array of samples from an array - Basically the same thing as _.pullSample, except this samples multiple
 * elements, with the amount specified by the size parameter
 *
 * @name        module:_.pullSampleSize
 * @function    module:_.pullSampleSize
 * @memberof    module:_
 * @note    This method mutates the array, just as _.pull does
 * @param   {array}   arr   Array to sample
 * @param   {number}  size  Amount of elements to sample/remove from arr
 * @returns {array}         Array of one or more elements from arr
 * @example 
 *  var data = [ 100, 200, 300, 400 ]
 *  _.pullSampleSize( data, 2 )  // [ 100, 200 ]
 *  _.pullSampleSize( data, 2 )  // [ 300, 400 ]
 *  _.pullSampleSize( data, 2 )  // [ ]
 *  data                           // []
 */
function pullSampleSize( arr, size ){
    if( size === 0 )
        return []

    if( _.isUndefined( size ) )
        size = 1

    if( ! _.isNumber( size ) )
        throw new Error( `Expected size to be undefined or a number - received a ${_.getTypeof( size )}` )

    if( _.isUndefined( arr ) )
        return undefined

    if( ! _.isArray( arr ) )
        throw new Error( `Expected to sample an array - received a ${_.fgetTypeof( arr )}` )

    if( _.isEmpty( arr ) )
        return []

    if( size > _.size( arr ) )
        size = _.size( arr )

    const result = []

    _.times( size, () => {
        let sample = _.sample( arr )

        _.pull( arr, sample )

        result.push( sample )
    } )

    return _.flatten( result )
}


module.exports = pullSampleSize
