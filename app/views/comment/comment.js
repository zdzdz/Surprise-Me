'use strict';

let vmModule = require("./comment-view-model");
let textFieldModule = require("ui/text-field");
let view = require("ui/core/view");
let frameModule = require('ui/frame');
let observableAuthor = require("data/observable");
let observableComment = require("data/observable");
let Toast = require("nativescript-toast");



var commentInfo = {
    author: "", 
    content: "", 
};

var page;

 function loadSignUpView (args)  {
    page = args.object;
    page.bindingContext = commentInfo;
}

 function sendComment(){
    var author = commentInfo.author;
    var content = commentInfo.content;

    var toast = Toast.makeText("Comment Send!");
	toast.show();

	let topmost = frameModule.topmost();
    topmost.goBack();
}

exports.loadSignUpView = loadSignUpView;
exports.sendComment = sendComment;

