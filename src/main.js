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

// snap transition import, not currently using
// var SnapTransition = famous.transitions.SnapTransition;
// Transitionable.registerMethod('snap', SnapTransition);

var MouseSync = famous.inputs.MouseSync;

// create the main context
var mainContext = Engine.createContext();

var wheelPosition = [0,0];
var leftWheelPosition = [30, -290];
var framePosition = [0, -400]

// set transitionables for each item 
var position = new Transitionable([0, 0]);
var jamaicanFramePosition = new Transitionable([0, 0]);
var jamaicanFrameSync = new MouseSync();
var stateWheelPosition = new Transitionable([0, 0]);
var stateWheelSync = new MouseSync();


var sync = new MouseSync();


var background = new Surface({
	size: [1000, 600],
	properties: {
		backgroundColor: 'white',
		border: 'black solid 1px',
		color: 'white'
	}
});

var platform = new Surface({
	size: [800, 370],
	content: 'platform',
	properties: {
		backgroundColor: 'grey',
		border: 'black solid 1px',
		color: 'white'
	}
});

var platformOriginModifier = new StateModifier({
	transform: Transform.translate(100, 10, 0)
})

// var bike = new Surface({
// 	size: [500,300],
// 	content: 'bike',
// 	properties: {
// 		backgroundColor: 'grey',
// 		textAlign: 'center',
// 		color: 'white'
// 	}
// });

var jamaicanFrame = new ImageSurface({
	size: [500,329],
	content: '../images/jamaican-frame.png'
});

var jamaicanOriginModifier = new StateModifier({
	transform: Transform.translate(400, 400, 0)
})

jamaicanFrame.pipe(jamaicanFrameSync);

// var wheel = new Surface({
// 	size: [100,100],
// 	content: 'wheel',
// 	properties: {
// 		backgroundColor: 'blue',
// 		textAlign: 'center',
// 		color: 'white'
// 	}
// });

var stateWheel = new ImageSurface({
	size: [200,200],
	content: '../images/state-wheel.png'
});

var stateOriginModifier = new StateModifier({
	transform: Transform.translate(200, 400, 0)
})

stateWheel.pipe(stateWheelSync);

// wheel.pipe(sync);

// var frame = new Surface({
// 	size: [100,100],
// 	content: 'frame',
// 	properties: {
// 		backgroundColor: 'blue',
// 		textAlign: 'center',
// 		color: 'white'
// 	}
// })

// frame.pipe(frameSync);

// sync.on('update', function(data){
// 		var dx = data.delta[0];
// 		var dy = data.delta[1];
// 		var p = position.get()
// 		var x = p[0] + dx;
// 		var y = p[1] + dy;
// 		position.set([x, y]);
// });

jamaicanFrameSync.on('update', function(data){
		var dx = data.delta[0];
		var dy = data.delta[1];
		var p = jamaicanFramePosition.get()
		var x = p[0] + dx;
		var y = p[1] + dy;
		jamaicanFramePosition.set([x, y]);
});

jamaicanFrameSync.on('end', function(data) {
	var inX = data.clientX < 780 &&
		          data.clientX > 110

	var inY = data.clientY < 350 &&
							data.clientY > 10

	if (inX && inY) {
		snapToPlatform(jamaicanFramePosition,framePosition);
	} else {
		snapBack(jamaicanFramePosition);
	}
	console.log(inX, inY)
});

stateWheelSync.on('update', function(data){
		var dx = data.delta[0];
		var dy = data.delta[1];
		var p = stateWheelPosition.get()
		var x = p[0] + dx;
		var y = p[1] + dy;
		stateWheelPosition.set([x, y]);
});

stateWheelSync.on('end', function(data) {
	var inX = data.clientX < 780 &&
		          data.clientX > 110

	var inY = data.clientY < 350 &&
							data.clientY > 10

	if (inX && inY) {
		snapToPlatform(stateWheelPosition,leftWheelPosition);
	} else {
		snapBack(stateWheelPosition);
	}
	console.log(inX, inY)
});

// sync.on('end', function(data){
// 	// console.log(data);
// 	var inX = data.clientX < 780 &&
// 	          data.clientX > 110

// 	var inY = data.clientY < 300 &&
// 						data.clientY > 10

// 	if (inX && inY) {
// 		snapToPlatform(position,leftWheelPosition);
// 	} else {
// 		console.log('get back');
// 		snapBack(position);
// 	}
// 	console.log(inX, inY)
// });

function snapToPlatform(trans, itemPosition) {
	console.log('snapping to platform');
	trans.set(itemPosition, {
		duration: 800
		// method  : 'snap',
    // period  : 100
    // velocity : velocity[0]
	})
}

function snapBack(trans) {
	console.log('snapping back');
	trans.set([0,0], {
		duration: 800
	})
}



// var bikeOriginModifier = new StateModifier({
// 	// origin: [0.5, 0.5],
//  //  align: [0.5, 0.3]
// 	transform: Transform.translate(100, 10, 0)
// })

// var wheelOriginModifier = new StateModifier({
// 	origin: [0.5, 0.5],
//   align: [0.2, 0.8]
// })

// var wheelPositionModifier = new Modifier({
// 	transform : function(){
// 		var p = position.get()
// 		return Transform.translate(p[0], p[1], 0);
// 	}
// });

var jamaicanPositionModifier = new Modifier({
	transform : function(){
		var p = jamaicanFramePosition.get()
		return Transform.translate(p[0], p[1], 0);
	}
});

var statePositionModifier = new Modifier({
	transform : function(){
		var p = stateWheelPosition.get()
		return Transform.translate(p[0], p[1], 0);
	}
});



mainContext.add(background)
mainContext.add(platformOriginModifier).add(platform);
mainContext.add(jamaicanOriginModifier).add(jamaicanPositionModifier).add(jamaicanFrame);
mainContext.add(stateOriginModifier).add(statePositionModifier).add(stateWheel);
// mainContext.add(bikeOriginModifier).add(bike);
// mainContext.add(wheelOriginModifier).add(wheelPositionModifier).add(wheel);
