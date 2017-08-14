'use strict'

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
  }
]