'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _internals  = require( '../data' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Iterate through an array of absolute file paths, removing the common paths from each absolute path. The shortened 
 * filenames are returned in an array, while the common path 
 *
 * @function    module:_.sumPaths
 * @alias       module:_.summarizePaths
 * @memberof    module:_
 * @param       {array}     pathArray       Array of paths..
 * @returns     {Object}    pathObj         Object containing the common absolute path, and an array of files (with 
 *                                          paths relative to the common absolute path)
 * @returns     {string}    pathObj.path    The absolute path up to the last common folder that all files share
 * @returns     {array}     pathObj.files   Array of filenames, paths starting where {pathObj.path} left off
 *
 * @example  
 *  _.sumPaths([ 
 *      '/home/jdoe/app/lib/helpers/mongoose-helper.js',
 *      '/home/jdoe/app/dev/file-foo.js',
 *      '/home/jdoe/app/dev/some-file.js' 
 * ])
 * // => { path: '/home/jdoe/app',
 *          files: [ 
 *              '/lib/helpers/mongoose-helper.js', '/dev/file-foo.js', '/dev/some-file.js' 
 *          ] 
 *      }
 */
function sumPaths( pathArray ){ 
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
    let commonRoot = []

    let isFirstSame = p => {
        // If the 'currentVal' is null, then this is the first iteration, so set it to this
        // value, which will be compared with all the others
        if( currentVal === null ){
            currentVal = p[0]
            return true
        }

        // Not the first iteration, compare it to the value
        return p[0] == currentVal
    }

    // Iterate over the segments of the path, checking if all of the values for this segment in every path is the same.
    do {
        // Check if the [0] element in each array is the same..
        if( _.every( pathsSplit, isFirstSame ) ){
            // .. If they are all the same, then drop the first item from each path,
            pathsSplit = _.map( pathsSplit, _.drop )
            // Add the path segment to the common root array/path
            commonRoot.push( currentVal )
            // Reset the currentVal
            currentVal = null
        }

        // When we reach a segment thats not the same in every path, then set the `result` variable, which will abort 
        // the do/while loop
        else {
            result = _.map( pathsSplit, p => '/' + _.join( p, '/' ) )
        }
    }
    while ( result === null )
    
    return {
        path : commonRoot.join('/'),
        files: result
    }
}

module.exports = sumPaths