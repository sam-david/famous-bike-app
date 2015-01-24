/*global famous*/
// 'use strict'
// import dependencies
var Engine = famous.core.Engine;
var Modifier = famous.core.Modifier;
var StateModifier = famous.modifiers.StateModifier;
var Transform = famous.core.Transform;
var Transitionable = famous.transitions.Transitionable;
var ImageSurface = famous.surfaces.ImageSurface;
var Surface = famous.core.Surface;
var MouseSync = famous.inputs.MouseSync;
var Easing = famous.transitions.Easing;

// snap transition import, not currently using
var SnapTransition = famous.transitions.SnapTransition;
Transitionable.registerMethod('snap', SnapTransition);

var snap = {
	method: 'snap',
	duration: 2000,
	dampeningRatio: 1
}

var snapSlow = {
	method: 'snap',
	duration: 3400,
	dampeningRatio: 1
}

// create the main context
var mainContext = Engine.createContext();

var wheelPosition = [0,0];
var leftWheelPosition = [0, -375];
var rightWheelPosition = [440, -375];
var vigorLeftWheelPosition = [-68, -375];
var vigorRightWheelPosition = [372, -375];
var framePosition = [-150, -480];
var framePosition2 = [-250, -473];
var saddlePosition = [-380, -515];
var saddlePosition2 = [-458, -525];

// set transitionables for each item 
var jamaicanFramePosition = new Transitionable([0, 0]);
var jamaicanFrameSync = new MouseSync();
var jamaicanFrameScale = new Transitionable(0);
var bomberFramePosition = new Transitionable([0, 0]);
var bomberFrameSync = new MouseSync();
var stateWheelPosition = new Transitionable([0, 0]);
var stateWheelRightPosition = new Transitionable([0, 0]);
var stateWheelSync = new MouseSync();
var vigorWheelLeftPosition = new Transitionable([0, 0]);
var vigorWheelRightPosition = new Transitionable([0, 0]);
var vigorWheelSync = new MouseSync();
var stateSaddlePosition = new Transitionable([0, 0]);
var stateSaddleSync = new MouseSync();
var brooksSaddlePosition = new Transitionable([0, 0]);
var brooksSaddleSync = new MouseSync();


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

var bikeStats = new Surface({
	size: [220, 250],
	content: 'Bike Stats',
	properties: {
		backgroundColor: 'white',
		border: 'black solid 2px'
	}
});

var bikeStatsOriginModifier = new StateModifier({
	transform: Transform.translate(940, 40, 0)
})

var framePlatform = new Surface({
	size: [250, 130],
	content: 'Frames',
	properties: {
		backgroundColor: 'white',
		border: 'black solid 2px',
		textAlign: 'center'
	}
});

var framePlatformOriginModifier = new StateModifier({
	transform: Transform.translate(375, 500, 0)
})

var wheelPlatform = new Surface({
	size: [250, 130],
	content: 'Wheels',
	properties: {
		backgroundColor: 'white',
		border: 'black solid 2px',
		textAlign: 'center'
	}
});

var wheelPlatformOriginModifier = new StateModifier({
	transform: Transform.translate(100, 500, 0)
});

var saddlePlatform = new Surface({
	size: [250, 130],
	content: 'Saddles',
	properties: {
		backgroundColor: 'white',
		border: 'black solid 2px',
		textAlign: 'center'
	}
});

var saddlePlatformOriginModifier = new StateModifier({
	transform: Transform.translate(650, 500, 0)
});

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
	// origin: [0.5,0.5],
	transform: Transform.translate(400, 550, 0)
})

var jamaicanScaleModifier = new StateModifier({
	transform: Transform.scale(.2, .2, 1)
})

jamaicanFrame.pipe(jamaicanFrameSync);

//Bomber Frame

var bomberFrame = new ImageSurface({
	size: [500,322],
	content: '../images/bomber-frame.png',
	properties: {
		zIndex: 10
	}
});

var bomberOriginModifier = new StateModifier({
	// origin: [0.5,0.5],
	transform: Transform.translate(500, 550, 0)
})

var bomberScaleModifier = new StateModifier({
	transform: Transform.scale(.2, .2, 1)
})

bomberFrame.pipe(bomberFrameSync);

//State Wheel

var stateWheel = new ImageSurface({
	size: [300,300],
	content: '../images/state-wheel.png',
	properties: {
		zIndex: 1
	}
});

var stateOriginModifier = new StateModifier({
	transform: Transform.translate(120, 550, 0)
});

var stateWheelLeftScaleModifier = new StateModifier({
	transform: Transform.scale(.2, .2, 1)
});

stateWheel.pipe(stateWheelSync);

var stateWheelRight = new ImageSurface({
	size: [300,300],
	content: '../images/state-wheel.png',
	properties: {
		zIndex: 1
	}
});

var stateWheelRightOriginModifier = new StateModifier({
	transform: Transform.translate(120, 550, 0)
})

var stateWheelRightScaleModifier = new StateModifier({
	transform: Transform.scale(.2, .2, 1)
});

stateWheelRight.pipe(stateWheelSync);

