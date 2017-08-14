'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )


const _internals = require( '../data' )

/**
 * Censor any common profanity words by replacing it with a specified word, or masking all or
 * some of the characters with a single specified character. The words are kept in the separate
 * data.js file, and base64 encrypted, as to not store a huge list of profanity on any users
 * computer. The list of words is actually a list that was downloaded from a TeamSpeak related
 * website of words to ban:
 * http://addons.teamspeak.com/directory/addon/miscellaneous-tools/TXT-English-badwords-bans-and-list.html
 * Note: This only supports the English language, the dirty version
 *
 * @name        module:_.censor
 * @function    module:_.censor
 * @memberof    module:_
 * @param       {string}    word                    Word to censor and parse
 * @param       {string}    [masker='*']            Single character or full single word
 * @param       {string}    [maskType='partial']    The masking 'type', can be:
 *                                      full        Entire word
 *                                      single      Single character
 *                                      firstlast   First and last letters
 *                                      middle      All BUT first and last
 *                                      partial     Majority of letters (55% after first letter)
 * @returns     {string}    Parsed and censored version of the provided word
 * @example 
 *  _.censor('damn')
 *  // => d**n
 */
function censor ( word, masker, maskType ) {
    if( ! word ){
        return word
    }

    masker   = masker ||'*'
    maskType = maskType || 'partial'

    const censored = _internals.censored
    const encWord  = new Buffer( word ).toString( 'base64' )

    // Lets hope this is a God fearing christian without a potty mouth
    if( _.indexOf( censored, encWord ) === -1 ){
        return word
    }

    // Return the masker to default if it's not a string
    if( ! masker || ! _.isString( masker ) ){
        masker = '*'
    }

    // If just a single character was given for the masker, then we can use the maskType
    if( masker.length <= 1 ){
        switch ( maskType ) {
            case 'full':
                return _.repeat( masker, word.length )
                break

            case 'single':
                return _.replaceAt( word, 2, masker )
                break

            case 'firstlast':
                return _.replaceAt( word, [0, word.length-1], masker )
                break

            case 'middle':
                const middles = _( word ).map(( s, i ) => i).drop().dropRight().value();
                return _.replaceAt( word, middles, masker )
                break

            default: // Partial
                const replaceNum = Math.floor(( 55 / 100 ) *  word.length)
                const range = _.range(1, replaceNum+1)
                return _.replaceAt( word, range, masker )
                break
        }
    }

    // If we were given a phrase as the mask, then just replace the entire word with that
    return masker
}


module.exports = censor
