'use strict';

let observable = require("data/observable");

class CommentViewModel extends observable.Observable {
    constructor() {
        super();
    }

    getUserData() {
        let data = {
            'content': this.comment,
            'author': this.author
        };
        return data;
    }
}

exports.CommentViewModel = CommentViewModel;
exports.commentViewModel = new CommentViewModel();
