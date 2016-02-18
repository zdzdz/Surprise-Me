'use strict';

let vmModule = require("./home-view-model");

function pageLoaded(args) {
    let page = args.object;
    page.bindingContext = vmModule.homeViewModel;
}

exports.pageLoaded = pageLoaded;
