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

var background = createBackground("Media/background.png");

root.addChild(background);

// Add a stylesheet to the app
$.app.addStyleFilename("styles.css");


// Opens the cellar and displays wine info widgets
// Will be called onKeySensor down 
function openCellar() {
	// Call different types of widget functions
	var bottle1 = createImage(230,80, 120, 400, "Media/Wine_bottles/bottle4.png"); //origin video
    var bottle2 = createImage(430,80, 120,400, "Media/Wine_bottles/bottle5.png"); // wine specs
    var bottle3 = createImage(630, 80, 120,400, "Media/Wine_bottles/bottle1.png"); // taste notes
    var bottle4 = createImage(830,80, 120,400, "Media/Wine_bottles/bottle3.png"); // wine bites
    var bottle5 = createImage(1030,80, 120,400, "Media/Wine_bottles/bottle2.png"); // similar wines

    bottle1.setFixed(); // fix location of all bottles
	bottle2.setFixed();
	bottle3.setFixed();
	bottle4.setFixed();
	bottle5.setFixed();


    bottle1.onSingleTap(function(){ // origin video
    	var vid = createVideo(160, 200, 250, 125, "Media/ContentForBottles/wineVideo.mp4");
    	setTimeout(function(){root.removeChild(vid)}, 85000);//set time to delete
    });

    bottle2.onSingleTap(function(){ // wine specs
    	var specs = createImage(380, 200, 225, 225, "Media/ContentForBottles/WineSpecs.png");
    	specs.onSingleTap(function(){ // if sspecs is tapped, remove it from the layer
    		root.removeChild(specs)});
    });

     bottle3.onSingleTap(function(){ // taste notes
    	var taste = createImage(580, 180, 240, 300, "Media/ContentForBottles/TastingNotes.png");
    	taste.onSingleTap(function(){
    		root.removeChild(taste);
    	});
    });   

    bottle4.onSingleTap(function(){ // wine bites
    	var bites = createImage(760, 250, 225*1.2, 150*1.2, "Media/ContentForBottles/WineBites.png");
    	bites.onSingleTap(function(){
    		root.removeChild(bites);
    	});
 
    }); 

    bottle5.onSingleTap(function(){ // similar wines
    	var f = addWineFlow(1045, 270, 500*1.5);

    	f.onSingleTap(function(){
    		root.removeChild(f);
    	});

    })
    	   
}

// Helper text for placing glass markers
var clare_glass = createText(300,900,"Place your glass here");
var rachel_glass = createText(1300,900,"Place your glass here");
var mutual_glass = createText(800,700,"Place your glasses together");
var toast_icon = createImage(880,550, 167*0.8, 195*0.8, "Media/icons/toastIcon2.png");

// Create widget functions for text, image, video, book, and flow
function createText(x,y,text) {
   var t = new MultiWidgets.TextWidget();
    t.setText(text);
    root.addChild(t);
    t.setFixed();
    t.raiseToTop();
    t.setLocation(x,y)

    return t;
}

function createImage(x, y, sizeX, sizeY, image) {
	var img = new MultiWidgets.ImageWidget();
	img.addCSSClass("ImageW");

	if (img.load(image)) {

    	img.setLocation(x,y);
    	img.setWidth(sizeX);
	    img.setHeight(sizeY);
	}
	root.addChild(img);
	img.raiseToTop();

	return img;

}

// Creates a VideoWidget and adds it to the application's main layer
function createVideo(x, y, width, height, video) {
	var vid = new MultiWidgets.VideoWidget();
	vid.setWidth(width);
	vid.setHeight(height);

	if (vid.load(video)) {
		vid.addOperator(new MultiWidgets.StayInsideParentOperator());
		vid.setLocation(x, y);
		vid.setAudioEnabled(true);
		vid.setPreviewPos(5, true); //sets preview image to 3 seond spot in video

		root.addChild(vid);
		vid.raiseToTop();
	}
	return vid;
}

// Creates and returns a customized widget for the application background
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



/*
*
* Content functions: create all the icons that act as the widgets for each person's glass
* Functions will be called when the appropriate MarkerSensor is down
*/
//createClareWidget();

function createClareWidget() {
	
	var journal_text = createText(100,830,"Wine Journal");
	var photo_text = createText(100,910,"Photos");
	journal_text.addCSSClass("iconText");
	photo_text.addCSSClass("iconText");
	var journal_icon = createImage(210, 830, 80, 80, "Media/icons/Journal.png"); // call createImage function to make journal icon and photo icon
	var photo_icon = createImage(210, 930, 80, 80, "Media/icons/polaroid1.png"); // when icon tapped, call flow for wine journal


	journal_icon.setFixed();
	photo_icon.setFixed();
	journal_text.setFixed();
	photo_text.setFixed();

	journal_icon.onSingleTap(function(){
		var clareflow = addClareFlow(395, 600,400*1.5);
		clareflow.onSingleTap(function(){
			root.removeChild(clareflow);
		});
	});


	photo_icon.onSingleTap(function(){
		var clarebook = addClareBook(270,800,680,240); // create personal photos 
		clarebook.onSingleTap(function(){
			root.removeChild(clarebook);
		});
	});

}

