'use strict'

const fs    = require( 'fs' )
const path  = require( 'path' )
const _d    = require( 'debug' )( 'sasset:data:index' )
const _     = require( 'lodash' )

const dataDir = __dirname

_d( 'Loading internal data from directory %s', dataDir )

const _internals = {
  // Files to ignore
  ignore: [ 'index.js' ],
  // Valid file pattern (anything with .js or .json)
  validExt: ['js', 'json'],
  //ptrn: '\\.(%s)$'
}



//  _( _internals.validExt ).map( v => v.replace('.','\\.') ).join('|')

_internals.ptrnStr = _( _internals.validExt ).map( v => v.replace('.','\\.') ).join('|')
_internals.ptrnStr = '\\.('+ _internals.ptrnStr +')$'

_d( `Data file regex pattern: ${_internals.ptrnStr}` )

_internals.validExt = new RegExp( _internals.ptrnStr, 'i' )

const dataObj = {}
let dataItem

fs.readdirSync( dataDir ).forEach( file => {
  if ( _internals.ignore.indexOf( file ) !== -1 ){
    _d( `SKIPPING item "${file}" - found in the ignore list` )
    return
  }

  if ( _internals.validExt.test( file ) === false ){
    _d( `SKIPPING item "${file}" - its not a .js file` )
    return
  }

  let dataFile = file.replace( _internals.validExt, '' )
  let resolve  = path.resolve( `./`, file )
  let relative = path.relative( './', resolve )
  let _require = `./${relative}`.replace( /\.js$/, '' )

  dataItem = _.camelCase( dataFile )

  _d( 'requiring "%s" as data item "%s"', _require, dataItem )
  
  dataObj[ dataItem ] = require( _require )
})

//console.log('Returning data:',dataObj)

_d( 'Returning data object with keys:',Object.keys( dataObj ) )

module.exports = dataObj
