'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )
const debugName = `sasset:lodash:${mixin}`

const _d = debug( debugName )

_d( 'Included the mixin script "%s"',mixin  )


/**
 * Partition Key Generator - Mimics the Jira Project key generation
 *
 * Rules:
 * - First character must be a letter
 * - All letters must be from teh Modern Roman Alphabet, and in upper case format
 * - Only letters, numbers or the underscore character can be used
 *
 * @todo    Maybe rename this to one of: atlassianKey, jiraKey, projectKey
 * @todo    Make an option to grab the first uppercase alpha characters from the words, instead of just the first alpha
 * @todo    Add the ability to require a minimum length
 * @todo    Add the ability to require a minimum amount of alpha characters in the key (EG: If the minimum is 3, then 'str99' is ok, but 'st100' would fail )
 * @example // Generate a key thats 3 characters or less, provided an array of existing keys to validate a unique result
 * _.generateKey( 'Foo Bar Baz', 3, [ 'FBB', 'FB1', 'FB2' ] )
 * // => FB3
 *
 * @example // Generate a key thats 5 characters or less, using a function to validate the unique key
 * _.generateKey( '1st Project: Foo Bar Baz', 5, key => _.indexOf( [ 'PFBB', 'PFBB1', 'PFBB2'], key ) === -1 )
 * // => PFBB3
 */
