'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _internals  = require( '../data' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Return the type of a specific variable, much like the standard 'typeof', only
 * with a little more functionality. This is primarily used for input from
 * libraries/packages/modules that may convert the variable to a different type
 * when interacting with it. For example, pretty much anything passed through the
 * URI parameters will be a string, as well as anything passed through GetOpts,
 * but you may want integers, for example, to actually be identified as numbers, or
 * true/false/null/undefined strings to be identified as boolean/null/undefined.
 * That's what the scrutinize parameter does here, it will process the variable
 * to attempt to identify the type it originally was.
 *
 * NOTE: If no type is matched, then the toString() value will be returned
 *
 * @name        module:_.typeof
 * @function    module:_.typeof
 * @memberof    module:_
 * @param       {*}         value           Value to process
 * @param       {boolean}   inspect         Determine if the true value type should be determined through logical 
 *                                          processing
 * @param       {object}    returnTypes     Object of return type strings to overwrite
 * @param       {object}    flaggedVals     Values used to determine the real value types of flagged values (Only used 
 *                                          if scrutinize is enabled)
 * @returns     {string}    The variable type; The default type names are:
 *                          undefined, null, string, boolean, array, element, date, regexp, object, number, function, unknown
 *                       However, these can be overridden by providing an object as the 3rd parameter
 * @example _.typeof( [1,2] )       // array
 *          _.typeof( 'foo' )       // string
 *          _.typeof( true )        // boolean
 *          _.typeof( 'true' )      // string
 *          _.typeof( 'true',true ) // boolean
 *          _.typeof( null )        // null
 *          _.typeof( 'null' )      // string
 *          _.typeof( 'null',true ) // null
 */
function getTypeof ( value, inspect, returnTypes, flaggedVals ) {
    // String representations of the value types (Overridden by returnTypes if defined)
    const types = _.extend( {
        undefined:  'undefined',
        null:       'null',
        string:     'string',
        boolean:    'boolean',
        array:      'array',
        element:    'element',
        date:       'date',
        regexp:     'regexp',
        object:     'object',
        number:     'number',
        funct:   'function',
        unknown:    'unknown'
    }, returnTypes || {} )

    // Flagged values for string variables; EG: if string is 'true', then the it's Boolean (Overridden by
    // flaggedVals if defined)
    const flagged = _.extend( {
        boolean:    [ 'true', 'false' ],
        null:       [ 'null', 'NULL' ],
        undefined:  [ 'undefined' ]
    }, flaggedVals || {} )


    // Retrieve the actual object type from the prototype
    //const objType = Object.prototype.toString.call( value )

    // Attempt to regex match the type (value should be [object TYPE]
    //const objTypeRegex = objType.match( /^\[object\s(.*)\]$/ )

    /* $lab:coverage:off$ */
    // Match the type, or use the types.undefined (This shouldn't ever not match)
    //const objTypeString = objTypeRegex[1] ? objTypeRegex[1].toLowerCase() : types.unknown
    /* $lab:coverage:on$ */

    if( _.isUndefined( value ) )
        return types.undefined

    if( _.isNull( value ) )
        return types.null

    // String values are what get opened to scrutiny, if enabled
    if( _.isString( value ) ){
        // If inspect isnt enabled, then just return string
        if( !! inspect === false )
            return types.string

        // Numbers should be the same value if leniently compared against it's float-parsed self
        if( Number( value ) == value )
            return types.number

        // Check if this string is inside the boolean flags
        if( _.indexOf( flagged.boolean, value ) !== -1 )
            return types.boolean

        // Check if its inside any null flags
        if(  _.indexOf( flagged.null, value ) !== -1 )
            return types.null

        // Check if its inside any undefined flags
        if( _.indexOf( flagged.undefined, value ) !== -1 )
            return types.undefined

        // If no parser caught it, then it must be a string
        return types.string
    }

    // Certain check types can't be misconstrued as other types, unlike other types (such as objects), get those out
    // of the way
    if( _.isBoolean( value ) )
        return types.boolean

    if( _.isNumber( value ) )
        return types.number

    if( _.isDate( value ) )
        return types.date

    if( _.isRegExp( value ) )
        return types.regexp

    /* $lab:coverage:off$ */
    // Disabling coverage for this, since unit testing is done via node
    if( _.isElement( value ) )
        return types.element
    /* $lab:coverage:on$ */

    // Since isObject returns true for functions, check this before that
    if( _.isFunction( value ) )
        return types.funct

    // Since isObject also returns true for arrays, check that before as well
    if( _.isArray( value ) )
        return types.array

    // isObject should be last for any possible object 'types'
    if( _.isObject( value ) )
        return types.object

    /* $lab:coverage:off$ */
    // If nothing else was caught, then return the type found via the prototypes toString() call
    // Note: Disabling coverage, since I can't find a value to reach this, and it's just in case I missed something.
    // It helps me sleep at night
    return _.type( value )
    /* $lab:coverage:on$ */
}

module.exports = getTypeof
