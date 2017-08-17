'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _internals  = require( '../data' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Validation for legitimate regular expression pattern validation
 *
 * @name        module:_.validPattern
 * @function    module:_.validPattern
 * @memberof    module:_
 * @param   {Mixed}             pattern     Pattern to validate (String, number, regexp, etc)
 * @param   {string}            flags       Regular expression flags (Not required)
 * @param   {boolean}           reason      If pattern is invalid, instead of returning false, return the error (string),
 *                                          which would change the return to `true` = valid, and any string = invalid
 * @returns {boolean|string}   If the pattern will work in a regexp check, then true
 * @note    This is best used when validating strings, as invalid regexp elements will throw an error before this
 *          function even gets a chance to validate. Meaning something like `_.validPattern(/a/asdf)` will throw an
 *          exception on the line the invalid pattern was passed
 * @todo    Somehow parse a string for a regex pattern and flags; EG: /foo/g -> ['foo','g']; %bar%i -> ['bar','i']
 */
function validPattern( pattern, flags, reason ) {
    const permitted = [
        // Valid value types that can actually be valid regex patterns
        'regexp', 'string', 'number',
        // Empty/null can accidentally be sent, so don't reject them, as all it should do
        // is save an empty regex value to the config
        'undefined', 'null'
    ]

    const ptrnType = _.getTypeof( pattern )

    if( ! _.includes( permitted, ptrnType ) ){
        if( reason === true ){
            return `Illegal pattern value type, expecting a 'string', 'number' or RegExp object - received a '${ptrnType}'`
        }
        
        return false
    }

    // If flags are provided, they must be in string format
    if( ! _.isUndefined( flags ) && ! _.isNull( flags ) && ! _.isString( flags ) ){
        if( reason === true ){
            return `Illegal flag value type, expecting type 'string' or nothing - received a '${_.getTypeof( flags )}'`
        }
        
        return false
    }

    // null/undefined
    if( _.isEmpty( pattern ) ){
        return true
    }

    // Use this instead of just `arguments`, because we dont want the `reason` to be passed down
    const regexpParams = [ pattern ]

    if( _.isString( flags ) ){
        regexpParams.push( flags )
    }

    let isValid = true
    let err

    try {
        RegExp.apply( RegExp, regexpParams )
    } catch( e ) {
        err = e
        isValid = false
    }

    // If its valid, then return true and go no further!
    if( isValid === true ){
        return true
    }

    // If there needs to be a reason, then return one if there is one
    if( reason === true ){
        return err
            ? err.toString()
            : 'Invalid RegExp pattern - Unknown reason'
    }

    return false
}

module.exports = validPattern
