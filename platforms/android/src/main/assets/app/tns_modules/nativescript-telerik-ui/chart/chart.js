var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var commonModule = require("./chart-common");
var colorModule = require("color");
var utilsModule = require("utils/utils");
require("utils/module-merge").merge(commonModule, exports);
var RadPieChart = (function (_super) {
    __extends(RadPieChart, _super);
    function RadPieChart() {
        _super.call(this);
    }
    Object.defineProperty(RadPieChart.prototype, "android", {
        get: function () {
            return this._rootLayout;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadPieChart.prototype, "androidView", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadPieChart.prototype, "rootLayout", {
        get: function () {
            return this._rootLayout;
        },
        enumerable: true,
        configurable: true
    });
    RadPieChart.prototype._createUI = function () {
        this._android = new com.telerik.widget.chart.visualization.pieChart.RadPieChartView(this._context);
        this._rootLayout = new android.widget.RelativeLayout(this._context);
        var lParams = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT);
        this._rootLayout.setLayoutParams(lParams);
        this._rootLayout.addView(this._android);
        if (this.legend) {
            this.legend.updateLegendView(this);
        }
        this.initializer.loadSeries(this);
        this.updateSelectionBehavior();
    };
    RadPieChart.prototype._clearAndroidReference = function () {
        this.detachSeries();
        if (this._selectionBehavior) {
            this._android.getBehaviors().remove(this._selectionBehavior);
            this._selectionBehavior = null;
        }
        _super.prototype._clearAndroidReference.call(this);
    };
    RadPieChart.prototype._onDetach = function (force) {
        this.detachSeries();
        _super.prototype._onDetach.call(this, force);
    };
    RadPieChart.prototype.detachSeries = function () {
        var thisAndroid = this._android;
        if (thisAndroid) {
            this._rootLayout = undefined;
            for (var i = 0; i < this.series.length; i++) {
                if (thisAndroid.getSeries().indexOf(this.series[i].android) !== -1) {
                    thisAndroid.getSeries().remove(this.series[i].android);
                }
            }
        }
    };
    //NOTE: Android pie chart supports only DataPoint selection mode
    RadPieChart.prototype.updateSelectionBehavior = function () {
        if (!this._android) {
            return;
        }
        var i = 0;
        var bSelectDataPoint = false;
        var bSelectSeries = false;
        while ((i < this.series.length) && !bSelectDataPoint) {
            if (this.series[i].selectionMode) {
                bSelectDataPoint = (this.series[i].selectionMode === commonModule.SeriesSelectionMode.DataPoint);
                bSelectSeries = bSelectSeries || (this.series[i].selectionMode === commonModule.SeriesSelectionMode.Series);
            }
            i++;
        }
        var bChartSelectionModeMultiple = false;
        if (this.selectionMode) {
            bChartSelectionModeMultiple = (this.selectionMode === commonModule.ChartSelectionMode.Multiple);
        }
        if (bSelectDataPoint || bSelectSeries) {
            if (!this._selectionBehavior) {
                this._selectionBehavior = new com.telerik.widget.chart.visualization.behaviors.ChartSelectionBehavior();
                var that = new WeakRef(this);
                this._selectionBehavior.setSelectionChangeListener(new com.telerik.widget.chart.visualization.behaviors.ChartSelectionChangeListener({
                    onSelectionChanged: function (selectionContext) {
                        if (selectionContext.selectedSeries()) {
                            var args = { eventName: commonModule.RadChartBase.seriesSelectedEvent, object: that.get(), series: this.get().series, pointIndex: null, pointData: null };
                            that.get().notify(args);
                        }
                        if (selectionContext.deselectedSeries()) {
                            var args = { eventName: commonModule.RadChartBase.seriesDeselectedEvent, object: that.get(), series: this.get().series, pointIndex: null, pointData: null };
                            that.get().notify(args);
                        }
                        if (selectionContext.selectedDataPoint()) {
                            var args = { eventName: commonModule.RadChartBase.pointSelectedEvent, object: that.get(), series: that.get().series, pointIndex: selectionContext.selectedDataPoint().index(), pointData: selectionContext.selectedDataPoint() };
                            that.get().notify(args);
                        }
                        if (selectionContext.deselectedDataPoint()) {
                            var args = { eventName: commonModule.RadChartBase.pointDeselectedEvent, object: that.get(), series: that.get().series, pointIndex: selectionContext.deselectedDataPoint().index(), pointData: selectionContext.deselectedDataPoint() };
                            that.get().notify(args);
                        }
                    }
                }));
            }
            this._selectionBehavior.setDataPointsSelectionMode(bChartSelectionModeMultiple ?
                com.telerik.widget.chart.visualization.behaviors.ChartSelectionMode.MULTIPLE :
                com.telerik.widget.chart.visualization.behaviors.ChartSelectionMode.SINGLE);
            this._selectionBehavior.setSeriesSelectionMode(com.telerik.widget.chart.visualization.behaviors.ChartSelectionMode.NONE);
            this._android.getBehaviors().add(this._selectionBehavior);
        }
        else if (this._selectionBehavior) {
            this._android.getBehaviors().remove(this._selectionBehavior);
            this._selectionBehavior = null;
        }
    };
    return RadPieChart;
})(commonModule.RadPieChart);
exports.RadPieChart = RadPieChart;
var RadLegendView = (function (_super) {
    __extends(RadLegendView, _super);
    function RadLegendView() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(RadLegendView.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    RadLegendView.prototype.updateLegendView = function (chartView) {
        if (!chartView._context) {
            return;
        }
        if (!this._android) {
            this._android = new com.telerik.widget.primitives.legend.RadLegendView(chartView._context);
        }
        this._android.setLegendProvider(chartView.androidView);
        if (chartView.rootLayout.indexOfChild(this._android) !== -1) {
            chartView.rootLayout.removeView(this._android);
        }
        var lParams = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
        var cParams = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
        chartView.androidView.setId(1);
        this._android.setId(2);
        switch (this.position) {
            case commonModule.ChartLegendPosition.Left:
                if (isNaN(+this.width)) {
                    console.log("WARNING: Width property is required if legend position is set to left.");
                }
                lParams.width = this.width * utilsModule.layout.getDisplayDensity();
                lParams.height = (!isNaN(this.height) ? this.height * utilsModule.layout.getDisplayDensity() : android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                lParams.addRule(android.widget.RelativeLayout.ALIGN_PARENT_LEFT);
                lParams.addRule(android.widget.RelativeLayout.CENTER_VERTICAL);
                cParams.width = android.widget.RelativeLayout.LayoutParams.FILL_PARENT;
                cParams.height = android.widget.RelativeLayout.LayoutParams.FILL_PARENT;
                cParams.addRule(android.widget.RelativeLayout.RIGHT_OF, this._android.getId());
                cParams.addRule(android.widget.RelativeLayout.ALIGN_PARENT_RIGHT);
                break;
            case commonModule.ChartLegendPosition.Right:
                if (isNaN(+this.width)) {
                    console.log("WARNING: Width property is required if legend position is set to right.");
                }
                lParams.width = this.width * utilsModule.layout.getDisplayDensity();
                lParams.height = (!isNaN(this.height) ? this.height * utilsModule.layout.getDisplayDensity() : android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                lParams.addRule(android.widget.RelativeLayout.ALIGN_PARENT_RIGHT, this._android.getId());
                lParams.addRule(android.widget.RelativeLayout.CENTER_VERTICAL);
                cParams.width = android.widget.RelativeLayout.LayoutParams.FILL_PARENT;
                cParams.height = android.widget.RelativeLayout.LayoutParams.FILL_PARENT;
                cParams.addRule(android.widget.RelativeLayout.LEFT_OF, this._android.getId());
                cParams.addRule(android.widget.RelativeLayout.ALIGN_PARENT_LEFT);
                break;
            case commonModule.ChartLegendPosition.Top:
                lParams.width = android.widget.RelativeLayout.LayoutParams.MATCH_PARENT;
                lParams.height = (!isNaN(this.height) ? this.height * utilsModule.layout.getDisplayDensity() : android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                lParams.addRule(android.widget.RelativeLayout.ALIGN_PARENT_TOP);
                cParams.addRule(android.widget.RelativeLayout.BELOW, this._android.getId());
                break;
            case commonModule.ChartLegendPosition.Bottom:
                lParams.width = android.widget.RelativeLayout.LayoutParams.MATCH_PARENT;
                lParams.height = (!isNaN(this.height) ? this.height * utilsModule.layout.getDisplayDensity() : android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                lParams.addRule(android.widget.RelativeLayout.ALIGN_PARENT_BOTTOM);
                cParams.addRule(android.widget.RelativeLayout.ABOVE, this._android.getId());
                break;
        }
        chartView.androidView.setLayoutParams(cParams);
        this._android.setLayoutParams(lParams);
        chartView.rootLayout.addView(this._android, 1);
    };
    RadLegendView.prototype.onTitleChanged = function (data) {
        console.log("WARNING: Android chart legend doesn't support 'title' property.");
    };
    return RadLegendView;
})(commonModule.RadLegendView);
exports.RadLegendView = RadLegendView;
var RadCartesianChart = (function (_super) {
    __extends(RadCartesianChart, _super);
    function RadCartesianChart() {
        _super.call(this);
    }
    Object.defineProperty(RadCartesianChart.prototype, "android", {
        get: function () {
            return this._rootLayout;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadCartesianChart.prototype, "androidView", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadCartesianChart.prototype, "rootLayout", {
        get: function () {
            return this._rootLayout;
        },
        enumerable: true,
        configurable: true
    });
    RadCartesianChart.prototype._createUI = function () {
        this._android = new com.telerik.widget.chart.visualization.cartesianChart.RadCartesianChartView(this._context);
        this._rootLayout = new android.widget.RelativeLayout(this._context);
        var lParams = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
        this._rootLayout.setLayoutParams(lParams);
        this._rootLayout.addView(this._android);
        if (this.grid) {
            this._android.setGrid(null);
            this._android.setGrid(this.grid.android);
        }
        if (this.horizontalAxis) {
            this._android.setHorizontalAxis(null);
            this._android.setHorizontalAxis(this.horizontalAxis.android);
            this.initializer.updateHorizontalAxisPalette(this);
        }
        if (this.verticalAxis) {
            this._android.setVerticalAxis(null);
            this._android.setVerticalAxis(this.verticalAxis.android);
            this.initializer.updateVerticalAxisPalette(this);
        }
        if (this.series) {
            this.initializer.loadSeries(this);
        }
        if (this.legend) {
            this.legend.updateLegendView(this);
        }
        if (this.annotations) {
            for (var i = 0; i < this.annotations.length; i++) {
                this.annotations[i]._onOwnerUICreated();
            }
            this.initializer.loadAnnotations(this);
        }
        if (this.horizontalZoom || this.verticalZoom) {
            this._android.setZoom(this.horizontalZoom ? this.horizontalZoom : 1, this.verticalZoom ? this.verticalZoom : 1);
        }
        this.updatePanZoomBehavior();
        this.updateSelectionBehavior();
    };
    //todo: consider this method to be moved in common module
    RadCartesianChart.prototype.getAxixByID = function (axisID) {
        if (this.horizontalAxis && this.horizontalAxis.id === axisID) {
            return this.horizontalAxis;
        }
        if (this.verticalAxis && this.verticalAxis.id === axisID) {
            return this.verticalAxis;
        }
        if (this.series) {
            var axis;
            for (var i = 0; i < this.series.length; ++i) {
                axis = this.series[i].horizontalAxis;
                if (axis && axis.id === axisID) {
                    return axis;
                }
                axis = this.series[i].verticalAxis;
                if (axis && axis.id === axisID) {
                    return axis;
                }
            }
        }
        return null;
    };
    RadCartesianChart.prototype._onDetach = function (force) {
        this.detachSeries();
        _super.prototype._onDetach.call(this, force);
    };
    RadCartesianChart.prototype._clearAndroidReference = function () {
        this.detachSeries();
        if (this._panZoomBehavior) {
            this._android.getBehaviors().remove(this._panZoomBehavior);
            this._panZoomBehavior = undefined;
        }
        if (this._selectionBehavior) {
            this._android.getBehaviors().remove(this._selectionBehavior);
            this._selectionBehavior = null;
        }
        _super.prototype._clearAndroidReference.call(this);
    };
    RadCartesianChart.prototype.detachSeries = function () {
        var thisAndroid = this._android;
        if (thisAndroid) {
            this._rootLayout = undefined;
            for (var i = 0; i < this.series.length; i++) {
                if (thisAndroid.getSeries().indexOf(this.series[i].android) !== -1) {
                    thisAndroid.getSeries().remove(this.series[i].android);
                }
            }
            thisAndroid.setHorizontalAxis(undefined);
            thisAndroid.setVerticalAxis(undefined);
            thisAndroid.setGrid(undefined);
        }
    };
    //get allowZoom/allowPan from axes and init the chart behavior
    RadCartesianChart.prototype.updatePanZoomBehavior = function () {
        if (!this._android) {
            return;
        }
        var zoomHorizontal = false;
        var zoomVertical = false;
        var panHorizontal = false;
        var panVertical = false;
        var i = 0;
        while ((i < this.series.length) && !(panHorizontal && panVertical && zoomHorizontal && zoomVertical)) {
            if (this.series[i].horizontalAxis) {
                panHorizontal = panHorizontal || this.series[i].horizontalAxis.allowPan;
                zoomHorizontal = zoomHorizontal || this.series[i].horizontalAxis.allowZoom;
            }
            if (this.series[i].verticalAxis) {
                panVertical = panVertical || this.series[i].verticalAxis.allowPan;
                zoomVertical = zoomVertical || this.series[i].verticalAxis.allowZoom;
            }
            i++;
        }
        if (this.horizontalAxis) {
            panHorizontal = panHorizontal || this.horizontalAxis.allowPan;
            zoomHorizontal = zoomHorizontal || this.horizontalAxis.allowZoom;
        }
        if (this.verticalAxis) {
            panVertical = panVertical || this.verticalAxis.allowPan;
            zoomVertical = zoomVertical || this.verticalAxis.allowZoom;
        }
        if (panHorizontal || panVertical || zoomHorizontal || zoomVertical) {
            if (!this._panZoomBehavior) {
                this._panZoomBehavior = new com.telerik.widget.chart.visualization.behaviors.ChartPanAndZoomBehavior();
                var that = new WeakRef(this);
                this._panZoomBehavior.addPanZoomListener(new com.telerik.widget.chart.visualization.behaviors.PanZoomListener({
                    onPan: function (panX, panY) {
                        var args = { eventName: commonModule.RadChartBase.chartPannedEvent, object: that.get(), pointData: null, pointIndex: null, series: null };
                        that.get().notify(args);
                    },
                    onZoom: function (zoomX, zoomY) {
                        var args = { eventName: commonModule.RadChartBase.chartZoomedEvent, object: that.get(), pointData: null, pointIndex: null, series: null };
                        that.get().notify(args);
                    }
                }));
            }
            if (panHorizontal || panVertical) {
                var panMode = com.telerik.widget.chart.visualization.behaviors.ChartPanZoomMode.NONE;
                if (panHorizontal && panVertical) {
                    panMode = com.telerik.widget.chart.visualization.behaviors.ChartPanZoomMode.BOTH;
                }
                else {
                    panMode = panHorizontal ? com.telerik.widget.chart.visualization.behaviors.ChartPanZoomMode.HORIZONTAL : com.telerik.widget.chart.visualization.behaviors.ChartPanZoomMode.VERTICAL;
                }
                this._panZoomBehavior.setPanMode(panMode);
            }
            if (zoomHorizontal || zoomVertical) {
                var zoomMode = com.telerik.widget.chart.visualization.behaviors.ChartPanZoomMode.NONE;
                if (zoomHorizontal && zoomVertical) {
                    zoomMode = com.telerik.widget.chart.visualization.behaviors.ChartPanZoomMode.BOTH;
                }
                else {
                    zoomMode = zoomHorizontal ? com.telerik.widget.chart.visualization.behaviors.ChartPanZoomMode.HORIZONTAL : com.telerik.widget.chart.visualization.behaviors.ChartPanZoomMode.VERTICAL;
                }
                this._panZoomBehavior.setZoomMode(zoomMode);
            }
            this._android.getBehaviors().add(this._panZoomBehavior);
        }
        else {
            if (this._panZoomBehavior) {
                this._android.getBehaviors().remove(this._panZoomBehavior);
                this._panZoomBehavior = null;
            }
        }
    };
    //NOTE: Android chart cannot allow data point selection for some series combinded with whole series selection for the rest
    RadCartesianChart.prototype.updateSelectionBehavior = function () {
        if (!this._android) {
            return;
        }
        //if any series has selection mode "DataPoint", then the selection mode for he whole chart will be DataPoint (see the note above)
        var i = 0;
        var bSelectDataPoint = false;
        var bSelectSeries = false;
        while ((i < this.series.length) && !bSelectDataPoint) {
            if (this.series[i].selectionMode) {
                bSelectDataPoint = (this.series[i].selectionMode === commonModule.SeriesSelectionMode.DataPoint);
                bSelectSeries = bSelectSeries || (this.series[i].selectionMode === commonModule.SeriesSelectionMode.Series);
            }
            i++;
        }
        var bChartSelectionModeMultiple = false;
        if (this.selectionMode) {
            bChartSelectionModeMultiple = (this.selectionMode === commonModule.ChartSelectionMode.Multiple);
        }
        if (bSelectDataPoint || bSelectSeries) {
            if (!this._selectionBehavior) {
                this._selectionBehavior = new com.telerik.widget.chart.visualization.behaviors.ChartSelectionBehavior();
                var that = new WeakRef(this);
                this._selectionBehavior.setSelectionChangeListener(new com.telerik.widget.chart.visualization.behaviors.ChartSelectionChangeListener({
                    onSelectionChanged: function (selectionContext) {
                        if (selectionContext.selectedSeries()) {
                            var args = { eventName: commonModule.RadChartBase.seriesSelectedEvent,
                                object: that.get(),
                                series: that.get().series[selectionContext.selectedSeries().getCollectionIndex()],
                                pointIndex: null,
                                pointData: null };
                            that.get().notify(args);
                        }
                        if (selectionContext.deselectedSeries()) {
                            var args = { eventName: commonModule.RadChartBase.seriesDeselectedEvent,
                                object: that.get(),
                                series: that.get().series[selectionContext.deselectedSeries().getCollectionIndex()],
                                pointIndex: null,
                                pointData: null };
                            that.get().notify(args);
                        }
                        if (selectionContext.selectedDataPoint()) {
                            var args = { eventName: commonModule.RadChartBase.pointSelectedEvent,
                                object: that.get(),
                                series: null,
                                pointIndex: selectionContext.selectedDataPoint().index(),
                                pointData: selectionContext.selectedDataPoint() }; //NOTE: we don't have wrapper for DataPoint, so we return native object
                            that.get().notify(args);
                        }
                        if (selectionContext.deselectedDataPoint()) {
                            var args = { eventName: commonModule.RadChartBase.pointDeselectedEvent,
                                object: that.get(),
                                series: null,
                                pointIndex: selectionContext.deselectedDataPoint().index(),
                                pointData: selectionContext.deselectedDataPoint() }; //NOTE: we don't have wrapper for DataPoint, so we return native object
                            that.get().notify(args);
                        }
                    }
                }));
            }
            if (bSelectDataPoint) {
                this._selectionBehavior.setDataPointsSelectionMode(bChartSelectionModeMultiple ?
                    com.telerik.widget.chart.visualization.behaviors.ChartSelectionMode.MULTIPLE :
                    com.telerik.widget.chart.visualization.behaviors.ChartSelectionMode.SINGLE);
                this._selectionBehavior.setSeriesSelectionMode(com.telerik.widget.chart.visualization.behaviors.ChartSelectionMode.NONE);
            }
            else if (bSelectSeries || this.selectionMode) {
                this._selectionBehavior.setSeriesSelectionMode(bChartSelectionModeMultiple ?
                    com.telerik.widget.chart.visualization.behaviors.ChartSelectionMode.MULTIPLE :
                    com.telerik.widget.chart.visualization.behaviors.ChartSelectionMode.SINGLE);
                this._selectionBehavior.setDataPointsSelectionMode(com.telerik.widget.chart.visualization.behaviors.ChartSelectionMode.NONE);
            }
            this._android.getBehaviors().add(this._selectionBehavior);
        }
        else if (this._selectionBehavior) {
            this._android.getBehaviors().remove(this._selectionBehavior);
            this._selectionBehavior = null;
        }
    };
    RadCartesianChart.prototype.onHorizontalAxisChanged = function (data) {
        _super.prototype.onHorizontalAxisChanged.call(this, data);
        if (this._android) {
            this._android.setHorizontalAxis(null);
            this._android.setHorizontalAxis(data.newValue.android);
        }
    };
    RadCartesianChart.prototype.onVerticalAxisChanged = function (data) {
        _super.prototype.onVerticalAxisChanged.call(this, data);
        if (this._android) {
            this._android.setVerticalAxis(null);
            this._android.setVerticalAxis(data.newValue.android);
        }
    };
    RadCartesianChart.prototype.onGridChanged = function (data) {
        if (this._android && data.newValue) {
            this._android.setGrid(null);
            this._android.setGrid(data.newValue.android);
        }
    };
    RadCartesianChart.prototype.onAnnotationsChanged = function (data) {
        if (data.newValue) {
            var newArray = data.newValue;
            for (var _i = 0; _i < newArray.length; _i++) {
                var obj = newArray[_i];
                obj._init(this);
            }
        }
    };
    RadCartesianChart.prototype.onHorizontalZoomChanged = function (data) {
        if (!this._android) {
            return;
        }
        if (!isNaN(+data.newValue) && data.newValue > 1) {
            this._android.setZoom(data.newValue, this.verticalZoom ? this.verticalZoom : 1);
        }
        else {
            console.log("WARNING: Vertical zoom must be a number greater or equal to 1");
        }
    };
    RadCartesianChart.prototype.onVerticalZoomChanged = function (data) {
        if (!this._android) {
            return;
        }
        if (!isNaN(+data.newValue) && data.newValue > 1) {
            this._android.setZoom(this.horizontalZoom ? this.horizontalZoom : 1, data.newValue);
        }
        else {
            console.log("WARNING: Vertical zoom must be a number greater or equal to 1");
        }
    };
    return RadCartesianChart;
})(commonModule.RadCartesianChart);
exports.RadCartesianChart = RadCartesianChart;
var CategoricalAxis = (function (_super) {
    __extends(CategoricalAxis, _super);
    function CategoricalAxis() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(CategoricalAxis.prototype, "android", {
        get: function () {
            if (!this._android) {
                this._android = new com.telerik.widget.chart.visualization.cartesianChart.axes.CategoricalAxis();
                this._android.setCanApplyPalette(false);
            }
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    return CategoricalAxis;
})(commonModule.CategoricalAxis);
exports.CategoricalAxis = CategoricalAxis;
var DateTimeContinuousAxis = (function (_super) {
    __extends(DateTimeContinuousAxis, _super);
    function DateTimeContinuousAxis() {
        _super.call(this);
    }
    Object.defineProperty(DateTimeContinuousAxis.prototype, "android", {
        get: function () {
            if (!this._android) {
                this._android = new com.telerik.widget.chart.visualization.cartesianChart.axes.DateTimeContinuousAxis();
                this._android.setPlotMode(com.telerik.widget.chart.engine.axes.common.AxisPlotMode.BETWEEN_TICKS);
            }
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    DateTimeContinuousAxis.prototype.onPlotModeChanged = function (data) {
        var newValue = data.newValue;
        if (newValue === commonModule.AxisPlotMode.BetweenTicks) {
            this._android.setPlotMode(com.telerik.widget.chart.engine.axes.common.AxisPlotMode.BETWEEN_TICKS);
        }
        else if (newValue === commonModule.AxisPlotMode.OnTicks) {
            this._android.setPlotMode(com.telerik.widget.chart.engine.axes.common.AxisPlotMode.ON_TICKS);
        }
    };
    DateTimeContinuousAxis.prototype.onMinimumChanged = function (data) {
        if (data.newValue === undefined) {
            this.android.setMinimum(undefined);
            return;
        }
        var newMinimum = data.newValue;
        var parsedDate = Date.parse(newMinimum);
        var nativeValue = java.util.Calendar.getInstance();
        nativeValue.setTimeInMillis(parsedDate);
        this.android.setMinimum(nativeValue);
    };
    DateTimeContinuousAxis.prototype.onMaximumChanged = function (data) {
        if (data.newValue === undefined) {
            this.android.setMaximum(undefined);
            return;
        }
        var newMaximum = data.newValue;
        var parsedDate = Date.parse(newMaximum);
        var nativeValue = java.util.Calendar.getInstance();
        nativeValue.setTimeInMillis(parsedDate);
        this.android.setMaximum(nativeValue);
    };
    DateTimeContinuousAxis.prototype.onMajorStepChanged = function (data) {
    };
    return DateTimeContinuousAxis;
})(commonModule.DateTimeContinuousAxis);
exports.DateTimeContinuousAxis = DateTimeContinuousAxis;
var DateTimeCategoricalAxis = (function (_super) {
    __extends(DateTimeCategoricalAxis, _super);
    function DateTimeCategoricalAxis() {
        _super.call(this);
    }
    Object.defineProperty(DateTimeCategoricalAxis.prototype, "android", {
        get: function () {
            if (!this._android) {
                this._android = new com.telerik.widget.chart.visualization.cartesianChart.axes.DateTimeCategoricalAxis();
                this._android.setCanApplyPalette(false);
            }
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    DateTimeCategoricalAxis.prototype.onDateTimeComponentChanged = function (data) {
        if (data.newValue) {
            switch (data.newValue) {
                case commonModule.DateTimeComponent.Second:
                    this.android.setDateTimeComponent(com.telerik.widget.chart.engine.axes.common.DateTimeComponent.SECOND);
                    break;
                case commonModule.DateTimeComponent.Minute:
                    this.android.setDateTimeComponent(com.telerik.widget.chart.engine.axes.common.DateTimeComponent.MINUTE);
                    break;
                case commonModule.DateTimeComponent.Hour:
                    this.android.setDateTimeComponent(com.telerik.widget.chart.engine.axes.common.DateTimeComponent.HOUR);
                    break;
                case commonModule.DateTimeComponent.Day:
                    this.android.setDateTimeComponent(com.telerik.widget.chart.engine.axes.common.DateTimeComponent.DAY);
                    break;
                case commonModule.DateTimeComponent.Week:
                    this.android.setDateTimeComponent(com.telerik.widget.chart.engine.axes.common.DateTimeComponent.WEEK);
                    break;
                case commonModule.DateTimeComponent.Month:
                    this.android.setDateTimeComponent(com.telerik.widget.chart.engine.axes.common.DateTimeComponent.MONTH);
                    break;
                case commonModule.DateTimeComponent.Year:
                    this.android.setDateTimeComponent(com.telerik.widget.chart.engine.axes.common.DateTimeComponent.YEAR);
                    break;
            }
        }
    };
    return DateTimeCategoricalAxis;
})(commonModule.DateTimeCategoricalAxis);
exports.DateTimeCategoricalAxis = DateTimeCategoricalAxis;
var LinearAxis = (function (_super) {
    __extends(LinearAxis, _super);
    function LinearAxis() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(LinearAxis.prototype, "android", {
        get: function () {
            if (!this._android) {
                this._android = new com.telerik.widget.chart.visualization.cartesianChart.axes.LinearAxis();
                this._android.setCanApplyPalette(false);
            }
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    LinearAxis.prototype.onMajorStepChanged = function (data) {
        if (data.newValue) {
            this.android.setMajorStep(data.newValue);
        }
    };
    LinearAxis.prototype.onMinimumChanged = function (data) {
        if (!isNaN(+data.newValue)) {
            this.android.setMinimum(data.newValue);
        }
    };
    LinearAxis.prototype.onMaximumChanged = function (data) {
        if (!isNaN(+data.newValue)) {
            this.android.setMaximum(data.newValue);
        }
    };
    return LinearAxis;
})(commonModule.LinearAxis);
exports.LinearAxis = LinearAxis;
var PieSeries = (function (_super) {
    __extends(PieSeries, _super);
    function PieSeries() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(PieSeries.prototype, "android", {
        get: function () {
            if (!this._android) {
                this._android = new com.telerik.widget.chart.visualization.pieChart.PieSeries();
            }
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    return PieSeries;
})(commonModule.PieSeries);
exports.PieSeries = PieSeries;
var DonutSeries = (function (_super) {
    __extends(DonutSeries, _super);
    function DonutSeries() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(DonutSeries.prototype, "android", {
        get: function () {
            if (!this._android) {
                this._android = new com.telerik.widget.chart.visualization.pieChart.DoughnutSeries();
            }
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    return DonutSeries;
})(commonModule.DonutSeries);
exports.DonutSeries = DonutSeries;
var LineSeries = (function (_super) {
    __extends(LineSeries, _super);
    function LineSeries() {
        _super.call(this);
    }
    Object.defineProperty(LineSeries.prototype, "android", {
        get: function () {
            if (!this._android) {
                this._android = new com.telerik.widget.chart.visualization.cartesianChart.series.categorical.LineSeries();
            }
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    return LineSeries;
})(commonModule.CategoricalSeries);
exports.LineSeries = LineSeries;
var OhlcSeries = (function (_super) {
    __extends(OhlcSeries, _super);
    function OhlcSeries() {
        _super.call(this);
    }
    Object.defineProperty(OhlcSeries.prototype, "android", {
        get: function () {
            if (!this._android) {
                this._android = new com.telerik.widget.chart.visualization.cartesianChart.series.categorical.OhlcSeries();
            }
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    OhlcSeries.prototype.onValuePropertyChanged = function (data) {
    };
    OhlcSeries.prototype.onHighPropertyNameChanged = function (data) {
        if (!data.newValue) {
            return;
        }
        var highPropertyName = this.highPropertyName;
        var binding = new com.telerik.widget.chart.engine.databinding.GenericDataPointBinding(new com.telerik.android.common.Function({
            apply: function (arg) {
                var item = JSON.parse(arg);
                return item[highPropertyName];
            }
        }));
        this.android.setHighBinding(binding);
    };
    OhlcSeries.prototype.onLowPropertyNameChanged = function (data) {
        var lowPropertyName = this.lowPropertyName;
        var binding = new com.telerik.widget.chart.engine.databinding.GenericDataPointBinding(new com.telerik.android.common.Function({
            apply: function (arg) {
                var item = JSON.parse(arg);
                return item[lowPropertyName];
            }
        }));
        this.android.setLowBinding(binding);
    };
    OhlcSeries.prototype.onOpenPropertyNameChanged = function (data) {
        var openPropertyName = this.openPropertyName;
        var binding = new com.telerik.widget.chart.engine.databinding.GenericDataPointBinding(new com.telerik.android.common.Function({
            apply: function (arg) {
                var item = JSON.parse(arg);
                return item[openPropertyName];
            }
        }));
        this.android.setOpenBinding(binding);
    };
    OhlcSeries.prototype.onClosePropertyNameChanged = function (data) {
        var closePropertyName = this.closePropertyName;
        var binding = new com.telerik.widget.chart.engine.databinding.GenericDataPointBinding(new com.telerik.android.common.Function({
            apply: function (arg) {
                var item = JSON.parse(arg);
                return item[closePropertyName];
            }
        }));
        this.android.setCloseBinding(binding);
    };
    return OhlcSeries;
})(commonModule.OhlcSeries);
exports.OhlcSeries = OhlcSeries;
var CandlestickSeries = (function (_super) {
    __extends(CandlestickSeries, _super);
    function CandlestickSeries() {
        _super.call(this);
    }
    Object.defineProperty(CandlestickSeries.prototype, "android", {
        get: function () {
            if (!this._android) {
                this._android = new com.telerik.widget.chart.visualization.cartesianChart.series.categorical.CandlestickSeries();
            }
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    return CandlestickSeries;
})(OhlcSeries);
exports.CandlestickSeries = CandlestickSeries;
var SplineSeries = (function (_super) {
    __extends(SplineSeries, _super);
    function SplineSeries() {
        _super.call(this);
    }
    Object.defineProperty(SplineSeries.prototype, "android", {
        get: function () {
            if (!this._android) {
                this._android = new com.telerik.widget.chart.visualization.cartesianChart.series.categorical.SplineSeries();
            }
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    return SplineSeries;
})(LineSeries);
exports.SplineSeries = SplineSeries;
var AreaSeries = (function (_super) {
    __extends(AreaSeries, _super);
    function AreaSeries() {
        _super.call(this);
    }
    Object.defineProperty(AreaSeries.prototype, "android", {
        get: function () {
            if (!this._android) {
                this._android = new com.telerik.widget.chart.visualization.cartesianChart.series.categorical.AreaSeries();
            }
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    return AreaSeries;
})(commonModule.CategoricalSeries);
exports.AreaSeries = AreaSeries;
var SplineAreaSeries = (function (_super) {
    __extends(SplineAreaSeries, _super);
    function SplineAreaSeries() {
        _super.call(this);
    }
    Object.defineProperty(SplineAreaSeries.prototype, "android", {
        get: function () {
            if (!this._android) {
                this._android = new com.telerik.widget.chart.visualization.cartesianChart.series.categorical.SplineAreaSeries();
            }
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    return SplineAreaSeries;
})(AreaSeries);
exports.SplineAreaSeries = SplineAreaSeries;
var ScatterBubbleSeries = (function (_super) {
    __extends(ScatterBubbleSeries, _super);
    function ScatterBubbleSeries() {
        _super.call(this);
    }
    Object.defineProperty(ScatterBubbleSeries.prototype, "android", {
        get: function () {
            if (!this._android) {
                this._android = new com.telerik.widget.chart.visualization.cartesianChart.series.scatter.ScatterBubbleSeries();
            }
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    return ScatterBubbleSeries;
})(commonModule.ScatterBubbleSeries);
exports.ScatterBubbleSeries = ScatterBubbleSeries;
var BubbleSeries = (function (_super) {
    __extends(BubbleSeries, _super);
    function BubbleSeries() {
        _super.call(this);
    }
    Object.defineProperty(BubbleSeries.prototype, "android", {
        get: function () {
            if (!this._android) {
                this._android = new com.telerik.widget.chart.visualization.cartesianChart.series.categorical.BubbleSeries();
            }
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    BubbleSeries.prototype.onBubbleScaleChanged = function (data) {
        if (data.newValue) {
            //todo: we use (scale^4) because of bug in Android scale calculation. Update this hack when it is fixed.
            this.android.setBubbleScale(data.newValue * data.newValue * data.newValue * data.newValue);
        }
    };
    BubbleSeries.prototype.onBubbleSizePropertyChanged = function (data) {
        if (!this.bubbleSizeProperty) {
            return;
        }
        var propertyName = this.bubbleSizeProperty;
        var binding = new com.telerik.widget.chart.engine.databinding.GenericDataPointBinding(new com.telerik.android.common.Function({
            apply: function (arg) {
                var item = JSON.parse(arg);
                return item[propertyName];
            }
        }));
        this.android.setBubbleSizeBinding(binding);
    };
    return BubbleSeries;
})(commonModule.BubbleSeries);
exports.BubbleSeries = BubbleSeries;
var ScatterSeries = (function (_super) {
    __extends(ScatterSeries, _super);
    function ScatterSeries() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(ScatterSeries.prototype, "android", {
        get: function () {
            if (!this._android) {
                this._android = new com.telerik.widget.chart.visualization.cartesianChart.series.scatter.ScatterPointSeries();
            }
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    return ScatterSeries;
})(commonModule.ScatterSeries);
exports.ScatterSeries = ScatterSeries;
var BarSeries = (function (_super) {
    __extends(BarSeries, _super);
    function BarSeries() {
        _super.call(this);
    }
    Object.defineProperty(BarSeries.prototype, "android", {
        get: function () {
            if (!this._android) {
                this._android = new com.telerik.widget.chart.visualization.cartesianChart.series.categorical.BarSeries();
                this._android.setCombineMode(com.telerik.widget.chart.engine.series.combination.ChartSeriesCombineMode.CLUSTER);
            }
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    return BarSeries;
})(commonModule.CategoricalSeries);
exports.BarSeries = BarSeries;
var RadCartesianChartGrid = (function (_super) {
    __extends(RadCartesianChartGrid, _super);
    function RadCartesianChartGrid() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(RadCartesianChartGrid.prototype, "android", {
        get: function () {
            if (!this._android) {
                this._android = new com.telerik.widget.chart.visualization.cartesianChart.CartesianChartGrid();
                this._android.setCanApplyPalette(false);
            }
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    RadCartesianChartGrid.prototype.onVerticalLinesVisibleChanged = function (data) {
        if (data.newValue === true) {
            if (this.horizontalLinesVisible === true) {
                this.android.setMajorLinesVisibility(com.telerik.widget.chart.visualization.cartesianChart.GridLineVisibility.XY);
            }
            else {
                this.android.setMajorLinesVisibility(com.telerik.widget.chart.visualization.cartesianChart.GridLineVisibility.Y);
            }
        }
        else {
            if (this.horizontalLinesVisible === true) {
                this.android.setMajorLinesVisibility(com.telerik.widget.chart.visualization.cartesianChart.GridLineVisibility.X);
            }
            else {
                this.android.setMajorLinesVisibility(com.telerik.widget.chart.visualization.cartesianChart.GridLineVisibility.NONE);
            }
        }
    };
    RadCartesianChartGrid.prototype.onHorizontalLinesVisibleChanged = function (data) {
        if (data.newValue === true) {
            if (this.verticalLinesVisible === true) {
                this.android.setMajorLinesVisibility(com.telerik.widget.chart.visualization.cartesianChart.GridLineVisibility.XY);
            }
            else {
                this.android.setMajorLinesVisibility(com.telerik.widget.chart.visualization.cartesianChart.GridLineVisibility.X);
            }
        }
        else {
            if (this.verticalLinesVisible === true) {
                this.android.setMajorLinesVisibility(com.telerik.widget.chart.visualization.cartesianChart.GridLineVisibility.Y);
            }
            else {
                this.android.setMajorLinesVisibility(com.telerik.widget.chart.visualization.cartesianChart.GridLineVisibility.NONE);
            }
        }
    };
    RadCartesianChartGrid.prototype.onHorizontalStripLinesVisibleChanged = function (data) {
        if (data.newValue === true) {
            if (this.verticalStripLinesVisible === true) {
                this.android.setStripLinesVisibility(com.telerik.widget.chart.visualization.cartesianChart.GridLineVisibility.XY);
            }
            else {
                this.android.setStripLinesVisibility(com.telerik.widget.chart.visualization.cartesianChart.GridLineVisibility.Y);
            }
        }
        else {
            if (this.verticalStripLinesVisible === true) {
                this.android.setStripLinesVisibility(com.telerik.widget.chart.visualization.cartesianChart.GridLineVisibility.X);
            }
            else {
                this.android.setStripLinesVisibility(com.telerik.widget.chart.visualization.cartesianChart.GridLineVisibility.NONE);
            }
        }
    };
    RadCartesianChartGrid.prototype.onVerticalStripLinesVisibleChanged = function (data) {
        if (data.newValue === true) {
            if (this.horizontalStripLinesVisible === true) {
                this.android.setStripLinesVisibility(com.telerik.widget.chart.visualization.cartesianChart.GridLineVisibility.XY);
            }
            else {
                this.android.setStripLinesVisibility(com.telerik.widget.chart.visualization.cartesianChart.GridLineVisibility.Y);
            }
        }
        else {
            if (this.horizontalStripLinesVisible === true) {
                this.android.setStripLinesVisibility(com.telerik.widget.chart.visualization.cartesianChart.GridLineVisibility.X);
            }
            else {
                this.android.setStripLinesVisibility(com.telerik.widget.chart.visualization.cartesianChart.GridLineVisibility.NONE);
            }
        }
    };
    RadCartesianChartGrid.prototype.onVerticalStrokeColorChanged = function (data) {
        if (!data.newValue) {
            return;
        }
        this.android.setLineColor((new colorModule.Color(data.newValue)).android);
    };
    RadCartesianChartGrid.prototype.onHorizontalStrokeColorChanged = function (data) {
        if (!data.newValue) {
            return;
        }
        this.android.setLineColor((new colorModule.Color(data.newValue)).android);
    };
    RadCartesianChartGrid.prototype.onHorizontalStrokeWidthChanged = function (data) {
        if (!data.newValue) {
            return;
        }
        this.android.setLineThickness(data.newValue);
    };
    RadCartesianChartGrid.prototype.onVerticalStrokeWidthChanged = function (data) {
        if (!data.newValue) {
            return;
        }
        this.android.setLineThickness(data.newValue);
    };
    RadCartesianChartGrid.prototype.onVerticalStripLineColorChanged = function (data) {
        if (!data.newValue) {
            return;
        }
        this.android.getYStripeBrushes().clear();
        var colors = data.newValue.split(',');
        for (var i = 0; i < colors.length; i++) {
            var stripePaint = new android.graphics.Paint();
            stripePaint.setStyle(android.graphics.Paint.Style.FILL);
            stripePaint.setColor((new colorModule.Color(colors[i].trim())).android);
            this.android.getYStripeBrushes().add(stripePaint);
        }
    };
    RadCartesianChartGrid.prototype.onHorizontalStripLineColorChanged = function (data) {
        if (!data.newValue) {
            return;
        }
        this.android.getXStripeBrushes().clear();
        var colors = data.newValue.split(',');
        for (var i = 0; i < colors.length; i++) {
            var stripePaint = new android.graphics.Paint();
            stripePaint.setStyle(android.graphics.Paint.Style.FILL);
            stripePaint.setColor((new colorModule.Color(colors[i].trim())).android);
            this.android.getXStripeBrushes().add(stripePaint);
        }
    };
    return RadCartesianChartGrid;
})(commonModule.RadCartesianChartGrid);
exports.RadCartesianChartGrid = RadCartesianChartGrid;
var floatType = java.lang.Float.class.getField("TYPE").get(null);
var ChartGridLineAnnotation = (function (_super) {
    __extends(ChartGridLineAnnotation, _super);
    function ChartGridLineAnnotation() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(ChartGridLineAnnotation.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    ChartGridLineAnnotation.prototype._init = function (owner) {
        this._owner = owner;
    };
    ChartGridLineAnnotation.prototype.createAnnotation = function () {
        if (!this.axisId) {
            console.log("WARNING: axisId property is mandatory for any annotation.");
            return null;
        }
        var forAxis = this._owner.getAxixByID(this.axisId);
        return new com.telerik.widget.chart.visualization.annotations.cartesian.CartesianGridLineAnnotation(forAxis.android, this.value);
    };
    ChartGridLineAnnotation.prototype._onOwnerUICreated = function () {
        this._android = this.createAnnotation();
        this._android.setVisible(this.hidden ? false : true);
        if (this.value) {
            if (!isNaN(this.value)) {
                this._android.setValue(new java.lang.Float(parseFloat(this.value)));
            }
            else {
                this._android.setValue(new java.lang.String(this.value));
            }
        }
        else {
            console.log("WARNING: value property is mandatory for grid line annotation.");
        }
        if (this.zPosition) {
            switch (commonModule.ChartAnnotationZPosition[this.zPosition]) {
                case commonModule.ChartAnnotationZPosition.AboveSeries:
                    this._android.setZIndex(com.telerik.widget.chart.visualization.common.ChartSeries.SERIES_Z_INDEX + 100);
                    break;
                default:
                    this._android.setZIndex(com.telerik.widget.chart.visualization.common.ChartSeries.SERIES_Z_INDEX - 100);
            }
        }
        if (this.strokeColor || this.strokeWidth) {
            var nvPalette = this._owner.androidView.getPalette().clone();
            var nvPaletteEntry = nvPalette.getEntry("CartesianGridLineAnnotation");
            this._android.setCanApplyPalette(false);
            if (this.strokeColor) {
                this._android.setStrokeColor((new colorModule.Color(this.strokeColor)).android);
            }
            else {
                this._android.setStrokeColor(nvPaletteEntry.getStroke());
            }
            if (this.strokeWidth && !isNaN(+this.strokeWidth)) {
                this._android.setStrokeWidth(this.strokeWidth);
            }
            else {
                this._android.setStrokeWidth(2);
            }
        }
        if (this.strokeDashPattern) {
            var array = JSON.parse("[" + this.strokeDashPattern + "]");
            var arrNative = java.lang.reflect.Array.newInstance(floatType, array.length);
            for (var i = 0; i < array.length; ++i) {
                arrNative[i] = parseFloat(array[i]);
            }
            var effect = new android.graphics.DashPathEffect(arrNative, 0);
            this._android.setStrokeEffect(effect);
        }
    };
    ChartGridLineAnnotation.prototype.onValueChanged = function (data) {
    };
    ChartGridLineAnnotation.prototype.onAxisIdChanged = function (data) {
    };
    ChartGridLineAnnotation.prototype.onZPositionChanged = function (data) {
    };
    ChartGridLineAnnotation.prototype.onHiddenChanged = function (data) {
        console.log("WARNING: hidden property for annotation is not available for Android");
    };
    ChartGridLineAnnotation.prototype.onStrokeWidthChanged = function (data) {
    };
    ChartGridLineAnnotation.prototype.onStrokeColorChanged = function (data) {
    };
    ChartGridLineAnnotation.prototype.onStrokeDashPatternChanged = function (data) {
    };
    return ChartGridLineAnnotation;
})(commonModule.ChartGridLineAnnotation);
exports.ChartGridLineAnnotation = ChartGridLineAnnotation;
var ChartPlotBandAnnotation = (function (_super) {
    __extends(ChartPlotBandAnnotation, _super);
    function ChartPlotBandAnnotation() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(ChartPlotBandAnnotation.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    ChartPlotBandAnnotation.prototype._init = function (owner) {
        this._owner = owner;
    };
    ChartPlotBandAnnotation.prototype.createAnnotation = function () {
        if (!this.axisId) {
            console.log("WARNING: axisId property is mandatory for any anotation.");
            return null;
        }
        var forAxis = this._owner.getAxixByID(this.axisId);
        return new com.telerik.widget.chart.visualization.annotations.cartesian.CartesianPlotBandAnnotation(forAxis.android, this.minValue, this.maxValue);
    };
    ChartPlotBandAnnotation.prototype._onOwnerUICreated = function () {
        this._android = this.createAnnotation();
        this._android.setVisible(this.hidden ? false : true);
        if (this.minValue) {
            if (!isNaN(this.minValue)) {
                this._android.setFrom(new java.lang.Float(parseFloat(this.minValue)));
            }
            else {
                this._android.setFrom(new java.lang.String(this.minValue));
            }
        }
        else {
            console.log("WARNING: minValue is mandatory for band annotation");
        }
        if (this.maxValue) {
            if (!isNaN(this.maxValue)) {
                this._android.setTo(new java.lang.Float(parseFloat(this.maxValue)));
            }
            else {
                this._android.setTo(new java.lang.String(this.maxValue));
            }
        }
        else {
            console.log("WARNING: maxValue is mandatory for band annotation");
        }
        if (this.zPosition) {
            switch (commonModule.ChartAnnotationZPosition[this.zPosition]) {
                case commonModule.ChartAnnotationZPosition.AboveSeries:
                    this._android.setZIndex(com.telerik.widget.chart.visualization.common.ChartSeries.SERIES_Z_INDEX + 100);
                    break;
                default:
                    this._android.setZIndex(com.telerik.widget.chart.visualization.common.ChartSeries.SERIES_Z_INDEX - 100);
            }
        }
        if (this.fillColor || this.strokeColor || this.strokeWidth) {
            var nvPalette = this._owner.androidView.getPalette().clone();
            var nvPaletteEntry = nvPalette.getEntry("CartesianPlotBandAnnotation");
            this._android.setCanApplyPalette(false);
            if (this.fillColor) {
                this._android.setFillColor((new colorModule.Color(this.fillColor)).android);
            }
            else {
                this._android.setFillColor(nvPaletteEntry.getFill());
            }
            if (this.strokeColor) {
                this._android.setStrokeColor((new colorModule.Color(this.strokeColor)).android);
            }
            else {
                this._android.setStrokeColor(nvPaletteEntry.getStroke());
            }
            if (this.strokeWidth && !isNaN(+this.strokeWidth)) {
                this._android.setStrokeWidth(this.strokeWidth);
            }
            else {
                this._android.setStrokeWidth(2);
            }
        }
        if (this.strokeDashPattern) {
            var array = JSON.parse("[" + this.strokeDashPattern + "]");
            var arrNative = java.lang.reflect.Array.newInstance(floatType, array.length);
            for (var i = 0; i < array.length; ++i) {
                arrNative[i] = parseFloat(array[i]);
            }
            var effect = new android.graphics.DashPathEffect(arrNative, 0);
            this._android.setStrokeEffect(effect);
        }
    };
    ChartPlotBandAnnotation.prototype.onMinValueChanged = function (data) {
    };
    ChartPlotBandAnnotation.prototype.onMaxValueChanged = function (data) {
    };
    ChartPlotBandAnnotation.prototype.onFillColorChanged = function (data) {
    };
    ChartPlotBandAnnotation.prototype.onAxisIdChanged = function (data) {
    };
    ChartPlotBandAnnotation.prototype.onZPositionChanged = function (data) {
    };
    ChartPlotBandAnnotation.prototype.onHiddenChanged = function (data) {
        console.log("WARNING: hidden property for annotation is not available for Android");
    };
    ChartPlotBandAnnotation.prototype.onStrokeWidthChanged = function (data) {
    };
    ChartPlotBandAnnotation.prototype.onStrokeColorChanged = function (data) {
    };
    ChartPlotBandAnnotation.prototype.onStrokeDashPatternChanged = function (data) {
    };
    return ChartPlotBandAnnotation;
})(commonModule.ChartPlotBandAnnotation);
exports.ChartPlotBandAnnotation = ChartPlotBandAnnotation;
