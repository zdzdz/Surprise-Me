'use strict';

let geolocation = require("nativescript-geolocation");
let mapsModule = require("nativescript-google-maps-sdk");
let frameModule = require('ui/frame');
let latitude;
let longitude;
let restName;

function onNavigatedTo(args) {
    var page = args.object;
    page.bindingContext = page.navigationContext;
    latitude = page.navigationContext.latitude;
    longitude = page.navigationContext.longitude;
    restName = page.navigationContext.restName;
}

function onMapReady(args) {
  var mapView = args.object;
  var marker = new mapsModule.Marker();
  marker.position = mapsModule.Position.positionFromLatLng(latitude, longitude);
  marker.title = "Welcome to";
  marker.snippet = restName;
  marker.userData = { index : 1};
  mapView.addMarker(marker);
}

function goBack(args){
    let topmost = frameModule.topmost();
    topmost.goBack();
}

exports.onNavigatedTo = onNavigatedTo;
exports.onMapReady = onMapReady;
exports.goBack = goBack;