//Vigor Wheel

var vigorWheelLeft = new ImageSurface({
	size: [300,300],
	content: '../images/vigor-wheel-large.png',
	properties: {
		zIndex: 1
	}
});

var vigorWheelLeftOriginModifier = new StateModifier({
	transform: Transform.translate(190, 550, 0)
});

var vigorWheelLeftScaleModifier = new StateModifier({
	transform: Transform.scale(.2, .2, 1)
});

vigorWheelLeft.pipe(vigorWheelSync);

var vigorWheelRight = new ImageSurface({
	size: [300,300],
	content: '../images/vigor-wheel-large.png',
	properties: {
		zIndex: 1
	}
});

var vigorWheelRightOriginModifier = new StateModifier({
	transform: Transform.translate(190, 550, 0)
})

var vigorWheelRightScaleModifier = new StateModifier({
	transform: Transform.scale(.2, .2, 1)
});

vigorWheelRight.pipe(vigorWheelSync);

//State Saddle

var stateSaddle = new ImageSurface({
	size: [130,93],
	content: '../images/state-saddle.png',
	properties: {
		zIndex: 1
	}
});

var stateSaddleOriginModifier = new StateModifier({
	transform: Transform.translate(680, 550, 0)
})

var stateSaddleScaleModifier = new StateModifier({
	transform: Transform.scale(.5, .5, 1)
})

stateSaddle.pipe(stateSaddleSync);

//Brooks Saddle

var brooksSaddle = new ImageSurface({
	size: [198,152],
	content: '../images/brooks-black.png',
	properties: {
		zIndex: 1
	}
});

var brooksSaddleOriginModifier = new StateModifier({
	transform: Transform.translate(750, 550, 0)
})

var brooksSaddleScaleModifier = new StateModifier({
	transform: Transform.scale(.3, .3, 1)
})

brooksSaddle.pipe(brooksSaddleSync);

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

	var inY = data.clientY < 480 &&
							data.clientY > 10

	if (inX && inY) {
		jamaicanScaleModifier.setTransform(Transform.scale(1,1,1),{duration: 300})
		snapToPlatform(jamaicanFramePosition,framePosition);

	} else {
		jamaicanScaleModifier.setTransform(Transform.scale(.2,.2,1),{duration: 700})
		snapBack(jamaicanFramePosition,jamaicanScaleModifier);
	}
	console.log(inX, inY)
});

//Bomber Sync

bomberFrameSync.on('update', function(data){
		var dx = data.delta[0];
		var dy = data.delta[1];
		var p = bomberFramePosition.get()
		var x = p[0] + dx;
		var y = p[1] + dy;
		bomberFramePosition.set([x, y]);
});

