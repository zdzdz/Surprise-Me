'use strict';

let vmModule = require("./details-view-model");

function pageLoaded(args) {
    let page = args.object;
    page.bindingContext = vmModule.detailsViewModel;
}

exports.pageLoaded = pageLoaded;
