'use strict'

module.exports = {
  aliases: {
    string    : [ 'str' ],
    numeric   : [ 'num', 'number' ],
    boolean   : [ 'bool' ],
    integer   : [ 'int' ],
    float     : [ '' ],
    array     : [ 'arr' ],
    object    : [ 'obj' ],
    regexp    : [ 'regex' ],
    buffer    : [ '' ],
    date      : [ '' ],
    //function  : [ 'fn' ]
  },
  regexPatterns: {
    numeric : '[0-9]*\.?[0-9]+',
    integer : '[0-9]+',
    alpha   : '[a-zA-Z]+',
    special : '[!@#$%^&*)(+=._-]+',
    float   : '[0-9]*\.[0-9]+'
  }
}