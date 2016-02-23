'use strict';

let vmModule = require("./comment-view-model");
let frameModule = require('ui/frame');
let applicationSettings = require("application-settings");
let Toast = require("nativescript-toast");
let currentRestName;
let currentRestId;
let commentId;

 function loadSignUpView (args)  {
    let page = args.object;
    page.bindingContext = vmModule.commentViewModel;
    currentRestName = applicationSettings.getString('CurrentRestName');
    currentRestId = applicationSettings.getString('CurrentRestId');
    //console.log(currentRestId);
}

 function sendComment(args){
    let sender = vmModule.commentViewModel.author;
    let content = vmModule.commentViewModel.content;

    let commentsDb = global.everlive.data('Comments');
    commentsDb.create({
        'Sender': sender,
        'Content': content,
        'RestaurantName': currentRestName
    }, function(data){
    //     commentId = data.result.Id;
    //     let restaurantsDb = global.everlive.data('Restaurants');
    //     restaurantsDb.updateSingle({ Id: currentRestId, 'Comments': commentId},
    // function(data){
    // },
    // function(error){
    // });
    
    vmModule.commentViewModel.author = "";
    vmModule.commentViewModel.comment = "";
    }, function(error){
        let toast = Toast.makeText(JSON.stringify(error));
        toast.show();
    });

    let toast = Toast.makeText("Comment sent!");
	toast.show();

	let topmost = frameModule.topmost();
    topmost.goBack();
}

function goBack(args){
    let topmost = frameModule.topmost();
    topmost.goBack();
}

exports.loadSignUpView = loadSignUpView;
exports.sendComment = sendComment;
exports.goBack = goBack;

