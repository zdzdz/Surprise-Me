'use strict';

let vmModule = require("./home-view-model");
let drawerModule = require("nativescript-telerik-ui/sidedrawer");

function pageLoaded(args) {
    let page = args.object;
    page.bindingContext = vmModule.homeViewModel;
    vmModule.homeViewModel.setDrawerTransition(new drawerModule.ScaleDownPusherTransition());
}

exports.pageLoaded = pageLoaded;
