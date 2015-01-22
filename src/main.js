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
var MouseSync = famous.inputs.MouseSync;

// snap transition import, not currently using
// var SnapTransition = famous.transitions.SnapTransition;
// Transitionable.registerMethod('snap', SnapTransition);

// create the main context
var mainContext = Engine.createContext();

var wheelPosition = [0,0];
var leftWheelPosition = [0, -295];
var framePosition = [-150, -330];
var saddlePosition = [-600, -470];

// set transitionables for each item 
var jamaicanFramePosition = new Transitionable([0, 0]);
var jamaicanFrameSync = new MouseSync();
var stateWheelPosition = new Transitionable([0, 0]);
var stateWheelRightPosition = new Transitionable([0, 0]);
var stateWheelSync = new MouseSync();
var stateSaddlePosition = new Transitionable([0, 0]);
var stateSaddleSync = new MouseSync();


//Background and platform surface and origin modifiers
var background = new Surface({
	size: [1200, 850],
	properties: {
		backgroundColor: 'white',
		border: 'black solid 1px',
		color: 'white'
	}
});

var platform = new Surface({
	size: [800, 480],
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

//Bike Part surfaces
//Jamaican Frame

var jamaicanFrame = new ImageSurface({
	size: [500,329],
	content: '../images/jamaican-frame.png',
	properties: {
		zIndex: 10
	}
});

var jamaicanOriginModifier = new StateModifier({
	transform: Transform.translate(400, 400, 0)
})

jamaicanFrame.pipe(jamaicanFrameSync);

//State Wheel

var stateWheel = new ImageSurface({
	size: [300,300],
	content: '../images/state-wheel.png',
	properties: {
		zIndex: 1
	}
});

var stateOriginModifier = new StateModifier({
	transform: Transform.translate(120, 470, 0)
})

stateWheel.pipe(stateWheelSync);

var stateWheelRight = new ImageSurface({
	size: [300,300],
	content: '../images/state-wheel.png',
	properties: {
		zIndex: 1
	}
});

var stateWheelRightOriginModifier = new StateModifier({
	transform: Transform.translate(120, 470, 0)
})

stateWheelRight.pipe(stateWheelSync);

//State Saddle

var stateSaddle = new ImageSurface({
	size: [130,93],
	content: '../images/state-saddle.png',
	properties: {
		zIndex: 1
	}
});

var stateSaddleOriginModifier = new StateModifier({
	transform: Transform.translate(900, 500, 0)
})

stateSaddle.pipe(stateSaddleSync);

//Sync update and end functions
//Jamaican Sync

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

	var inY = data.clientY < 450 &&
							data.clientY > 10

	if (inX && inY) {
		snapToPlatform(jamaicanFramePosition,framePosition);
	} else {
		snapBack(jamaicanFramePosition);
	}
	console.log(inX, inY)
});

//State wheel sync (kind of dry)

stateWheelSync.on('update', function(data){
		var dx = data.delta[0];
		var dy = data.delta[1];
		var p = stateWheelPosition.get()
		var wheelR = stateWheelRightPosition.get();
		var x = p[0] + dx;
		var y = p[1] + dy;
		stateWheelPosition.set([x, y]);
		stateWheelRightPosition.set([x, y]);
});

stateWheelSync.on('end', function(data) {
	var inX = data.clientX < 780 &&
		          data.clientX > 110

	var inY = data.clientY < 450 &&
							data.clientY > 10

	if (inX && inY) {
		snapToPlatform(stateWheelPosition,leftWheelPosition);
		snapToPlatform(stateWheelRightPosition,[0,20]);
	} else {
		snapBack(stateWheelPosition);
	}
	console.log(inX, inY)
});

//State Saddle sync (super dry)

stateSaddleSync.on('update', function(data){
		var dx = data.delta[0];
		var dy = data.delta[1];
		var p = stateSaddlePosition.get()
		var x = p[0] + dx;
		var y = p[1] + dy;
		stateSaddlePosition.set([x, y]);
});

stateSaddleSync.on('end', function(data) {
	var inX = data.clientX < 780 &&
		          data.clientX > 110

	var inY = data.clientY < 450 &&
							data.clientY > 10

	if (inX && inY) {
		snapToPlatform(stateSaddlePosition,saddlePosition);
	} else {
		snapBack(stateSaddlePosition);
	}
	console.log(inX, inY)
});

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

//Position modifiers to follow dragging of mouse
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

var stateSaddlePositionModifier = new Modifier({
	transform : function(){
		var p = stateSaddlePosition.get()
		return Transform.translate(p[0], p[1], 0);
	}
});

var stateWheelRightPositionModifier = new Modifier({
	transform : function(){
		var p = stateWheelRightPosition.get()
		return Transform.translate(p[0], p[1], 0);
	}
});

mainContext.add(background)
mainContext.add(platformOriginModifier).add(platform);
mainContext.add(jamaicanOriginModifier).add(jamaicanPositionModifier).add(jamaicanFrame);
mainContext.add(stateOriginModifier).add(statePositionModifier).add(stateWheel);
mainContext.add(stateWheelRightOriginModifier).add(stateWheelRightPositionModifier).add(stateWheelRight);
mainContext.add(stateSaddleOriginModifier).add(stateSaddlePositionModifier).add(stateSaddle);
// mainContext.add(bikeOriginModifier).add(bike);
// mainContext.add(wheelOriginModifier).add(wheelPositionModifier).add(wheel);
