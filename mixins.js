'use strict'

/**
 * @title Lodash Mixins aka flat-line
 * @description Extra useful Lodash mixins
 * @requires lodash, crypto, ./data.js
 *
 * Note: A few of the mixins were originally from phpjs.org methods, and were modified to use some of the lodash methods,
 * and to work as a mixin with the other methods. Also, they may have been optimized a bit, as they may have originally
 * been created some time ago. The methods that were originally from phpjs.org are: utf8Encode, utf8Decode and sha1.
 * Authors of borrowed functions are noted inside the functions themselves
 *
 * @author Justin Hyland (Mostly)
 * @url https://github.com/SASSET/flat-line
 * @see https://github.com/SASSET/flat-line
 * @version 0.1.0
 * @todo Split all functions into separate .js files; which can all be loaded by loading the index
 */

const Util = require('util')

/**
 * @module _
 */
const _ = require('lodash')

// Get a fresh copy of lodash, since implementing mixins in the instance
// being used to add the mixins, doesn't work very well
const __ = _.runInContext()

const _m = _.runInContext()

// Used for makeHash
const crypto = require('crypto')

var _dirs = {
    mixins: './mixins',
    data: './data'
}

//README.md        censored.json    ciphermap.json   en-words.json    uncountable.json

// Functions and storage for internal use only
const _internals = {
    alternator: {
        i: 0,
        params: null
    },
    uncountable: require( `${_dirs.data}/uncountable` ),
    censored: require( `${_dirs.data}/censored` ),
    ciphermap: require( `${_dirs.data}/ciphermap` ),
    enwords: require( `${_dirs.data}/en-words` ),
    htmlEntities: {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    }
}

function flipLeet(){
    var results = []

    _.each( exports.leetChars, ( charArr, alphaChar ) => {
        _.each( charArr, ( char, charIdx ) => {
            results.push({
                letter: alphaChar,
                leet: char
            })
        })
    })

    return results
}

































/**
 * Check if a specified string is in snake_case format
 *
 * @name        module:_.isSnake
 * @function    module:_.isSnake
 * @memberof    module:_
 * @param       {string}    str     String to inspect
 * @returns     {boolean}   Returns True if the string is in case snake, False otherwise.
 * @note        ALPHA PHASE - Under Construction
 * @example
 *  _.isSnake( _.snakeCase('Foo Bar') )
 *  // => true
 *  _.isSnake( _.camelCase('Foo Bar') )
 *  // => false
 */
function isSnake ( str ) {
    return str === _.snakeCase( str )
}

/**
 * Check if a specified string is in camelCase format
 *
 * @name        module:_.isCamel
 * @function    module:_.isCamel
 * @memberof    module:_
 * @param       {string}    str     String to inspect
 * @returns     {boolean}
 * @note        ALPHA PHASE - Under Construction
 * @example
 *  _.isSnake( _.snakeCase('Foo Bar') )
 *  // => true
 *  _.isSnake( _.camelCase('Foo Bar') )
 *  // => false
 */
function isCamel ( str ) {
    return str === _.camelCase( str )
}

/**
 * Check if a specified string is in kebab-case format
 *
 * @name        module:_.isKebab
 * @function    module:_.isKebab
 * @memberof    module:_
 * @param       {string}    str     String to inspect
 * @returns     {boolean}
 * @note        ALPHA PHASE - Under Construction
 * @example
 *  _.isKebab( _.kebabCase('Foo Bar') )
 *  // => true
 *  _.isKebab( _.camelCase('Foo Bar') )
 *  // => false
 */
function isKebab ( str ) {
    return str === _.kebabCase( str )
}

/**
 * Check if a specified string is in Start Case format
 *
 * @name        module:_.isStart
 * @function    module:_.isStart
 * @memberof    module:_
 * @param       {string}    str     String to inspect
 * @returns     {boolean}
 * @note        ALPHA PHASE - Under Construction
 * @example
 *  _.isSnake( _.snakeCase('Foo Bar') )
 *  // => true
 *  _.isSnake( _.camelCase('Foo Bar') )
 *  // => false
 */
