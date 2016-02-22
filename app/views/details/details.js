'use strict';

let vmModule = require("./details-view-model");
let frameModule = require('ui/frame');
let latitude;
let longitude;
let restName;

function navigatedTo(args) {
    var page = args.object;
    page.bindingContext = page.navigationContext;
    latitude = page.navigationContext.location.latitude;
    longitude = page.navigationContext.location.longitude;
    restName = page.navigationContext.name;
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

function showOnMap(args){
	let topmost = frameModule.topmost();
	var navigationEntry = {
		moduleName: "/views/map/map",
		context: { latitude: latitude, longitude: longitude, restName: restName },
		animated: true
	};
    topmost.navigate(navigationEntry);
}

exports.navigatedTo = navigatedTo;
exports.goToImageViewer = goToImageViewer;
exports.goToComments = goToComments;
exports.showOnMap = showOnMap;