function generateKey( cfgOrName, maxLength, unique, condenseDupChars ){
    //var debug = false
    var _l = {
        out: function( type, args ){
            //if ( debug ){
            //    console[ type ].apply( null, args )
            //}
        },
        l: debug( `${debugName}:log` ), // function(){ _l.out( 'log', arguments ) },
        d: debug( `${debugName}:debug` ), // function(){ _l.out( 'debug', arguments ) },
        w: debug( `${debugName}:warn` ), // function(){ _l.out( 'warn', arguments ) },
        e: debug( `${debugName}:error` ) // function(){ _l.out( 'error', arguments ) },
    }

    //_l.l('Logging test...')
    //_l.d('Debug test...')
    //_l.w('Warning test...')
    //_l.e('Error test...')
    
    // Functions to validate the parameter values
    var paramValidators = {
        /**
         * Name - Needs to contain some alpha characters (_.isString would pass a value containing only numbers 
         * or special characters)
         */
        name:       name => !( _.isEmpty( name ) || ! _.isFunction( name.match ) || ! name.match( /[a-zA-Z]/ ) ),
        /**
         * Length - Needs to be a positive numeric value (_.isNumber or _.isInteger fails for numerical strings)
         */
        maxLength:  leng => ( parseInt( leng ) == leng && leng > 0 ),
        /**
         * Unique value - Needs to be an array (of existing values), a function (which accepts a string and 
         * verifies its unique) or false (disabling unique validations)
         */
        unique:     uniq => ( _.isArray( uniq ) || _.isFunction( uniq ) || uniq === false ),
        /**
         * Condense Duplicates - Boolean only
         */
        condense:   cond => ( _.isBoolean( cond ) )
    }
    
    // Set default values in the initial cfg object
    var cfg = {
        name    : null,
        length  : 5,
        unique  : null,
        condense: false,
        regex   : {
            /**
             * To
             */
            segment: '[a-zA-Z0-9-]+'
        }
    }
    
    var valInfo = val => `Value Type: ${Object.prototype.toString.call( val )}; Value (JSON): ${JSON.stringify(val)}`

    // If the first parameter is an object, then its expected to hold all the values
    if ( _.isObject( arguments[0] ) ){
        
        // Iterate over the items in the first parameter, processing each value as a config item, based on the key
        _.forEach( arguments[0], ( value, key ) => {
            //paramInfo = `Key: ${key}; Value Type: ${Object.prototype.toString.call( value )}; Value (JSON): ${JSON.stringify(value)}`
        
            //console.debug( '> KEY: %s; VALUE: %s', key, JSON.stringify(value))
            // Use a switch statement to accommodate aliases for the setting names
            switch( _.toLower( key ) ){
                case 'name':
                case 'title':
                    if ( ! paramValidators.name( value ) ){
                        //throw new Error( `Invalid value provided for the name/title (Key: ${key}; ${valInfo(value)})` )
                        return
                    }
                    
                    cfg.name = value
                    break
                    
                case 'maxlength':
                case 'max':
                case 'length':
                case 'limit':
                    if ( ! paramValidators.maxLength( value ) ){
                        //throw new Error( `Invalid value provided for the maximum length (Key: ${key}; ${valInfo(value)})` )
                        return
                    }
                    
                    cfg.length = parseInt( value )
                    break
                    
                case 'unique':
                case 'distinct':
                    if ( ! paramValidators.unique( value ) ){
                        //throw new Error( `Invalid value provided for the unique validator (Key: ${key}; ${valInfo(value)})` )
                        return
                    }
                    
                    cfg.unique = value
                    break
                    
                case 'condensedupchars':
                case 'condenseduplicatechars':
                case 'condenseduplicates':
                case 'condenseduplicate':
                case 'condensedups':
                case 'condense':
                case 'condensedup':
                    if ( ! paramValidators.condense( value ) ){
                        //throw new Error( `Invalid value provided for the duplicate character condenser (Key: ${key}; ${valInfo(value)})` )
                        return
                    }   
                    
                    cfg.condense = !!value          
                    break
                    
                default:
                    console.warn( `Unknown setting found in the object provided - Key: ${key}; ${valInfo(value)}` )
                    break
            }
        })
    }

    // If its not an object, but there were parameters provided, then process the other parameters
    else if ( ! _.isEmpty( arguments ) ){
        // Name  ------------------------------
        if ( ! paramValidators.name( cfgOrName ) ){
            _l.e( 'Invalid value provided for the name/title (%s)', valInfo( cfgOrName ) )
            return
        }
                    
        cfg.name = cfgOrName

        // Max Length -------------------------
        if ( ! _.isUndefined( maxLength ) ){
            if ( ! paramValidators.maxLength( maxLength ) ){
                _l.w( 'Invalid value provided for the maximum length (%s)', valInfo( cfgOrName ) )
            }
                        
            cfg.length = parseInt( maxLength )
        }


        // Unique Validator -------------------
        if ( ! _.isUndefined( unique ) ){
            if ( ! paramValidators.unique( unique ) ){
                _l.w( 'Invalid value provided for the unique validator (%s)', valInfo( cfgOrName ) )
            }
                        
            cfg.unique = unique
        }


        // Condense Duplicate Chars -----------
        if ( ! _.isUndefined( condenseDupChars ) ){
            if ( ! paramValidators.condense( condenseDupChars ) ){
                _l.w( 'Invalid value provided for the duplicate character condenser (%s)', valInfo( cfgOrName ) )
            }   
                        
            cfg.condense = !!condenseDupChars   
        }
    }

    // 
    else {
        //throw new Error( 'Invalid or undefined values provided' )
        return undefined
    }

    // Convert the unique config value to an executable function 
    cfg.isUnique = ( uniqueCfg => {
        console.log('[cfg.unique IIFE] PARAM uniqueCfg:',uniqueCfg)
        // If its already a function, just return it
        if ( _.isFunction( uniqueCfg ) ){
            return uniqueCfg
        }

        // If its an array, return a function that verifies it doesn't contain the param
        if ( _.isArray( uniqueCfg ) ){
            return v => _.indexOf( uniqueCfg, v ) === -1
        }

        // For anything else, return a function that always returns true, effectively disabling unique validation
        return () => true
    })( cfg.unique )

    // Convert the regex string to a real regex object
    cfg.segRegex = new RegExp( cfg.regex.segment, 'g' )
    
        
    /**
     * Takes a string and returns a version of said string:
     *  - Converted to uppercase
     *  - Starting with an alpha character (first alpha character found in the string)
     *  - Any non-alphanumeric or underscore characters removed
     * @see https://confluence.atlassian.com/adminjiraserver071/changing-the-project-key-format-802592378.html
     */
    let _sanitizeStr = function( _pName ){
        _pName = _.toUpper( _pName )

        // Strip any non-alpha characters from the beginning
        _pName = _pName.replace(/^[^A-Z]*/g, "")

        // Remove anything thats not alpha-numeric or an underscore
        _pName = _pName.replace(/[^A-Z0-9_]+/g, " ")

        _pName = _.trim( _pName )
        
        if ( ! _pName ){
            return false
        }
        
        return _pName
    }
    
    // Internal function to shorten a string by taking one or more characters off of the end
    let _shortenStr = function( _str, _len  ) {
        if ( ! _str || _len == 0 ) return

        _str = _.toString( _str )

        if ( _.isUndefined( _len ) ){
            _len = 1
        }
        else if ( parseInt( _len ) != _len ){
            _l.w( 'Unable to use the value "%s" as the shortening length - value is not an integer', _len )
            _len = 1
        }
        else {
            _len = parseInt( _len )
        }

        if ( ! _str || ! _.isString( _str ) || ! _str.hasOwnProperty('length') || _str.length < 1 || (_str.length - _len) < 1 ) {
            _l.w( 'Unable to shorten the string - either due to an invalid value, or the resulting value is zero length (String: "%s"; Trim Length: ")', _str, _len )
                
            return
        }

        return _str.substring( 0, _str.length - _len )
    }
    
    // Function to check if the key is unique or not (by using isUniqueOrList, either as an array of existing keys, or a function to check)
    let _makeUnique = function( _key ){
        let i           = 0,
            // Store the original key as it is before any changes
            origBaseKey = _key,
            // Base key is the portion of the key getting modified, without the numerical values 
            baseKey     = _key,
            // The modified base key and the numerical incremented digits concatenated together
            uniqueKey   = _key,
            // When the value of uniqueKey is verified to be unique (by cfg.unique), this is set to true
            isUnique    = false,
            // misc
            m, result

        do {
            if ( baseKey.length < i.toString().length ){
                return
            }
            
            // Only append the numerical value if its non-zero
            if ( i !== 0 ){
                uniqueKey = baseKey + i.toString()

                // If the concatenated key and numerical value is greater than the key size, then trim the difference
                // off of the key
                if ( uniqueKey.length > cfg.length ){
                    var was = uniqueKey
                    
                    baseKey = _shortenStr( baseKey, baseKey.length - (baseKey.length - i.toString().length) )
                    
                    if ( ! baseKey ){
                        return 
                    }
                    
                    uniqueKey = baseKey + i.toString()
                }
            }

            isUnique = cfg.isUnique( uniqueKey )
            
            if ( uniqueKey.length > cfg.length ){
                _l.w( 'Invalid value provided for the maximum length (%s)', valInfo( cfgOrName ) )
            }
    
            i += 1
        } 
        while ( isUnique !== true )

        return uniqueKey
    }
    
    let key = ''
    let origName = cfg.name
    let name = cfg.name

    
    name = _sanitizeStr( name )
    
    if ( ! name ){
        console.error( 'Failed to generate key for the partition name "%s" - The sanitized version of the name was empty' )
        return
    }


    let nameSegments = _.words( name, cfg.segRegex )

    // https://lodash.com/docs/4.16.6#words
    
    // If there arent enough 'words' in the partition name to generate a decent key, then just use the first characters of the partition name itself
    if ( nameSegments.length < cfg.length ){
        key = name.substr( 0, cfg.length )
    }
    else {
        let char
        // These two are only used if cfg.condense is enabled
        let dupCount = 0
        let lastChar
        
         _.forEach( nameSegments, s => {
            char = _.toUpper( s.charAt(0) )

            if ( s.match( /[a-zA-Z]/ ) ){

            }
            else {

            }
                        
            // If duplicate character condensing is enabled, then keep track of the duplicates 
            // (changing a key that would be FOOOD to F03D)
            if ( cfg.condense === true ){
                // If the current char is the same as the last, then increment the dup count
                if ( char === lastChar && char.match( /[A-Z]/ ) ){
                    // If this is the first detected duplicate, then increment twice, since were now on the 2nd character
                    if ( dupCount === 0 ){
                        dupCount++
                    }

                    dupCount++
                    
                    return
                }
                
                // If its not the same, but we just ended a duplicate character count, then add the duplicate count
                if ( dupCount > 0 ) {
                    key += dupCount.toString()

                    dupCount = 0
                }
                
                lastChar = char
            }           
            
            key += char
        })


        if ( key.length > cfg.length ){
            key = key.substring( 0, cfg.length )
        }
    }

    if ( ! _.size( key ) ){
        return
    }
    
    key = _makeUnique( key )
        
    return key
}

module.exports = generateKey