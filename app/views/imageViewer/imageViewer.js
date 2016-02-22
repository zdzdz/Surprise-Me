'use strict';

let view = require('ui/core/view');
let AbsoluteLayout = require('ui/layouts/absolute-layout')
    .AbsoluteLayout;
let initialWidth;
let initialHeight;

function pageLoaded(args) {
    let page = args.object;

    attachEvents(page);
    console.dir(AbsoluteLayout);
}

function attachEvents(page) {
    let pic = view.getViewById(page, 'imgViewer');
    let top = AbsoluteLayout.getTop(pic);
    let left = AbsoluteLayout.getLeft(pic);

    let initialSize = {
        width: initialWidth,
        height: initialHeight
    };

    pic.width = 360;

    pic.on('doubleTap', function(args) {
        pic.width = 360;
        pic.left = top;
        pic.top = top;
    });

    pic.on('pan', function(args) {
        top += args.deltaY;
        left += args.deltaX;

        AbsoluteLayout.setTop(pic, top);
        AbsoluteLayout.setLeft(pic, left);
    });


    pic.on('pinch', function(args) {
        console.log(args.scale);
        if (args.scale > 1) {
        	if(pic.width > 2040 || pic.height > 1080){
        		return;
        	}
            pic.width += args.scale * 5;
            pic.height += args.scale * 5;
        } else if (args.scale < 1) {
        	if(pic.width < 30 || pic.height < 20){
        		return;
        	}
            pic.width -= args.scale * 20;
            pic.height -= args.scale * 20;
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
