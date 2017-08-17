'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _internals  = require( '../data' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Iterate through an array of absolute file paths, removing the common paths from each element. This is useful
 * for when you don't need to have the entire absolute path in the name.
 *
 * @function    module:_.stripCommonRoot
 * @name        module:_.stripCommonRoot
 * @memberof    module:_
 * @param       {array}     pathArray   Array of paths..
 * @returns     {array}                 Modified version of the provided array
 *
 * @example  
 *  Gizmo.stripCommonRoot([ 
 *      '/home/jdoe/app/lib/helpers/mongoose-helper.js',
 *      '/home/jdoe/app/dev/file-foo.js',
 *      '/home/jdoe/app/dev/some-file.js' 
 * ]).join(', ')
 * // => /lib/helpers/mongoose-helper.js, /dev/file-foo.js, /dev/some-file.js
 */
function stripCommonRoot( pathArray ){
    if( ! _.isArray( pathArray ) ){
        Log.debug( `Expected an array - received ${_.typeof(pathArray)}` )

        return false
    }

    if( ! _.size( pathArray ) ){
        return []
    }

    if( ! _.every( pathArray, _.isString ) ){
        Log.debug( `Expected an array of strings - received ${_.typeof(pathArray)}` )

        return false
    }

    let pathsSplit = _.map( pathArray, p => _.split( p, '/') )
    let currentVal = null
    let result = null

    let isFirstSame = p => {
        if( currentVal === null ){
            currentVal = p[0]
            return true
        }
        return p[0] == currentVal
    }

    // Iterate over the segments of the path, checking if all of the values for this segment in every path is the same.
    do {
        if( _.every( pathsSplit, isFirstSame ) ){
            pathsSplit = _.map( pathsSplit, p => _.drop( p ) )
            currentVal = null
        }

        // When we reach a segment thats not the same in every path, then set the `result` variable, which will abort 
        // the do/while loop
        else {
            result = _.map( pathsSplit, p => '/' + _.join( p, '/' ) )
        }
    }
    while ( result === null )
    
    return result
}

module.exports = stripCommonRoot
