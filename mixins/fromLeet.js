'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _internals  = require( '../data' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Convert a string from l33t to normal text
 */
function fromLeet( value ){
    var chars = value.split(''),
        result = []

    _.each( chars, ( char, idx ) => {

    })
}

module.exports = fromLeet