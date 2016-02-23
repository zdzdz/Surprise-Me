'use strict';

let vmModule = require("./favourites-view-model");
let frameModule = require('ui/frame');
let sqlite = require('nativescript-sqlite');
let ObservableArray = require("data/observable-array").ObservableArray;
let dbname = 'name_db.sqlite';
let db = null;

function pageLoaded(args) {
    let page = args.object;
    page.bindingContext = vmModule.favouritesViewModel;

    // if (!sqlite.exists(dbname)) {
    //     sqlite.copyDatabase(dbname);
    // }

    console.log(sqlite.exists(dbname));

    new sqlite(dbname, function(err, dbConnection) {
        if (err) {
            console.log(err);
        }
        db = dbConnection;
        db.resultType(sqlite.RESULTSASARRAY);
        db.valueType(sqlite.VALUESARENATIVE);
    });

    db.all('select * from favourites', function(err, resultSet) {
        console.log("Result set is:", resultSet);
    });
}

function goBack(args) {
    let topmost = frameModule.topmost();
    topmost.goBack();
}

exports.pageLoaded = pageLoaded;
exports.goBack = goBack;
