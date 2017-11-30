var chai = require( 'chai' );
var rs = require( 'randomstring' );
require( '../index.js' );


/**
 * Generate a random primitive
 */
var randomPrimitive = function() {
	var types = [ "string", "string", "number", "number", "boolean", "null", "NaN" ];
	var type = types[ Math.floor( Math.random()*types.length ) ];
	var value = null;
	switch (type) {
		case "string": value = rs.generate( parseInt( Math.random() * 100 ) ); break;
		case "number": value = Math.random() * 100000; break;
		case "boolean": value = !!Math.random(); break;
		case "NaN": value = NaN; break;
	}
	return value;
}


/**
 * Generate an object with a random number of random values
 * These may come out as any combination of nested or non-nested primitives, objects, or arrays
 */
var randomObject = function(depth) {
	depth = depth || 0;
	var types = [ "object", "object", "object", "function", "array", "primitive" ];
	var type = types[ Math.floor( Math.random()*types.length ) ];
	var obj = null;
	switch (type) {
		case "object": obj = {}; break;
		case "array": obj = []; break;
		case "function": obj = function() {}; break;
		case "primitive": obj = randomPrimitive(); break;
	}
	if ( type === "object" || type === "array" ) {
		for ( var i = 0; i < Math.random() * 20; i++ ) {
			var nested = Math.random() < 0.2 && depth < 10;
			if ( type === "object" ) {
				let key = rs.generate( parseInt( Math.random() * 10 ) );
				obj[key] = nested ? randomObject(depth+1) : randomPrimitive();
			}
			else if ( type === "array" ) obj.push( nested ? randomObject(depth+1) : randomPrimitive() );
		}
	}
	return obj;
}


describe( 'Object clone', function() {

	describe( 'Fixed tests', function() {

		it( 'clones basic objects', function() {
			var obj = { a: 0, b: 1, c: 2 };
			var obj2 = Object.clone( obj );
			chai.expect( obj ).to.deep.equal( obj2 );
			obj2.b = null;
			chai.expect( obj ).to.not.deep.equal( obj2 );
		} );

		it( 'clones nested objects', function() {
			var obj = { a: { b: 1 }, c: { d: { e: { f: 1 } } } };
			var obj2 = Object.clone( obj );
			chai.expect( obj ).to.deep.equal( obj2 );
			obj2.a.b = 0; // this is 1 in the original
			obj2.c.d.e.f = 0; // this is 1 in the original
			chai.expect( obj ).to.not.deep.equal( obj2 );
		} );

		it( 'clones arrays', function() {
			var obj = [ "a", "b", "c" ];
			var obj2 = Object.clone( obj );
			chai.expect( obj ).to.deep.equal( obj2 );
			obj2[ 1 ] = "spor";
			chai.expect( obj ).to.not.deep.equal( obj2 );
		} );

		it( 'clones primitives', function() {
			var obj = "Meow, meow, I am a cat";
			var obj2 = Object.clone( obj );
			chai.expect( obj ).to.equal( obj2 );
		} );

		it( 'clones array properties', function() {
			var obj = { arr: [ 5, 4, 3, 2, 1, 0 ] };
			var obj2 = Object.clone( obj );
			chai.expect( obj ).to.deep.equal( obj2 );
			obj2.arr[ 2 ] = "three";
			chai.expect( obj ).to.not.deep.equal( obj2 );
		} );

		it( 'clones nested arrays', function() {
			var obj = { arr: [ "a", ["b", ["c", "d"] ] ] };
			var obj2 = Object.clone( obj );
			chai.expect( obj ).to.deep.equal( obj2 );
			obj2.arr[1][1][0] = "blah"; // this is "c" in the original
			chai.expect( obj ).to.not.deep.equal( obj2 );
		} );

		it( 'clones objects nested inside of arrays', function() {
			var obj = { arr: [ "a", ["b", { c: "d", e: "f", g: "h" } ] ] };
			var obj2 = Object.clone( obj );
			chai.expect( obj ).to.deep.equal( obj2 );
			obj2.arr[1][1].e = "blah"; // this is "f" in the original
			chai.expect( obj ).to.not.deep.equal( obj2 );
		} );

		it( 'clones objects with various data types and key names', function() {
			var obj = {
				a: 0,
				"b": "tesing",
				c: false,
				d: 259820,
				e: Infinity,
				20: null,
				30: NaN,
				40: undefined,
				"iieohsgoi": "",
				"hello": function() { console.log( "yo" ); },
				an_array: [ 0, 1, 2, 3, "4", "five", null ],
				$object: { a_prop: 12356 }
			};
			var obj2 = Object.clone( obj );
			chai.expect( obj ).to.deep.equal( obj2 );
		} );

		it( 'throws errors for circular references', function() {
			var cloneCircular = function() {
				var obj = { someprop: "asdfsbs" };
				obj.self = obj;
				return Object.clone( obj );
			}
			chai.expect( cloneCircular ).to.throw( TypeError );
		} );

	} );

	describe( 'Random tests', function() {
		// Here we just test that a variety of randomized objects make it through the clone method
		// We won't be able test if their children are references or new values, but hopefully the static tests cover that thoroughly
		for ( var i = 1; i <= 50; i++ ) {
			it( 'clones random objects - attempt ' + i , function() {
				let obj = randomObject();
				let obj2 = Object.clone( obj );
				chai.expect( obj ).to.deep.equal( obj2 );
			} );
		}
	} );

} );