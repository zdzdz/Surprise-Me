var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var chartCommonModule = require("./chart-common");
var colorModule = require("color");
var utilsModule = require("utils/utils");
var ChartBaseValueMapper = (function () {
    function ChartBaseValueMapper() {
    }
    ChartBaseValueMapper.prototype.onLegendChanged = function (data, chart) {
        if (!chart.legend) {
            if (chart.rootLayout) {
                chart.rootLayout.removeAllViews();
            }
            if (chart.androidView) {
                chart.rootLayout.addView(chart.androidView);
            }
        }
    };
    ChartBaseValueMapper.prototype.onPalettesChanged = function (data, chart) {
        var newPalettes = data.newValue;
        this.loadPalette(newPalettes, chart);
    };
    ChartBaseValueMapper.prototype.loadPalette = function (palettes, chart) {
        if (!chart.androidView) {
            return;
        }
        chart.androidView.setPalette(com.telerik.widget.palettes.ChartPalettes.light());
        var nativePalette = chart.androidView.getPalette().clone();
        if (chart.palettes) {
            for (var i = 0; i < chart.series.length; i++) {
                var entriesForSeries = this.getPaletteForSeries(palettes, chart.series[i]);
                if (entriesForSeries) {
                    this.applyPaletteToSeries(entriesForSeries, chart.series[i], nativePalette);
                }
            }
        }
        chart.androidView.setPalette(nativePalette);
        chart.androidView.setSelectionPalette(nativePalette);
    };
    ChartBaseValueMapper.prototype.getPaletteForSeries = function (source, series) {
        for (var i = 0; i < source.length; i++) {
            var palette = source[i];
            if (palette.seriesName === series[chartCommonModule.seriesName]) {
                return palette;
            }
        }
    };
    ChartBaseValueMapper.prototype.applyPaletteToSeries = function (palette, series, nativePalette) {
        var nativeEntries = new com.telerik.widget.palettes.PaletteEntryCollection();
        nativeEntries.setFamily(series.android.paletteFamily());
        for (var i = 0; i < palette.entries.length; i++) {
            var paletteEntry = palette.entries[i];
            var nativeEntry = new com.telerik.widget.palettes.PaletteEntry();
            if (paletteEntry.strokeWidth) {
                nativeEntry.setStrokeWidth(paletteEntry.strokeWidth);
            }
            if (paletteEntry.strokeColor) {
                nativeEntry.setStroke((new colorModule.Color(paletteEntry.strokeColor)).android);
            }
            if (paletteEntry.fillColor) {
                nativeEntry.setFill((new colorModule.Color(paletteEntry.fillColor)).android);
            }
            nativeEntries.add(nativeEntry);
        }
        var nativeSeriesEntries = nativePalette.seriesEntries();
        for (var i = 0; i < nativeSeriesEntries.size(); i++) {
            var entryCollection = nativeSeriesEntries.get(i);
            if (entryCollection.getFamily() === series.android.paletteFamily()) {
                nativeSeriesEntries.remove(entryCollection);
                nativeSeriesEntries.add(nativeEntries);
                break;
            }
        }
    };
    ChartBaseValueMapper.prototype.onSeriesChanged = function (data, chart) {
        if (data.oldValue) {
            if (chart.androidView) {
                for (var serieIndex = 0; data.oldValue.length; serieIndex++) {
                    if (chart.androidView.getSeries().indexOf(data.oldValue[serieIndex].android) !== -1) {
                        chart.androidView.getSeries().remove(data.oldValue[serieIndex].android);
                    }
                }
            }
        }
        this.loadSeries(chart);
    };
    ChartBaseValueMapper.prototype.loadSeries = function (chart) {
        if (chart.androidView && chart.series) {
            for (var i = 0; i < chart.series.length; i++) {
                chart.androidView.getSeries().add(chart.series[i].android);
            }
            if (chart.palettes) {
                this.loadPalette(chart.palettes, chart);
            }
            for (var i = 0; i < chart.series.length; i++) {
                chart.series[i].initializer.applyLabelStyle(chart.series[i], chart);
            }
            for (var i = 0; i < chart.series.length; i++) {
                this.setAxisPaletteValues(chart.series[i].horizontalAxis, "HorizontalAxis", chart);
                this.setAxisPaletteValues(chart.series[i].verticalAxis, "VerticalAxis", chart);
            }
        }
    };
    ChartBaseValueMapper.prototype.loadAnnotations = function (chart) {
        if (chart.androidView && chart.annotations) {
            for (var i = 0; i < chart.annotations.length; i++) {
                chart.androidView.getAnnotations().add(chart.annotations[i].android);
            }
        }
    };
    ChartBaseValueMapper.prototype.onAnnotationsChanged = function (data, chart) {
    };
    ChartBaseValueMapper.prototype.onSelectionModeChanged = function (data, chart) {
    };
    ChartBaseValueMapper.prototype.updateHorizontalAxisPalette = function (chart) {
        if (chart instanceof chartCommonModule.RadCartesianChart) {
            this.setAxisPaletteValues(chart.horizontalAxis, "HorizontalAxis", chart);
        }
    };
    ChartBaseValueMapper.prototype.updateVerticalAxisPalette = function (chart) {
        if (chart instanceof chartCommonModule.RadCartesianChart) {
            this.setAxisPaletteValues(chart.verticalAxis, "VerticalAxis", chart);
        }
    };
    ChartBaseValueMapper.prototype.setAxisPaletteValues = function (axis, paletteName, chart) {
        if (!chart || !axis) {
            return;
        }
        var nativePalette = chart.androidView.getPalette().clone();
        var nativePaletteEntry = nativePalette.getEntry(paletteName ? paletteName : "HorizontalAxis");
        if (nativePaletteEntry) {
            if (!axis.labelTextColor) {
                axis.labelTextColor = nativePaletteEntry.getCustomValue("LabelColor");
            }
            if (!axis.lineColor) {
                axis.lineColor = nativePaletteEntry.getCustomValue("LineColor");
            }
            if (!axis.lineThickness) {
                axis.lineThickness = parseInt(nativePaletteEntry.getCustomValue("LineTickness", "2"));
            }
            if (!axis.labelSize) {
                axis.labelSize = parseInt(nativePaletteEntry.getCustomValue("LabelSize", "12"));
            }
        }
    };
    return ChartBaseValueMapper;
})();
exports.ChartBaseValueMapper = ChartBaseValueMapper;
var CartesianAxisValueMapper = (function () {
    function CartesianAxisValueMapper() {
    }
    CartesianAxisValueMapper.prototype.onLineThicknessChanged = function (data, axis) {
        if (data.newValue) {
            axis.android.setLineThickness(data.newValue * utilsModule.layout.getDisplayDensity());
        }
    };
    CartesianAxisValueMapper.prototype.onLineColorChanged = function (data, axis) {
        if (data.newValue) {
            axis.android.setLineColor((new colorModule.Color(data.newValue)).android);
        }
    };
    CartesianAxisValueMapper.prototype.onLabelTextColorChanged = function (data, axis) {
        if (data.newValue) {
            axis.android.setLabelTextColor((new colorModule.Color(data.newValue)).android);
        }
    };
    CartesianAxisValueMapper.prototype.onLabelMarginChanged = function (data, axis) {
        if (data.newValue) {
            axis.android.setLabelMargin(data.newValue);
        }
    };
    CartesianAxisValueMapper.prototype.onLabelRotationAngleChanged = function (data, axis) {
        if (data.newValue) {
            var M_PI = 3.14159265358979323846264338327950288;
            axis.android.setLabelRotationAngle(data.newValue * 180 / M_PI);
        }
    };
    CartesianAxisValueMapper.prototype.onLabelFitModeChanged = function (data, axis) {
        if (data.newValue) {
            if (chartCommonModule.AxisLabelFitMode.Multiline === data.newValue) {
                axis.android.setLabelFitMode(com.telerik.widget.chart.engine.axes.common.AxisLabelFitMode.MULTI_LINE);
            }
            else if (chartCommonModule.AxisLabelFitMode.Rotate === data.newValue) {
                axis.android.setLabelFitMode(com.telerik.widget.chart.engine.axes.common.AxisLabelFitMode.ROTATE);
            }
            else {
                axis.android.setLabelFitMode(com.telerik.widget.chart.engine.axes.common.AxisLabelFitMode.NONE);
            }
        }
    };
    CartesianAxisValueMapper.prototype.onLabelFormatChanged = function (data, axis) {
        if (data.newValue) {
            axis.android.setLabelFormat(java.lang.String.valueOf(data.newValue));
        }
    };
    CartesianAxisValueMapper.prototype.onHorizontalLocationChanged = function (data, axis) {
        if (data.newValue) {
            if (chartCommonModule.AxisHorizontalLocation.Left === data.newValue) {
                axis.android.setHorizontalLocation(com.telerik.widget.chart.engine.axes.common.AxisHorizontalLocation.LEFT);
            }
            else if (chartCommonModule.AxisHorizontalLocation.Right === data.newValue) {
                axis.android.setHorizontalLocation(com.telerik.widget.chart.engine.axes.common.AxisHorizontalLocation.RIGHT);
            }
        }
    };
    CartesianAxisValueMapper.prototype.onVerticalLocationChanged = function (data, axis) {
        if (data.newValue) {
            if (chartCommonModule.AxisVerticalLocation.Top === data.newValue) {
                axis.android.setVerticalLocation(com.telerik.widget.chart.engine.axes.common.AxisVerticalLocation.TOP);
            }
            else if (chartCommonModule.AxisVerticalLocation.Bottom === data.newValue) {
                axis.android.setVerticalLocation(com.telerik.widget.chart.engine.axes.common.AxisVerticalLocation.BOTTOM);
            }
        }
    };
    CartesianAxisValueMapper.prototype.onLabelSizeChanged = function (data, axis) {
        if (data.newValue) {
            axis.android.setLabelSize(data.newValue * utilsModule.layout.getDisplayDensity());
        }
    };
    CartesianAxisValueMapper.prototype.onAllowZoomChanged = function (data, axis) {
    };
    CartesianAxisValueMapper.prototype.onAllowPanChanged = function (data, axis) {
    };
    return CartesianAxisValueMapper;
})();
exports.CartesianAxisValueMapper = CartesianAxisValueMapper;
var CategoricalAxisValueMapper = (function (_super) {
    __extends(CategoricalAxisValueMapper, _super);
    function CategoricalAxisValueMapper() {
        _super.apply(this, arguments);
    }
    CategoricalAxisValueMapper.prototype.onMajorTickIntervalChanged = function (data, axis) {
        if (data.newValue) {
            axis.android.setMajorTickInterval(java.lang.Integer.valueOf(data.newValue));
        }
    };
    CategoricalAxisValueMapper.prototype.onPlotModeChanged = function (data, axis) {
        if (data.newValue) {
            if (chartCommonModule.AxisPlotMode.BetweenTicks === data.newValue) {
                axis.android.setPlotMode(com.telerik.widget.chart.engine.axes.common.AxisPlotMode.BETWEEN_TICKS);
            }
            else if (chartCommonModule.AxisPlotMode.OnTicks === data.newValue) {
                axis.android.setPlotMode(com.telerik.widget.chart.engine.axes.common.AxisPlotMode.ON_TICKS);
            }
        }
    };
    return CategoricalAxisValueMapper;
})(CartesianAxisValueMapper);
exports.CategoricalAxisValueMapper = CategoricalAxisValueMapper;
var ChartSeriesValueMapper = (function () {
    function ChartSeriesValueMapper() {
    }
    ChartSeriesValueMapper.prototype.onShowLabelsChanged = function (data, series) {
        if (!data.newValue) {
            return;
        }
        series.android.setShowLabels(data.newValue);
    };
    ChartSeriesValueMapper.prototype.onLegendTitleChanged = function (data, series) {
        series.android.setLegendTitle(data.newValue);
    };
    ChartSeriesValueMapper.prototype.onItemsChanged = function (data, series) {
        if (!series.items || !series.items.length) {
            return;
        }
        var length = series.items.length;
        var nativeSource = new java.util.ArrayList();
        for (var i = 0; i < length; i++) {
            var item = series.items[i];
            nativeSource.add(java.lang.String.valueOf(JSON.stringify(item)));
        }
        series.android.setData(nativeSource);
    };
    ChartSeriesValueMapper.prototype.onValuePropertyChanged = function (data, series) {
        if (!series.valueProperty) {
            return;
        }
        series.android.setValueBinding(new com.telerik.widget.chart.engine.databinding.GenericDataPointBinding(new com.telerik.android.common.Function({
            apply: function (arg) {
                var item = JSON.parse(arg);
                return item[series.valueProperty];
            }
        })));
    };
    ChartSeriesValueMapper.prototype.onLabelStyleChanged = function (data, series) { };
    ChartSeriesValueMapper.prototype.onSelectionModeChanged = function (data, series) { };
    ChartSeriesValueMapper.prototype.applyLabelStyle = function (series, chart) {
        if (!series || !series.labelStyle) {
            return;
        }
        if (series.labelStyle.textSize) {
            series.android.setLabelSize(series.labelStyle.textSize * utilsModule.layout.getDisplayDensity());
        }
        if (series.labelStyle.fillColor) {
            series.android.setLabelFillColor((new colorModule.Color(series.labelStyle.fillColor)).android);
        }
        if (series.labelStyle.strokeColor) {
            series.android.setLabelStrokeColor((new colorModule.Color(series.labelStyle.strokeColor)).android);
        }
        if (series.labelStyle.margin) {
            series.android.setLabelMargin(series.labelStyle.margin * utilsModule.layout.getDisplayDensity());
        }
        if (series.labelStyle.textFormat) {
            series.android.setLabelFormat(series.labelStyle.textFormat);
        }
        var fontStyle = android.graphics.Typeface.NORMAL;
        if (series.labelStyle.fontStyle) {
            switch (chartCommonModule.FontStyles[series.labelStyle.fontStyle]) {
                case chartCommonModule.FontStyles.Bold:
                    fontStyle = android.graphics.Typeface.BOLD;
                    break;
                case chartCommonModule.FontStyles.Italic:
                    fontStyle = android.graphics.Typeface.ITALIC;
                    break;
                case chartCommonModule.FontStyles.BoldItalic:
                    fontStyle = android.graphics.Typeface.BOLD_ITALIC;
                    break;
            }
        }
        if (series.labelStyle.fontName) {
            series.android.setLabelFont(android.graphics.Typeface.create(series.labelStyle.fontName, fontStyle));
        }
        if (series.labelStyle.textColor) {
            series.android.setLabelTextColor((new colorModule.Color(series.labelStyle.textColor)).android);
        }
    };
    return ChartSeriesValueMapper;
})();
exports.ChartSeriesValueMapper = ChartSeriesValueMapper;
var CartesianSeriesValueMapper = (function (_super) {
    __extends(CartesianSeriesValueMapper, _super);
    function CartesianSeriesValueMapper() {
        _super.apply(this, arguments);
    }
    CartesianSeriesValueMapper.prototype.onHorizontalAxisChanged = function (data, series) {
        series.android.setHorizontalAxis(null);
        series.android.setHorizontalAxis(data.newValue.android);
    };
    CartesianSeriesValueMapper.prototype.onVerticalAxisChanged = function (data, series) {
        series.android.setVerticalAxis(null);
        series.android.setVerticalAxis(data.newValue.android);
    };
    return CartesianSeriesValueMapper;
})(ChartSeriesValueMapper);
exports.CartesianSeriesValueMapper = CartesianSeriesValueMapper;
var ScatterSeriesValueMapper = (function (_super) {
    __extends(ScatterSeriesValueMapper, _super);
    function ScatterSeriesValueMapper() {
        _super.apply(this, arguments);
    }
    ScatterSeriesValueMapper.prototype.onXPropertyChanged = function (data, series) {
        if (!series.xProperty) {
            return;
        }
        var xPropName = series.xProperty;
        series.android.setXValueBinding(new com.telerik.widget.chart.engine.databinding.GenericDataPointBinding(new com.telerik.android.common.Function({
            apply: function (arg) {
                var item = JSON.parse(arg);
                return item[xPropName];
            }
        })));
    };
    ScatterSeriesValueMapper.prototype.onYPropertyChanged = function (data, series) {
        if (!series.yProperty) {
            return;
        }
        var yPropName = series.yProperty;
        series.android.setYValueBinding(new com.telerik.widget.chart.engine.databinding.GenericDataPointBinding(new com.telerik.android.common.Function({
            apply: function (arg) {
                var item = JSON.parse(arg);
                return item[yPropName];
            }
        })));
    };
    return ScatterSeriesValueMapper;
})(CartesianSeriesValueMapper);
exports.ScatterSeriesValueMapper = ScatterSeriesValueMapper;
var ScatterBubbleSeriesValueMapper = (function (_super) {
    __extends(ScatterBubbleSeriesValueMapper, _super);
    function ScatterBubbleSeriesValueMapper() {
        _super.apply(this, arguments);
    }
    ScatterBubbleSeriesValueMapper.prototype.onBubbleSizePropertyChanged = function (data, series) {
        if (!series.bubbleSizeProperty) {
            return;
        }
        var propertyName = series.bubbleSizeProperty;
        var binding = new com.telerik.widget.chart.engine.databinding.GenericDataPointBinding(new com.telerik.android.common.Function({
            apply: function (arg) {
                var item = JSON.parse(arg);
                return item[propertyName];
            }
        }));
        series.android.setBubbleSizeBinding(binding);
    };
    ScatterBubbleSeriesValueMapper.prototype.onBubbleScaleChanged = function (data, series) {
        if (data.newValue) {
            //todo: we use (scale^4) because of bug in Android scale calculation. Update this hack when it is fixed.
            series.android.setBubbleScale(data.newValue * data.newValue * data.newValue * data.newValue);
        }
    };
    return ScatterBubbleSeriesValueMapper;
})(ScatterSeriesValueMapper);
exports.ScatterBubbleSeriesValueMapper = ScatterBubbleSeriesValueMapper;
var CategoricalSeriesValueMapper = (function (_super) {
    __extends(CategoricalSeriesValueMapper, _super);
    function CategoricalSeriesValueMapper() {
        _super.apply(this, arguments);
    }
    CategoricalSeriesValueMapper.prototype.onCategoryPropertyPropertyChanged = function (data, series) {
        if (!series.categoryProperty) {
            return;
        }
        series.android.setCategoryBinding(new com.telerik.widget.chart.engine.databinding.GenericDataPointBinding(new com.telerik.android.common.Function({
            apply: function (arg) {
                var item = JSON.parse(arg);
                return item[series.categoryProperty];
            }
        })));
    };
    CategoricalSeriesValueMapper.prototype.onStackModePropertyChanged = function (data, series) {
        if (!data.newValue) {
            return;
        }
        switch (data.newValue) {
            case chartCommonModule.SeriesStackMode.None:
                series.android.setCombineMode(com.telerik.widget.chart.engine.series.combination.ChartSeriesCombineMode.CLUSTER);
                break;
            case chartCommonModule.SeriesStackMode.Stack:
                series.android.setCombineMode(com.telerik.widget.chart.engine.series.combination.ChartSeriesCombineMode.STACK);
                break;
            case chartCommonModule.SeriesStackMode.Stack100:
                series.android.setCombineMode(com.telerik.widget.chart.engine.series.combination.ChartSeriesCombineMode.STACK_100);
                break;
        }
    };
    return CategoricalSeriesValueMapper;
})(CartesianSeriesValueMapper);
exports.CategoricalSeriesValueMapper = CategoricalSeriesValueMapper;
var PieSeriesValueMapper = (function (_super) {
    __extends(PieSeriesValueMapper, _super);
    function PieSeriesValueMapper() {
        _super.apply(this, arguments);
    }
    PieSeriesValueMapper.prototype.onLabelPropertyChanged = function (data, series) {
        if (!series.legendLabelProperty) {
            return;
        }
        //todo: implement custom label renderer with support for custom label property value
    };
    PieSeriesValueMapper.prototype.onLegendTitleChanged = function (data, series) {
    };
    PieSeriesValueMapper.prototype.onExpandRadiusChanged = function (data, series) {
        if (!data.newValue) {
            return;
        }
        series.android.setSelectedPointOffset(data.newValue - 1);
    };
    PieSeriesValueMapper.prototype.onOuterRadiusFactorChanged = function (data, series) {
        if (!data.newValue) {
            return;
        }
        series.android.setRadiusFactor(data.newValue);
    };
    PieSeriesValueMapper.prototype.onStartAngleChanged = function (data, series) {
        if (!isNaN(+data.newValue)) {
            series.android.setAngleRange(new com.telerik.widget.chart.engine.chartAreas.AngleRange(data.newValue, series.endAngle ? series.endAngle : 360));
        }
    };
    PieSeriesValueMapper.prototype.onEndAngleChanged = function (data, series) {
        if (!isNaN(+data.newValue)) {
            series.android.setAngleRange(new com.telerik.widget.chart.engine.chartAreas.AngleRange(series.startAngle ? series.startAngle : 0, data.newValue));
        }
    };
    return PieSeriesValueMapper;
})(ChartSeriesValueMapper);
exports.PieSeriesValueMapper = PieSeriesValueMapper;
var DonutSeriesValueMapper = (function (_super) {
    __extends(DonutSeriesValueMapper, _super);
    function DonutSeriesValueMapper() {
        _super.apply(this, arguments);
    }
    DonutSeriesValueMapper.prototype.onInnerRadiusFactorChanged = function (data, series) {
        if (!data.newValue) {
            return;
        }
        series.android.setInnerRadiusFactor(data.newValue);
    };
    return DonutSeriesValueMapper;
})(PieSeriesValueMapper);
exports.DonutSeriesValueMapper = DonutSeriesValueMapper;
