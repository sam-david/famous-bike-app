/*global famous*/
// 'use strict'
// import dependencies
var Engine = famous.core.Engine;
var Modifier = famous.core.Modifier;
var StateModifier = famous.modifiers.StateModifier;
var Transform = famous.core.Transform;
var Transitionable = famous.transitions.Transitionable;
var ImageSurface = famous.surfaces.ImageSurface;
var TextareaSurface = famous.surfaces.TextareaSurface;
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
var totalPrice = 0;
var activeFrame = {};
var activeSaddle = {};
var activeWheel = {};

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

var frameHeading = new Surface({
	size: [200, 50],
	content: 'Frame:',
	properties: {
		color: 'black',
		fontSize: '1em',
		textDecoration: 'underline'
	}
});

var frameTitle = new Surface({
	size: [200, 50],
	content: 'Select Frame',
	properties: {
		color: 'black',
		fontSize: '1.1em'
	}
});

var framePrice = new Surface({
	size: [70, 50],
	content: '$0',
	properties: {
		color: 'green',
		fontSize: '1.4em',
		fontFamily: 'Arial'
	}
});

var frameDescription = new Surface({
	size: [210, 60],
	properties: {
		color: 'black',
		fontSize: '.7em'
	}
});

var frameHeadingOriginModifier = new StateModifier({
	transform: Transform.translate(1030, 60, 0)
}); 

var frameTitleOriginModifier = new StateModifier({
	transform: Transform.translate(1030, 80, 0)
}); 

var framePriceOriginModifier = new StateModifier({
	transform: Transform.translate(1190, 80, 0)
});

var frameDescriptionOriginModifier = new StateModifier({
	transform: Transform.translate(1030, 105, 0)
});

var wheelHeading = new Surface({
	size: [200, 50],
	content: 'Wheels:',
	properties: {
		color: 'black',
		fontSize: '1em',
		textDecoration: 'underline'
	}
});

var wheelTitle = new Surface({
	size: [200, 50],
	content: 'Select Wheels',
	properties: {
		color: 'black',
		fontSize: '1.1em'
	}
});

var wheelPrice = new Surface({
	size: [70, 50],
	content: '$0',
	properties: {
		color: 'green',
		fontSize: '1.4em',
		fontFamily: 'Arial'
	}
});

var wheelDescription = new Surface({
	size: [210, 60],
	properties: {
		color: 'black',
		fontSize: '.7em'
	}
});

var wheelDescriptionOriginModifier = new StateModifier({
	transform: Transform.translate(1030, 235, 0)
});

var wheelHeadingOriginModifier = new StateModifier({
	transform: Transform.translate(1030, 190, 0)
}); 

var wheelTitleOriginModifier = new StateModifier({
	transform: Transform.translate(1030, 210, 0)
}); 

var wheelPriceOriginModifier = new StateModifier({
	transform: Transform.translate(1190, 210, 0)
});

var saddleHeading = new Surface({
	size: [200, 50],
	content: 'Saddle:',
	properties: {
		color: 'black',
		fontSize: '1em',
		textDecoration: 'underline'
	}
});

var saddleTitle = new Surface({
	size: [200, 50],
	content: 'Select Saddle',
	properties: {
		color: 'black',
		fontSize: '1.1em'
	}
});

var saddlePrice = new Surface({
	size: [70, 50],
	content: '$0',
	properties: {
		color: 'green',
		fontSize: '1.4em',
		fontFamily: 'Arial'
	}
});

var saddleDescription = new Surface({
	size: [210, 60],
	properties: {
		color: 'black',
		fontSize: '.7em'
	}
});

var saddleDescriptionOriginModifier = new StateModifier({
	transform: Transform.translate(1030, 365, 0)
});

var saddleHeadingOriginModifier = new StateModifier({
	transform: Transform.translate(1030, 320, 0)
}); 

var saddleTitleOriginModifier = new StateModifier({
	transform: Transform.translate(1030, 340, 0)
}); 

var saddlePriceOriginModifier = new StateModifier({
	transform: Transform.translate(1190, 340, 0)
});

var grandTotalHeading = new Surface({
	size: [200, 50],
	content: 'Current Total:',
	properties: {
		color: 'black',
		fontSize: '1.1em',
		textDecoration: 'underline',
		paddingTop: '2px'
	}
});

var grandTotalPrice = new Surface({
	size: [70, 50],
	content: '$0',
	properties: {
		color: 'green',
		fontSize: '1.6em',
		fontFamily: 'Arial'
	}
});

