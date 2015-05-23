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

var platform = new Surface({
	size: [1200, 520],
	properties: {
		backgroundColor: '#D60C00',
		border: 'black solid 1px',
		color: 'white'
	}
});

var blackPlatformBorder = new Surface({
	size: [1180, 500],
	properties: {
		backgroundColor: 'black',
		border: 'black solid 1px',
		color: 'black'
	}
});

var innerPlatform = new Surface({
	size: [1160, 480],
	properties: {
		backgroundColor: '#F2DCC2',
		border: 'black solid 1px',
		color: '#BFB2A3'
	}
});


var bikeStats = new Surface({
	size: [250, 440],
	properties: {
		backgroundColor: '#84B1D9',
		border: 'black solid 1px',
		color: 'black',
		textAlign: 'center'
	}
});

var frameTitle = new Surface({
	size: [200, 50],
	content: 'Frame Name',
	properties: {
		color: 'black',
		fontSize: '1.3em'
	}
});

var framePrice = new Surface({
	size: [70, 50],
	content: '$500',
	properties: {
		color: 'green',
		fontSize: '1.4em',
		fontFamily: 'Arial'
	}
});

var frameTitleOriginModifier = new StateModifier({
	transform: Transform.translate(1030, 80, 0)
}); 

var framePriceOriginModifier = new StateModifier({
	transform: Transform.translate(1190, 80, 0)
});

var bikeStatsOriginModifier = new StateModifier({
	transform: Transform.translate(1010, 50, 0),
	opacity: .50
})

var platformOriginModifier = new StateModifier({
	transform: Transform.translate(100, 10, 0)
})

var innerPlatformOriginModifier = new StateModifier({
	transform: Transform.translate(120, 30, 0)
})

var blackBorderOriginModifier = new StateModifier({
	transform: Transform.translate(110, 20, 0)
})



var rightFrameOriginModifier = new StateModifier({
	transform: Transform.translate(1300, 0, 0)
})

var framePlatform = new Surface({
	size: [500, 200],
	content: 'Frames',
	properties: {
		backgroundColor: '#BFB2A3',
		border: 'black solid 2px',
		textAlign: 'center'
	}
});

var framePlatformOriginModifier = new StateModifier({
	transform: Transform.translate(100, 540, 0)
})

var wheelPlatform = new Surface({
	size: [410, 200],
	content: 'Wheels',
	properties: {
		backgroundColor: '#BFB2A3',
		border: 'black solid 2px',
		textAlign: 'center'
	}
});

var wheelPlatformOriginModifier = new StateModifier({
	transform: Transform.translate(620, 540, 0)
});

var saddlePlatform = new Surface({
	size: [250, 200],
	content: 'Saddles',
	properties: {
		backgroundColor: 'white',
		border: 'black solid 2px',
		textAlign: 'center'
	}
});

var saddlePlatformOriginModifier = new StateModifier({
	transform: Transform.translate(1050, 540, 0)
});

