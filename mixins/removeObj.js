'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _internals  = require( '../data' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Remove items from object, mutating the original object by removing specified element(s),
 * and returning a new object of said element(s)
 * This is basically the same as lodashes _.remove method, except this works for Objects,
 * not arrays.
 *
 * @name        module:_.removeObj
 * @function    module:_.removeObj
 * @memberof    module:_
 * @param       {object}            obj     Object (to mutate)
 * @param       {(array|string)}    del     Element(s) to remove from obj
 * @returns     {object}            Object of items removed from obj param
 * @note    This will mutate the original object, removing the `del` element(s)
 * @todo    Need to add some sanity checking, some more logic, etc etc
 * @todo    This should be able to take a function for the del
 * @example
 *  var testObj = { first: 'John', last: 'Doe', middle: 'w', age: 26, height: 75 }
 *  testObj = _.removeObj( testObj, 'height')
 *  // => { first: 'John', last: 'Doe', middle: 'w', age: 26 }
 *  testObj = _.removeObj( testObj, [ 'age','middle' ])
 *  // => { first: 'John', last: 'Doe' }
 */
function removeObj ( obj, del )  {
    const picked = _.pick( obj, del )

    if(_.isArray(del)){
        _.forEach(del, d => {
            _.unset(obj, d)
        })
    }
    else {
        _.unset(obj, del)
    }

    return picked
}

module.exports = removeObj
