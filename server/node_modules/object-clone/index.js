"use strict";
if ( !Object.clone ) {
  Object.defineProperty( Object, "clone", {
    enumerable: false,
    configurable: true,
    writable: true,
    value:  function( obj, depth ) {

      // If we haven't gone past zero depth, catch circular references with JSON.stringify
      if ( !depth ) {
        try { JSON.stringify( obj ) } catch (err) {
          if ( err instanceof TypeError ) throw new TypeError("Cloning an object with circular references");
          else throw err;
        }
      }

      // We return the input value if obj is actually a primitive
      if ( typeof obj !== "object" || obj === null ) {
        return obj;
      }

      var newObj = new obj.constructor();
      for ( var key in obj ) {
        newObj[ key ] = Object.clone( obj[ key ], true );
      }

      return newObj;
      
    }

  });
}
