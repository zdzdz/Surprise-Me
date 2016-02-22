'use strict';

let vmModule = require("./home-view-model");
let frameModule = require('ui/frame');
let drawerModule = require("nativescript-telerik-ui/sidedrawer");
let applicationSettings = require("application-settings");
let toastModule = require("nativescript-toast");
let logoUrl = null;
let imageUrl = null;
let pictureId = null;

function pageLoaded(args) {
    let page = args.object;
    page.bindingContext = vmModule.homeViewModel;
    vmModule.homeViewModel.setDrawerTransition(page, new drawerModule.ScaleDownPusherTransition());


    let restaurants = global.everlive.data('Restaurants');
    let pictures = global.everlive.data('Pictures');
    restaurants.get()
        .then(function(data) {
            let logoId = data.result[0].Logo;
            pictureId = data.result[0].Pictures[0];

            global.everlive.files.getDownloadUrlById(logoId)
                .then(function(downloadUrl) {
                        logoUrl = downloadUrl;
                    },
                    function(error) {

                    });
        }).then(function() {
            pictures.get()
                .then(function(res) {
                    let imageId = res.result[0].Image;
                    console.log(imageId);
                    global.everlive.files.getDownloadUrlById(imageId)
                        .then(function(downloadUrl) {
                                console.log(downloadUrl);
                                imageUrl = downloadUrl;
                            },
                            function(error) {

                            });

                });
        });
}

function goToFavourites() {
    let topmost = frameModule.topmost();
    topmost.navigate('./views/favourites/favourites');
}

function goToDetails(args) {
    let view = args.object;

    view.animate({
            translate: {
                x: 0,
                y: -50
            },
            scale: {
                y: 1.4,
                x: 1.4
            },
            rotate: 360,
            duration: 500
        })
        .then(function() {
            return view.animate({
                translate: {
                    y: 50,
                    x: 0
                },
                scale: {
                    y: 1,
                    x: 1
                },
                rotate: -360,
                duration: 400
            });
        })
        .then(function() {
            return view.animate({
                translate: {
                    y: -40,
                    x: 0
                },
                scale: {
                    y: 1.2,
                    x: 1.2
                },
                duration: 350
            });
        })
        .then(function() {
            return view.animate({
                translate: {
                    y: 40,
                    x: 0
                },
                scale: {
                    y: 1,
                    x: 1
                },
                duration: 300
            });
        })
        .then(function() {
            return view.animate({
                translate: {
                    y: -30,
                    x: 0
                },
                scale: {
                    y: 1.1,
                    x: 1.1
                },
                duration: 250
            });
        })
        .then(function() {
            return view.animate({
                translate: {
                    y: 30,
                    x: 0
                },
                scale: {
                    y: 1,
                    x: 1
                },
                duration: 200
            });
        })
        .then(function() {
            return view.animate({
                translate: {
                    y: -20,
                    x: 0
                },
                duration: 150
            });
        })
        .then(function() {
            return view.animate({
                translate: {
                    y: 20,
                    x: 0
                },
                duration: 100
            });
        }).then(function() {
            return view.animate({
                translate: {
                    y: -10,
                    x: 0
                },
                duration: 80
            });
        }).then(function() {
            return view.animate({
                translate: {
                    y: 10,
                    x: 0
                },
                duration: 80
            });
        }).then(function() {
            return view.animate({
                translate: {
                    y: -10,
                    x: 0
                },
                duration: 80
            });
        }).then(function() {
            return view.animate({
                translate: {
                    y: 10,
                    x: 0
                },
                duration: 80
            });
        }).then(function() {
            let topmost = frameModule.topmost();
            console.log(logoUrl);
            var navigationEntry = {
                moduleName: "./views/details/details",
                context: { logoUrl: logoUrl, imageUrl: imageUrl },
                animated: true,
                backstackVisible: true
            };
            if (applicationSettings.getBoolean("hasLocation")) {
                topmost.navigate(navigationEntry);
            } else {
            	let toast = toastModule.makeText('Find your location first!', 5000);
                toast.show();
            }
        });
}

exports.pageLoaded = pageLoaded;
exports.goToFavourites = goToFavourites;
exports.goToDetails = goToDetails;