function isStart ( str ) {
    return str === _.startCase( str )
}

/**
 * Check if a specified string is in lower case format
 *
 * @name        module:_.isLower
 * @function    module:_.isLower
 * @memberof    module:_
 * @param       {string}    str     String to inspect
 * @returns     {boolean}
 * @example
 *  _.isLower( _.lowerCase('Foo Bar') )
 *  // => true
 *  _.isLower( _.upperCase('Foo Bar') )
 *  // => false
 */
function isLower ( str ) {
    return str === _.lowerCase( str )
}

/**
 * Check if a specified string is in UPPER CASE format
 *
 * @name        module:_.isUpper
 * @function    module:_.isUpper
 * @memberof    module:_
 * @param       {string}    str     String to inspect
 * @returns     {boolean}
 * @note        ALPHA PHASE - Under Construction
 * @example
 *  _.isUpper( _.upperCase('Foo Bar') )
 *  // => true
 *  _.isUpper( _.lowerCase('Foo Bar') )
 *  // => false
 */
function isUpper ( str ) {
    return str === _.upperCase( str )
}

/**
 * Retrieve the case type of a specified string
 *
 * @name        module:_.getCase
 * @function    module:_.getCase
 * @memberof    module:_
 * @param       {string}    str     String to inspect
 * @returns     {(string|undefined)}  Will return one of: snake, camel, kebab, start, lower, upper or undefined if none
 * @note        ALPHA PHASE - Under Construction, needs a serious re-write
 * @example
 * var str = 'Hello World..'
 *  _.each()
 */
function getCase ( str ) {
    
    if( isUpper( str ) ){
        return 'upper'
    }

    if( isSnake( str ) ){
        return 'snake'
    }

    if( isCamel( str ) ){
        return 'camel'
    }
    
    if( isKebab( str ) ){
        return 'kebab'
    }

    if( isStart( str ) ){
        return 'start'
    }

    if( isLower( str ) ){
        return 'lower'
    }

    return undefined
}

/**
 * Verify a string is in a specified format.
 *
 * @name        module:_.isCase
 * @function    module:_.isCase
 * @memberof    module:_
 * @param       {string}    theCase The case to validate
 * @param       {string}    str     String to inspect
 * @returns     {boolean}
 * @note        ALPHA PHASE - Under Construction
 * @example
 *  _.isCase( 'snake', _.snakeCase( 'Hello World' ) )
 *  // => true
 *  _.isCase( 'kebab', _.snakeCase( 'Hello World' ) )
 *  // => false
 */
function isCase ( theCase, str ) {
    switch( theCase ){
        case 'snake':
            return _.snakeCase( str ) === str
            break

        case 'camel':
            return _.camelCase( str ) === str
            break

        case 'kebab':
            return _.kebabCase( str ) === str
            break

        case 'start':
            return _.startCase( str ) === str
            break

        case 'lower':
            return _.lowerCase( str ) === str
            break

        case 'upper':
            return _.upperCase( str ) === str
            break

        default:
            return false
            break
    }
}







/* Not sure what this is for.. forgot.
function matches( source ) {
    return function(obj) {
        return _.some(_.toPairs(source), function(keyValue) {
            return obj[keyValue[0]] === keyValue[1];
        });
    };
}
*/








