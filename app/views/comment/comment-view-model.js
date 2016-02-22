'use strict';

let vmModule = require("./comment-view-model");
let textFieldModule = require("ui/text-field");
let observable = require("data/observable");
var view = require("ui/core/view");

class CommentViewModel extends observable.Observable {
    constructor(){
        super();
    }
}

exports.CommentViewModel = CommentViewModel;
exports.commentViewModel = new CommentViewModel();
