'use strict';

let observable = require("data/observable");
let frameModule = require("ui/frame");
let drawerModule = require("nativescript-telerik-ui/sidedrawer");

class HomeViewModel extends observable.Observable {
    constructor(){
        super();
        this.set("mainContentText", "Test");
    }

    setDrawerTransition(view, transition){
        let drawer = view.getViewById("sideDrawer");
        drawer.closeDrawer();
        drawer.drawerTransition = transition;
    }

    onScaleDownPusherTransitionTap(args){
        let drawer = frameModule.topmost().getViewById("sideDrawer");
        //this.setDrawerTransition(new drawerModule.ScaleDownPusherTransition());
        drawer.showDrawer();
    }
}

exports.HomeViewModel = HomeViewModel;
exports.homeViewModel = new HomeViewModel();