// delete later
//createRachelWidget();

function createRachelWidget() {
	
	var journal_text = createText(1705,830,"Wine Journal");
	var photo_text = createText(1705,910,"Photos");

	var journal_icon = createImage(1620, 830, 80, 80, "Media/icons/Journal.png"); // call createImage function to make journal icon and photo icon
	var photo_icon = createImage(1620, 930, 80, 80, "Media/icons/polaroid1.png"); // when icon tapped, call flow for wine journal

	journal_text.addCSSClass("iconText");
	photo_text.addCSSClass("iconText");

	journal_icon.setFixed();
	photo_icon.setFixed();
	journal_text.setFixed();
	photo_text.setFixed();

	journal_icon.onSingleTap(function(){
		var rachelflow = addRachelFlow(1380,600,400*1.5);
		rachelflow.onSingleTap(function(){
			root.removeChild(rachelflow);
		});
	});

	photo_icon.onSingleTap(function(){
		var rachelbook = addRachelBook(620,800,680,240); // create personal photos 
		rachelbook.onSingleTap(function(){
			root.removeChild(rachelbook);
		});
	});

}



/*
*
* Flow functions
*/

// Create a flow widget for a similar wine suggestions and add it to the application's main layer
function addWineFlow(x,y,size) {
	var flow = new MultiWidgets.ItemFlowWidget();
	flow.setLocation(x,y); 
	for (var i=1; i<=5; i++) {
	var imgItem = new MultiWidgets.ImageWidget();
	var path = "Media/Similar_journal/wine" + i + ".png";
	if (imgItem.load(path)) {
		imgItem.addOperator(new MultiWidgets.StayInsideParentOperator());
   	 	imgItem.resizeToFit(new Nimble.SizeF(size,size));
		flow.addItem(imgItem);

		}
	}
	root.addChild(flow);
	flow.raiseToTop();

	return flow;

}




// Create a flow widget for Clare's wine journal and add it to the application's main layer
function addClareFlow(x,y,size) {
	var flow = new MultiWidgets.ItemFlowWidget();
	flow.setLocation(x,y); // readjust later
	for (var i=1; i<=20; i++) {
	var imgItem = new MultiWidgets.ImageWidget();
	var path = "Media/Clare_journal/image" + i + ".jpg";
	if (imgItem.load(path)) {
		imgItem.addOperator(new MultiWidgets.StayInsideParentOperator());
   	 	imgItem.resizeToFit(new Nimble.SizeF(size,size));

		flow.addItem(imgItem);
		}
	}
	root.addChild(flow);
	flow.raiseToTop();

	return flow;
}

// Book widget
function addClareBook(x,y,width, height) {
	var book = new MultiWidgets.BookWidget();

	if (book.load("Media/Clare_book")) {
		book.setWidth(width);
		book.setHeight(height);
		book.addOperator(new MultiWidgets.StayInsideParentOperator());
		book.setLocation(x, y);

		root.addChild(book);
		book.raiseToTop();
	}

	return book;
}

// Flow widget for Rachel's wine journal
function addRachelFlow(x,y,size) {
	var flow = new MultiWidgets.ItemFlowWidget();
	flow.setLocation(x,y); // readjust later
	for (var i=0; i<=21; i++) {
	var imgItem = new MultiWidgets.ImageWidget();
	var path = "Media/Rachel_journal/image" +i + ".jpg";
	if (imgItem.load(path)) {
		imgItem.addOperator(new MultiWidgets.StayInsideParentOperator());
   	 	imgItem.resizeToFit(new Nimble.SizeF(size,size));
		flow.addItem(imgItem);
		}
	}
	root.addChild(flow);
	flow.raiseToTop();

	return flow;
}

// Book widget
function addRachelBook(x,y,width, height) {
	var book = new MultiWidgets.BookWidget();

	if (book.load("Media/Rachel_book")) {
		book.setWidth(width);
		book.setHeight(height);
		book.addOperator(new MultiWidgets.StayInsideParentOperator());
		book.setLocation(x, y);

		root.addChild(book);
		book.raiseToTop();
	}

	return book;
}


