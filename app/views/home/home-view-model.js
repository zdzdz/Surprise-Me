'use strict';

let observable = require("data/observable");
let frameModule = require("ui/frame");
let drawerModule = require("nativescript-telerik-ui/sidedrawer");
let geolocation = require("nativescript-geolocation");
var dialogs = require("ui/dialogs");

class HomeViewModel extends observable.Observable {
    constructor() {
        super();
        this.set("mainContentText", "Test");
    }

    setDrawerTransition(view, transition) {
        let drawer = view.getViewById("sideDrawer");
        drawer.closeDrawer();
        drawer.drawerTransition = transition;
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
            var location = geolocation.getCurrentLocation({timeout: 5000}).
            then(function(loc) {
                if (loc) {
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
