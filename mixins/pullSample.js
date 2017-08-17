'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _internals  = require( '../data' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Pulls a sample from an array - Useful for when iterating over an array (manually), and having to remove the previous
 * iterations
 *
 * @name        module:_.pullSample
 * @function    module:_.pullSample
 * @memberof    module:_
 * @note    This method mutates the array, just as _.pull does
 * @param       {array}   arr   Array to sample
 * @returns     {Mixed}         Whatever element was sampled from the array
 * @example 
 *  var data = [ 100, 200 ]
 *  _.pullSample( data )  
 *  // => 200                   
 *  _.pullSample( data )  
 *  // => 100           
 *  _.pullSample( data )
 *  // => []
 */
function pullSample( arr ){
    if( _.isUndefined( arr ) ){
        return undefined
    }

    if( ! _.isArray( arr ) ){
        throw new Error( `Expected to sample an array - received a ${_.getTypeof( arr )}` )
    }

    if( _.isEmpty( arr ) ){
        return undefined
    }

    const sample = _.sample( arr )

    _.pull( arr, sample )

    return sample
}

module.exports = pullSample
