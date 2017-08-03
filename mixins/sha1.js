'use strict'

const _ = require('lodash')

/**
 * Calculate the sha1 hash of a specific string. This is the equivalent of PHP's sha1()
 * function.
 *
 * @name        module:_.sha1
 * @function    module:_.sha1
 * @memberof    module:_
 * @param       {string}    str     String to calculate hash for
 * @returns     {string}    SHA1 hash
 * @example 
 *  _.sha1('test')
 *  // => a94a8fe5ccb19ba61c4c0873d391e987982fbbd3
 */
function sha1 ( str ) {
    const rotate_left = ( n, s ) => (n << s) | (n >>> (32 - s))

    /*var lsb_hex = function (val) { // Not in use; needed?
     var str="";
     var i;
     var vh;
     var vl;

     for ( i=0; i<=6; i+=2 ) {
     vh = (val>>>(i*4+4))&0x0f;
     vl = (val>>>(i*4))&0x0f;
     str += vh.toString(16) + vl.toString(16);
     }
     return str;
     };*/

    const cvt_hex = val => {
        let str = ''
        let i
        let v

        for (i = 7; i >= 0; i--) {
            str += ((val >>> (i * 4)) & 0x0f).toString(16)
        }
        return str
    }

    let blockstart
    let i, j
    const W = new Array(80)
    let H0 = 0x67452301
    let H1 = 0xEFCDAB89
    let H2 = 0x98BADCFE
    let H3 = 0x10325476
    let H4 = 0xC3D2E1F0
    let A, B, C, D, E
    let temp

    str = _.utf8Encode(str)
    const str_len = _.size( str )

    const word_array = []

    for (i = 0; i < str_len - 3; i += 4) {
        j = str.charCodeAt(i) << 24 | str.charCodeAt(i + 1) << 16 | str.charCodeAt(i + 2) << 8 | str.charCodeAt(i + 3)
        word_array.push(j)
    }

    switch (str_len % 4) {
        case 0:
            i = 0x080000000
            break;
        case 1:
            i = str.charCodeAt(str_len - 1) << 24 | 0x0800000
            break;
        case 2:
            i = str.charCodeAt(str_len - 2) << 24 | str.charCodeAt(str_len - 1) << 16 | 0x08000
            break;
        case 3:
            i = str.charCodeAt(str_len - 3) << 24 | str.charCodeAt(str_len - 2) << 16 | str.charCodeAt(str_len - 1) <<
            8 | 0x80
            break;
    }

    word_array.push(i)

    while ((_.size( word_array ) % 16) != 14) {
        word_array.push(0)
    }

    word_array.push(str_len >>> 29)
    word_array.push((str_len << 3) & 0x0ffffffff)

    for (blockstart = 0; blockstart < _.size( word_array ); blockstart += 16) {
        for (i = 0; i < 16; i++) {
            W[i] = word_array[blockstart + i]
        }
        for (i = 16; i <= 79; i++) {
            W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1)
        }

        A = H0
        B = H1
        C = H2
        D = H3
        E = H4

        for (i = 0; i <= 19; i++) {
            temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff
            E = D
            D = C
            C = rotate_left(B, 30)
            B = A
            A = temp
        }

        for (i = 20; i <= 39; i++) {
            temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff
            E = D
            D = C
            C = rotate_left(B, 30)
            B = A
            A = temp
        }

        for (i = 40; i <= 59; i++) {
            temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff
            E = D
            D = C
            C = rotate_left(B, 30)
            B = A
            A = temp
        }

        for (i = 60; i <= 79; i++) {
            temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff
            E = D
            D = C
            C = rotate_left(B, 30)
            B = A
            A = temp
        }

        H0 = (H0 + A) & 0x0ffffffff
        H1 = (H1 + B) & 0x0ffffffff
        H2 = (H2 + C) & 0x0ffffffff
        H3 = (H3 + D) & 0x0ffffffff
        H4 = (H4 + E) & 0x0ffffffff
    }

    return ( cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4) ).toLowerCase()
}

_.mixin({
    sha1: sha1
})

module.exports = sha1