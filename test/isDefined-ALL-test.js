'use strict'

const _ = require( '../' )
const Code = require('code')
const Lab = require('lab')
const lab = exports.lab = Lab.script()
const expect = Code.expect
const { suite, it, before, describe, after } = lab      

// _.isDefinedString 
describe('_.isDefinedString mixin', () => {
  describe('should pass when', () => {
    it('given "test" (string)', done => {
        expect( _.isDefinedString('test') ).to.equal( true )
        done()
    })
  })

  describe('should fail when', () => {
    it('given null', done => {
        expect( _.isDefinedString(null) ).to.equal( false )
        done()
    })

    it('given " " (empty string)', done => {
        expect( _.isDefinedString(' ') ).to.equal( false )
        done()
    })

    it('given 123 (number)', done => {
        expect( _.isDefinedString(123) ).to.equal( false )
        done()
    })

    it('given [1,2,3] (array)', done => {
        expect( _.isDefinedString([1,2,3]) ).to.equal( false )
        done()
    })

    it('given {a:1} (object)', done => {
        expect( _.isDefinedString({a:1}) ).to.equal( false )
        done()
    })
  })
})

// _.isDefinedFunction 
describe('_.isDefinedFunction mixin', () => {
  describe('should pass when', () => {
    it('given function(){} (anonymous function)', done => {
        expect( _.isDefinedFunction( function(){} ) ).to.equal( true )
        done()
    })
    
    it('given console.log', done => {
        expect( _.isDefinedFunction( console.log ) ).to.equal( true )
        done()
    })
  })

  describe('should fail when', () => {
    it('given 123 (number)', done => {
        expect( _.isDefinedFunction( 123 ) ).to.equal( false )
        done()
    })

    it('given null', done => {
        expect( _.isDefinedFunction( null ) ).to.equal( false )
        done()
    })

    it('given console (object)', done => {
        expect( _.isDefinedFunction( console ) ).to.equal( false )
        done()
    })
  })
})

// _.isDefinedNumber 
describe('_.isDefinedNumber mixin', () => {
  describe('should pass when', () => {
    it('given 123 (number)', done => {
        expect( _.isDefinedNumber( 123 ) ).to.equal( true )
        done()
    })
    
    it('given 1.2 (number/float)', done => {
        expect( _.isDefinedNumber( 1.2 ) ).to.equal( true )
        done()
    })
    
    it('given .2 (number/float)', done => {
        expect( _.isDefinedNumber( .2 ) ).to.equal( true )
        done()
    })
    
    it('given 0 (number)', done => {
        expect( _.isDefinedNumber( 0 ) ).to.equal( true )
        done()
    })
  })

  describe('should fail when', () => {
    it('given "123" (string)', done => {
        expect( _.isDefinedNumber( '123' ) ).to.equal( false )
        done()
    })

    it('given null', done => {
        expect( _.isDefinedNumber( null ) ).to.equal( false )
        done()
    })

    it('given "1.2" (string)', done => {
        expect( _.isDefinedNumber( '1.2' ) ).to.equal( false )
        done()
    })

    it('given " " (empty string)', done => {
        expect( _.isDefinedNumber( ' ' ) ).to.equal( false )
        done()
    })
  })
})

/*
// _.isDefinedDate
describe('_.isDefinedDate mixin', () => {
  describe('should pass when', () => {
    it('given ', done => {
        expect( _.isDefinedDate() ).to.equal( true )
        done()
    })
  })

  describe('should fail when', () => {
    it('given ', done => {
        expect( _.isDefinedDate() ).to.equal( false )
        done()
    })
  })
})

// _.isDefinedMap
describe('_.isDefinedMap mixin', () => {
  describe('should pass when', () => {
    it('given ', done => {
        expect( _.isDefinedMap() ).to.equal( true )
        done()
    })
  })

  describe('should fail when', () => {
    it('given ', done => {
        expect( _.isDefinedMap() ).to.equal( false )
        done()
    })
  })
})

// _.isDefinedBoolean
describe('_.isDefinedBoolean mixin', () => {
  describe('should pass when', () => {
    it('given ', done => {
        expect( _.isDefinedBoolean() ).to.equal( true )
        done()
    })
  })

  describe('should fail when', () => {
    it('given ', done => {
        expect( _.isDefinedBoolean() ).to.equal( false )
        done()
    })
  })
})

// _.isDefinedArray
describe('_.isDefinedArray mixin', () => {
  describe('should pass when', () => {
    it('given ', done => {
        expect( _.isDefinedArray() ).to.equal( true )
        done()
    })
  })

  describe('should fail when', () => {
    it('given ', done => {
        expect( _.isDefinedArray() ).to.equal( false )
        done()
    })
  })
})

// _.isDefinedObject
describe('_.isDefinedObject mixin', () => {
  describe('should pass when', () => {
    it('given ', done => {
        expect( _.isDefinedObject() ).to.equal( true )
        done()
    })
  })

  describe('should fail when', () => {
    it('given ', done => {
        expect( _.isDefinedObject() ).to.equal( false )
        done()
    })
  })
})

// _.isDefinedPlainObject
describe('_.isDefinedPlainObject mixin', () => {
  describe('should pass when', () => {
    it('given ', done => {
        expect( _.isDefinedPlainObject() ).to.equal( true )
        done()
    })
  })

  describe('should fail when', () => {
    it('given ', done => {
        expect( _.isDefinedPlainObject() ).to.equal( false )
        done()
    })
  })
})

// _.isDefinedFloat
describe('_.isDefinedFloat mixin', () => {
  describe('should pass when', () => {
    it('given ', done => {
        expect( _.isDefinedFloat() ).to.equal( true )
        done()
    })
  })

  describe('should fail when', () => {
    it('given ', done => {
        expect( _.isDefinedFloat() ).to.equal( false )
        done()
    })
  })
})
*/