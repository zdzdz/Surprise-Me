'use strict';

let vmModule = require("./favourites-view-model");
let frameModule = require('ui/frame');

function pageLoaded(args) {
    let page = args.object;
    page.bindingContext = vmModule.favouritesViewModel;
}

function goBack(args){
    let topmost = frameModule.topmost();
    topmost.goBack();
}

exports.pageLoaded = pageLoaded;
exports.goBack = goBack;