// Flow widget for mutual wine journal
function addMutualFlow(x,y,size) {
	var flow = new MultiWidgets.ItemFlowWidget();
	flow.setLocation(x,y);
	for (var i=1; i<=10; i++) {
	var imgItem = new MultiWidgets.ImageWidget();
	var path = "Media/Mutual_journal/image" +i + ".jpg";
	if (imgItem.load(path)) {
		imgItem.addOperator(new MultiWidgets.StayInsideParentOperator());
   	 	imgItem.resizeToFit(new Nimble.SizeF(size,size));
		flow.addItem(imgItem);
		}
	}
	root.addChild(flow);
	flow.raiseToTop();

	return flow;
}


/*
*
* Marker functions
*/

// Invoke all marker sensors
keySensor();
ClareGlassSensor();
RachelGlassSensor();
corkSensor();
ClinkSensor();

// Function that "opens" the wine cellar -- ie: make all bottles appear
function keySensor() {
	var markerSensor = new MultiWidgets.JavaScriptWidget();
	markerSensor.setLocation(1485,180);
	markerSensor.setHeight(200);
	markerSensor.setWidth(200);
	markerSensor.setFixed();
	markerSensor.setBackgroundColor(100,0,0,0);

	markerSensor.onMarkerDown(function(id_as_string) {
		var idAsInt = parseInt(id_as_string);
		var gm = $.app.grabManager();
		var marker = gm.findMarker(idAsInt);
		if(marker.code()==1) // winebottle key
		{
        openCellar();	
        }
            
    });
	root.addChild(markerSensor);
	markerSensor.raiseToTop();
}


function ClareGlassSensor() {
	var markerSensor = new MultiWidgets.JavaScriptWidget();
	markerSensor.setLocation(310,810);
	markerSensor.setHeight(200);
	markerSensor.setWidth(300);
	markerSensor.setFixed();
	markerSensor.setBackgroundColor(100,0,0,0);

	markerSensor.onMarkerDown(function(id_as_string) {
		var idAsInt = parseInt(id_as_string);
		var gm = $.app.grabManager();
		var marker = gm.findMarker(idAsInt);


		if (marker.code()==2)
		{
			createClareWidget(); // call Clare widget
        } 

    });


	root.addChild(markerSensor);
	markerSensor.raiseToTop();
}

function RachelGlassSensor() {
	var markerSensor = new MultiWidgets.JavaScriptWidget();
	markerSensor.setLocation(1310,810);
	markerSensor.setHeight(200);
	markerSensor.setWidth(300);
	markerSensor.setFixed();
	markerSensor.setBackgroundColor(100,0,0,0);


	markerSensor.onMarkerDown(function(id_as_string) {
		var idAsInt = parseInt(id_as_string);
		var gm = $.app.grabManager();
		var marker = gm.findMarker(idAsInt);
		if(marker.code()==3)
		{
			createRachelWidget(); // call Rachel's widget
        } 

            
    });


	root.addChild(markerSensor);
	markerSensor.raiseToTop();
}

var plus_cork = createImage(1830, 550, 50, 50, "Media/icons/plus.png");


// Set a dedicated space so the users can put their glasses and display wine friendship 
function ClinkSensor() {
	var markerSensor = new MultiWidgets.JavaScriptWidget();
	markerSensor.setLocation(810,610); 
	markerSensor.setHeight(200);
	markerSensor.setWidth(300);
	markerSensor.setFixed();
	markerSensor.setBackgroundColor(100,0,0,0);
	var mutualflow;

	markerSensor.onMarkerDown(function(id_as_string) {
		var idAsInt = parseInt(id_as_string);
		var gm = $.app.grabManager();
		var marker = gm.findMarker(idAsInt);
		if(marker.code()==2) 
		{
			mutualflow = addMutualFlow(900,830,110); // call mutual wine journal
        } 
    });


	root.addChild(markerSensor);
	markerSensor.raiseToTop();
}

// Add button that calls up current wine label when cork is down on the + sign
function corkSensor(){
    var markerSensor = new MultiWidgets.JavaScriptWidget();
	markerSensor.setLocation(1780,520);
	markerSensor.setHeight(200);
	markerSensor.setWidth(200);
	markerSensor.setFixed();
	markerSensor.setBackgroundColor(250,0,0,0);

	markerSensor.onMarkerDown(function(id_as_string) {
		var idAsInt = parseInt(id_as_string);
		var gm = $.app.grabManager();
		var marker = gm.findMarker(idAsInt);
		var addedM;
		if(marker.code()==4) //clare's glass
		{
		var new_label = createImage(885,500,150,150,"Media/icons/current_wine.jpg"); // create an image of the current wine label
    	setTimeout(function(){
    		addedM = createText(770, 950, "Added to your shared memory!");
    		addedM.addCSSClass("addMessage");
    	}, 4500); 

    	setTimeout(function(){
    		root.removeChild(addedM);
    	}, 10000);

        }
            
    });

	root.addChild(markerSensor);
	markerSensor.raiseToTop();
    
}