'use strict';

let application = require("application");
let Everlive = require("./everlive-sdk/everlive.all.min");

global.everlive = null;

application.on(application.launchEvent, function (args) {
	global.everlive = new Everlive({
	    appId: 'hxt7xps6k1h29bpf'
	});


    if (args.android) {
        // For Android applications, args.android is an android.content.Intent class.
        //console.log("Launched Android application with the following intent: " + args.android + ".");
    } else if (args.ios !== undefined) {
        // For iOS applications, args.ios is NSDictionary (launchOptions).
        //console.log("Launched iOS application with options: " + args.ios);
    }
});

application.start({ moduleName: "./views/home/home" });
