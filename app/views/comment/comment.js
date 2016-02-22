'use strict';

let vmModule = require("./comment-view-model");
let textFieldModule = require("ui/text-field");
let observableAuthor = require("data/observable");
let observableComment = require("data/observable");

function pageLoaded(args) {
  var page = args.object;
  var objAuthor = new observableAuthor.Observable();
  var objComment = new observableComment.Observable();
  objComment.set("Comment", "Enter your comment here.");
  objAuthor.set("Author", "Enter your name here.");

  var bindingOptions = {
    sourceProperty: "textSource",
    targetProperty: "text",
    twoWay: true
};

  page.bindingContext = objAuthor;
  page.bindingContext = objComment; 
}

function sendComment(args){

}

exports.pageLoaded = pageLoaded;
exports.sendComment = sendComment;

