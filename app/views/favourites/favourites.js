'use strict';

let vmModule = require("./favourites-view-model");

function pageLoaded(args) {
    let page = args.object;
    page.bindingContext = vmModule.favouritesViewModel;
}

exports.pageLoaded = pageLoaded;
