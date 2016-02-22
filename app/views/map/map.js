'use strict';

let geolocation = require("nativescript-geolocation");
var mapsModule = require("nativescript-google-maps-sdk");
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

exports.onNavigatedTo = onNavigatedTo;
exports.onMapReady = onMapReady;