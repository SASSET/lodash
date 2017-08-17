'use strict'

const fs          = require( 'fs' )
const path        = require( 'path' )
const async       = require( 'async' )
const _d          = require( 'debug' )( 'sasset:lodash' )
const _           = require( 'lodash' )
const _data       = require( './data' )
const usedAliases = {}

const mixinFolder = './mixins'

const mixinPath = path.join( __dirname, mixinFolder )

_d( 'Mixin Directory: %s (%s)',mixinPath )

fs.readdirSync( mixinPath ).forEach( file => {
  //_d( 'File: %s', file )

  let mixin    = file.replace( /\.js$/, '' )
  let resolve  = path.resolve( `./${mixinFolder}`, file )
  let relative = path.relative( './', resolve )
  let _require = `./${relative}`.replace( /\.js$/, '' )

  let mixinObj = {}

  
  //_d( 'Mixin: %s', mixin )
  //_d( 'resolve: %s', resolve )
  //_d( 'relative: %s', relative )
  //_d( '_require: %s', _require )

  _d( 'requiring "%s" as mixin "%s"', _require, mixin )
  

  mixinObj[ mixin ] = require( _require )

  

  if ( _.has( _data.aliases, mixin ) ){
    let aliases = _data.aliases[ mixin ]

    _d( 'An aliases entry was found for "%s" (type: %s) - %s', mixin, typeof aliases, _.toString( aliases ) )

    if ( _.isString( aliases ) ){
      aliases = [ aliases ]
    }
    else if ( ! _.isArray( aliases ) ) {
      _d( 'The aliases entry for "%s" was an invalid type - Expecting a string or an array, found a %s', mixin, typeof aliases )
      return
    }

    _.each( aliases, ( alias, aIdx ) => {
      if ( ! _.isString( alias ) || _.isEmpty( alias ) ){
        _d( 'Invalid alias found for mixin "%s" at index #%s - Populatd string expected, value: %s', mixin, aIdx, _.toString(alias))
        return
      }

      alias = _.trim(alias)

      if ( _.has( mixinObj, alias ) ){
        _d( 'Duplicate alias provided for mixin "%s" - Alias name "%s" is already utilized by mixin "%s"', mixin, alias, (_.has( usedAliases, alias ) ? usedAliases[ alias ] : 'Unknown'))
        return
      }

      usedAliases[ alias ] = mixin

      _d( 'Alias "%s" was added to mixins for mixin "%s"', alias, mixin )

      mixinObj[ alias ] =  mixinObj[ mixin ]
    })

  }

  let mk = _.keys( mixinObj )

  _d( 'Adding %s: %s', ( mk.length === 1 ? 'mixin' : mk.length + ' mixins'), mk.join(', ') )

  _.mixin( mixinObj )
})

module.exports = _

/*
module.exports = require(
    './mixins'
)


fs.readdirSync( mixinFiles ).forEach( file => {
  console.log( 'Including:', file )
  require("./mixins/" + file )
})


*/

/*
var normalizedPath = require("path").join(__dirname, "mixins");

const _ = require('lodash')

require("fs")
  .readdirSync(normalizedPath)
  .forEach(function(file) {
    console.log('Including:', file)
    require("./mixins/" + file)
})

module.exports = _
*/

/*
utf8Encode
utf8Decode
md5
sha1
makeHash

flipLeet
generateSlug
generateKey
alternator
stripCommonRoot
sumPaths
valTypes
randStr
replaceAt
getType
multiReplace
swap
uniqObjs
isNumeric
isEmail
sortMatch
bool
endWith
dontEndWith
startWith
dontStartWith
nl2br
br2nl
censor
passwordHash
passwordVerify
sortObj
isUniq
removeObj
mysqlEscape
isSnake
isCamel
isKebab
isStart
isLower
isUpper
getCase
isCase
includesAll
maxOf
minOf
levenshtein
strDist
isCountable
plural
mergeObjs
matches
setException
pullSample
pullSampleSize
validPattern
getTypeof
vulnerablePass
isLeet
fromLeet
fromLeeta
passwordStrength
getObjectProperty
getObjectMethods
isEnglishWord
isFloat
isDefinedType
isDefinedString
isDefinedFunction
isDefinedNumber
isDefinedDate
isDefinedMap
isDefinedBoolean
isDefinedArray
isDefinedObject
isDefinedPlainObject
isDefinedFloat
*/