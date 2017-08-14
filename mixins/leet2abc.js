'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

_d( 'Included the mixin script "%s"',mixin  )
_d( 'Included the mixin script "%s"', path.basename( __filename ) )

var _dirs = {
    mixins: './',
    data: '../data'
}

// Functions and storage for internal use only
const _internals = {
        uncountable: require( `${_dirs.data}/uncountable` ),
        censored: require( `${_dirs.data}/censored` ),
        leet: require( `${_dirs.data}/leet` )
}


function populateLeetMap( force ){
    if ( _.isMap( _internals.leetMap ) && _internals.leetMap.size > 0 && force !== true )
        return

    var leetMap = new Map()

    _.each( _internals.leet, ( leetChars, alphaChar ) => {
        if ( _.isString( leetChars ) ) 
            leetChars = [ leetChars ]

        _.each( leetChars, leetChar => {
            leetMap.set( leetChar, alphaChar )
        })
    })

    _internals.leetMap = leetMap

    return _internals.leetMap
}

function leet2abc( leet ){
    populateLeetMap()

    if ( _internals.leetMap.has( leet ) )
        return _internals.leetMap.get( leet )

    return leet
}

module.exports = leet2abc