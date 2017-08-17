'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _internals  = require( '../data' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Determine how strong a password is
 *
 * @name        module:_.passwordStrength
 * @function    module:_.passwordStrength
 * @memberof    module:_
 * @param       {string}     password   Password to check
 * @returns     {bool}      A numerical value representing the strength (0 = weakest)
 * @todo        Allow some custom criteria
 * @todo        Allow minimum strength
 * @example
 *    _.passwordStrength('')                        //  0
 *    _.passwordStrength('foo')                     //  1
 *    _.passwordStrength('Foo')                     //  2
 *    _.passwordStrength('Foo123')                  //  3
 *    _.passwordStrength('Foo123!@#')               //  6
 *    _.passwordStrength('FooBAR!@#123456abcdefg')  // 10
 *    !!_.passwordStrength('')                      //  fail (typecast to bool using !!)
 */
function passwordStrength( password ){
  _d( `Testing strength for password: ${password}` )

  if ( ! _.has( _internals, 'passwordCriteria' ) )
    throw new Error( 'No "passwordCriteria" found in internal data' )

  if ( ! _.isArray( _internals.passwordCriteria ) )
    throw new Error( 'Invalid found in "passwordCriteria" internal data (Expecting an array)' )
  
  const checks = _internals.passwordCriteria

  var strength = 0,
      was, res, fn

  checks.forEach( ( c, cIdx ) => {
    if ( ! _.isObject( c ) ){
      _d( `The check at index ${cIdx} is not an object` )
      return
    }

    if ( ! _.has( c, 'check' ) ){
      _d( `The check at index ${cIdx} does not have a "check" item` )
      return
    }

    if ( ! _.isString( c.desc ) )
      c.desc = `[Check #${cIdx+1}]`
    
    was = strength

    // Regex checks..
    if ( _.isRegExp( c.check ) ){
      fn = `Regex Check "${c.desc}"`

      if ( c.check.test( password ) ){
        strength = ++strength
        _d( `${fn} PASSED - strength increased from ${was} to ${strength}` )
      }
      else {
        _d( `${fn} FAILED - strength currently: ${strength}` )
      }
    }

    // Function checks..
    else if( _.isFunction( c.check ) ){
      fn = `Function Check "${c.desc}"`
      res = c.check( password )

      // Boolean or 0 number
      if ( typeof res === 'boolean' || ( _.isNumeric( res ) && res <= 0 ) ){
        if ( res === true ){
          strength = ++strength
          _d( `${fn} PASSED - strength increased from ${was} to ${strength}` )
        }
        else {
          _d( `${fn} FAILED - strength currently: ${strength}` )
        }
      }
      // Returned a number
      else if ( typeof res === 'number' ){
        strength = Math.round(res+strength)
        _d( `${fn} PASSED - Returned number ${res} - strength increased from ${was} to ${strength}` )
      }

      // Anything else is invalid
      else {
        _d( `Invalid result from check "${c.desc}"  (result: "${res}" typeof: ${typeof res})- skipping` )
      }
      
    }

    else {
      _d( `Invalid Check "${c.desc}" - Not a regex pattern or a function, skipping` )
    }
  })

  _d( `Returning strength of ${strength} for password "${password}"` )

  return strength
}

module.exports = passwordStrength
