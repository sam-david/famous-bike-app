/*global famous*/
// import dependencies
var Engine = famous.core.Engine;
var Modifier = famous.core.Modifier;
var StateModifier = famous.modifiers.StateModifier;
var Transform = famous.core.Transform;
var ImageSurface = famous.surfaces.ImageSurface;
var Surface = famous.core.Surface;

// create the main context
var mainContext = Engine.createContext();

// your app here
var logo = new ImageSurface({
    size: [200, 200],
    content: 'http://code.famo.us/assets/famous_logo.png',
    classes: ['double-sided']
});

var bike = new Surface({
	size: [400,200],
	content: 'bike',
	properties: {
		backgroundColor: 'red',
		textAlign: 'center',
		color: 'white'
	}
});

var bikeOriginModifier = new StateModifier({
	origin: [0.5, 0.8],
  align: [0.5, 0.5]
	// transform: Transform.translate(100, 10, 0)
})

// var initialTime = Date.now();
// var centerSpinModifier = new Modifier({
//     origin: [0.5, 0.5],
//     align: [0.5, 0.5],
//     transform : function () {
//         return Transform.rotateY(.002 * (Date.now() - initialTime));
//     }
// });

mainContext.add(bikeOriginModifier).add(bike);