/**
 * Function to check if the password contains any of the strings listed 
 * in exports.password.blacklist
 *
 * @param   {string}        value       Password to check
 * @param   {string,object} criteria   
 *
 * @example
 *  _.vulnerablePass( '%^(PaSsWoRd)8*^&', 'casesensitive;exactMatch' ) // or..
 *  _.vulnerablePass( '%^(PaSsWoRd)8*^&', [ 'casesensitive', 'exactMatch' ] ) // or..
 *  _.vulnerablePass( '%^(password)8*^&', { casesensitive: true, exactMatch: true } )
 *      // => false (password is not vulnerable) 
 *
 * @example
 *  _.vulnerablePass( '%^(PaSsWoRd)8*^&', { casesensitive: false, exactMatch: false } ) // or..
 *  _.vulnerablePass( '%^(PaSsWoRd)8*^&', '!casesensitive;!exactMatch' ) // or..
 *  _.vulnerablePass( '%^(PaSsWoRd)8*^&', [ '!casesensitive', '!exactMatch' ] )
 *      // => true (password is vulnerable because it contains "password") 
 *
 * @example
 *  _.vulnerablePass( 'p@s$w0rd', { fromleet: true, exactMatch: true } ) // or..
 *  _.vulnerablePass( 'p@s$w0rd', [ 'fromleet', 'exactMatch' ] ) // or..
 *  _.vulnerablePass( 'p@s$w0rd', 'fromleet;exactMatch' )
 *      // => true (password is vulnerable because its just a l33t form of 'password') 
 */
function vulnerablePass( value, criteria ){

}

/**
 * Determine if a value is in l33t format
 */
function isLeet( value ){

}

/**
 * Convert a string from l33t to normal text
 */
function fromLeet( value ){
    var chars = value.split(''),
        result = []

    _.each( chars, ( char, idx ) => {

    })
}

/**
 * Convert a string from normal text to l33t
 */
function fromLeeta( value ){
    var chars = value.split(''),
        result = []

    _.each( chars, ( char, idx ) => {

    })
}




















// Mixin names and references to the local function
const defaultMixins = {
    md5: md5,
    swap: swap,
    bool: bool,
    sha1: sha1,
    hash: makeHash,
    type: getType,
    nl2br: nl2br,
    br2nl: br2nl,
    maxOf: maxOf,
    minOf: minOf,
    isCase: isCase,
    typeof: getTypeof,
    censor: censor,
    plural: plural,
    isUniq: isUniq,
    sortObj: sortObj,
    isFloat: isFloat,
    isSnake: isSnake,
    randStr: randStr,
    isCamel: isCamel,
    isKebab: isKebab,
    isStart: isStart,
    isLower: isLower,
    isUpper: isUpper,
    getCase: getCase,
    strDist: strDist,
    isEmail: isEmail,
    endWith: endWith,
    sumPaths: sumPaths,
    uniqObjs: uniqObjs,
    valTypes: valTypes,
    replaceAt: replaceAt,
    mergeObjs: mergeObjs,
    isNumeric: isNumeric,
    startWith: startWith,
    sortMatch: sortMatch,
    removeObj: removeObj,
    utf8Encode: utf8Encode,
    utf8Decode: utf8Decode,
    valueTypes: valTypes,
    pullSample: pullSample,
    generateKey: generateKey,
    mysqlEscape: mysqlEscape,
    isCountable: isCountable,
    dontEndWith: dontEndWith,
    levenshtein: levenshtein,
    includesAll: includesAll,
    validPattern: validPattern,
    passwordHash: passwordHash,
    setException: setException,
    isDefinedMap: isDefinedMap,
    multiReplace: multiReplace,
    isDefinedDate: isDefinedDate,
    dontStartWith: dontStartWith,
    isDefinedType: isDefinedType,
    isEnglishWord: isEnglishWord,
    isDefinedFloat: isDefinedFloat,
    passwordVerify: passwordVerify,
    pullSampleSize: pullSampleSize,
    isDefinedArray: isDefinedArray,
    summarizePaths: sumPaths,
    stripCommonRoot: stripCommonRoot,
    isDefinedString: isDefinedString,
    isDefinedNumber: isDefinedNumber,
    isDefinedObject: isDefinedObject,
    isDefinedBoolean: isDefinedBoolean,
    getObjectMethods: getObjectMethods,
    isDefinedFunction: isDefinedFunction,
    getObjectProperty: getObjectProperty
}

// Mixin the above functions into the fresh version of Lodash....
__.mixin( defaultMixins )

// module.exports = exports
module.exports = __