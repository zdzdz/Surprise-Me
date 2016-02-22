'use strict';

let vmModule = require("./home-view-model");
let frameModule = require('ui/frame');
let drawerModule = require("nativescript-telerik-ui/sidedrawer");
let applicationSettings = require("application-settings");
let toastModule = require("nativescript-toast");
let Everlive = require("../../everlive-sdk/everlive.all.min");
let restaurantsDb;
let logoUrl = null;
let imageUrl = null;
let stars = null;
let description = null;
let name = null;
let commentsIds = [];
let commentsArr = [];
let comments = {
    'sender': null,
    'content': null
};
let picturesIds = [];
let picturesUrlsArr = [];
let location = {};
let allRestaurants = [];

function pageLoaded(args) {
    let page = args.object;
    page.bindingContext = vmModule.homeViewModel;
    vmModule.homeViewModel.setDrawerTransition(page, new drawerModule.ScaleDownPusherTransition());

    restaurantsDb = global.everlive.data('Restaurants');
    restaurantsDb.get().then(function(data) {
        allRestaurants = data;
    });
}

function getRestaurants() {
    let picturesDb = global.everlive.data('Pictures');
    let commentsDb = global.everlive.data('Comments');
    let randomRestaurant = Math.floor(Math.random() * allRestaurants.count) + 0;

    restaurantsDb.get()
        .then(function(data) {
            let logoId = data.result[randomRestaurant].Logo;
            stars = data.result[randomRestaurant].Stars;
            description = data.result[randomRestaurant].Description;
            name = data.result[randomRestaurant].Name;
            location = data.result[randomRestaurant].Location;
            commentsIds = data.result[randomRestaurant].Comments;
            picturesIds = data.result[randomRestaurant].Pictures;

            console.log(location.latitude);
            global.everlive.files.getDownloadUrlById(logoId)
                .then(function(downloadUrl) {
                        logoUrl = downloadUrl;
                    },
                    function(error) {

                    });
        })
        .then(function() {
            let filter = new Everlive.Query();
            filter.where().isin('Id', commentsIds);

            commentsDb.get(filter).then(function(res) {
                for (var i = 0; i < res.count; i += 1) {
                    comments.content = res.result[i].Content;
                    comments.sender = res.result[i].Sender;
                    commentsArr.push(comments);
                }
            });
        })
        .then(function() {
            let filter = new Everlive.Query();
            filter.where().isin('Id', picturesIds);

            picturesDb.get(filter)
                .then(function(res) {
                    let imageId = res.result[0].Image;

                    global.everlive.files.getDownloadUrlById(imageId)
                        .then(function(downloadUrl) {
                                imageUrl = downloadUrl;
                            },
                            function(error) {

                            });

                    for (var i in res.result) {
                        global.everlive.files.getDownloadUrlById(res.result[i].Image)
                            .then(function(downloadUrl) {
                                picturesUrlsArr.push(downloadUrl);
                            });
                    }
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
            getRestaurants();
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

            // if (applicationSettings.getBoolean("hasLocation")) {
            if (true) {
                let topmost = frameModule.topmost();
                //console.log(logoUrl);
                var navigationEntry = {
                    moduleName: "./views/details/details",
                    context: {
                        logoUrl: logoUrl,
                        name: name,
                        stars: stars,
                        description: description,
                        location: location,
                        imageUrl: imageUrl,
                        commentsArr: commentsArr,
                        picturesUrlsArr: picturesUrlsArr
                    },
                    animated: true,
                    backstackVisible: true
                };

                commentsArr = [];
                picturesUrlsArr = [];
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
