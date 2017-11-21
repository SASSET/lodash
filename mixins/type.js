'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _internals  = require( '../data' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Return items true type by grabbing the 2nd string content from Object.prototype.toString.call, as opposed to the 
 * less-specific 'typeof'
 *
 * @name        module:_.getType
 * @function    module:_.getType
 * @memberof    module:_
 * @param       {*}     item    Item to retrieve type for
 * @returns     {string}    Type of variable
 * @example 
 *  _.type([])
 *  // => array
 *  _.type({})
 *  // => object
 *  _.type(() => {})
 *  // => function
 */
function type ( item ) {
    const objType = Object.prototype.toString.call( item )

    const match = objType.match( /^\[object\s(.*)\]$/ )

    return match[1].toLowerCase()
}

module.exports = type


(function(root, factory){
  if( typeof define === 'function' && define.amd ){
    // AMD. Register as an anonymous module.
    define(['lodash'], factory);
  }
  else if( typeof exports === 'object' ){
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require('lodash').runInContext());
  }
  else {
    // Browser globals (root is window)
    root._.mixin(factory(root._));
  }
}(this, function(_, undefined){
  'use strict';

  var mixins = /** @lends _ */ {
    /**
     * Maps all values in an object tree and returns a new object with the same structure as the original.
     * @param {Object} object - The object to map.
     * @param {Function} callback - The function to be called per iteration on any non-object value in the tree.
     *   Callback is invoked with 2 arguments: (value, propertyPath)
     *   propertyPath is the path of the current property, in array format.
     * @returns {Object}
     */
    type: function( ){
      
    }
  };

  _.mixin( mixins );

  return mixins;
}));
