'use strict';

let vmModule = require("./imageViewer-view-model");
let view = require('ui/core/view');
let initialWidth;
let initialHeight;

function pageLoaded(args) {
    let page = args.object;
    page.bindingContext = vmModule.commentViewModel;

    attachEvents(page);
}

function attachEvents(page) {
    let pic = view.getViewById(page, 'imgViewer');

    let initialSize = {
        width: initialWidth,
        height: initialHeight
    };

    pic.width = initialSize.width;
    pic.height = initialSize.height;


    pic.on('doubleTap', function(args) {
        pic.width = initialSize.width;
        pic.height = initialSize.height;
    });

    pic.on('pinch', function(args) {
        console.log(args.scale);
        if (args.scale > 1) {
            pic.width += args.scale * 5;
            pic.height += args.scale * 5;
        } else if (args.scale < 1) {
        	pic.width -= args.scale * 10;
            pic.height -= args.scale * 10;
        }
    });
}

function navigatedTo(args) {
    var page = args.object;
    page.bindingContext = page.navigationContext;
    initialHeight = page.navigationContext.picture.height;
    initialWidth = page.navigationContext.picture.width;
}

exports.pageLoaded = pageLoaded;
exports.navigatedTo = navigatedTo;
