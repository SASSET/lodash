'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Return a randomly generated string - at a specific length
 *
 * @name        module:_.randStr
 * @function    module:_.randStr
 * @memberof    module:_
 * @param       {number}    length  Length of the desored string (Default: 20)
 * @returns     {string}
 * @todo    Add the ability to specify the 'possible' string characters
 * @example 
 *  _.randStr( 15 )
 *  // => gyC8Q9MABoEjGK6
 */
function randStr ( length ) {
    length = length || 20

    if( ! _.isNumeric( length ))
        throw new Error('_.randStr needs a numeric value')

    let result = ''

    const possible = [
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        'abcdefghijklmnopqrstuvwxyz',
        '0123456789',
        '$./'
        //'`~!@#$%^&*()-_=+[{]}\\|\'";:/?.>,<'
    ].join('')

    for( let i=0; i < Number( length ); i++ )
        result += possible.charAt(Math.floor(Math.random() * possible.length))

    return result
}

module.exports = randStr