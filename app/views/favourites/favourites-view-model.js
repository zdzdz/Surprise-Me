'use strict';

let observable = require("data/observable");

class FavouritesViewModel extends observable.Observable {
    constructor(){
        super();
    }
}

exports.FavouritesViewModel = FavouritesViewModel;
exports.favouritesViewModel = new FavouritesViewModel();
