var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var viewModule = require("ui/core/view");
var bindableModule = require("ui/core/bindable");
var dependencyObservable = require("ui/core/dependency-observable");
var proxyModule = require("ui/core/proxy");
var initializersImpl = require("./chart-initializers");
var knownCollections;
(function (knownCollections) {
    knownCollections.series = "series";
    knownCollections.entries = "entries";
    knownCollections.palettes = "palettes";
    knownCollections.annotations = "annotations";
})(knownCollections = exports.knownCollections || (exports.knownCollections = {}));
exports.seriesName = "seriesName";
/*
* Lists the possible location for a horizontal axis.
*/
var AxisHorizontalLocation;
(function (AxisHorizontalLocation) {
    AxisHorizontalLocation.Left = "Left";
    AxisHorizontalLocation.Right = "Right";
})(AxisHorizontalLocation = exports.AxisHorizontalLocation || (exports.AxisHorizontalLocation = {}));
/*
* Lists the possible categorical series combination modes.
*/
var SeriesStackMode;
(function (SeriesStackMode) {
    SeriesStackMode.None = "None";
    SeriesStackMode.Stack = "Stack";
    SeriesStackMode.Stack100 = "Stack100";
})(SeriesStackMode = exports.SeriesStackMode || (exports.SeriesStackMode = {}));
/**
 * Font styles
 */
var FontStyles;
(function (FontStyles) {
    FontStyles.Normal = "Normal";
    FontStyles.Bold = "Bold";
    FontStyles.Italic = "Italic";
    FontStyles.BoldItalic = "BoldItalic";
})(FontStyles = exports.FontStyles || (exports.FontStyles = {}));
/*
* Lists the possible locations for a vertical axis.
*/
var AxisVerticalLocation;
(function (AxisVerticalLocation) {
    AxisVerticalLocation.Top = "Top";
    AxisVerticalLocation.Bottom = "Bottom";
})(AxisVerticalLocation = exports.AxisVerticalLocation || (exports.AxisVerticalLocation = {}));
/*
* Lists the possible axis plot modes.
*/
var AxisPlotMode;
(function (AxisPlotMode) {
    AxisPlotMode.BetweenTicks = "BetweenTicks";
    AxisPlotMode.OnTicks = "OnTicks";
})(AxisPlotMode = exports.AxisPlotMode || (exports.AxisPlotMode = {}));
/*
* Lists the possible ways a DateTime value can be interpreted
* in the context of an axis.
*/
var DateTimeComponent;
(function (DateTimeComponent) {
    DateTimeComponent.Second = "Second";
    DateTimeComponent.Minute = "Minute";
    DateTimeComponent.Hour = "Hour";
    DateTimeComponent.Day = "Day";
    DateTimeComponent.Week = "Week";
    DateTimeComponent.Month = "Week";
    DateTimeComponent.Year = "Year";
})(DateTimeComponent = exports.DateTimeComponent || (exports.DateTimeComponent = {}));
/*
* Lists the possible ways a DateTime value can be interpreted
* in the context of an axis.
*/
var ChartLegendPosition;
(function (ChartLegendPosition) {
    ChartLegendPosition.Left = "Left"; // The legend is positioned at the left side of the chart.
    ChartLegendPosition.Right = "Right"; // The legend is positioned at the right side of the chart.
    ChartLegendPosition.Top = "Top"; // The legend is positioned at the top side of the chart.
    ChartLegendPosition.Bottom = "Bottom"; // The legend is positioned at the bottom side of the chart.
    ChartLegendPosition.Floating = "Floating"; // The legend is floating. //TODO: You should set the offset and offsetOrigin properties when using this option.
})(ChartLegendPosition = exports.ChartLegendPosition || (exports.ChartLegendPosition = {}));
var ChartAnnotationZPosition;
(function (ChartAnnotationZPosition) {
    /**
    * The annotation is rendered below the series (default).
    */
    ChartAnnotationZPosition.BellowSeries = "BellowSeries";
    /**
    * The annotation is rendered above the series.
    */
    ChartAnnotationZPosition.AboveSeries = "AboveSeries";
})(ChartAnnotationZPosition = exports.ChartAnnotationZPosition || (exports.ChartAnnotationZPosition = {}));
/**
 * Represents an enum that defines the selection mode of the series.
 */
var SeriesSelectionMode;
(function (SeriesSelectionMode) {
    SeriesSelectionMode.None = "None"; // no selection
    SeriesSelectionMode.Series = "Series"; //select whole series
    SeriesSelectionMode.DataPoint = "DataPoint"; // select a data point
})(SeriesSelectionMode = exports.SeriesSelectionMode || (exports.SeriesSelectionMode = {}));
/**
 * Represents an enum that defines whether a single or multiple items (series or points) can be selected in chart.
 */
