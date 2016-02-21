'use strict';

let observable = require("data/observable");

class ImageViewerViewModel extends observable.Observable {
    constructor(){
        super();
    }
}

exports.ImageViewerViewModel = ImageViewerViewModel;
exports.imageViewerViewModel = new ImageViewerViewModel();
