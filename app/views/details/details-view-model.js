'use strict';

let observable = require("data/observable");

class DetailsViewModel extends observable.Observable {
    constructor(){
        super();
    }
}

exports.DetailsViewModel = DetailsViewModel;
exports.detailsViewModel = new DetailsViewModel();
