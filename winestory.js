/* Wine Story
*
*
* Fall 2016
* CS 320: Tangible User Interfaces
* Rachel Seo and Clare Lee
*
*
*/


var root = $.app.mainLayer();


var background = createBackground("Media/main_background.jpg");

root.addChild(background);

// Add a stylesheet to the app
$.app.addStyleFilename("styles.css");

// Make marker sensors to detect both key and glass objects
keySensor();
glassSensor();

// Opens the cellar and displays wine info widgets
// Will be called onMarkerSensorDown (of wine bottle/key of cellar)
function openCellar {
	// Call different types of widget functions
	var bottle1 = createImage(); //multiple bottles
    var bottle2 = createImage();
    var bottle3 = createImage();
    var bottle4 = createImage();
    var bottle5 = createImage(); 
    bottle1.onSingleTap(createText());
    bottle2.onSingleTap(createVideo());
    bottle3.onSingleTap(createVideo());
    bottle4.onSingleTap(createVideo());


}


function createText {
    //container
   var t = new MultiWidgets.TextWidget();
    t.setText("Wine Info");
    root.addChild(t);
    t.raiseToTop();
}

function createImage(x, y, sizeX, sizeY, image) {
	var w = new MultiWidgets.JavaScriptWidget();

	w.setLocation(x, y);
	w.setWidth(sizeX);
	w.setHeight(sizeY);
	w.img = new MultiWidgets.ImageWidget();
	w.img.addCSSClass("ImageW")

	if (w.img.load(image)) {
	    w.img.addOperator(new MultiWidgets.StayInsideParentOperator());
    	w.img.setLocation(x,y);
    	w.img.setWidth(sizeX);
	    w.img.setHeight(sizeY);
	    w.addChild(w.img);
    	w.img.raiseToTop();
	}

	root.addChild(w);
	w.raiseToTop();
}

//Creates a VideoWidget and adds it to the application's main layer
function createVideo(x, y, size, video) {
	var vid = new MultiWidgets.VideoWidget();
	vid.setWidth(size);
	vid.setHeight(size);

	if (vid.load(video)) {
		vid.addOperator(new MultiWidgets.StayInsideParentOperator());
		//vid.resizeToFit(new Nimble.SizeF(size, size));
		vid.setLocation(x, y);
		//vid.setFixed();
		//vid.displayControls(true);
		vid.setAudioEnabled(true);
		vid.setPreviewPos(5, true); //sets preview image to 3 seond spot in video

		root.addChild(vid);
		vid.raiseToTop();

	}

}

//Creates and returns a customized widget for the application background
//that contains an ImageWidget
function createBackground (background) {
	var w = new MultiWidgets.JavaScriptWidget();

	w.setWidth(root.width());
	w.setHeight(root.height());
	w.setFixed();
	w.setAutoRaiseToTop(false);

	w.image = new MultiWidgets.ImageWidget();

	if (w.image.load(background)) {
	    w.image.setWidth(w.width());
	    w.image.setHeight(w.height());
    	w.image.setFixed();
    	w.image.setAutoRaiseToTop(false);
    	w.addChild(w.image);
    	w.image.raiseToTop();
	}
	

	return w;
}



//Creates a flow widget and add it to the application's main layer
function createFlow(x, y, size) {
    //adds labels to the wine list 
	var flow = new MultiWidgets.ItemFlowWidget();
	flow.setLocation(x,y);
	for (var i=1; i<=9; i++) {
		var imgItem = new MultiWidgets.ImageWidget();
		var path = "./Media/mmimage0"+i+".jpg";
		if (imgItem.load(path)) {
			imgItem.addOperator(new MultiWidgets.StayInsideParentOperator());
   	 		imgItem.resizeToFit(new Nimble.SizeF(size,size));
			flow.addItem(imgItem);
		}
	}
	root.addChild(flow);
	flow.raiseToTop();
}


/*
*
* Marker functions
*/

function keySensor() {
	//
	var markerSensor = new MultiWidgets.JavaScriptWidget();
	markerSensor.setLocation(0,0);
	markerSensor.setHeight(root.height()); //set the location to be on the key hole
	markerSensor.setWidth(root.width());
	markerSensor.setFixed();
	markerSensor.setBackgroundColor(0.01,0.01,0.01,0.01);

	markerSensor.onMarkerDown(function(id_as_string) {
		var idAsInt = parseInt(id_as_string);
		var gm = $.app.grabManager();
		var marker = gm.findMarker(idAsInt);
		if(marker.code()==42) //winebottle key
		{
            // call openCellar()
		console.log("**************** key down: x: "+ marker.centerLocation().x+" y: "+marker.centerLocation().y+" *****************");
	
        }
            
    });
	markerSensor.onMarkerUp(function(id_as_string) {
		var idAsInt = parseInt(id_as_string);
		var gm = $.app.grabManager();
		var marker = gm.findMarker(idAsInt);
		if (marker.code()==42)
			console.log("****************** key up *******************");
	});

	root.addChild(markerSensor);
	markerSensor.raiseToTop();
}

