var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var dependencyObservable = require("ui/core/dependency-observable");
var proxy = require("ui/core/proxy");
var view = require("ui/core/view");
var CalendarViewMode;
(function (CalendarViewMode) {
    CalendarViewMode.Week = "Week";
    CalendarViewMode.Month = "Month";
    CalendarViewMode.MonthNames = "MonthNames";
    CalendarViewMode.Year = "Year";
})(CalendarViewMode = exports.CalendarViewMode || (exports.CalendarViewMode = {}));
var CalendarSelectionMode;
(function (CalendarSelectionMode) {
    CalendarSelectionMode.None = "None";
    CalendarSelectionMode.Single = "Single";
    CalendarSelectionMode.Multiple = "Multiple";
    CalendarSelectionMode.Range = "Range";
})(CalendarSelectionMode = exports.CalendarSelectionMode || (exports.CalendarSelectionMode = {}));
var DateRange = (function () {
    function DateRange(startDate, endDate) {
        this._startDate = startDate;
        this._endDate = endDate;
    }
    Object.defineProperty(DateRange.prototype, "startDate", {
        get: function () {
            return this._startDate;
        },
        set: function (value) {
            this._startDate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateRange.prototype, "endDate", {
        get: function () {
            return this._endDate;
        },
        set: function (value) {
            this._endDate = value;
        },
        enumerable: true,
        configurable: true
    });
    return DateRange;
})();
exports.DateRange = DateRange;
var CalendarEvent = (function () {
    function CalendarEvent(title, startDate, endDate) {
    }
    CalendarEvent.prototype.getNativeInstance = function () {
        return undefined;
    };
    Object.defineProperty(CalendarEvent.prototype, "title", {
        get: function () {
            return this._getTitle();
        },
        set: function (value) {
            this._setTitle(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarEvent.prototype, "startDate", {
        get: function () {
            return this._getStartDate();
        },
        set: function (value) {
            this._setStartDate(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarEvent.prototype, "endDate", {
        get: function () {
            return this._getEndDate();
        },
        set: function (value) {
            this._setEndDate(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarEvent.prototype, "isAllDay", {
        get: function () {
            return this._getIsAllDay();
        },
        set: function (value) {
            this._setIsAllDay(value);
        },
        enumerable: true,
        configurable: true
    });
    CalendarEvent.prototype._setIsAllDay = function (value) { };
    CalendarEvent.prototype._getIsAllDay = function () {
        return false;
    };
    CalendarEvent.prototype._setEndDate = function (date) { };
    CalendarEvent.prototype._getEndDate = function () {
        return undefined;
    };
    CalendarEvent.prototype._setStartDate = function (date) { };
    CalendarEvent.prototype._getStartDate = function () {
        return undefined;
    };
    CalendarEvent.prototype._setTitle = function (value) { };
    CalendarEvent.prototype._getTitle = function () {
        return undefined;
    };
    return CalendarEvent;
})();
exports.CalendarEvent = CalendarEvent;
// <EventDataDefinitions>
var CalendarViewModeChangedEventData = (function () {
    function CalendarViewModeChangedEventData() {
    }
    return CalendarViewModeChangedEventData;
})();
exports.CalendarViewModeChangedEventData = CalendarViewModeChangedEventData;
var CalendarSelectionEventData = (function () {
    function CalendarSelectionEventData() {
    }
    return CalendarSelectionEventData;
})();
exports.CalendarSelectionEventData = CalendarSelectionEventData;
var CalendarSelectingEventData = (function () {
    function CalendarSelectingEventData() {
    }
    return CalendarSelectingEventData;
})();
exports.CalendarSelectingEventData = CalendarSelectingEventData;
var CalendarNavigationEventData = (function () {
    function CalendarNavigationEventData() {
    }
    return CalendarNavigationEventData;
})();
exports.CalendarNavigationEventData = CalendarNavigationEventData;
// </EventDataDefinitions>
var RadCalendar = (function (_super) {
    __extends(RadCalendar, _super);
    function RadCalendar() {
        _super.call(this);
        // this.selectionMode = CalendarSelectionMode.Single;
    }
    Object.defineProperty(RadCalendar.prototype, "android", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadCalendar.prototype, "ios", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    RadCalendar.onMinDatePropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onMinDatePropertyChanged(eventData);
    };
    Object.defineProperty(RadCalendar.prototype, "minDate", {
        get: function () {
            return this._getValue(RadCalendar.minDateProperty);
        },
        set: function (value) {
            this._setValue(RadCalendar.minDateProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    RadCalendar.onMaxDatePropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onMaxDatePropertyChanged(eventData);
    };
    Object.defineProperty(RadCalendar.prototype, "maxDate", {
        get: function () {
            return this._getValue(RadCalendar.maxDateProperty);
        },
        set: function (value) {
            this._setValue(RadCalendar.maxDateProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    RadCalendar.onSelectedDatePropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onSelectedDatePropertyChanged(eventData);
    };
    Object.defineProperty(RadCalendar.prototype, "selectedDate", {
        get: function () {
            return this._getValue(RadCalendar.selectedDateProperty);
        },
        set: function (value) {
            this._setValue(RadCalendar.selectedDateProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    RadCalendar.onSelectedDatesPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onSelectedDatesPropertyChanged(eventData);
    };
    Object.defineProperty(RadCalendar.prototype, "selectedDates", {
        get: function () {
            return this._getValue(RadCalendar.selectedDatesProperty);
        },
        set: function (value) {
            this._setValue(RadCalendar.selectedDatesProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    RadCalendar.onSelectedDateRangePropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onSelectedDateRangePropertyChanged(eventData);
    };
    Object.defineProperty(RadCalendar.prototype, "selectedDateRange", {
        get: function () {
            return this._getValue(RadCalendar.selectedDateRangeProperty);
        },
        set: function (value) {
            this._setValue(RadCalendar.selectedDateRangeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    RadCalendar.onViewModePropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onViewModePropertyChanged(eventData);
    };
    Object.defineProperty(RadCalendar.prototype, "viewMode", {
        get: function () {
            return this._getValue(RadCalendar.viewModeProperty);
        },
        set: function (value) {
            this._setValue(RadCalendar.viewModeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    RadCalendar.onSelectionModePropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onSelectionModePropertyChanged(eventData);
    };
    Object.defineProperty(RadCalendar.prototype, "selectionMode", {
        get: function () {
            return this._getValue(RadCalendar.selectionModeProperty);
        },
        set: function (value) {
            this._setValue(RadCalendar.selectionModeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    RadCalendar.onDisplayedDatePropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onDisplayedDatePropertyChanged(eventData);
    };
    Object.defineProperty(RadCalendar.prototype, "displayedDate", {
        get: function () {
            return this._getValue(RadCalendar.displayedDateProperty);
        },
        set: function (value) {
            this._setValue(RadCalendar.displayedDateProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    RadCalendar.onEventSourcePropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onEventSourcePropertyChanged(eventData);
    };
    Object.defineProperty(RadCalendar.prototype, "eventSource", {
        get: function () {
            return this._getValue(RadCalendar.eventSourceProperty);
        },
        set: function (value) {
            this._setValue(RadCalendar.eventSourceProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    RadCalendar.prototype.reload = function () { };
    RadCalendar.prototype.navigateForward = function () { };
    RadCalendar.prototype.navigateBack = function () { };
    RadCalendar.prototype.goToDate = function (date) { };
    RadCalendar.prototype.getEventsForDate = function (date) {
        return undefined;
    };
    RadCalendar.prototype._onDisplayedDatePropertyChanged = function (eventData) { };
    ;
    RadCalendar.prototype._onSelectionModePropertyChanged = function (eventData) { };
    ;
    RadCalendar.prototype._onViewModePropertyChanged = function (eventData) { };
    ;
    RadCalendar.prototype._onSelectedDateRangePropertyChanged = function (eventData) { };
    ;
    RadCalendar.prototype._onSelectedDatesPropertyChanged = function (eventData) { };
    ;
    RadCalendar.prototype._onSelectedDatePropertyChanged = function (eventData) { };
    ;
    RadCalendar.prototype._onMaxDatePropertyChanged = function (eventData) { };
    ;
    RadCalendar.prototype._onMinDatePropertyChanged = function (eventData) { };
    ;
    RadCalendar.prototype._onEventSourcePropertyChanged = function (eventData) { };
    ;
    // public static dateSelectingEvent : string = "dateSelecting";
    RadCalendar.dateSelectedEvent = "dateSelected";
    RadCalendar.dateDeselectedEvent = "dateDeselected";
    RadCalendar.navigatedToDateEvent = "navigatedToDate";
    RadCalendar.navigatingToDateStartedEvent = "navigatingToDateStarted";
    RadCalendar.viewModeChangedEvent = "viewModeChanged";
    RadCalendar.minDateProperty = new dependencyObservable.Property("minDate", "RadCalendar", new proxy.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, RadCalendar.onMinDatePropertyChanged));
    RadCalendar.maxDateProperty = new dependencyObservable.Property("maxDate", "RadCalendar", new proxy.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, RadCalendar.onMaxDatePropertyChanged));
    RadCalendar.selectedDateProperty = new dependencyObservable.Property("selectedDate", "RadCalendar", new proxy.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, RadCalendar.onSelectedDatePropertyChanged));
    RadCalendar.selectedDatesProperty = new dependencyObservable.Property("selectedDates", "RadCalendar", new proxy.PropertyMetadata(new Array(), dependencyObservable.PropertyMetadataSettings.AffectsLayout, RadCalendar.onSelectedDatesPropertyChanged));
    RadCalendar.selectedDateRangeProperty = new dependencyObservable.Property("selectedDateRange", "RadCalendar", new proxy.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, RadCalendar.onSelectedDateRangePropertyChanged));
    RadCalendar.viewModeProperty = new dependencyObservable.Property("viewMode", "RadCalendar", new proxy.PropertyMetadata(CalendarViewMode.Month, dependencyObservable.PropertyMetadataSettings.AffectsLayout, RadCalendar.onViewModePropertyChanged));
    RadCalendar.selectionModeProperty = new dependencyObservable.Property("selectionMode", "RadCalendar", new proxy.PropertyMetadata(CalendarSelectionMode.Single, dependencyObservable.PropertyMetadataSettings.AffectsLayout, RadCalendar.onSelectionModePropertyChanged));
    // Perhaps currentDate would be a better name for this :/
    RadCalendar.displayedDateProperty = new dependencyObservable.Property("displayedDate", "RadCalendar", new proxy.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, RadCalendar.onDisplayedDatePropertyChanged));
    RadCalendar.eventSourceProperty = new dependencyObservable.Property("eventSource", "RadCalendar", new proxy.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, RadCalendar.onEventSourcePropertyChanged));
    return RadCalendar;
})(view.View);
exports.RadCalendar = RadCalendar;
