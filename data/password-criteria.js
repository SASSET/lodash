'use strict'

const _ = require('lodash')

// Logic used by _.passwordStrength()
module.exports = [
  {
    check: /[A-Z]+/,
    desc: 'uppercase character'
  },
  {
    check: /[a-z]+/,
    desc: 'lowercase character'
  },
  {
    check: /[0-9]+/,
    desc: 'numerical character'
  },
  {
    check: /[\W]+/,
    desc: 'special character'
  },
  {
    check: p => Math.floor( ( p.length - 6 ) / 3),
    // Every 3 characters after the first 6 characters is +1
    desc: 'character length check'
  },
  {
    check: p => {
      let uniqChars = _( p ).split('').sort().uniq().join( '' )

      let result = Math.floor( ( uniqChars.length - 6 ) / 3 )

      return ( result >= 0 ? result : 0 ) 
    },
    // Every 3 characters after the first 6 characters is +1
    desc: 'character length check'
  }
]