'use strict';

let vmModule = require("./comment-view-model");

function pageLoaded(args) {
    let page = args.object;
    page.bindingContext = vmModule.commentViewModel;
}

exports.pageLoaded = pageLoaded;
