'use strict';

let vmModule = require("./details-view-model");
let frameModule = require('ui/frame');
let applicationSettings = require("application-settings");
let sqlite = require('nativescript-sqlite');
let ObservableArray = require("data/observable-array").ObservableArray;
let dbname = 'favourites.sqlite';
let Toast = require("nativescript-toast");
let db = null;
let latitude;
let longitude;
let restName;
let stars;
let description;
let restId;

function navigatedTo(args) {
    var page = args.object;
    page.bindingContext = page.navigationContext;
    latitude = page.navigationContext.location.latitude;
    longitude = page.navigationContext.location.longitude;
    restName = page.navigationContext.name;
    stars = page.navigationContext.stars;
    description = page.navigationContext.description;
    restId = page.navigationContext.restId;
    applicationSettings.setString('CurrentRestName', restName);
    applicationSettings.setString('CurrentRestId', restId);
}

function goToImageViewer(args){
	let topmost = frameModule.topmost();
	let view = args.object;
            var navigationEntry = {
                moduleName: "./views/imageViewer/imageViewer",
                context: {picture: view.imageSource },
                animated: true
            };
            topmost.navigate(navigationEntry);
}

function goToComments(args){
	let topmost = frameModule.topmost();
    topmost.navigate("./views/comment/comment");
}

function goBack(args){
	let topmost = frameModule.topmost();
    topmost.goBack();
}

function showOnMap(args){
	let topmost = frameModule.topmost();
	var navigationEntry = {
		moduleName: "/views/map/map",
		context: { latitude: latitude, longitude: longitude, restName: restName },
		animated: true
	};
    topmost.navigate(navigationEntry);
}


function addToFavourites(){
	// if (!sqlite.exists(dbname)) {
 //        sqlite.copyDatabase(dbname);
 //    }

    console.log(sqlite.exists(dbname));

    new sqlite(dbname, function(err, dbConnection) {
	if (err) {
	    console.log(err);
	}
        db = dbConnection;
        db.resultType(sqlite.RESULTSASARRAY);
        db.valueType(sqlite.VALUESARENATIVE);
    });

    db.execSQL("insert into favourites (restName) values (?)", restName);

    let toast = Toast.makeText("Added to favourites!");
    toast.show();
}

exports.navigatedTo = navigatedTo;
exports.goToImageViewer = goToImageViewer;
exports.goToComments = goToComments;
exports.showOnMap = showOnMap;
exports.goBack = goBack;
exports.addToFavourites = addToFavourites;
