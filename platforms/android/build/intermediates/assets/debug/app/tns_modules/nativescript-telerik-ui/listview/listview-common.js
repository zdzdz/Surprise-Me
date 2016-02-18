var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var viewModule = require("ui/core/view");
var observableArray = require("data/observable-array");
var bindableModule = require("ui/core/bindable");
var dependencyObservable = require("ui/core/dependency-observable");
var proxyModule = require("ui/core/proxy");
var observableModule = require("data/observable");
var weakEvents = require("ui/core/weak-event-listener");
var ListViewScrollDirection;
(function (ListViewScrollDirection) {
    ListViewScrollDirection.Vertical = "Vertical";
    ListViewScrollDirection.Horizontal = "Horizontal";
})(ListViewScrollDirection = exports.ListViewScrollDirection || (exports.ListViewScrollDirection = {}));
var ListViewItemAlignment;
(function (ListViewItemAlignment) {
    ListViewItemAlignment.Stretch = "Stretch";
    ListViewItemAlignment.Left = "Left";
    ListViewItemAlignment.Center = "Center";
    ListViewItemAlignment.Right = "Right";
})(ListViewItemAlignment = exports.ListViewItemAlignment || (exports.ListViewItemAlignment = {}));
var ListViewItemAnimation;
(function (ListViewItemAnimation) {
    ListViewItemAnimation.Default = "Default";
    ListViewItemAnimation.Fade = "Fade";
    ListViewItemAnimation.Scale = "Scale";
    ListViewItemAnimation.Slide = "Slide";
})(ListViewItemAnimation = exports.ListViewItemAnimation || (exports.ListViewItemAnimation = {}));
var ListViewLoadOnDemandMode;
(function (ListViewLoadOnDemandMode) {
    ListViewLoadOnDemandMode.None = "None";
    ListViewLoadOnDemandMode.Manual = "Manual";
    ListViewLoadOnDemandMode.Auto = "Auto";
})(ListViewLoadOnDemandMode = exports.ListViewLoadOnDemandMode || (exports.ListViewLoadOnDemandMode = {}));
;
var ListViewSelectionBehavior;
(function (ListViewSelectionBehavior) {
    ListViewSelectionBehavior.None = "None";
    ListViewSelectionBehavior.Press = "Press";
    ListViewSelectionBehavior.LongPress = "LongPress";
})(ListViewSelectionBehavior = exports.ListViewSelectionBehavior || (exports.ListViewSelectionBehavior = {}));
;
var ListViewLayoutBase = (function (_super) {
    __extends(ListViewLayoutBase, _super);
    function ListViewLayoutBase() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(ListViewLayoutBase.prototype, "android", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListViewLayoutBase.prototype, "ios", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListViewLayoutBase.prototype, "scrollDirection", {
        get: function () {
            return this._getValue(ListViewLayoutBase.scrollDirectionProperty);
        },
        set: function (value) {
            this._setValue(ListViewLayoutBase.scrollDirectionProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    ListViewLayoutBase.onScrollDirectionPropertyChanged = function (data) {
        var lvLayout = data.object;
        lvLayout.onScrollDirectionChanged(data);
    };
    ListViewLayoutBase.prototype.onScrollDirectionChanged = function (data) {
    };
    Object.defineProperty(ListViewLayoutBase.prototype, "itemInsertAnimation", {
        get: function () {
            return this._getValue(ListViewLayoutBase.itemInsertAnimationProperty);
        },
        set: function (value) {
            this._setValue(ListViewLayoutBase.itemInsertAnimationProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    ListViewLayoutBase.onItemInsertAnimationPropertyChanged = function (data) {
        var lvLayout = data.object;
        lvLayout.onItemInsertAnimationChanged(data);
    };
    ListViewLayoutBase.prototype.onItemInsertAnimationChanged = function (data) {
    };
    Object.defineProperty(ListViewLayoutBase.prototype, "itemDeleteAnimation", {
        get: function () {
            return this._getValue(ListViewLayoutBase.itemDeleteAnimationProperty);
        },
        set: function (value) {
            this._setValue(ListViewLayoutBase.itemDeleteAnimationProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    ListViewLayoutBase.onItemDeleteAnimationPropertyChanged = function (data) {
        var lvLayout = data.object;
        lvLayout.onItemDeleteAnimationChanged(data);
    };
    ListViewLayoutBase.prototype.onItemDeleteAnimationChanged = function (data) {
    };
    Object.defineProperty(ListViewLayoutBase.prototype, "itemWidth", {
        get: function () {
            return this._getValue(ListViewLayoutBase.itemWidthProperty);
        },
        set: function (value) {
            this._setValue(ListViewLayoutBase.itemWidthProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    ListViewLayoutBase.onItemWidthPropertyChanged = function (data) {
        var lvLayout = data.object;
        lvLayout.onItemWidthChanged(data);
    };
    ListViewLayoutBase.prototype.onItemWidthChanged = function (data) {
    };
    Object.defineProperty(ListViewLayoutBase.prototype, "itemHeight", {
        get: function () {
            return this._getValue(ListViewLayoutBase.itemHeightProperty);
        },
        set: function (value) {
            this._setValue(ListViewLayoutBase.itemHeightProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    ListViewLayoutBase.onItemHeightPropertyChanged = function (data) {
        var lvLayout = data.object;
        lvLayout.onItemHeightChanged(data);
    };
    ListViewLayoutBase.prototype.onItemHeightChanged = function (data) {
    };
    ListViewLayoutBase.prototype._onOwnerUICreated = function () {
    };
    ListViewLayoutBase.scrollDirectionProperty = new dependencyObservable.Property("scrollDirection", "ListViewLayoutBase", new proxyModule.PropertyMetadata(ListViewScrollDirection.Vertical, dependencyObservable.PropertyMetadataSettings.AffectsLayout, ListViewLayoutBase.onScrollDirectionPropertyChanged));
    ListViewLayoutBase.itemInsertAnimationProperty = new dependencyObservable.Property("itemInsertAnimation", "ListViewLayoutBase", new proxyModule.PropertyMetadata(ListViewItemAnimation.Default, dependencyObservable.PropertyMetadataSettings.AffectsLayout, ListViewLayoutBase.onItemInsertAnimationPropertyChanged));
    ListViewLayoutBase.itemDeleteAnimationProperty = new dependencyObservable.Property("itemDeleteAnimation", "ListViewLayoutBase", new proxyModule.PropertyMetadata(ListViewItemAnimation.Default, dependencyObservable.PropertyMetadataSettings.AffectsLayout, ListViewLayoutBase.onItemDeleteAnimationPropertyChanged));
    ListViewLayoutBase.itemWidthProperty = new dependencyObservable.Property("itemWidth", "ListViewLayoutBase", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, ListViewLayoutBase.onItemWidthPropertyChanged));
    ListViewLayoutBase.itemHeightProperty = new dependencyObservable.Property("itemHeight", "ListViewLayoutBase", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, ListViewLayoutBase.onItemHeightPropertyChanged));
    return ListViewLayoutBase;
})(bindableModule.Bindable);
exports.ListViewLayoutBase = ListViewLayoutBase;
var RadListView = (function (_super) {
    __extends(RadListView, _super);
    function RadListView() {
        _super.call(this);
        this._dataUpdatesSuspended = false;
    }
    Object.defineProperty(RadListView.prototype, "android", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadListView.prototype, "ios", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadListView.prototype, "listViewLayout", {
        get: function () {
            return this._getValue(RadListView.listViewLayoutProperty);
        },
        set: function (value) {
            this._setValue(RadListView.listViewLayoutProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadListView.prototype, "itemTemplate", {
        get: function () {
            return this._getValue(RadListView.itemTemplateProperty);
        },
        set: function (value) {
            this._setValue(RadListView.itemTemplateProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadListView.prototype, "itemSwipeTemplate", {
        get: function () {
            return this._getValue(RadListView.itemSwipeTemplateProperty);
        },
        set: function (value) {
            this._setValue(RadListView.itemSwipeTemplateProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadListView.prototype, "multipleSelection", {
        get: function () {
            return this._getValue(RadListView.multipleSelectionProperty);
        },
        set: function (value) {
            this._setValue(RadListView.multipleSelectionProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadListView.prototype, "cellReorder", {
        get: function () {
            return this._getValue(RadListView.cellReorderProperty);
        },
        set: function (value) {
            this._setValue(RadListView.cellReorderProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadListView.prototype, "swipeCells", {
        get: function () {
            return this._getValue(RadListView.swipeCellsProperty);
        },
        set: function (value) {
            this._setValue(RadListView.swipeCellsProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadListView.prototype, "pullToRefresh", {
        get: function () {
            return this._getValue(RadListView.pullToRefreshProperty);
        },
        set: function (value) {
            this._setValue(RadListView.pullToRefreshProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadListView.prototype, "loadOnDemandMode", {
        get: function () {
            return this._getValue(RadListView.loadOnDemandModeProperty);
        },
        set: function (value) {
            this._setValue(RadListView.loadOnDemandModeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadListView.prototype, "loadOnDemandBufferSize", {
        get: function () {
            return this._getValue(RadListView.loadOnDemandBufferSizeProperty);
        },
        set: function (value) {
            this._setValue(RadListView.loadOnDemandBufferSizeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadListView.prototype, "selectionBehavior", {
        get: function () {
            return this._getValue(RadListView.selectionBehaviorProperty);
        },
        set: function (value) {
            this._setValue(RadListView.selectionBehaviorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadListView.prototype, "items", {
        get: function () {
            return this._getValue(RadListView.itemsProperty);
        },
        set: function (value) {
            this._setValue(RadListView.itemsProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    RadListView.prototype._reorderItemInSource = function (oldPosition, newPosition) {
        this.suspendUpdates();
        var ownerSource = this.items;
        var item = this.getItemAtIndex(oldPosition);
        ownerSource.splice(oldPosition, 1);
        ownerSource.splice(newPosition, 0, item);
        this.resumeUpdates(false);
    };
    RadListView.prototype.suspendUpdates = function () {
        this._dataUpdatesSuspended = true;
    };
    RadListView.prototype.resumeUpdates = function (refresh) {
        this._dataUpdatesSuspended = false;
        if (refresh === true) {
            this.refresh();
        }
    };
    RadListView.prototype.updatesSuspended = function () {
        return this._dataUpdatesSuspended;
    };
    RadListView.prototype.getItemAtIndex = function (index) {
        if (this.items.getItem) {
            return this.items.getItem(index);
        }
        return this.items[index];
    };
    RadListView.prototype.selectItemAt = function (index) {
    };
    RadListView.prototype.deselectItemAt = function (index) {
    };
    RadListView.prototype.selectAll = function () {
    };
    RadListView.prototype.deselectAll = function () {
    };
    RadListView.prototype.isItemSelected = function (item) {
        return false;
    };
    RadListView.prototype.getSelectedItems = function () {
        return new Array();
    };
    RadListView.onLayoutPropertyChanged = function (data) {
        var lv;
        lv = data.object;
        lv.onListViewLayoutChanged(data);
    };
    RadListView.onItemTemplatePropertyChanged = function (data) {
        var lv = data.object;
        lv.onItemTemplateChanged(data);
    };
    RadListView.onItemSwipeTemplatePropertyChanged = function (data) {
        var lv = data.object;
        lv.onItemSwipeTemplateChanged(data);
    };
    RadListView.onMultipleSelectionPropertyChanged = function (data) {
        var lv = data.object;
        lv.onMultipleSelectionChanged(data);
    };
    RadListView.onCellReorderPropertyChanged = function (data) {
        var lv = data.object;
        lv.onCellReorderChanged(data);
    };
    RadListView.onSwipeCellsPropertyChanged = function (data) {
        var lv = data.object;
        lv.onSwipeCellsChanged(data);
    };
    RadListView.onPullToRefreshPropertyChanged = function (data) {
        var lv = data.object;
        lv.onPullToRefreshChanged(data);
    };
    RadListView.onLoadOnDemandModePropertyChanged = function (data) {
        var lv = data.object;
        lv.onLoadOnDemandModeChanged(data);
    };
    RadListView.onLoadOnDemandBufferSizePropertyChanged = function (data) {
        var lv = data.object;
        lv.onLoadOnDemandBufferSizeChanged(data);
    };
    RadListView.onSelectionBehaviorPropertyChanged = function (data) {
        var lv = data.object;
        lv.onSelectionBehaviorChanged(data);
    };
    RadListView.onItemsPropertyChanged = function (data) {
        var listView = data.object;
        listView.onItemsChanged(data);
    };
    RadListView.prototype.onListViewLayoutChanged = function (data) {
    };
    RadListView.prototype.onItemTemplateChanged = function (data) {
    };
    RadListView.prototype.onItemSwipeTemplateChanged = function (data) {
    };
    RadListView.prototype.onMultipleSelectionChanged = function (data) {
    };
    RadListView.prototype.onCellReorderChanged = function (data) {
    };
    RadListView.prototype.onSwipeCellsChanged = function (data) {
    };
    RadListView.prototype.onPullToRefreshChanged = function (data) {
    };
    RadListView.prototype.onLoadOnDemandModeChanged = function (data) {
    };
    RadListView.prototype.onLoadOnDemandBufferSizeChanged = function (data) {
    };
    RadListView.prototype.onSelectionBehaviorChanged = function (data) {
    };
    RadListView.prototype.onSourceCollectionChangedInternal = function (args) {
        if (this._dataUpdatesSuspended === false) {
            this.onSourceCollectionChanged(args);
        }
    };
    RadListView.prototype.onItemsChangedInternal = function (data) {
        if (data.oldValue instanceof observableModule.Observable) {
            weakEvents.removeWeakEventListener(data.oldValue, observableArray.ObservableArray.changeEvent, this.onSourceCollectionChangedInternal, this);
            for (var i = 0; i < this.items.length; i++) {
                var currentItem = this.getItemAtIndex(i);
            }
        }
        if (data.newValue instanceof observableModule.Observable) {
            weakEvents.addWeakEventListener(data.newValue, observableArray.ObservableArray.changeEvent, this.onSourceCollectionChangedInternal, this);
            for (var i = 0; i < this.items.length; i++) {
                var currentItem = this.getItemAtIndex(i);
            }
        }
        this.refresh();
    };
    RadListView.prototype.onItemsChanged = function (data) {
        this.onItemsChangedInternal(data);
    };
    RadListView.prototype.onSourceCollectionChanged = function (data) {
        this.refresh();
    };
    RadListView.prototype.refresh = function () {
    };
    RadListView.prototype.scrollToIndex = function (index) {
    };
    RadListView.prototype.notifyLoadOnDemandFinished = function () {
    };
    RadListView.prototype.notifyPullToRefreshFinished = function () {
    };
    RadListView.prototype.notifySwipeToExecuteFinished = function () {
    };
    RadListView.itemSelectingEvent = "itemSelecting";
    RadListView.itemDeselectingEvent = "itemDeselecting";
    RadListView.itemTapEvent = "itemTap";
    RadListView.itemHoldEvent = "itemHold";
    RadListView.itemSelectedEvent = "itemSelected";
    RadListView.itemDeselectedEvent = "itemDeselected";
    RadListView.itemReorderedEvent = "itemReordered";
    RadListView.itemReorderStartedEvent = "itemReorderStarted";
    RadListView.itemSwipingEvent = "itemSwiping";
    RadListView.itemSwipeProgressChangedEvent = "itemSwipeProgressChanged";
    RadListView.itemSwipeProgressStartedEvent = "itemSwipeProgressStarted";
    RadListView.itemSwipeProgressEndedEvent = "itemSwipeProgressEnded";
    RadListView.loadMoreDataRequestedEvent = "loadMoreDataRequested";
    RadListView.pullToRefreshInitiatedEvent = "pullToRefreshInitiated";
    RadListView.listViewLayoutProperty = new dependencyObservable.Property("listViewLayout", "RadListView", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, RadListView.onLayoutPropertyChanged));
    RadListView.itemTemplateProperty = new dependencyObservable.Property("itemTemplate", "RadListView", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, RadListView.onItemTemplatePropertyChanged));
    RadListView.itemSwipeTemplateProperty = new dependencyObservable.Property("itemSwipeTemplate", "RadListView", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, RadListView.onItemSwipeTemplatePropertyChanged));
    RadListView.multipleSelectionProperty = new dependencyObservable.Property("multipleSelection", "RadListView", new proxyModule.PropertyMetadata(false, dependencyObservable.PropertyMetadataSettings.None, RadListView.onMultipleSelectionPropertyChanged));
    RadListView.cellReorderProperty = new dependencyObservable.Property("cellReorder", "RadListView", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, RadListView.onCellReorderPropertyChanged));
    RadListView.swipeCellsProperty = new dependencyObservable.Property("swipeCells", "RadListView", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, RadListView.onSwipeCellsPropertyChanged));
    RadListView.pullToRefreshProperty = new dependencyObservable.Property("pullToRefresh", "RadListView", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, RadListView.onPullToRefreshPropertyChanged));
    RadListView.loadOnDemandModeProperty = new dependencyObservable.Property("loadOnDemandMode", "RadListView", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, RadListView.onLoadOnDemandModePropertyChanged));
    RadListView.loadOnDemandBufferSizeProperty = new dependencyObservable.Property("loadOnDemandBufferSize", "RadListView", new proxyModule.PropertyMetadata(5, dependencyObservable.PropertyMetadataSettings.None, RadListView.onLoadOnDemandBufferSizePropertyChanged));
    RadListView.selectionBehaviorProperty = new dependencyObservable.Property("selectionBehavior", "RadListView", new proxyModule.PropertyMetadata(ListViewSelectionBehavior.None, dependencyObservable.PropertyMetadataSettings.None, RadListView.onSelectionBehaviorPropertyChanged));
    RadListView.itemsProperty = new dependencyObservable.Property("items", "RadListView", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, RadListView.onItemsPropertyChanged));
    return RadListView;
})(viewModule.View);
exports.RadListView = RadListView;
