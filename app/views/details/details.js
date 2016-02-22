'use strict';

let vmModule = require("./details-view-model");
let frameModule = require('ui/frame');

function pageLoaded(args) {
    let page = args.object;
    //page.bindingContext = vmModule.detailsViewModel;
}

function navigatedTo(args) {
    var page = args.object;
    page.bindingContext = page.navigationContext;
}

function goToImageViewer(args){
	let topmost = frameModule.topmost();
	let view = args.object;
            var navigationEntry = {
                moduleName: "./views/imageViewer/imageViewer",
                context: {picture: view.imageSource },
                animated: true
            };
            topmost.navigate(navigationEntry);
}

exports.pageLoaded = pageLoaded;
exports.navigatedTo = navigatedTo;
exports.goToImageViewer = goToImageViewer;