bomberFrameSync.on('end', function(data) {
	var inX = data.clientX < 780 &&
		          data.clientX > 110

	var inY = data.clientY < 480 &&
							data.clientY > 10

	if (inX && inY) {
		bomberScaleModifier.setTransform(Transform.scale(1,1,1),{duration: 300})
		snapToPlatform(bomberFramePosition,framePosition2);

	} else {
		bomberScaleModifier.setTransform(Transform.scale(.2,.2,1),{duration: 700})
		snapBack(bomberFramePosition,bomberScaleModifier);
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

	var inY = data.clientY < 480 &&
							data.clientY > 10

	if (inX && inY) {
		stateWheelLeftScaleModifier.setTransform(Transform.scale(1,1,1),{duration: 700})
		stateWheelRightScaleModifier.setTransform(Transform.scale(1,1,1),{duration: 700})
		snapToPlatform(stateWheelPosition,leftWheelPosition);
		snapToPlatform(stateWheelRightPosition,rightWheelPosition);
	} else {
		stateWheelLeftScaleModifier.setTransform(Transform.scale(.2,.2,1),{duration: 700})
		stateWheelRightScaleModifier.setTransform(Transform.scale(.2,.2,1),{duration: 700})
		snapBack(stateWheelPosition);
		snapBack(stateWheelRightPosition);
	}
	console.log(inX, inY)
	
});

//Vigor wheel sync (kind of dry)

vigorWheelSync.on('update', function(data){
		var dx = data.delta[0];
		var dy = data.delta[1];
		var p = vigorWheelLeftPosition.get()
		var wheelR = vigorWheelRightPosition.get();
		var x = p[0] + dx;
		var y = p[1] + dy;
		vigorWheelLeftPosition.set([x, y]);
		vigorWheelRightPosition.set([x, y]);
});

vigorWheelSync.on('end', function(data) {
	var inX = data.clientX < 780 &&
		          data.clientX > 110

	var inY = data.clientY < 480 &&
							data.clientY > 10

	if (inX && inY) {
		vigorWheelLeftScaleModifier.setTransform(Transform.scale(1,1,1),{duration: 700})
		vigorWheelRightScaleModifier.setTransform(Transform.scale(1,1,1),{duration: 700})
		snapToPlatform(vigorWheelLeftPosition,vigorLeftWheelPosition);
		snapToPlatform(vigorWheelRightPosition,vigorRightWheelPosition);
	} else {
		vigorWheelLeftScaleModifier.setTransform(Transform.scale(.2,.2,1),{duration: 700})
		vigorWheelRightScaleModifier.setTransform(Transform.scale(.2,.2,1),{duration: 700})
		snapBack(vigorWheelLeftPosition);
		snapBack(vigorWheelRightPosition);
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

	var inY = data.clientY < 480 &&
							data.clientY > 10

	if (inX && inY) {
		stateSaddleScaleModifier.setTransform(Transform.scale(1,1,1),{duration: 700})
		snapToPlatform(stateSaddlePosition,saddlePosition);
	} else {
		stateSaddleScaleModifier.setTransform(Transform.scale(.5,.5,1),{duration: 700})
		snapBack(stateSaddlePosition);
	}
	console.log(inX, inY)
});

//Brooks Saddle sync (super dry)

brooksSaddleSync.on('update', function(data){
		var dx = data.delta[0];
		var dy = data.delta[1];
		var p = brooksSaddlePosition.get()
		var x = p[0] + dx;
		var y = p[1] + dy;
		brooksSaddlePosition.set([x, y]);
});

brooksSaddleSync.on('end', function(data) {
	var inX = data.clientX < 780 &&
		          data.clientX > 110

	var inY = data.clientY < 480 &&
							data.clientY > 10

	if (inX && inY) {
		brooksSaddleScaleModifier.setTransform(Transform.scale(.8,.8,1),{duration: 700})
		snapToPlatform(brooksSaddlePosition,saddlePosition2);
	} else {
		brooksSaddleScaleModifier.setTransform(Transform.scale(.3,.3,1),{duration: 700})
		snapBack(brooksSaddlePosition);
	}
	console.log(inX, inY)
});

function snapToPlatform(trans, itemPosition) {
	console.log('snapping to platform');
	// trans.set(itemPosition, snap)
	trans.set(itemPosition, {
		duration: 800
	})
}

function snapBack(trans,scaleMod) {
	console.log('snapping back');
	// trans.set([0,0], snap)
	trans.set([0,0], {
		duration: 800
	})
	// scaleMod.setTransform(Transform.scale(.2,.2,.2),{duration: 700})
}

//Position modifiers to follow dragging of mouse
var jamaicanPositionModifier = new Modifier({
	transform : function(){
		var p = jamaicanFramePosition.get()
		return Transform.translate(p[0], p[1], 0);
	}
});

var bomberPositionModifier = new Modifier({
	transform : function(){
		var p = bomberFramePosition.get()
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

var brooksSaddlePositionModifier = new Modifier({
	transform : function(){
		var p = brooksSaddlePosition.get()
		return Transform.translate(p[0], p[1], 0);
	}
});

var stateWheelRightPositionModifier = new Modifier({
	transform : function(){
		var p = stateWheelRightPosition.get()
		return Transform.translate(p[0], p[1], 0);
	}
});

var vigorWheelRightPositionModifier = new Modifier({
	transform : function(){
		var p = vigorWheelRightPosition.get()
		return Transform.translate(p[0], p[1], 0);
	}
});

var vigorWheelLeftPositionModifier = new Modifier({
	transform : function(){
		var p = vigorWheelLeftPosition.get()
		return Transform.translate(p[0], p[1], 0);
	}
});

mainContext.add(background)
mainContext.add(platformOriginModifier).add(platform);
mainContext.add(framePlatformOriginModifier).add(framePlatform);
mainContext.add(saddlePlatformOriginModifier).add(saddlePlatform);
mainContext.add(wheelPlatformOriginModifier).add(wheelPlatform);
mainContext.add(bikeStatsOriginModifier).add(bikeStats);
mainContext.add(jamaicanOriginModifier).add(jamaicanPositionModifier).add(jamaicanScaleModifier).add(jamaicanFrame);
mainContext.add(bomberOriginModifier).add(bomberPositionModifier).add(bomberScaleModifier).add(bomberFrame);
mainContext.add(stateOriginModifier).add(statePositionModifier).add(stateWheelLeftScaleModifier).add(stateWheel);
mainContext.add(stateWheelRightOriginModifier).add(stateWheelRightPositionModifier).add(stateWheelRightScaleModifier).add(stateWheelRight);
mainContext.add(vigorWheelLeftOriginModifier).add(vigorWheelLeftPositionModifier).add(vigorWheelLeftScaleModifier).add(vigorWheelLeft);
mainContext.add(vigorWheelRightOriginModifier).add(vigorWheelRightPositionModifier).add(vigorWheelRightScaleModifier).add(vigorWheelRight);
mainContext.add(stateSaddleOriginModifier).add(stateSaddlePositionModifier).add(stateSaddleScaleModifier).add(stateSaddle);
mainContext.add(brooksSaddleOriginModifier).add(brooksSaddlePositionModifier).add(brooksSaddleScaleModifier).add(brooksSaddle)
// mainContext.add(bikeOriginModifier).add(bike);
// mainContext.add(wheelOriginModifier).add(wheelPositionModifier).add(wheel);
