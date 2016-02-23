'use strict';

let observable = require("data/observable");
let frameModule = require("ui/frame");
let drawerModule = require("nativescript-telerik-ui/sidedrawer");
let geolocation = require("nativescript-geolocation");
let dialogs = require("ui/dialogs");
let toastModule = require("nativescript-toast");
let applicationSettings = require("application-settings");
let view = require('ui/core/view');
let isOpen = false;

class HomeViewModel extends observable.Observable {
    constructor() {
        super();
        this.set("mainContentText", "Test");
        applicationSettings.setBoolean("hasLocation", false);
    }

    setDrawerTransition(view, transition) {
        let drawer = view.getViewById("sideDrawer");
        drawer.closeDrawer();
        drawer.drawerTransition = transition;
    }

    toggleDrawer() {
        let drawer = frameModule.topmost().getViewById("sideDrawer");
        
        if (!isOpen) {
            drawer.showDrawer();
            isOpen = true;
        } else {
            drawer.closeDrawer();
            isOpen =false;
        }

    }

    enableLocationTap(args) {
        //console.log(geolocation.isEnabled());
        if (!geolocation.isEnabled()) {
            dialogs.confirm("It seems your loaction is disabled." +
                "In order to use the app you have to allow location service." +
                " Do you allow?").then(function(result) {
                if (result) {
                    geolocation.enableLocationRequest();
                }
            });
        } else {
            var location = geolocation.getCurrentLocation({ timeout: 5000 }).
            then(function(loc) {
                if (loc) {
                    if (loc.longitude > 23.457387 && loc.longitude < 23.229088 &&
                        loc.latitude > 42.802550 && loc.latitude < 42.594543) {
                        let toast = toastModule.makeText('Sorry. No restaurants outside of Sofia.');
                        toast.show();
                        applicationSettings.setBoolean("hasLocation", false);
                    } else {
                        let toast = toastModule.makeText('Good to go.');
                        toast.show();
                        applicationSettings.setBoolean("hasLocation", true);
                        let label = frameModule.topmost().getViewById("textLabel");
                        let locationIcon = frameModule.topmost().getViewById("locationIcon");
                        label.text = "You are in Sofia!";
                        locationIcon.src = "res://loc";
                    }

                    console.log(loc.latitude);
                    console.log(loc.longitude);
                }
            }, function(e) {
                console.log("Error: " + e.message);
            });
        }
    }
}

exports.HomeViewModel = HomeViewModel;
exports.homeViewModel = new HomeViewModel();
