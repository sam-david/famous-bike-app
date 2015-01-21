/*global famous*/
'use strict'
// import dependencies
var Engine = famous.core.Engine;
var Modifier = famous.core.Modifier;
var StateModifier = famous.modifiers.StateModifier;
var Transform = famous.core.Transform;
var Transitionable = famous.transitions.Transitionable;
var ImageSurface = famous.surfaces.ImageSurface;
var Surface = famous.core.Surface;

var SnapTransition = famous.transitions.SnapTransition;
Transitionable.registerMethod('snap', SnapTransition);

var MouseSync = famous.inputs.MouseSync;

// create the main context
var mainContext = Engine.createContext();

var wheelPosition = [0,0];
var leftWheelPosition = [10, -200];

var position = new Transitionable([0, 0])

function snapToWheel(data) {
	console.log('snapping wheel');
	var velocity = data.velocity;
	// debugger
	position.set(leftWheelPosition, {
		duration: 800
		// method  : 'snap',
    // period  : 100
    // velocity : velocity[0]
	}, function() {debugger});
}

var sync = new MouseSync();

// your app here
var logo = new ImageSurface({
    size: [200, 200],
    content: 'http://code.famo.us/assets/famous_logo.png',
    classes: ['double-sided']
});

var bike = new Surface({
	size: [500,300],
	content: 'bike',
	properties: {
		backgroundColor: 'red',
		textAlign: 'center',
		color: 'white'
	}
});

var wheel = new Surface({
	size: [100,100],
	content: 'wheel',
	properties: {
		backgroundColor: 'blue',
		textAlign: 'center',
		color: 'white'
	}
});

wheel.pipe(sync);

sync.on('update', function(data){
		var dx = data.delta[0];
		var dy = data.delta[1];
		var p = position.get()
		var x = p[0] + dx;
		var y = p[1] + dy;
		position.set([x, y]);
    // wheelPosition[0] += data.delta[0];
    // wheelPosition[1] += data.delta[1];
});

sync.on('end', function(data){
	// console.log(data);
	var inX = data.clientX < 780 &&
	          data.clientX > 110

	var inY = data.clientY < 300 &&
						data.clientY > 10

	if (inX && inY) snapToWheel(data);
	console.log(inX, inY)
});

var frame = new Surface({
	size: [100,100],
	content: 'frame',
	properties: {
		backgroundColor: 'blue',
		textAlign: 'center',
		color: 'white'
	}
})

var bikeOriginModifier = new StateModifier({
	origin: [0.5, 0.5],
  align: [0.5, 0.3]
	// transform: Transform.translate(100, 10, 0)
})

var wheelOriginModifier = new StateModifier({
	origin: [0.5, 0.5],
  align: [0.2, 0.8]
})

var wheelPositionModifier = new Modifier({
	transform : function(){
		var p = position.get()
		return Transform.translate(p[0], p[1], 0);
	}
});

var frameOriginModifier = new StateModifier({
	origin: [0.5, 0.5],
  align: [0.5, 0.8]
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
mainContext.add(wheelOriginModifier).add(wheelPositionModifier).add(wheel);
mainContext.add(frameOriginModifier).add(frame);
