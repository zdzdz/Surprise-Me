'use strict';

let observable = require("data/observable");

class CommentViewModel extends observable.Observable {
    constructor(){
        super();
    }
}

exports.CommentViewModel = CommentViewModel;
exports.commentViewModel = new CommentViewModel();
