'use strict';

let vmModule = require("./home-view-model");
let frameModule = require('ui/frame');
let drawerModule = require("nativescript-telerik-ui/sidedrawer");
let logoUrl = null;

function pageLoaded(args) {
    let page = args.object;
    page.bindingContext = vmModule.homeViewModel;
    vmModule.homeViewModel.setDrawerTransition(page, new drawerModule.ScaleDownPusherTransition());

    // let everlive = new Everlive({
    //     appId: 'hxt7xps6k1h29bpf'
    // });


    let restaurants = global.everlive.data('Restaurants');
    restaurants.get()
        .then(function(data) {
            let logoId = data.result[0].Logo;
            console.log(logoId);
            global.everlive.files.getDownloadUrlById(logoId)
                .then(function(downloadUrl) {
                        //console.log(downloadUrl);
                        logoUrl = downloadUrl;
                    },
                    function(error) {

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
            //console.log(logoUrl);
            var navigationEntry = {
                moduleName: "./views/details/details",
                context: {logoUrl: logoUrl},
                animated: true,
                backstackVisible: true
            };
            topmost.navigate(navigationEntry);
        });
}

exports.pageLoaded = pageLoaded;
exports.goToFavourites = goToFavourites;
exports.goToDetails = goToDetails;