function addItem(imageUrl,xOrigin,yOrigin,xScale,yScale,xDeltaPlatform,yDeltaPlatform,xSize,ySize,xScalePlatform,yScalePlatform,itemType,zIndex,itemName,itemPrice) {
	var that = this
	//add a new Transitionable property for the frame
	this.itemPosition = new Transitionable([0, 0]);
	this.secondItemPosition = new Transitionable([0, 0]);
	//add a mouse sync, later to be piped to the surface
	this.mouseFrameSync = new MouseSync();
	//insert image surface with imageUrl reference
	this.addImageSurface = new ImageSurface({
		size: [xSize,ySize],
		content: imageUrl,
		properties: {
			zIndex: zIndex
		}
	});
	if (itemType == "wheel") {
		//second wheel image surface
		this.addsecondImageSurface = new ImageSurface({
			size: [xSize,ySize],
			content: imageUrl,
			properties: {
				zIndex: zIndex
			}
		});
		//second wheel origin modifier
		this.secondOriginModifier = new StateModifier({
			transform: Transform.translate(xOrigin, yOrigin, 0)
		});
		//second wheel scale modifier
		this.secondScaleModifier = new StateModifier({
			transform: Transform.scale(xScale, yScale, 1)
		})
		//second wheel position modifier to be piped to same mouse sync
		this.secondPositionModifier = new Modifier({
			transform : function(){
				var p = that.secondItemPosition.get()
				return Transform.translate(p[0], p[1], 0);
			}
		});
	}
	//origin modifier specifying resting point off main platform
	this.originModifier = new StateModifier({
		transform: Transform.translate(xOrigin, yOrigin, 0)
	});
	//scale modifier
	this.scaleModifier = new StateModifier({
		transform: Transform.scale(xScale, yScale, 1)
	})
	//position modifier to move surface around
	this.positionModifier = new Modifier({
		transform : function(){
			var p = that.itemPosition.get()
			return Transform.translate(p[0], p[1], 0);
		}
	});
	//pipe image surface to the mouse sync
	this.addImageSurface.pipe(this.mouseFrameSync);
	if (itemType == "wheel") {
		this.addsecondImageSurface.pipe(this.mouseFrameSync);
	}
	//mouse sync on update moves the surface to the new x and y by using a change delta
	this.mouseFrameSync.on('update', function(data){
		var dx = data.delta[0];
		var dy = data.delta[1];
		var p = that.itemPosition.get()
		var x = p[0] + dx;
		var y = p[1] + dy;
		that.itemPosition.set([x, y]);
		if (itemType == "wheel") {
			that.secondItemPosition.set([x,y]);
		}
		console.log("moving to",x,y);
	});
	//mouse sync on 'end' checks if surface has landed within the x and y of the platform
	this.mouseFrameSync.on('end', function(data) {
		var inX = data.clientX < 900 &&
			          data.clientX > 110

		var inY = data.clientY < 480 &&
								data.clientY > 10
		console.log(inX,inY);
		if (inX && inY) {
			that.scaleModifier.setTransform(Transform.scale(xScalePlatform,yScalePlatform,1),{duration: 300})
			snapToPlatform(that.itemPosition,[xDeltaPlatform,yDeltaPlatform]);
			if (itemType == "wheel") {
				that.secondScaleModifier.setTransform(Transform.scale(xScalePlatform,yScalePlatform,1),{duration: 300})
				snapToPlatform(that.secondItemPosition,[xDeltaPlatform + 445, yDeltaPlatform]);
			}
			setActiveItemInfo(itemType,itemName,itemPrice)
		} else {
			that.scaleModifier.setTransform(Transform.scale(xScale,yScale,1),{duration: 700})
			snapBack(that.itemPosition,that.scaleModifier);
			if (itemType == "wheel") {
				that.secondScaleModifier.setTransform(Transform.scale(xScale,yScale,1),{duration: 700})
				snapBack(that.secondItemPosition,that.secondScaleModifier);
			}
		}
		console.log(inX, inY)
	});
	//add modifiers and surface to main context
	mainContext.add(this.originModifier).add(this.positionModifier).add(this.scaleModifier).add(this.addImageSurface);
	if (itemType == "wheel") {
		console.log('added second surface')
		mainContext.add(this.secondOriginModifier).add(this.secondPositionModifier).add(this.secondScaleModifier).add(this.addsecondImageSurface);
	}
}

// Arguments: imageUrl,xOrigin,yOrigin,xScale,yScale,xDeltaPlatform,yDeltaPlatform,xSize,ySize
jamaicanBike = new addItem('../images/jamaican-frame.png',120,570,.2,.2,170,-485,500,322,1,1,'frame',10,'Jamaican Frame',500);
bomberBike = new addItem('../images/bomber-frame.png',120,650,.2,.2,170,-568,500,322,1,1,'frame',10,'Bomber',550);

vigorWheel = new addItem('../images/vigor-wheel-large.png',650,585,.2,.2,-490,-400,300,300,1,1,'wheel',1,'Vigor FX',800);
brooksSaddleNew = new addItem('../images/brooks-black.png',1080,585,.3,.3,-735, -535,198,152,.7,.7,'saddle',1,'Brooks B17',80)



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

function setActiveItemInfo(itemType,itemName,itemPrice) {
	if (itemType == 'frame') {
		console.log('setting frame price')
		framePrice['content'] = itemPrice;
		frameTitle['content'] = itemName;
	}
}



mainContext.add(platformOriginModifier).add(platform);
mainContext.add(innerPlatformOriginModifier).add(innerPlatform);
mainContext.add(blackBorderOriginModifier).add(blackPlatformBorder);
mainContext.add(bikeStatsOriginModifier).add(bikeStats);
mainContext.add(frameTitleOriginModifier).add(frameTitle);
mainContext.add(framePriceOriginModifier).add(framePrice);
mainContext.add(framePlatformOriginModifier).add(framePlatform);
mainContext.add(saddlePlatformOriginModifier).add(saddlePlatform);
mainContext.add(wheelPlatformOriginModifier).add(wheelPlatform);
