'use strict'

const _ = require('lodash')

/**
 * Decodes a UTF-8 encoded string to the standard ISO-8859-1, this is meant to provide the same functionality
 * as the PHP utf8_decode function.
 *
 * @name        module:_.utf8Decode
 * @function    module:_.utf8Decode
 * @memberof    module:_
 * @param       {string}    str     UTF-8 encoded string
 * @returns     {string}   ISO-8859-1 decoded string
 * @example _.utf8Decode('Hello World')
 *              // => Hello World
 */
function utf8Decode ( str ) {
    if ( _.isNull( str ) || _.isUndefined( str ) || str === '' )
        return str

    //if( ! _.isString( str ) && ! _.isNumber( str ))
        //throw new Error( `Illegal value type given to utf8Decode, expected a UTF-8 encoded string, but received a ${typeof str}` )

    let tmp_arr = [],
        i = 0,
        ac = 0,
        c1 = 0,
        c2 = 0,
        c3 = 0,
        c4 = 0

    str += ''

    while ( i < _.size( str ) ) {
        c1 = str.charCodeAt(i);
        if (c1 <= 191) {
            tmp_arr[ac++] = String.fromCharCode(c1)
            i++
        } else if (c1 <= 223) {
            c2 = str.charCodeAt(i + 1)
            tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63))
            i += 2
        } else if (c1 <= 239) {
            // http://en.wikipedia.org/wiki/UTF-8#Codepage_layout
            c2 = str.charCodeAt(i + 1)
            c3 = str.charCodeAt(i + 2)
            tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63))
            i += 3
        } else {
            c2 = str.charCodeAt(i + 1)
            c3 = str.charCodeAt(i + 2)
            c4 = str.charCodeAt(i + 3)
            c1 = ((c1 & 7) << 18) | ((c2 & 63) << 12) | ((c3 & 63) << 6) | (c4 & 63)
            c1 -= 0x10000
            tmp_arr[ac++] = String.fromCharCode(0xD800 | ((c1 >> 10) & 0x3FF))
            tmp_arr[ac++] = String.fromCharCode(0xDC00 | (c1 & 0x3FF))
            i += 4
        }
    }

    return tmp_arr.join('')
}

_.mixin({
  utf8Decode: utf8Decode
})

module.exports = utf8Decode