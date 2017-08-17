'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _internals  = require( '../data' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * This performs a series of replacements in a string, using the items within
 * an object/array. Just a quicker/easier way than chaining .replace() over
 * and over again. The replacements can be an array of arrays, an array of objects,
 * or an object
 *
 * @name        module:_.multiReplace
 * @function    module:_.multiReplace
 * @memberof    module:_
 * @param       {string}            str             String to be parsed/returned
 * @param       {(object|array)}    replacements    Replacements, with original string as the key, and replacement as 
 *                                                  the value
 * @param       {string}            modifiers       Regex modifiers to use for search (EG: i for case-insensitivity) 
 *                                                  'g' (global) is included by default
 * @returns     {string}    Parsed and modified version of the provided string
 * @example 
 *  _.multiReplace( 'test', { t: 'T'} )
 *  // => TesT
 *  _.multiReplace( 'foo', { FOO: 'bar'}, 'i' )
 *  // => bar
 *  _.multiReplace( 'Windows XP', [{ windows: 'Linux'}, {xp: 'RHEL'}], 'i' )
 *  // => Linux RHEL
 */
function multiReplace ( str, replacements, modifiers ) {
    if( ! str || ! _.isString(str) ){
        return str
    }

    if( ! replacements ){
        return str
    }

    // Replacements need to be an object, or an array with two values (which is verified later)
    if( ! _.isPlainObject( replacements ) && ! _.isArray( replacements ) ){
        throw new Error(`Replacements need to be an array or plain object, you gave us a ${_.getType(str)}`)
    }

    // Since we later expect for the replacements to be an object, check if its
    // an array, if so, reconstruct it into an object
    if( _.isArray( replacements ) ) {
        const replacementsObj = {}

        // Loop through each replacement, checking the values, making sure both a search/replace is present
        _.forEach( replacements, r => {
            // If its an array, then it needs atleast two values in it
            if( _.isArray(r)) {
                if( _.isUndefined( r[0] ) || _.isUndefined( r[1] ) ) {
                    throw new Error( 'Replacement structure illegal - Array of unfulfilled array' )
                }
                else {
                    replacementsObj[ r[ 0 ] ] = r[ 1 ]
                }
            }
            // If its an object, use hte key/val
            else if(_.isPlainObject(r)) {
                replacementsObj[ Object.keys(r)[0] ] = r[ Object.keys(r)[0] ]
            }
            
            // Shouldnt ever really get here, but I guess im just paranoid
            else {
                throw new Error(`Replacement structure illegal - Array of non-array and non-object`)
            }
        } )

        replacements = replacementsObj
    }

    // Execute the replacements!
    _.forEach( replacements, ( r, f ) => {
        str = str.replace( new RegExp( f, `g${modifiers || ''}` ), r )
    })

    return str
}

module.exports = multiReplace
