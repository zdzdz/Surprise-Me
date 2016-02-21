'use strict';

let vmModule = require("./details-view-model");

function pageLoaded(args) {
    let page = args.object;
    page.bindingContext = vmModule.detailsViewModel;
}

function navigatedTo(args) {
    var page = args.object;
    page.bindingContext = page.navigationContext;

    console.log(page.navigationContext.logoUrl);
}

exports.pageLoaded = pageLoaded;
exports.navigatedTo = navigatedTo;