var grandTotalHeadingOriginModifier = new StateModifier({
	transform: Transform.translate(1030, 450, 0)
});

var grandTotalPriceOriginModifier = new StateModifier({
	transform: Transform.translate(1160, 450, 0)
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
		backgroundColor: '#BFB2A3',
		border: 'black solid 2px',
		textAlign: 'center'
	}
});

var saddlePlatformOriginModifier = new StateModifier({
	transform: Transform.translate(1050, 540, 0)
});

var signatureSurface = new Surface({
	size: [150, 40],
	content: 'Sam David 2015 &copy',
	properties: {
		color: '#5A86BF',
		fontSize: '.7em'
	}
});

var signatureSurfaceOriginModifier = new StateModifier({
	transform: Transform.translate(1180,750,0)
})

mainContext.add(signatureSurfaceOriginModifier).add(signatureSurface);

function addItem(imageUrl,xOrigin,yOrigin,xScale,yScale,xDeltaPlatform,yDeltaPlatform,xSize,ySize,xScalePlatform,yScalePlatform,itemType,zIndex,itemName,itemPrice,itemDescription) {
	this.xScale = xScale;
	this.yScale = yScale;
	this.price = itemPrice;
	this.description = itemDescription;
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
			snapToPlatform(that.itemPosition,[xDeltaPlatform,yDeltaPlatform],that);
			if (itemType == "wheel") {
				that.secondScaleModifier.setTransform(Transform.scale(xScalePlatform,yScalePlatform,1),{duration: 300})
				snapToPlatform(that.secondItemPosition,[xDeltaPlatform + 445, yDeltaPlatform]);
			}
			setActiveItemInfo(itemType,itemName,itemPrice,that,itemDescription)
		} else {
			that.scaleModifier.setTransform(Transform.scale(xScale,yScale,1),{duration: 700})
			snapBack(that.itemPosition,that.scaleModifier);
			if (itemType == "wheel") {
				that.secondScaleModifier.setTransform(Transform.scale(xScale,yScale,1),{duration: 700})
				snapBack(that.secondItemPosition,that.secondScaleModifier);
			}
			clearActiveItemInfo(itemType);
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
jamaicanBike = new addItem('../images/jamaican-frame.png',120,570,.2,.2,170,-485,500,322,1,1,'frame',10,'Jamaican',500,"A futurist update on the original best-seller: Glossy Black Frame, Neon Green & Vivid Yellow Accents sprinkled from top to bottom");
bomberBike = new addItem('../images/bomber-frame.png',120,650,.2,.2,170,-568,500,322,1,1,'frame',10,'Bomber',550,"Sand-blasted Khaki Frame with Foliage Green & Imperial-Red Striped pattern with matching Hubs");

vigorWheel = new addItem('../images/vigor-wheel-large.png',650,585,.2,.2,-490,-400,300,300,1,1,'wheel',1,'Vigor FX',699,"Rolf Prima has taken paired spokes to the track. Low spoke count and high spoke tensions on stiff deep section aero rims. These alloy track wheels are ideal for training and racing.");
stateWheel = new addItem('../images/state-wheel.png',650,660,.2,.2,-490,-475,300,300,1,1,'wheel',1,'State Deep Set',120,"These deep-wheels are a size 700 with a 43mm rim depth front and rear. Additionally, each wheel features a high-quality nylon rim strip to protect tubes from punctures.");
brooksSaddleNew = new addItem('../images/brooks-black.png',1080,585,.3,.3,-735, -535,198,152,.7,.7,'saddle',1,'Brooks B17',80,"The Brooks England flagship B17 flagship saddle has been around for 100 years. It's an excellent choice for touring, century rides, ultra-marathon rides and other demanding cycling.")
stateSaddleNew = new addItem('../images/state-saddle.png',1080,655,.45,.45,-722, -588,130,93,.8,.8,'saddle',1,'State Bicycle',25,"Comfortable and durable PU State Bicycle Co. saddle with steel rails. Available in tons of colors. Will fit all State Bicycle's as well as most any other bicycle.")



function snapToPlatform(trans, itemPosition,surface) {
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

function setActiveItemInfo(itemType,itemName,itemPrice,itemObject,itemDescription) {
	if (itemType == 'frame') {
		console.log('setting frame price',itemType,itemName,itemPrice)
		framePrice.setContent('$' + itemPrice);
		frameTitle.setContent(itemName);
		frameDescription.setContent(itemDescription)
		if (jQuery.isEmptyObject(activeFrame) == false) {
			console.log("Snaping back previously active frame",activeFrame);
			totalPrice -= activeFrame.price;
			activeFrame.scaleModifier.setTransform(Transform.scale(activeFrame.xScale,activeFrame.yScale,1),{duration: 700})
			snapBack(activeFrame.itemPosition,activeFrame.scaleModifier)
		}
		activeFrame = itemObject;
	} else if (itemType == 'wheel') {
		wheelTitle.setContent(itemName);
		wheelPrice.setContent('$' + itemPrice);
		wheelDescription.setContent(itemDescription);
		if (jQuery.isEmptyObject(activeWheel) == false) {
			console.log("Snaping back previously active wheel",activeWheel);
			totalPrice -= activeWheel.price;
			activeWheel.scaleModifier.setTransform(Transform.scale(activeWheel.xScale,activeWheel.yScale,1),{duration: 700})
			activeWheel.secondScaleModifier.setTransform(Transform.scale(activeWheel.xScale,activeWheel.yScale,1),{duration: 700})
			snapBack(activeWheel.itemPosition,activeWheel.scaleModifier)
			snapBack(activeWheel.secondItemPosition,activeWheel.secondScaleModifier)
		}
		activeWheel = itemObject;
	} else if (itemType == 'saddle') {
		saddleTitle.setContent(itemName);
		saddlePrice.setContent('$' + itemPrice);
		saddleDescription.setContent(itemDescription);
		if (jQuery.isEmptyObject(activeSaddle) == false) {
			console.log('snapping back active saddle', activeSaddle);
			totalPrice -= activeSaddle.price;
			activeSaddle.scaleModifier.setTransform(Transform.scale(activeSaddle.xScale,activeSaddle.yScale,1),{duration: 700})
			snapBack(activeSaddle.itemPosition,activeSaddle.scaleModifier)
		}
		activeSaddle = itemObject;
	}
	totalPrice += itemPrice;
	grandTotalPrice.setContent('$' + totalPrice);
}

function clearActiveItemInfo(itemType) {
	if (itemType == 'frame') {
		totalPrice -= activeFrame.price;
		frameTitle.setContent('Select Frame');
		framePrice.setContent('$0')
		frameDescription.setContent('')
		activeFrame = {}
	} else if (itemType == 'wheel') {
		totalPrice -= activeWheel.price;
		wheelTitle.setContent('Select Wheels');
		wheelPrice.setContent('$0')
		wheelDescription.setContent('')
		activeWheel = {}
	} else if (itemType == 'saddle') {
		totalPrice -= activeSaddle.price;
		saddleTitle.setContent('Select Saddle');
		saddlePrice.setContent('$0');
		saddleDescription.setContent('')
		activeSaddle = {}
	}
	grandTotalPrice.setContent('$' + totalPrice);
}

mainContext.add(platformOriginModifier).add(platform);
mainContext.add(innerPlatformOriginModifier).add(innerPlatform);
mainContext.add(blackBorderOriginModifier).add(blackPlatformBorder);
mainContext.add(bikeStatsOriginModifier).add(bikeStats);
mainContext.add(saddleTitleOriginModifier).add(saddleTitle);
mainContext.add(saddlePriceOriginModifier).add(saddlePrice);
mainContext.add(saddleHeadingOriginModifier).add(saddleHeading);
mainContext.add(saddleDescriptionOriginModifier).add(saddleDescription);
mainContext.add(wheelTitleOriginModifier).add(wheelTitle);
mainContext.add(wheelPriceOriginModifier).add(wheelPrice);
mainContext.add(wheelHeadingOriginModifier).add(wheelHeading);
mainContext.add(wheelDescriptionOriginModifier).add(wheelDescription);
mainContext.add(frameHeadingOriginModifier).add(frameHeading);
mainContext.add(frameTitleOriginModifier).add(frameTitle);
mainContext.add(framePriceOriginModifier).add(framePrice);
mainContext.add(frameDescriptionOriginModifier).add(frameDescription);
mainContext.add(grandTotalHeadingOriginModifier).add(grandTotalHeading);
mainContext.add(grandTotalPriceOriginModifier).add(grandTotalPrice);
mainContext.add(framePlatformOriginModifier).add(framePlatform);
mainContext.add(saddlePlatformOriginModifier).add(saddlePlatform);
mainContext.add(wheelPlatformOriginModifier).add(wheelPlatform);
