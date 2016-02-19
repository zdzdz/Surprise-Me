'use strict';

let observable = require("data/observable");
let frameModule = require("ui/frame");
let drawerModule = require("nativescript-telerik-ui/sidedrawer");

// let HomeViewModel = (function (_super) {
//     __extends(HomeViewModel, _super);
//     function HomeViewModel() {
//         _super.call(this);
//         this.set("mainContentText", "Test");
//         }
    
//     HomeViewModel.prototype.setDrawerTransition = function (transition) {
//         let drawer = frameModule.topmost().getViewById("sideDrawer");
//         drawer.closeDrawer();
//         drawer.drawerTransition = transition;
//     };

//     HomeViewModel.prototype.onScaleDownPusherTransitionTap = function (args) {
//         let drawer = frameModule.topmost().getViewById("sideDrawer");
//         this.setDrawerTransition(new drawerModule.ScaleDownPusherTransition());
//         drawer.showDrawer();
//     };
    
//     return HomeViewModel;
// })(observable.Observable);

class HomeViewModel extends observable.Observable {
    constructor(){
        super();
    }

    setDrawerTransition(transition){
        let drawer = frameModule.topmost().getViewById("sideDrawer");
        drawer.closeDrawer();
        drawer.drawerTransition = transition;
    }

    onScaleDownPusherTransitionTap(args){
        let drawer = frameModule.topmost().getViewById("sideDrawer");
        this.setDrawerTransition(new drawerModule.ScaleDownPusherTransition());
        drawer.showDrawer();
    }
}

exports.HomeViewModel = HomeViewModel;
exports.homeViewModel = new HomeViewModel();