var ChartSelectionMode;
(function (ChartSelectionMode) {
    /**
     *  Only a single item (series or point) can be selected at a time.
     */
    ChartSelectionMode.Single = "Single";
    /**
     * Multiple items can be selected.
     */
    ChartSelectionMode.Multiple = "Multiple";
})(ChartSelectionMode = exports.ChartSelectionMode || (exports.ChartSelectionMode = {}));
;
/*
* Lists the possible values for label fit modes
*/
var AxisLabelFitMode;
(function (AxisLabelFitMode) {
    AxisLabelFitMode.None = "None";
    AxisLabelFitMode.Multiline = "Multiline";
    AxisLabelFitMode.Rotate = "Rotate";
})(AxisLabelFitMode = exports.AxisLabelFitMode || (exports.AxisLabelFitMode = {}));
var ChartEventData = (function () {
    function ChartEventData() {
    }
    return ChartEventData;
})();
exports.ChartEventData = ChartEventData;
/**
* Represents an axis in a Cartesian chart. This class is a base class for all
* axes that can be used within a RadCartesianChart instance.
*/
var CartesianAxis = (function (_super) {
    __extends(CartesianAxis, _super);
    function CartesianAxis() {
        _super.apply(this, arguments);
    }
    CartesianAxis.onLineColorPropertyChanged = function (data) {
        var axis = data.object;
        axis.onLineColorChanged(data);
    };
    /*
    * Called when the lineColor property changes.
    * @param data an object containing information about the change event.
    */
    CartesianAxis.prototype.onLineColorChanged = function (data) {
        this.initializer.onLineColorChanged(data, this);
    };
    CartesianAxis.onLineThicknessPropertyChanged = function (data) {
        var axis = data.object;
        axis.onLineThicknessChanged(data);
    };
    /*
    * Called when the lineThickness property changes.
    * @param data an object containing information about the change event.
    */
    CartesianAxis.prototype.onLineThicknessChanged = function (data) {
        this.initializer.onLineThicknessChanged(data, this);
    };
    CartesianAxis.onLabelTextColorPropertyChanged = function (data) {
        var axis = data.object;
        axis.onLabelTextColorChanged(data);
    };
    /*
    * Callen when the labelTextColor property changes.
    * @param data an object containing information about the change event.
    */
    CartesianAxis.prototype.onLabelTextColorChanged = function (data) {
        this.initializer.onLabelTextColorChanged(data, this);
    };
    CartesianAxis.onLabelSizePropertyChanged = function (data) {
        var axis = data.object;
        axis.onLabelSizeChanged(data);
    };
    /**
    * Called when the labelSize property changes.
    * @param data an object containing information about the change event.
    */
    CartesianAxis.prototype.onLabelSizeChanged = function (data) {
        this.initializer.onLabelSizeChanged(data, this);
    };
    CartesianAxis.onLabelFormatPropertyChanged = function (data) {
        var axis = data.object;
        axis.onLabelFormatChanged(data);
    };
    /**
    * Called when the labelFormat property changes.
    * @param data an object containing information about the change event.
    */
    CartesianAxis.prototype.onLabelFormatChanged = function (data) {
        this.initializer.onLabelFormatChanged(data, this);
    };
    CartesianAxis.onLabelMarginPropertyChanged = function (data) {
        var axis = data.object;
        axis.onLabelMarginChanged(data);
    };
    /**
    * Called when the labelMargin property changes.
    * @param data an object containing information about the change event.
    */
    CartesianAxis.prototype.onLabelMarginChanged = function (data) {
        this.initializer.onLabelMarginChanged(data, this);
    };
    CartesianAxis.onLabelRotationAnglePropertyChanged = function (data) {
        var axis = data.object;
        axis.onLabelRotationAngleChanged(data);
    };
    /**
    * Called when the labelRotationAngle property changes.
    * @param data an object containing information about the change event.
    */
    CartesianAxis.prototype.onLabelRotationAngleChanged = function (data) {
        this.initializer.onLabelRotationAngleChanged(data, this);
    };
    CartesianAxis.onLabelFitModePropertyChanged = function (data) {
        var axis = data.object;
        axis.onLabelFitModeChanged(data);
    };
    /**
    * Called when the labelFitMode property changes.
    * @param data an object containing information about the change event.
    */
    CartesianAxis.prototype.onLabelFitModeChanged = function (data) {
        this.initializer.onLabelFitModeChanged(data, this);
    };
    CartesianAxis.onHorizontalLocationPropertyChanged = function (data) {
        var axis = data.object;
        axis.onHorizontalLocationChanged(data);
    };
    /**
    * Called when the horizontalLocation property changes.
    * @param data an object containing information about the change event.
    */
    CartesianAxis.prototype.onHorizontalLocationChanged = function (data) {
        this.initializer.onHorizontalLocationChanged(data, this);
    };
    CartesianAxis.onVerticalLocationPropertyChanged = function (data) {
        var axis = data.object;
        axis.onVerticalLocationChanged(data);
    };
    /**
    * Called when the verticalLocation property changes.
    */
    CartesianAxis.prototype.onVerticalLocationChanged = function (data) {
        this.initializer.onVerticalLocationChanged(data, this);
    };
    CartesianAxis.onAllowPanPropertyChanged = function (data) {
        var axis = data.object;
        axis.onAllowPanChanged(data);
    };
    /**
    * Called when the allowPan property changes.
    */
    CartesianAxis.prototype.onAllowPanChanged = function (data) {
        this.initializer.onAllowPanChanged(data, this);
    };
    CartesianAxis.onAllowZoomPropertyChanged = function (data) {
        var axis = data.object;
        axis.onAllowZoomChanged(data);
    };
    /**
    * Called when the allowZoom property changes.
    */
    CartesianAxis.prototype.onAllowZoomChanged = function (data) {
        this.initializer.onAllowZoomChanged(data, this);
    };
    Object.defineProperty(CartesianAxis.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new initializersImpl.CartesianAxisValueMapper();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartesianAxis.prototype, "android", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartesianAxis.prototype, "ios", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartesianAxis.prototype, "id", {
        get: function () {
            return this._getValue(CartesianAxis.idProperty);
        },
        set: function (value) {
            this._setValue(CartesianAxis.idProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartesianAxis.prototype, "lineThickness", {
        get: function () {
            return this._getValue(CartesianAxis.lineThicknessProperty);
        },
        set: function (value) {
            this._setValue(CartesianAxis.lineThicknessProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartesianAxis.prototype, "lineColor", {
        get: function () {
            return this._getValue(CartesianAxis.lineColorProperty);
        },
        set: function (value) {
            this._setValue(CartesianAxis.lineColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartesianAxis.prototype, "labelTextColor", {
        get: function () {
            return this._getValue(CartesianAxis.labelTextColorProperty);
        },
        set: function (value) {
            this._setValue(CartesianAxis.labelTextColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartesianAxis.prototype, "labelSize", {
        get: function () {
            return this._getValue(CartesianAxis.labelSizeProperty);
        },
        set: function (value) {
            this._setValue(CartesianAxis.labelSizeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartesianAxis.prototype, "labelMargin", {
        get: function () {
            return this._getValue(CartesianAxis.labelMarginProperty);
        },
        set: function (value) {
            this._setValue(CartesianAxis.labelMarginProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartesianAxis.prototype, "labelRotationAngle", {
        get: function () {
            return this._getValue(CartesianAxis.labelRotationAngleProperty);
        },
        set: function (value) {
            this._setValue(CartesianAxis.labelRotationAngleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartesianAxis.prototype, "labelFitMode", {
        get: function () {
            return this._getValue(CartesianAxis.labelFitModeProperty);
        },
        set: function (value) {
            this._setValue(CartesianAxis.labelFitModeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartesianAxis.prototype, "labelFormat", {
        get: function () {
            return this._getValue(CartesianAxis.labelFormatProperty);
        },
        set: function (value) {
            this._setValue(CartesianAxis.labelFormatProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartesianAxis.prototype, "horizontalLocation", {
        get: function () {
            return this._getValue(CartesianAxis.horizontalLocationProperty);
        },
        set: function (value) {
            this._setValue(CartesianAxis.horizontalLocationProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartesianAxis.prototype, "verticalLocation", {
        get: function () {
            return this._getValue(CartesianAxis.verticalLocationProperty);
        },
        set: function (value) {
            this._setValue(CartesianAxis.verticalLocationProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartesianAxis.prototype, "allowPan", {
        get: function () {
            return this._getValue(CartesianAxis.allowPanProperty);
        },
        set: function (value) {
            this._setValue(CartesianAxis.allowPanProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartesianAxis.prototype, "allowZoom", {
        get: function () {
            return this._getValue(CartesianAxis.allowZoomProperty);
        },
        set: function (value) {
            this._setValue(CartesianAxis.allowZoomProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    /*
    * Identifies the lineColor dependency property.
    */
    CartesianAxis.idProperty = new dependencyObservable.Property("id", "CartesianAxis", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsStyle));
    /*
    * Identifies the lineColor dependency property.
    */
    CartesianAxis.lineColorProperty = new dependencyObservable.Property("lineColor", "CartesianAxis", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CartesianAxis.onLineColorPropertyChanged));
    /*
    * Identifies the lineThickness dependency property.
    */
    CartesianAxis.lineThicknessProperty = new dependencyObservable.Property("lineThickness", "CartesianAxis", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CartesianAxis.onLineThicknessPropertyChanged));
    /*
    * Identifies the labelTextColor dependency property.
    */
    CartesianAxis.labelTextColorProperty = new dependencyObservable.Property("labelTextColor", "CartesianAxis", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CartesianAxis.onLabelTextColorPropertyChanged));
    /**
    * Identifies the labelSize dependency property.
    */
    CartesianAxis.labelSizeProperty = new dependencyObservable.Property("labelSize", "CartesianAxis", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CartesianAxis.onLabelSizePropertyChanged));
    /**
    * Identifies labelFormat dependency property.
    */
    CartesianAxis.labelFormatProperty = new dependencyObservable.Property("labelFormat", "CartesianAxis", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CartesianAxis.onLabelFormatPropertyChanged));
    /**
    * Identifies the labelMargin dependency property.
    */
    CartesianAxis.labelMarginProperty = new dependencyObservable.Property("labelMargin", "CartesianAxis", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CartesianAxis.onLabelMarginPropertyChanged));
    /**
    * Identifies the labelRotationAngle dependency property.
    */
    CartesianAxis.labelRotationAngleProperty = new dependencyObservable.Property("labelRotationAngle", "CartesianAxis", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CartesianAxis.onLabelRotationAnglePropertyChanged));
    /**
    * Identifies the labelFitMode dependency property.
    */
    CartesianAxis.labelFitModeProperty = new dependencyObservable.Property("labelFitMode", "CartesianAxis", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CartesianAxis.onLabelFitModePropertyChanged));
    /**
    * Identifies the horizontalLocation dependency property.
    */
    CartesianAxis.horizontalLocationProperty = new dependencyObservable.Property("horizontalLocation", "CartesianAxis", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CartesianAxis.onHorizontalLocationPropertyChanged));
    /**
    * Identifies the verticalLocation dependency property.
    */
    CartesianAxis.verticalLocationProperty = new dependencyObservable.Property("verticalLocation", "CartesianAxis", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CartesianAxis.onVerticalLocationPropertyChanged));
    /**
    * Identifies the allowPan dependency property.
    */
    CartesianAxis.allowPanProperty = new dependencyObservable.Property("allowPan", "CartesianAxis", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CartesianAxis.onAllowPanPropertyChanged));
    /**
    * Identifies the allowZoom dependency property.
    */
    CartesianAxis.allowZoomProperty = new dependencyObservable.Property("allowZoom", "CartesianAxis", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CartesianAxis.onAllowZoomPropertyChanged));
    return CartesianAxis;
})(bindableModule.Bindable);
exports.CartesianAxis = CartesianAxis;
var CategoricalAxis = (function (_super) {
    __extends(CategoricalAxis, _super);
    function CategoricalAxis() {
        _super.call(this);
    }
    CategoricalAxis.onMajorTickIntervalPropertyChanged = function (data) {
        var categoricalAxis = data.object;
        categoricalAxis.onMajorTickIntervalChanged(data);
    };
    CategoricalAxis.onPlotModePropertyChanged = function (data) {
        var categoricalAxis = data.object;
        categoricalAxis.onPlotModeChanged(data);
    };
    Object.defineProperty(CategoricalAxis.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new initializersImpl.CategoricalAxisValueMapper();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CategoricalAxis.prototype, "majorTickInterval", {
        get: function () {
            return this._getValue(CategoricalAxis.majorTickIntervalProperty);
        },
        set: function (value) {
            this._setValue(CategoricalAxis.majorTickIntervalProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CategoricalAxis.prototype, "plotMode", {
        get: function () {
            return this._getValue(CategoricalAxis.plotModeProperty);
        },
        set: function (value) {
            this._setValue(CategoricalAxis.plotModeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    CategoricalAxis.prototype.onMajorTickIntervalChanged = function (data) {
        this.initializer.onMajorTickIntervalChanged(data, this);
    };
    CategoricalAxis.prototype.onPlotModeChanged = function (data) {
        this.initializer.onPlotModeChanged(data, this);
    };
    CategoricalAxis.majorTickIntervalProperty = new dependencyObservable.Property("majorTickInterval", "CategoricalAxis", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CategoricalAxis.onMajorTickIntervalPropertyChanged));
    CategoricalAxis.plotModeProperty = new dependencyObservable.Property("plotMode", "CategoricalAxis", new proxyModule.PropertyMetadata(AxisPlotMode.BetweenTicks, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CategoricalAxis.onPlotModePropertyChanged));
    return CategoricalAxis;
})(CartesianAxis);
exports.CategoricalAxis = CategoricalAxis;
var LinearAxis = (function (_super) {
    __extends(LinearAxis, _super);
    function LinearAxis() {
        _super.apply(this, arguments);
    }
    LinearAxis.onMinimumPropertyChanged = function (data) {
        var axis = data.object;
        axis.onMinimumChanged(data);
    };
    LinearAxis.prototype.onMinimumChanged = function (data) {
    };
    LinearAxis.onMaximumPropertyChanged = function (data) {
        var axis = data.object;
        axis.onMaximumChanged(data);
    };
    LinearAxis.prototype.onMaximumChanged = function (data) {
    };
    LinearAxis.onMajorStepPropertyChanged = function (data) {
        var axis = data.object;
        axis.onMajorStepChanged(data);
    };
    LinearAxis.prototype.onMajorStepChanged = function (data) {
    };
    Object.defineProperty(LinearAxis.prototype, "majorStep", {
        get: function () {
            return this._getValue(LinearAxis.majorStepProperty);
        },
        set: function (value) {
            this._setValue(LinearAxis.majorStepProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LinearAxis.prototype, "maximum", {
        get: function () {
            return this._getValue(LinearAxis.maximumProperty);
        },
        set: function (value) {
            this._setValue(LinearAxis.maximumProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LinearAxis.prototype, "minimum", {
        get: function () {
            return this._getValue(LinearAxis.minimumProperty);
        },
        set: function (value) {
            this._setValue(LinearAxis.minimumProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    LinearAxis.majorStepProperty = new dependencyObservable.Property("majorStep", "LinearAxis", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, LinearAxis.onMajorStepPropertyChanged));
    LinearAxis.minimumProperty = new dependencyObservable.Property("minimum", "LinearAxis", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, LinearAxis.onMinimumPropertyChanged));
    LinearAxis.maximumProperty = new dependencyObservable.Property("maximum", "LinearAxis", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, LinearAxis.onMaximumPropertyChanged));
    return LinearAxis;
})(CartesianAxis);
exports.LinearAxis = LinearAxis;
var DateTimeContinuousAxis = (function (_super) {
    __extends(DateTimeContinuousAxis, _super);
    function DateTimeContinuousAxis() {
        _super.call(this);
    }
    DateTimeContinuousAxis.onPlotModePropertyChanged = function (data) {
        var dateTimeAxis = data.object;
        dateTimeAxis.onPlotModeChanged(data);
    };
    DateTimeContinuousAxis.prototype.onPlotModeChanged = function (data) {
    };
    Object.defineProperty(DateTimeContinuousAxis.prototype, "plotMode", {
        get: function () {
            return this._getValue(DateTimeContinuousAxis.plotModeProperty);
        },
        set: function (value) {
            this._setValue(DateTimeContinuousAxis.plotModeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    DateTimeContinuousAxis.plotModeProperty = new dependencyObservable.Property("plotMode", "DateTimeContinuousAxis", new proxyModule.PropertyMetadata(AxisPlotMode.BetweenTicks, dependencyObservable.PropertyMetadataSettings.AffectsLayout, DateTimeContinuousAxis.onPlotModePropertyChanged));
    return DateTimeContinuousAxis;
})(LinearAxis);
exports.DateTimeContinuousAxis = DateTimeContinuousAxis;
var DateTimeCategoricalAxis = (function (_super) {
    __extends(DateTimeCategoricalAxis, _super);
    function DateTimeCategoricalAxis() {
        _super.call(this);
    }
    DateTimeCategoricalAxis.onDateTimeComponentPropertyChanged = function (data) {
        var axis = data.object;
        axis.onDateTimeComponentChanged(data);
    };
    DateTimeCategoricalAxis.prototype.onDateTimeComponentChanged = function (data) {
    };
    DateTimeCategoricalAxis.onDateFormatPropertyChanged = function (data) {
        var axis = data.object;
        axis.onDateFormatChanged(data);
    };
    DateTimeCategoricalAxis.prototype.onDateFormatChanged = function (data) {
    };
    Object.defineProperty(DateTimeCategoricalAxis.prototype, "dateTimeComponent", {
        get: function () {
            return this._getValue(DateTimeCategoricalAxis.dateTimeComponentProperty);
        },
        set: function (value) {
            this._setValue(DateTimeCategoricalAxis.dateTimeComponentProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimeCategoricalAxis.prototype, "dateFormat", {
        get: function () {
            return this._getValue(DateTimeCategoricalAxis.dateFormatProperty);
        },
        set: function (value) {
            this._setValue(DateTimeCategoricalAxis.dateFormatProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimeCategoricalAxis.prototype, "android", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimeCategoricalAxis.prototype, "ios", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    DateTimeCategoricalAxis.dateTimeComponentProperty = new dependencyObservable.Property("dateTimeComponent", "DateTimeCategoricalAxis", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, DateTimeCategoricalAxis.onDateTimeComponentPropertyChanged));
    DateTimeCategoricalAxis.dateFormatProperty = new dependencyObservable.Property("dateFormat", "DateTimeCategoricalAxis", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, DateTimeCategoricalAxis.onDateFormatPropertyChanged));
    return DateTimeCategoricalAxis;
})(CategoricalAxis);
exports.DateTimeCategoricalAxis = DateTimeCategoricalAxis;
var RadLegendView = (function (_super) {
    __extends(RadLegendView, _super);
    function RadLegendView() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(RadLegendView.prototype, "position", {
        get: function () {
            return this._getValue(RadLegendView.positionProperty);
        },
        set: function (value) {
            this._setValue(RadLegendView.positionProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    RadLegendView.onPositionPropertyChanged = function (data) {
        var legend;
        legend = data.object;
        legend.onPositionChanged(data);
    };
    RadLegendView.prototype.onPositionChanged = function (data) {
    };
    Object.defineProperty(RadLegendView.prototype, "title", {
        get: function () {
            return this._getValue(RadLegendView.titleProperty);
        },
        set: function (value) {
            this._setValue(RadLegendView.titleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    RadLegendView.onTitlePropertyChanged = function (data) {
        var legend = data.object;
        legend.onTitleChanged(data);
    };
    RadLegendView.prototype.onTitleChanged = function (data) {
    };
    RadLegendView.prototype.updateLegendView = function (chartView) {
    };
    RadLegendView.positionProperty = new dependencyObservable.Property("position", "RadLegendView", new proxyModule.PropertyMetadata(ChartLegendPosition.Bottom, dependencyObservable.PropertyMetadataSettings.None, RadLegendView.onPositionPropertyChanged));
    RadLegendView.titleProperty = new dependencyObservable.Property("title", "RadLegendView", new proxyModule.PropertyMetadata(ChartLegendPosition.Bottom, dependencyObservable.PropertyMetadataSettings.None, RadLegendView.onTitlePropertyChanged));
    return RadLegendView;
})(viewModule.View);
exports.RadLegendView = RadLegendView;
var RadChartBase = (function (_super) {
    __extends(RadChartBase, _super);
    function RadChartBase() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(RadChartBase.prototype, "android", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadChartBase.prototype, "ios", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadChartBase.prototype, "androidView", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadChartBase.prototype, "rootLayout", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadChartBase.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new initializersImpl.ChartBaseValueMapper();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadChartBase.prototype, "legend", {
        get: function () {
            return this._getValue(RadChartBase.legendProperty);
        },
        set: function (value) {
            this._setValue(RadChartBase.legendProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadChartBase.prototype, "palettes", {
        get: function () {
            return this._getValue(RadChartBase.palettesProperty);
        },
        set: function (value) {
            this._setValue(RadChartBase.palettesProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadChartBase.prototype, "series", {
        get: function () {
            return this._getValue(RadChartBase.seriesProperty);
        },
        set: function (value) {
            this._setValue(RadChartBase.seriesProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadChartBase.prototype, "annotations", {
        get: function () {
            return this._getValue(RadChartBase.annotationsProperty);
        },
        set: function (value) {
            this._setValue(RadChartBase.annotationsProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadChartBase.prototype, "selectionMode", {
        get: function () {
            return this._getValue(RadChartBase.selectionModeProperty);
        },
        set: function (value) {
            this._setValue(RadChartBase.selectionModeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    RadChartBase.prototype._addArrayFromBuilder = function (name, value) {
        if (name === "series") {
            this.series = value;
        }
        else if (name === "palettes") {
            this.palettes = value;
        }
        else if (name === "annotations") {
            this.annotations = value;
        }
    };
    RadChartBase.prototype._onBindingContextChanged = function (oldValue, newValue) {
        _super.prototype._onBindingContextChanged.call(this, oldValue, newValue);
        if (this.series) {
            for (var i = 0; i < this.series.length; i++) {
                this.series[i].bindingContext = newValue;
            }
        }
    };
    RadChartBase.prototype.getAxixByID = function (axisID) {
        return null;
    };
    RadChartBase.onLegendPropertyChanged = function (data) {
        var chart = data.object;
        chart.onLegendChanged(data);
    };
    RadChartBase.prototype.onLegendChanged = function (data) {
        this.legend.updateLegendView(this);
        this.initializer.onLegendChanged(data, this);
    };
    RadChartBase.onPalettesPropertyChanged = function (data) {
        var chart = data.object;
        chart.onPalettesChanged(data);
    };
    RadChartBase.prototype.onPalettesChanged = function (data) {
        this.initializer.onPalettesChanged(data, this);
    };
    RadChartBase.onSeriesPropertyChanged = function (data) {
        var chartBase = data.object;
        chartBase.onSeriesChanged(data);
    };
    RadChartBase.prototype.onSeriesChanged = function (data) {
        this.initializer.onSeriesChanged(data, this);
    };
    RadChartBase.onAnnotationsPropertyChanged = function (data) {
        var chartBase = data.object;
        chartBase.onAnnotationsChanged(data);
    };
    RadChartBase.prototype.onAnnotationsChanged = function (data) {
        this.initializer.onAnnotationsChanged(data, this);
    };
    RadChartBase.onSelectionModePropertyChanged = function (data) {
        var chartBase = data.object;
        chartBase.onSelectionModeChanged(data);
    };
    RadChartBase.prototype.onSelectionModeChanged = function (data) {
        this.initializer.onSelectionModeChanged(data, this);
    };
    RadChartBase.seriesSelectedEvent = "seriesSelected";
    RadChartBase.seriesDeselectedEvent = "seriesDeselected";
    RadChartBase.pointSelectedEvent = "pointSelected";
    RadChartBase.pointDeselectedEvent = "pointDeselected";
    RadChartBase.chartZoomedEvent = "chartZoomed";
    RadChartBase.chartPannedEvent = "chartPanned";
    RadChartBase.legendProperty = new dependencyObservable.Property("legend", "RadChartBase", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, RadChartBase.onLegendPropertyChanged));
    RadChartBase.seriesProperty = new dependencyObservable.Property("series", "RadChartBase", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, RadChartBase.onSeriesPropertyChanged));
    RadChartBase.palettesProperty = new dependencyObservable.Property("palettes", "RadChartBase", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, RadChartBase.onPalettesPropertyChanged));
    RadChartBase.annotationsProperty = new dependencyObservable.Property("annotations", "RadChartBase", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, RadChartBase.onAnnotationsPropertyChanged));
    RadChartBase.selectionModeProperty = new dependencyObservable.Property("selectionMode", "RadChartBase", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, RadChartBase.onSelectionModePropertyChanged));
    return RadChartBase;
})(viewModule.View);
exports.RadChartBase = RadChartBase;
var PointLabelStyle = (function (_super) {
    __extends(PointLabelStyle, _super);
    function PointLabelStyle() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(PointLabelStyle.prototype, "textColor", {
        get: function () {
            return this._getValue(PointLabelStyle.textColorProperty);
        },
        set: function (value) {
            this._setValue(PointLabelStyle.textColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PointLabelStyle.prototype, "strokeColor", {
        get: function () {
            return this._getValue(PointLabelStyle.strokeColorProperty);
        },
        set: function (value) {
            this._setValue(PointLabelStyle.strokeColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PointLabelStyle.prototype, "fillColor", {
        get: function () {
            return this._getValue(PointLabelStyle.fillColorProperty);
        },
        set: function (value) {
            this._setValue(PointLabelStyle.fillColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PointLabelStyle.prototype, "textSize", {
        get: function () {
            return this._getValue(PointLabelStyle.textSizeProperty);
        },
        set: function (value) {
            this._setValue(PointLabelStyle.textSizeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PointLabelStyle.prototype, "margin", {
        get: function () {
            return this._getValue(PointLabelStyle.marginProperty);
        },
        set: function (value) {
            this._setValue(PointLabelStyle.marginProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PointLabelStyle.prototype, "textFormat", {
        get: function () {
            return this._getValue(PointLabelStyle.textFormatProperty);
        },
        set: function (value) {
            this._setValue(PointLabelStyle.textFormatProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PointLabelStyle.prototype, "fontName", {
        get: function () {
            return this._getValue(PointLabelStyle.fontNameProperty);
        },
        set: function (value) {
            this._setValue(PointLabelStyle.fontNameProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PointLabelStyle.prototype, "fontStyle", {
        get: function () {
            return this._getValue(PointLabelStyle.fontStyleProperty);
        },
        set: function (value) {
            this._setValue(PointLabelStyle.fontStyleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    PointLabelStyle.strokeColorProperty = new dependencyObservable.Property("strokeColor", "PointLabelStyle", new proxyModule.PropertyMetadata(undefined, undefined, undefined));
    PointLabelStyle.fillColorProperty = new dependencyObservable.Property("fillColor", "PointLabelStyle", new proxyModule.PropertyMetadata(undefined, undefined, undefined));
    PointLabelStyle.textColorProperty = new dependencyObservable.Property("textColor", "PointLabelStyle", new proxyModule.PropertyMetadata(undefined, undefined, undefined));
    PointLabelStyle.textSizeProperty = new dependencyObservable.Property("textSize", "PointLabelStyle", new proxyModule.PropertyMetadata(undefined, undefined, undefined));
    PointLabelStyle.marginProperty = new dependencyObservable.Property("margin", "PointLabelStyle", new proxyModule.PropertyMetadata(undefined, undefined, undefined));
    PointLabelStyle.textFormatProperty = new dependencyObservable.Property("textFormat", "PointLabelStyle", new proxyModule.PropertyMetadata(undefined, undefined, undefined));
    PointLabelStyle.fontNameProperty = new dependencyObservable.Property("fontName", "PointLabelStyle", new proxyModule.PropertyMetadata(undefined, undefined, undefined));
    PointLabelStyle.fontStyleProperty = new dependencyObservable.Property("fontStyle", "PointLabelStyle", new proxyModule.PropertyMetadata(undefined, undefined, undefined));
    return PointLabelStyle;
})(bindableModule.Bindable);
exports.PointLabelStyle = PointLabelStyle;
var ChartSeries = (function (_super) {
    __extends(ChartSeries, _super);
    function ChartSeries() {
        _super.call(this);
    }
    Object.defineProperty(ChartSeries.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new initializersImpl.ChartSeriesValueMapper();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartSeries.prototype, "selectionMode", {
        get: function () {
            return this._getValue(ChartSeries.selectionModeProperty);
        },
        set: function (value) {
            this._setValue(ChartSeries.selectionModeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartSeries.prototype, "labelStyle", {
        get: function () {
            return this._getValue(ChartSeries.labelStyleProperty);
        },
        set: function (value) {
            this._setValue(ChartSeries.labelStyleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartSeries.prototype, "showLabels", {
        get: function () {
            return this._getValue(ChartSeries.showLabelsProperty);
        },
        set: function (value) {
            this._setValue(ChartSeries.showLabelsProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartSeries.prototype, "owner", {
        get: function () {
            return this._owner;
        },
        set: function (value) {
            this._owner = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartSeries.prototype, "items", {
        get: function () {
            return this._getValue(ChartSeries.itemsProperty);
        },
        set: function (value) {
            this._setValue(ChartSeries.itemsProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartSeries.prototype, "valueProperty", {
        get: function () {
            return this._getValue(ChartSeries.valuePropertyProperty);
        },
        set: function (value) {
            this._setValue(ChartSeries.valuePropertyProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartSeries.prototype, "legendTitle", {
        get: function () {
            return this._getValue(ChartSeries.legendTitleProperty);
        },
        set: function (value) {
            this._setValue(ChartSeries.legendTitleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartSeries.prototype, "android", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartSeries.prototype, "ios", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    ChartSeries.onLegendTitlePropertyChanged = function (data) {
        var series = data.object;
        series.onLegendTitleChanged(data);
    };
    ChartSeries.onItemsPropertyChanged = function (data) {
        var series = data.object;
        series.onItemsChanged(data);
    };
    ChartSeries.onValuePropertyPropertyChanged = function (data) {
        var series = data.object;
        series.onValuePropertyChanged(data);
    };
    ChartSeries.onShowLabelsPropertyChanged = function (data) {
        var series = data.object;
        series.onShowLabelsChanged(data);
    };
    ChartSeries.onLabelStylePropertyChanged = function (data) {
        var series = data.object;
        series.onLabelStyleChanged(data);
    };
    ChartSeries.onSelectionModePropertyChanged = function (data) {
        var series = data.object;
        series.onSelectionModeChanged(data);
    };
    ChartSeries.prototype.onSelectionModeChanged = function (data) {
        this.initializer.onSelectionModeChanged(data, this);
    };
    ChartSeries.prototype.onLabelStyleChanged = function (data) {
        this.initializer.onLabelStyleChanged(data, this);
    };
    ChartSeries.prototype.onShowLabelsChanged = function (data) {
        this.initializer.onShowLabelsChanged(data, this);
    };
    ChartSeries.prototype.onLegendTitleChanged = function (data) {
        this.initializer.onLegendTitleChanged(data, this);
    };
    ChartSeries.prototype.onItemsChanged = function (data) {
        this.initializer.onItemsChanged(data, this);
    };
    ChartSeries.prototype.onValuePropertyChanged = function (data) {
        this.initializer.onValuePropertyChanged(data, this);
    };
    ChartSeries.selectionModeProperty = new dependencyObservable.Property("selectionMode", "ChartSeries", new proxyModule.PropertyMetadata(false, dependencyObservable.PropertyMetadataSettings.None, ChartSeries.onSelectionModePropertyChanged));
    ChartSeries.labelStyleProperty = new dependencyObservable.Property("labelStyle", "ChartSeries", new proxyModule.PropertyMetadata(false, dependencyObservable.PropertyMetadataSettings.None, ChartSeries.onLabelStylePropertyChanged));
    ChartSeries.showLabelsProperty = new dependencyObservable.Property("showLabels", "ChartSeries", new proxyModule.PropertyMetadata(false, dependencyObservable.PropertyMetadataSettings.None, ChartSeries.onShowLabelsPropertyChanged));
    ChartSeries.legendTitleProperty = new dependencyObservable.Property("legendTitle", "ChartSeries", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, ChartSeries.onLegendTitlePropertyChanged));
    ChartSeries.valuePropertyProperty = new dependencyObservable.Property("valueProperty", "ChartSeries", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, ChartSeries.onValuePropertyPropertyChanged));
    ChartSeries.itemsProperty = new dependencyObservable.Property("items", "ChartSeries", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, ChartSeries.onItemsPropertyChanged));
    return ChartSeries;
})(bindableModule.Bindable);
exports.ChartSeries = ChartSeries;
var CartesianSeries = (function (_super) {
    __extends(CartesianSeries, _super);
    function CartesianSeries() {
        _super.call(this);
    }
    Object.defineProperty(CartesianSeries.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new initializersImpl.CartesianSeriesValueMapper();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartesianSeries.prototype, "horizontalAxis", {
        get: function () {
            return this._getValue(CartesianSeries.horizontalAxisProperty);
        },
        set: function (value) {
            this._setValue(CartesianSeries.horizontalAxisProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartesianSeries.prototype, "verticalAxis", {
        get: function () {
            return this._getValue(CartesianSeries.verticalAxisProperty);
        },
        set: function (value) {
            this._setValue(CartesianSeries.verticalAxisProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    CartesianSeries.onHorizontalAxisChanged = function (data) {
        var series = data.object;
        series.onHorizontalAxisChanged(data);
    };
    CartesianSeries.onVerticalAxisChanged = function (data) {
        var series = data.object;
        series.onVerticalAxisChanged(data);
    };
    CartesianSeries.prototype.onHorizontalAxisChanged = function (data) {
        this.updateAxisBindingContext(data);
        this.initializer.onHorizontalAxisChanged(data, this);
    };
    CartesianSeries.prototype.onVerticalAxisChanged = function (data) {
        this.updateAxisBindingContext(data);
        this.initializer.onVerticalAxisChanged(data, this);
    };
    CartesianSeries.prototype.updateAxisBindingContext = function (data) {
        var series = data.object;
        var newAxis = data.newValue;
        if (newAxis) {
            newAxis.bindingContext = series.bindingContext;
        }
        else {
            if (data.oldValue) {
                data.oldValue.bindingContext = null;
            }
        }
    };
    CartesianSeries.horizontalAxisProperty = new dependencyObservable.Property("horizontalAxis", "CartesianSeries", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CartesianSeries.onHorizontalAxisChanged));
    CartesianSeries.verticalAxisProperty = new dependencyObservable.Property("verticalAxis", "CartesianSeries", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CartesianSeries.onVerticalAxisChanged));
    return CartesianSeries;
})(ChartSeries);
exports.CartesianSeries = CartesianSeries;
var CategoricalSeries = (function (_super) {
    __extends(CategoricalSeries, _super);
    function CategoricalSeries() {
        _super.call(this);
    }
    CategoricalSeries.onStackModePropertyChanged = function (data) {
        var series = data.object;
        series.onStackModeChanged(data);
    };
    CategoricalSeries.onCategoryPropertyPropertyChanged = function (data) {
        var series = data.object;
        series.onCategoryPropertyPropertyChanged(data);
    };
    Object.defineProperty(CategoricalSeries.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new initializersImpl.CategoricalSeriesValueMapper();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CategoricalSeries.prototype, "stackMode", {
        get: function () {
            return this._getValue(CategoricalSeries.stackModeProperty);
        },
        set: function (value) {
            this._setValue(CategoricalSeries.stackModeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CategoricalSeries.prototype, "categoryProperty", {
        get: function () {
            return this._getValue(CategoricalSeries.categoryPropertyProperty);
        },
        set: function (value) {
            this._setValue(CategoricalSeries.categoryPropertyProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    CategoricalSeries.prototype.onStackModeChanged = function (data) {
        this.initializer.onStackModePropertyChanged(data, this);
    };
    CategoricalSeries.prototype.onCategoryPropertyPropertyChanged = function (data) {
        this.initializer.onCategoryPropertyPropertyChanged(data, this);
    };
    CategoricalSeries.categoryPropertyProperty = new dependencyObservable.Property("categoryProperty", "CategoricalSeries", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CategoricalSeries.onCategoryPropertyPropertyChanged));
    CategoricalSeries.stackModeProperty = new dependencyObservable.Property("stackMode", "CategoricalSeries", new proxyModule.PropertyMetadata(SeriesStackMode.None, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CategoricalSeries.onStackModePropertyChanged));
    return CategoricalSeries;
})(CartesianSeries);
exports.CategoricalSeries = CategoricalSeries;
var RadCartesianChart = (function (_super) {
    __extends(RadCartesianChart, _super);
    function RadCartesianChart() {
        _super.apply(this, arguments);
    }
    RadCartesianChart.onGridChanged = function (data) {
        var chart = data.object;
        chart.onGridChanged(data);
    };
    RadCartesianChart.prototype.onGridChanged = function (data) {
    };
    RadCartesianChart.onHorizontalAxisPropertyChanged = function (data) {
        var chart = data.object;
        chart.onHorizontalAxisChanged(data);
    };
    RadCartesianChart.onVerticalAxisPropertyChanged = function (data) {
        var chart = data.object;
        chart.onVerticalAxisChanged(data);
    };
    RadCartesianChart.onHorizontalZoomPropertyChanged = function (data) {
        var chart = data.object;
        chart.onHorizontalZoomChanged(data);
    };
    RadCartesianChart.onVerticalZoomPropertyChanged = function (data) {
        var chart = data.object;
        chart.onVerticalZoomChanged(data);
    };
    RadCartesianChart.prototype.onHorizontalAxisChanged = function (data) {
        this.updateAxisBindingContext(data);
    };
    RadCartesianChart.prototype.onVerticalAxisChanged = function (data) {
        this.updateAxisBindingContext(data);
    };
    RadCartesianChart.prototype.onHorizontalZoomChanged = function (data) {
    };
    RadCartesianChart.prototype.onVerticalZoomChanged = function (data) {
    };
    RadCartesianChart.prototype.updateAxisBindingContext = function (data) {
        var chart = data.object;
        if (data.newValue) {
            data.newValue.bindingContext = chart.bindingContext;
        }
        else {
            if (data.oldValue) {
                data.oldValue.bindingContext = null;
            }
        }
    };
    Object.defineProperty(RadCartesianChart.prototype, "grid", {
        get: function () {
            return this._getValue(RadCartesianChart.gridProperty);
        },
        set: function (value) {
            this._setValue(RadCartesianChart.gridProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadCartesianChart.prototype, "horizontalAxis", {
        get: function () {
            return this._getValue(RadCartesianChart.horizontalAxisProperty);
        },
        set: function (value) {
            this._setValue(RadCartesianChart.horizontalAxisProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadCartesianChart.prototype, "verticalAxis", {
        get: function () {
            return this._getValue(RadCartesianChart.verticalAxisProperty);
        },
        set: function (value) {
            this._setValue(RadCartesianChart.verticalAxisProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadCartesianChart.prototype, "horizontalZoom", {
        get: function () {
            return this._getValue(RadCartesianChart.horizontalZoomProperty);
        },
        set: function (value) {
            this._setValue(RadCartesianChart.horizontalZoomProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadCartesianChart.prototype, "verticalZoom", {
        get: function () {
            return this._getValue(RadCartesianChart.verticalZoomProperty);
        },
        set: function (value) {
            this._setValue(RadCartesianChart.verticalZoomProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    RadCartesianChart.gridProperty = new dependencyObservable.Property("grid", "RadCartesianChart", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, RadCartesianChart.onGridChanged));
    RadCartesianChart.horizontalAxisProperty = new dependencyObservable.Property("horizontalAxis", "RadCartesianChart", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, RadCartesianChart.onHorizontalAxisPropertyChanged));
    RadCartesianChart.verticalAxisProperty = new dependencyObservable.Property("verticalAxis", "RadCartesianChart", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, RadCartesianChart.onVerticalAxisPropertyChanged));
    RadCartesianChart.verticalZoomProperty = new dependencyObservable.Property("verticalZoom", "RadCartesianChart", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, RadCartesianChart.onVerticalZoomPropertyChanged));
    RadCartesianChart.horizontalZoomProperty = new dependencyObservable.Property("horizontalZoom", "RadCartesianChart", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, RadCartesianChart.onHorizontalZoomPropertyChanged));
    return RadCartesianChart;
})(RadChartBase);
exports.RadCartesianChart = RadCartesianChart;
var BarSeries = (function (_super) {
    __extends(BarSeries, _super);
    function BarSeries() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(BarSeries.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new initializersImpl.BarSeriesValueMapper();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    return BarSeries;
})(CategoricalSeries);
exports.BarSeries = BarSeries;
var OhlcSeries = (function (_super) {
    __extends(OhlcSeries, _super);
    function OhlcSeries() {
        _super.apply(this, arguments);
    }
    OhlcSeries.onOpenPropertyNamePropertyChanged = function (data) {
        var series = data.object;
        series.onOpenPropertyNameChanged(data);
    };
    OhlcSeries.onClosePropertyNamePropertyChanged = function (data) {
        var series = data.object;
        series.onClosePropertyNameChanged(data);
    };
    OhlcSeries.onHighPropertyNamePropertyChanged = function (data) {
        var series = data.object;
        series.onHighPropertyNameChanged(data);
    };
    OhlcSeries.onLowPropertyNamePropertyChanged = function (data) {
        var series = data.object;
        series.onLowPropertyNameChanged(data);
    };
    Object.defineProperty(OhlcSeries.prototype, "lowPropertyName", {
        get: function () {
            return this._getValue(OhlcSeries.lowPropertyNameProperty);
        },
        set: function (value) {
            this._setValue(OhlcSeries.lowPropertyNameProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OhlcSeries.prototype, "highPropertyName", {
        get: function () {
            return this._getValue(OhlcSeries.highPropertyNameProperty);
        },
        set: function (value) {
            this._setValue(OhlcSeries.highPropertyNameProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OhlcSeries.prototype, "closePropertyName", {
        get: function () {
            return this._getValue(OhlcSeries.closePropertyNameProperty);
        },
        set: function (value) {
            this._setValue(OhlcSeries.closePropertyNameProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OhlcSeries.prototype, "openPropertyName", {
        get: function () {
            return this._getValue(OhlcSeries.openPropertyNameProperty);
        },
        set: function (value) {
            this._setValue(OhlcSeries.openPropertyNameProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    OhlcSeries.prototype.onLowPropertyNameChanged = function (args) {
    };
    OhlcSeries.prototype.onHighPropertyNameChanged = function (args) {
    };
    OhlcSeries.prototype.onClosePropertyNameChanged = function (args) {
    };
    OhlcSeries.prototype.onOpenPropertyNameChanged = function (args) {
    };
    OhlcSeries.openPropertyNameProperty = new dependencyObservable.Property("openPropertyName", "OhlcSeries", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, OhlcSeries.onOpenPropertyNamePropertyChanged));
    OhlcSeries.closePropertyNameProperty = new dependencyObservable.Property("closePropertyName", "OhlcSeries", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, OhlcSeries.onClosePropertyNamePropertyChanged));
    OhlcSeries.highPropertyNameProperty = new dependencyObservable.Property("highPropertyName", "OhlcSeries", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, OhlcSeries.onHighPropertyNamePropertyChanged));
    OhlcSeries.lowPropertyNameProperty = new dependencyObservable.Property("lowPropertyName", "OhlcSeries", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, OhlcSeries.onLowPropertyNamePropertyChanged));
    return OhlcSeries;
})(CategoricalSeries);
exports.OhlcSeries = OhlcSeries;
var CandleStickSeries = (function (_super) {
    __extends(CandleStickSeries, _super);
    function CandleStickSeries() {
        _super.call(this);
    }
    return CandleStickSeries;
})(OhlcSeries);
exports.CandleStickSeries = CandleStickSeries;
var BubbleSeries = (function (_super) {
    __extends(BubbleSeries, _super);
    function BubbleSeries() {
        _super.apply(this, arguments);
    }
    BubbleSeries.onBubbleScalePropertyChanged = function (data) {
        var series = data.object;
        series.onBubbleScaleChanged(data);
    };
    BubbleSeries.prototype.onBubbleScaleChanged = function (data) {
    };
    BubbleSeries.onBubbleSizePropertyPropertyChanged = function (data) {
        var series = data.object;
        series.onBubbleSizePropertyChanged(data);
    };
    BubbleSeries.prototype.onBubbleSizePropertyChanged = function (data) {
    };
    Object.defineProperty(BubbleSeries.prototype, "bubbleScale", {
        get: function () {
            return this._getValue(BubbleSeries.bubbleScaleProperty);
        },
        set: function (value) {
            this._setValue(BubbleSeries.bubbleScaleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BubbleSeries.prototype, "bubbleSizeProperty", {
        get: function () {
            return this._getValue(BubbleSeries.bubbleSizePropertyProperty);
        },
        set: function (value) {
            this._setValue(BubbleSeries.bubbleSizePropertyProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    BubbleSeries.bubbleScaleProperty = new dependencyObservable.Property("bubbleScale", "BubbleSeries", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, BubbleSeries.onBubbleScalePropertyChanged));
    BubbleSeries.bubbleSizePropertyProperty = new dependencyObservable.Property("bubbleSizeProperty", "BubbleSeries", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, BubbleSeries.onBubbleSizePropertyPropertyChanged));
    return BubbleSeries;
})(CategoricalSeries);
exports.BubbleSeries = BubbleSeries;
var PieSeries = (function (_super) {
    __extends(PieSeries, _super);
    function PieSeries() {
        _super.call(this);
    }
    Object.defineProperty(PieSeries.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new initializersImpl.PieSeriesValueMapper();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieSeries.prototype, "android", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieSeries.prototype, "ios", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    PieSeries.onLegendLabelPropertyPropertyChanged = function (data) {
        var series = data.object;
        series.onLegendLabelPropertyChanged(data);
    };
    PieSeries.onExpandRadiusPropertyChanged = function (data) {
        var series = data.object;
        series.onExpandRadiusChanged(data);
    };
    PieSeries.onOuterRadiusFactorPropertyChanged = function (data) {
        var series = data.object;
        series.onOuterRadiusFactorChanged(data);
    };
    PieSeries.onStartAnglePropertyChanged = function (data) {
        var series = data.object;
        series.onStartAngleChanged(data);
    };
    PieSeries.onEndAnglePropertyChanged = function (data) {
        var series = data.object;
        series.onEndAngleChanged(data);
    };
    PieSeries.prototype.onLegendLabelPropertyChanged = function (data) {
        this.initializer.onLabelPropertyChanged(data, this);
    };
    PieSeries.prototype.onExpandRadiusChanged = function (data) {
        this.initializer.onExpandRadiusChanged(data, this);
    };
    PieSeries.prototype.onOuterRadiusFactorChanged = function (data) {
        this.initializer.onOuterRadiusFactorChanged(data, this);
    };
    PieSeries.prototype.onStartAngleChanged = function (data) {
        this.initializer.onStartAngleChanged(data, this);
    };
    PieSeries.prototype.onEndAngleChanged = function (data) {
        this.initializer.onEndAngleChanged(data, this);
    };
    Object.defineProperty(PieSeries.prototype, "expandRadius", {
        get: function () {
            return this._getValue(PieSeries.expandRadiusProperty);
        },
        set: function (value) {
            this._setValue(PieSeries.expandRadiusProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieSeries.prototype, "legendLabelProperty", {
        get: function () {
            return this._getValue(PieSeries.legendLabelPropertyProperty);
        },
        set: function (value) {
            this._setValue(PieSeries.legendLabelPropertyProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieSeries.prototype, "outerRadiusFactor", {
        get: function () {
            return this._getValue(PieSeries.outerRadiusFactorProperty);
        },
        set: function (value) {
            this._setValue(PieSeries.outerRadiusFactorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieSeries.prototype, "startAngle", {
        get: function () {
            return this._getValue(PieSeries.startAngleProperty);
        },
        set: function (value) {
            this._setValue(PieSeries.startAngleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieSeries.prototype, "endAngle", {
        get: function () {
            return this._getValue(PieSeries.endAngleProperty);
        },
        set: function (value) {
            this._setValue(PieSeries.endAngleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    PieSeries.legendLabelPropertyProperty = new dependencyObservable.Property("legendLabelProperty", "PieSeries", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, PieSeries.onLegendLabelPropertyPropertyChanged));
    PieSeries.expandRadiusProperty = new dependencyObservable.Property("expandRadius", "PieSeries", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, PieSeries.onExpandRadiusPropertyChanged));
    PieSeries.outerRadiusFactorProperty = new dependencyObservable.Property("outerRadiusFactor", "PieSeries", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, PieSeries.onOuterRadiusFactorPropertyChanged));
    PieSeries.startAngleProperty = new dependencyObservable.Property("startAngle", "PieSeries", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, PieSeries.onStartAnglePropertyChanged));
    PieSeries.endAngleProperty = new dependencyObservable.Property("endAngle", "PieSeries", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, PieSeries.onEndAnglePropertyChanged));
    return PieSeries;
})(ChartSeries);
exports.PieSeries = PieSeries;
var DonutSeries = (function (_super) {
    __extends(DonutSeries, _super);
    function DonutSeries() {
        _super.apply(this, arguments);
    }
    DonutSeries.onInnerRadiusFactorPropertyChanged = function (data) {
        var series = data.object;
        series.onInnerRadiusFactorChanged(data);
    };
    Object.defineProperty(DonutSeries.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new initializersImpl.DonutSeriesValueMapper();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    DonutSeries.prototype.onInnerRadiusFactorChanged = function (data) {
        this.initializer.onInnerRadiusFactorChanged(data, this);
    };
    Object.defineProperty(DonutSeries.prototype, "innerRadiusFactor", {
        get: function () {
            return this._getValue(DonutSeries.innerRadiusFactorProperty);
        },
        set: function (value) {
            this._setValue(DonutSeries.innerRadiusFactorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    DonutSeries.innerRadiusFactorProperty = new dependencyObservable.Property("innerRadiusFactor", "DonutSeries", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, DonutSeries.onInnerRadiusFactorPropertyChanged));
    return DonutSeries;
})(PieSeries);
exports.DonutSeries = DonutSeries;
var ScatterSeries = (function (_super) {
    __extends(ScatterSeries, _super);
    function ScatterSeries() {
        _super.apply(this, arguments);
    }
    ScatterSeries.onXPropertyPropertyChanged = function (data) {
        var series = data.object;
        series.onXPropertyPropertyChanged(data);
    };
    ScatterSeries.onYPropertyPropertyChanged = function (data) {
        var series = data.object;
        series.onYPropertyPropertyChanged(data);
    };
    ScatterSeries.prototype.onXPropertyPropertyChanged = function (data) {
        this.initializer.onXPropertyChanged(data, this);
    };
    ScatterSeries.prototype.onYPropertyPropertyChanged = function (data) {
        this.initializer.onYPropertyChanged(data, this);
    };
    ScatterSeries.prototype.onValuePropertyChanged = function (data) {
        console.log("WARNING: ValueProperty is not used for Scatter series. Use XProperty & YPropety instead.");
    };
    Object.defineProperty(ScatterSeries.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new initializersImpl.ScatterSeriesValueMapper();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterSeries.prototype, "xProperty", {
        get: function () {
            return this._getValue(ScatterSeries.xPropertyProperty);
        },
        set: function (value) {
            this._setValue(ScatterSeries.xPropertyProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterSeries.prototype, "yProperty", {
        get: function () {
            return this._getValue(ScatterSeries.yPropertyProperty);
        },
        set: function (value) {
            this._setValue(ScatterSeries.yPropertyProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    ScatterSeries.xPropertyProperty = new dependencyObservable.Property("xProperty", "ScatterSeries", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, ScatterSeries.onXPropertyPropertyChanged));
    ScatterSeries.yPropertyProperty = new dependencyObservable.Property("yProperty", "ScatterSeries", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, ScatterSeries.onYPropertyPropertyChanged));
    return ScatterSeries;
})(CartesianSeries);
exports.ScatterSeries = ScatterSeries;
var ScatterBubbleSeries = (function (_super) {
    __extends(ScatterBubbleSeries, _super);
    function ScatterBubbleSeries() {
        _super.apply(this, arguments);
    }
    ScatterBubbleSeries.onBubbleScalePropertyChanged = function (data) {
        var series = data.object;
        series.onBubbleScaleChanged(data);
    };
    ScatterBubbleSeries.prototype.onBubbleScaleChanged = function (data) {
        this.initializer.onBubbleScaleChanged(data, this);
    };
    ScatterBubbleSeries.onBubbleSizePropertyPropertyChanged = function (data) {
        var series = data.object;
        series.onBubbleSizePropertyChanged(data);
    };
    ScatterBubbleSeries.prototype.onBubbleSizePropertyChanged = function (data) {
        this.initializer.onBubbleSizePropertyChanged(data, this);
    };
    Object.defineProperty(ScatterBubbleSeries.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new initializersImpl.ScatterBubbleSeriesValueMapper();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterBubbleSeries.prototype, "bubbleScale", {
        get: function () {
            return this._getValue(ScatterBubbleSeries.bubbleScaleProperty);
        },
        set: function (value) {
            this._setValue(ScatterBubbleSeries.bubbleScaleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterBubbleSeries.prototype, "bubbleSizeProperty", {
        get: function () {
            return this._getValue(ScatterBubbleSeries.bubbleSizePropertyProperty);
        },
        set: function (value) {
            this._setValue(ScatterBubbleSeries.bubbleSizePropertyProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    ScatterBubbleSeries.bubbleScaleProperty = new dependencyObservable.Property("bubbleScale", "ScatterBubbleSeries", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, ScatterBubbleSeries.onBubbleScalePropertyChanged));
    ScatterBubbleSeries.bubbleSizePropertyProperty = new dependencyObservable.Property("bubbleSizeProperty", "ScatterBubbleSeries", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, ScatterBubbleSeries.onBubbleSizePropertyPropertyChanged));
    return ScatterBubbleSeries;
})(ScatterSeries);
exports.ScatterBubbleSeries = ScatterBubbleSeries;
var RadPieChart = (function (_super) {
    __extends(RadPieChart, _super);
    function RadPieChart() {
        _super.call(this);
    }
    return RadPieChart;
})(RadChartBase);
exports.RadPieChart = RadPieChart;
var Palette = (function (_super) {
    __extends(Palette, _super);
    function Palette() {
        _super.apply(this, arguments);
    }
    Palette.prototype._addArrayFromBuilder = function (name, value) {
        if (name === "entries") {
            this.entries = value;
        }
    };
    Object.defineProperty(Palette.prototype, "entries", {
        get: function () {
            return this._getValue(Palette.entriesProperty);
        },
        set: function (value) {
            this._setValue(Palette.entriesProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Palette.prototype, "seriesName", {
        get: function () {
            return this._getValue(Palette.seriesNameProperty);
        },
        set: function (value) {
            this._setValue(Palette.seriesNameProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Palette.entriesProperty = new dependencyObservable.Property("entries", "Palette", new proxyModule.PropertyMetadata(undefined, undefined, undefined));
    Palette.seriesNameProperty = new dependencyObservable.Property("seriesName", "Palette", new proxyModule.PropertyMetadata(undefined, undefined, undefined));
    return Palette;
})(bindableModule.Bindable);
exports.Palette = Palette;
var PaletteEntry = (function (_super) {
    __extends(PaletteEntry, _super);
    function PaletteEntry() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(PaletteEntry.prototype, "fillColor", {
        get: function () {
            return this._getValue(PaletteEntry.fillColorProperty);
        },
        set: function (value) {
            this._setValue(PaletteEntry.fillColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaletteEntry.prototype, "strokeColor", {
        get: function () {
            return this._getValue(PaletteEntry.strokeColorProperty);
        },
        set: function (value) {
            this._setValue(PaletteEntry.strokeColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaletteEntry.prototype, "strokeWidth", {
        get: function () {
            return this._getValue(PaletteEntry.strokeWidthProperty);
        },
        set: function (value) {
            this._setValue(PaletteEntry.strokeWidthProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    PaletteEntry.fillColorProperty = new dependencyObservable.Property("fillColor", "PaletteEntry", new proxyModule.PropertyMetadata(undefined, undefined, undefined));
    PaletteEntry.strokeWidthProperty = new dependencyObservable.Property("strokeWidth", "PaletteEntry", new proxyModule.PropertyMetadata(undefined, undefined, undefined));
    PaletteEntry.strokeColorProperty = new dependencyObservable.Property("strokeColor", "PaletteEntry", new proxyModule.PropertyMetadata(undefined, undefined, undefined));
    return PaletteEntry;
})(bindableModule.Bindable);
exports.PaletteEntry = PaletteEntry;
var RadCartesianChartGrid = (function (_super) {
    __extends(RadCartesianChartGrid, _super);
    function RadCartesianChartGrid() {
        _super.call(this);
    }
    Object.defineProperty(RadCartesianChartGrid.prototype, "verticalStripLinesVisible", {
        get: function () {
            return this._getValue(RadCartesianChartGrid.verticalStripLinesVisibleProperty);
        },
        set: function (value) {
            this._setValue(RadCartesianChartGrid.verticalStripLinesVisibleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadCartesianChartGrid.prototype, "horizontalStripLinesVisible", {
        get: function () {
            return this._getValue(RadCartesianChartGrid.horizontalStripLinesVisibleProperty);
        },
        set: function (value) {
            this._setValue(RadCartesianChartGrid.horizontalStripLinesVisibleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadCartesianChartGrid.prototype, "verticalLinesVisible", {
        get: function () {
            return this._getValue(RadCartesianChartGrid.verticalLinesVisibleProperty);
        },
        set: function (value) {
            this._setValue(RadCartesianChartGrid.verticalLinesVisibleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadCartesianChartGrid.prototype, "horizontalLinesVisible", {
        get: function () {
            return this._getValue(RadCartesianChartGrid.horizontalLinesVisibleProperty);
        },
        set: function (value) {
            this._setValue(RadCartesianChartGrid.horizontalLinesVisibleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadCartesianChartGrid.prototype, "horizontalStripLineColor", {
        get: function () {
            return this._getValue(RadCartesianChartGrid.horizontalStripLineColorProperty);
        },
        set: function (value) {
            this._setValue(RadCartesianChartGrid.horizontalStripLineColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadCartesianChartGrid.prototype, "verticalStripLineColor", {
        get: function () {
            return this._getValue(RadCartesianChartGrid.verticalStripLineColorProperty);
        },
        set: function (value) {
            this._setValue(RadCartesianChartGrid.verticalStripLineColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadCartesianChartGrid.prototype, "verticalStrokeWidth", {
        get: function () {
            return this._getValue(RadCartesianChartGrid.verticalStrokeWidthProperty);
        },
        set: function (value) {
            this._setValue(RadCartesianChartGrid.verticalStrokeWidthProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadCartesianChartGrid.prototype, "horizontalStrokeWidth", {
        get: function () {
            return this._getValue(RadCartesianChartGrid.horizontalStrokeWidthProperty);
        },
        set: function (value) {
            this._setValue(RadCartesianChartGrid.horizontalStrokeWidthProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadCartesianChartGrid.prototype, "verticalStrokeColor", {
        get: function () {
            return this._getValue(RadCartesianChartGrid.verticalStrokeColorProperty);
        },
        set: function (value) {
            this._setValue(RadCartesianChartGrid.verticalStrokeColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadCartesianChartGrid.prototype, "horizontalStrokeColor", {
        get: function () {
            return this._getValue(RadCartesianChartGrid.horizontalStrokeColorProperty);
        },
        set: function (value) {
            this._setValue(RadCartesianChartGrid.horizontalStrokeColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadCartesianChartGrid.prototype, "android", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadCartesianChartGrid.prototype, "ios", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    RadCartesianChartGrid.horizontalStripLinesVisibleChanged = function (data) {
        var grid = data.object;
        grid.onHorizontalStripLinesVisibleChanged(data);
    };
    RadCartesianChartGrid.prototype.onHorizontalStripLinesVisibleChanged = function (data) {
    };
    RadCartesianChartGrid.verticalStripLinesVisibleChanged = function (data) {
        var grid = data.object;
        grid.onVerticalStripLinesVisibleChanged(data);
    };
    RadCartesianChartGrid.prototype.onVerticalStripLinesVisibleChanged = function (data) {
    };
    RadCartesianChartGrid.verticalLinesVisibleChanged = function (data) {
        var grid = data.object;
        grid.onVerticalLinesVisibleChanged(data);
    };
    RadCartesianChartGrid.prototype.onVerticalLinesVisibleChanged = function (data) {
    };
    RadCartesianChartGrid.horizontalLinesVisibleChanged = function (data) {
        var grid = data.object;
        grid.onHorizontalLinesVisibleChanged(data);
    };
    RadCartesianChartGrid.prototype.onHorizontalLinesVisibleChanged = function (data) {
    };
    RadCartesianChartGrid.verticalStrokeColorChanged = function (data) {
        var grid = data.object;
        grid.onVerticalStrokeColorChanged(data);
    };
    RadCartesianChartGrid.prototype.onVerticalStrokeColorChanged = function (data) {
    };
    RadCartesianChartGrid.horizontalStrokeColorChanged = function (data) {
        var grid = data.object;
        grid.onHorizontalStrokeColorChanged(data);
    };
    RadCartesianChartGrid.prototype.onHorizontalStrokeColorChanged = function (data) {
    };
    RadCartesianChartGrid.horizontalStrokeWidthChanged = function (data) {
        var grid = data.object;
        grid.onHorizontalStrokeWidthChanged(data);
    };
    RadCartesianChartGrid.prototype.onHorizontalStrokeWidthChanged = function (data) {
    };
    RadCartesianChartGrid.verticalStrokeWidthChanged = function (data) {
        var grid = data.object;
        grid.onVerticalStrokeWidthChanged(data);
    };
    RadCartesianChartGrid.prototype.onVerticalStrokeWidthChanged = function (data) {
    };
    RadCartesianChartGrid.verticalStripLineColorChanged = function (data) {
        var grid = data.object;
        grid.onVerticalStripLineColorChanged(data);
    };
    RadCartesianChartGrid.prototype.onVerticalStripLineColorChanged = function (data) {
    };
    RadCartesianChartGrid.horizontalStripLineColorChanged = function (data) {
        var grid = data.object;
        grid.onHorizontalStripLineColorChanged(data);
    };
    RadCartesianChartGrid.prototype.onHorizontalStripLineColorChanged = function (data) {
    };
    RadCartesianChartGrid.horizontalStrokeColorProperty = new dependencyObservable.Property("horizontalStrokeColor", "RadCartesianChartGrid", new proxyModule.PropertyMetadata(undefined, undefined, RadCartesianChartGrid.horizontalStrokeColorChanged));
    RadCartesianChartGrid.verticalStrokeColorProperty = new dependencyObservable.Property("verticalStrokeColor", "RadCartesianChartGrid", new proxyModule.PropertyMetadata(undefined, undefined, RadCartesianChartGrid.verticalStrokeColorChanged));
    RadCartesianChartGrid.horizontalStrokeWidthProperty = new dependencyObservable.Property("horizontalStrokeWidth", "RadCartesianChartGrid", new proxyModule.PropertyMetadata(undefined, undefined, RadCartesianChartGrid.horizontalStrokeWidthChanged));
    RadCartesianChartGrid.verticalStrokeWidthProperty = new dependencyObservable.Property("verticalStrokeWidth", "RadCartesianChartGrid", new proxyModule.PropertyMetadata(undefined, undefined, RadCartesianChartGrid.verticalStrokeWidthChanged));
    RadCartesianChartGrid.verticalStripLineColorProperty = new dependencyObservable.Property("verticalStripLineColor", "RadCartesianChartGrid", new proxyModule.PropertyMetadata(undefined, undefined, RadCartesianChartGrid.verticalStripLineColorChanged));
    RadCartesianChartGrid.horizontalStripLineColorProperty = new dependencyObservable.Property("horizontalStripLineColor", "RadCartesianChartGrid", new proxyModule.PropertyMetadata(undefined, undefined, RadCartesianChartGrid.horizontalStripLineColorChanged));
    RadCartesianChartGrid.verticalLinesVisibleProperty = new dependencyObservable.Property("verticalLinesVisible", "RadCartesianChartGrid", new proxyModule.PropertyMetadata(true, undefined, RadCartesianChartGrid.verticalLinesVisibleChanged));
    RadCartesianChartGrid.horizontalLinesVisibleProperty = new dependencyObservable.Property("horizontalLinesVisible", "RadCartesianChartGrid", new proxyModule.PropertyMetadata(false, undefined, RadCartesianChartGrid.horizontalLinesVisibleChanged));
    RadCartesianChartGrid.verticalStripLinesVisibleProperty = new dependencyObservable.Property("verticalStripLinesVisible", "RadCartesianChartGrid", new proxyModule.PropertyMetadata(false, undefined, RadCartesianChartGrid.verticalStripLinesVisibleChanged));
    RadCartesianChartGrid.horizontalStripLinesVisibleProperty = new dependencyObservable.Property("horizontalStripLinesVisible", "RadCartesianChartGrid", new proxyModule.PropertyMetadata(false, undefined, RadCartesianChartGrid.horizontalStripLinesVisibleChanged));
    return RadCartesianChartGrid;
})(bindableModule.Bindable);
exports.RadCartesianChartGrid = RadCartesianChartGrid;
var CartesianChartAnnotation = (function (_super) {
    __extends(CartesianChartAnnotation, _super);
    function CartesianChartAnnotation() {
        _super.apply(this, arguments);
    }
    CartesianChartAnnotation.onAxisIdPropertyChanged = function (data) {
        var annotation = data.object;
        annotation.onAxisIdChanged(data);
    };
    CartesianChartAnnotation.onZPositionPropertyChanged = function (data) {
        var annotation = data.object;
        annotation.onZPositionChanged(data);
    };
    CartesianChartAnnotation.onHiddenPropertyChanged = function (data) {
        var annotation = data.object;
        annotation.onHiddenChanged(data);
    };
    CartesianChartAnnotation.onStrokeWidthPropertyChanged = function (data) {
        var annotation = data.object;
        annotation.onStrokeWidthChanged(data);
    };
    CartesianChartAnnotation.onStrokeColorPropertyChanged = function (data) {
        var annotation = data.object;
        annotation.onStrokeColorChanged(data);
    };
    CartesianChartAnnotation.onStrokeDashPatternPropertyChanged = function (data) {
        var annotation = data.object;
        annotation.onStrokeDashPatternChanged(data);
    };
    CartesianChartAnnotation.prototype.onAxisIdChanged = function (data) {
    };
    CartesianChartAnnotation.prototype.onZPositionChanged = function (data) {
    };
    CartesianChartAnnotation.prototype.onHiddenChanged = function (data) {
    };
    CartesianChartAnnotation.prototype.onStrokeWidthChanged = function (data) {
    };
    CartesianChartAnnotation.prototype.onStrokeColorChanged = function (data) {
    };
    CartesianChartAnnotation.prototype.onStrokeDashPatternChanged = function (data) {
    };
    CartesianChartAnnotation.prototype.onOwnerChanged = function () {
    };
    Object.defineProperty(CartesianChartAnnotation.prototype, "owner", {
        get: function () {
            return this._owner;
        },
        set: function (value) {
            this._owner = value;
            this.onOwnerChanged();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartesianChartAnnotation.prototype, "axisId", {
        get: function () {
            return this._getValue(CartesianChartAnnotation.axisIdProperty);
        },
        set: function (value) {
            this._setValue(CartesianChartAnnotation.axisIdProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartesianChartAnnotation.prototype, "zPosition", {
        get: function () {
            return this._getValue(CartesianChartAnnotation.zPositionProperty);
        },
        set: function (value) {
            this._setValue(CartesianChartAnnotation.zPositionProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartesianChartAnnotation.prototype, "hidden", {
        get: function () {
            return this._getValue(CartesianChartAnnotation.hiddenProperty);
        },
        set: function (value) {
            this._setValue(CartesianChartAnnotation.hiddenProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartesianChartAnnotation.prototype, "strokeWidth", {
        get: function () {
            return this._getValue(CartesianChartAnnotation.strokeWidthProperty);
        },
        set: function (value) {
            this._setValue(CartesianChartAnnotation.strokeWidthProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartesianChartAnnotation.prototype, "strokeColor", {
        get: function () {
            return this._getValue(CartesianChartAnnotation.strokeColorProperty);
        },
        set: function (value) {
            this._setValue(CartesianChartAnnotation.strokeColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartesianChartAnnotation.prototype, "strokeDashPattern", {
        get: function () {
            return this._getValue(CartesianChartAnnotation.strokeDashPatternProperty);
        },
        set: function (value) {
            this._setValue(CartesianChartAnnotation.strokeDashPatternProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    CartesianChartAnnotation.axisIdProperty = new dependencyObservable.Property("axisId", "CartesianChartAnnotation", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CartesianChartAnnotation.onAxisIdPropertyChanged));
    CartesianChartAnnotation.zPositionProperty = new dependencyObservable.Property("zPosition", "CartesianChartAnnotation", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CartesianChartAnnotation.onZPositionPropertyChanged));
    CartesianChartAnnotation.hiddenProperty = new dependencyObservable.Property("hidden", "CartesianChartAnnotation", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CartesianChartAnnotation.onHiddenPropertyChanged));
    CartesianChartAnnotation.strokeWidthProperty = new dependencyObservable.Property("strokeWidth", "CartesianChartAnnotation", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsStyle, CartesianChartAnnotation.onStrokeWidthPropertyChanged));
    CartesianChartAnnotation.strokeColorProperty = new dependencyObservable.Property("strokeColor", "CartesianChartAnnotation", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsStyle, CartesianChartAnnotation.onStrokeColorPropertyChanged));
    CartesianChartAnnotation.strokeDashPatternProperty = new dependencyObservable.Property("strokeDashPattern", "CartesianChartAnnotation", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsStyle, CartesianChartAnnotation.onStrokeDashPatternPropertyChanged));
    return CartesianChartAnnotation;
})(bindableModule.Bindable);
exports.CartesianChartAnnotation = CartesianChartAnnotation;
var ChartGridLineAnnotation = (function (_super) {
    __extends(ChartGridLineAnnotation, _super);
    function ChartGridLineAnnotation() {
        _super.apply(this, arguments);
    }
    ChartGridLineAnnotation.onValuePropertyChanged = function (data) {
        var annotation = data.object;
        annotation.onValueChanged(data);
    };
    ChartGridLineAnnotation.prototype.onValueChanged = function (data) {
    };
    Object.defineProperty(ChartGridLineAnnotation.prototype, "value", {
        get: function () {
            return this._getValue(ChartGridLineAnnotation.valueProperty);
        },
        set: function (value) {
            this._setValue(ChartGridLineAnnotation.valueProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    ChartGridLineAnnotation.valueProperty = new dependencyObservable.Property("value", "ChartGridLineAnnotation", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, ChartGridLineAnnotation.onValuePropertyChanged));
    return ChartGridLineAnnotation;
})(CartesianChartAnnotation);
exports.ChartGridLineAnnotation = ChartGridLineAnnotation;
var ChartPlotBandAnnotation = (function (_super) {
    __extends(ChartPlotBandAnnotation, _super);
    function ChartPlotBandAnnotation() {
        _super.apply(this, arguments);
    }
    ChartPlotBandAnnotation.onMinValuePropertyChanged = function (data) {
        var annotation = data.object;
        annotation.onMinValueChanged(data);
    };
    ChartPlotBandAnnotation.onMaxValuePropertyChanged = function (data) {
        var annotation = data.object;
        annotation.onMaxValueChanged(data);
    };
    ChartPlotBandAnnotation.onFillColorPropertyChanged = function (data) {
        var annotation = data.object;
        annotation.onFillColorChanged(data);
    };
    ChartPlotBandAnnotation.prototype.onMinValueChanged = function (data) {
    };
    ChartPlotBandAnnotation.prototype.onMaxValueChanged = function (data) {
    };
    ChartPlotBandAnnotation.prototype.onFillColorChanged = function (data) {
    };
    Object.defineProperty(ChartPlotBandAnnotation.prototype, "minValue", {
        get: function () {
            return this._getValue(ChartPlotBandAnnotation.minValueProperty);
        },
        set: function (value) {
            this._setValue(ChartPlotBandAnnotation.minValueProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartPlotBandAnnotation.prototype, "maxValue", {
        get: function () {
            return this._getValue(ChartPlotBandAnnotation.maxValueProperty);
        },
        set: function (value) {
            this._setValue(ChartPlotBandAnnotation.maxValueProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartPlotBandAnnotation.prototype, "fillColor", {
        get: function () {
            return this._getValue(ChartPlotBandAnnotation.fillColorProperty);
        },
        set: function (value) {
            this._setValue(ChartPlotBandAnnotation.fillColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    ChartPlotBandAnnotation.minValueProperty = new dependencyObservable.Property("minValue", "ChartPlotBandAnnotation", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, ChartPlotBandAnnotation.onMinValuePropertyChanged));
    ChartPlotBandAnnotation.maxValueProperty = new dependencyObservable.Property("maxValue", "ChartPlotBandAnnotation", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, ChartPlotBandAnnotation.onMaxValuePropertyChanged));
    ChartPlotBandAnnotation.fillColorProperty = new dependencyObservable.Property("fillColor", "ChartPlotBandAnnotation", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsStyle, ChartPlotBandAnnotation.onFillColorPropertyChanged));
    return ChartPlotBandAnnotation;
})(CartesianChartAnnotation);
exports.ChartPlotBandAnnotation = ChartPlotBandAnnotation;
