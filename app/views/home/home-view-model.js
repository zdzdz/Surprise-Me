var observable = require("data/observable");
var HomeViewModel = (function (_super) {
    __extends(HomeViewModel, _super);
    function HomeViewModel() {
        _super.call(this);
        this.set("mainContentText", "SideDrawer for NativeScript can be easily setup in the XML definition of your page by defining main- and drawer-content. The component has a default transition and position and also exposes notifications related to changes in its state.");
    }
    
    return HomeViewModel;
})(observable.Observable);

exports.HomeViewModel = HomeViewModel;
exports.homeViewModel = new HomeViewModel();
