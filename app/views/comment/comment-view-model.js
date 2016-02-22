'use strict';

let vmModule = require("./comment-view-model");
let textFieldModule = require("ui/text-field");
let observable = require("data/observable");
var view = require("ui/core/view");

var journeyInfo = {
    distance: "24", 
    mpg: "35", 
    fuelCost: "120.5"
};

var page;

exports.loadSignUpView = function(args) {
    page = args.object;

    page.bindingContext = journeyInfo;
}

exports.calculate = function() {
    var distance = parseFloat(journeyInfo.distance);
    var milesPerGallon = parseFloat(journeyInfo.mpg);
    var milesPerLitre = milesPerGallon / 4.54609;

    var fuelCost = parseFloat(journeyInfo.fuelCost) / 100; // cost in £

    var costPerMile = fuelCost / milesPerLitre;
    var journeyCost = distance * costPerMile;

    var resultLabel = view.getViewById(page, "result");
    resultLabel.text = "Journey cost £" + journeyCost.toFixed(2)
                     + "\nCost per mile: £" + costPerMile.toFixed(2);
}


exports.CommentViewModel = CommentViewModel;
exports.commentViewModel = new CommentViewModel();