function glassSensor() {
	//
	var markerSensor = new MultiWidgets.JavaScriptWidget();
	markerSensor.setLocation(0,0); //shift it to below the cellar
	markerSensor.setHeight(root.height()/2); //set the location to be the bottom half below the cellar
	markerSensor.setWidth(root.width());
	markerSensor.setFixed();
	markerSensor.setBackgroundColor(0.01,0.01,0.01,0.01);

	markerSensor.onMarkerDown(function(id_as_string) {
		var idAsInt = parseInt(id_as_string);
		var gm = $.app.grabManager();
		var marker = gm.findMarker(idAsInt);
		if(marker.code()==42) //clare's glass
		{
            // call glassBubble for clare
		console.log("**************** clare's glass down: x: "+ marker.centerLocation().x+" y: "+marker.centerLocation().y+" *****************");
	
        } else if(marker.code()==43) { //rachel's glass
            // call glassBubble for rachel
        console.log("**************** rachel's glass down: x: "+ marker.centerLocation().x+" y: "+marker.centerLocation().y+" *****************");
            
        }
            
    });
    
	markerSensor.onMarkerUp(function(id_as_string) {
		var idAsInt = parseInt(id_as_string);
		var gm = $.app.grabManager();
		var marker = gm.findMarker(idAsInt);
		if (marker.code()==42)
			console.log("****************** glass up *******************");
	});

	root.addChild(markerSensor);
	markerSensor.raiseToTop();
}

function corkSensor(){
    
    	var markerSensor = new MultiWidgets.JavaScriptWidget();
	markerSensor.setLocation(0,0); //the plus sign below the cellar in the middle of the screen
	markerSensor.setHeight(root.height()); //the size will be small, enter exact numbers 
	markerSensor.setWidth(root.width());
	markerSensor.setFixed();
	markerSensor.setBackgroundColor(0.01,0.01,0.01,0.01);

	markerSensor.onMarkerDown(function(id_as_string) {
		var idAsInt = parseInt(id_as_string);
		var gm = $.app.grabManager();
		var marker = gm.findMarker(idAsInt);
		if(marker.code()==42) //clare's glass
		{
            //by putting the cork on top of the plus symbol, an image of the wine label will be //generated and the user will be able to drag and add it to the label collection 
            //call addImage() 
		console.log("**************** corkn down: x: "+ marker.centerLocation().x+" y: "+marker.centerLocation().y+" *****************");
	
        }
            
    });
    
	markerSensor.onMarkerUp(function(id_as_string) {
		var idAsInt = parseInt(id_as_string);
		var gm = $.app.grabManager();
		var marker = gm.findMarker(idAsInt);
		if (marker.code()==42)
			console.log("****************** cork up *******************");
	});

	root.addChild(markerSensor);
	markerSensor.raiseToTop();
    
}

function clinkSensor(){
    //set a dedicated space so the users can put their glasses and display wine friendship 
    //change css to make the space noticeable "Place your glasses together!" 
    	var markerSensor = new MultiWidgets.JavaScriptWidget();
	markerSensor.setLocation(0,0); //middle of drinking area
	markerSensor.setHeight(root.height()); //decent space dedicated
	markerSensor.setWidth(root.width());
	markerSensor.setFixed();
	markerSensor.setBackgroundColor(0.01,0.01,0.01,0.01);

	markerSensor.onMarkerDown(function(id_as_string) {
		var idAsInt = parseInt(id_as_string);
		var gm = $.app.grabManager();
		var marker = gm.findMarker(idAsInt);
		if(marker.code()==42 && marker.code()==43) //both glasses in the area
		{
            //call clink()
		console.log("****************  both glass down: x: "+ marker.centerLocation().x+" y: "+marker.centerLocation().y+" *****************");
	
        }
            
    });
    
	markerSensor.onMarkerUp(function(id_as_string) {
		var idAsInt = parseInt(id_as_string);
		var gm = $.app.grabManager();
		var marker = gm.findMarker(idAsInt);
		if (marker.code()==42)
			console.log("****************** glass up *******************");
	});

	root.addChild(markerSensor);
	markerSensor.raiseToTop();
    
}