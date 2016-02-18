var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var commonModule = require("./calendar-common");
require("utils/module-merge").merge(commonModule, exports);
var CalendarEvent = (function (_super) {
    __extends(CalendarEvent, _super);
    function CalendarEvent(title, startDate, endDate) {
        _super.call(this, title, startDate, endDate);
        this.title = title;
        this.endDate = endDate;
        this.startDate = startDate;
    }
    CalendarEvent.prototype.getNativeInstance = function () {
        if (!this.nativeInstance) {
            this.nativeInstance = new com.telerik.widget.calendar.events.Event("default", new Date(1990, 0, 1).getTime(), new Date(1990, 0, 2).getTime());
        }
        return this.nativeInstance;
    };
    CalendarEvent.prototype._setIsAllDay = function (value) { };
    CalendarEvent.prototype._getIsAllDay = function () {
        return false;
    };
    CalendarEvent.prototype._setEndDate = function (date) {
        this.getNativeInstance().setEndDate(date.getTime());
    };
    CalendarEvent.prototype._getEndDate = function () {
        return new Date(this.getNativeInstance().getEndDate());
    };
    CalendarEvent.prototype._setStartDate = function (date) {
        this.getNativeInstance().setStartDate(date.getTime());
    };
    CalendarEvent.prototype._getStartDate = function () {
        return new Date(this.getNativeInstance().getStartDate());
    };
    CalendarEvent.prototype._setTitle = function (value) {
        this.getNativeInstance().setTitle(value);
    };
    CalendarEvent.prototype._getTitle = function () {
        return this.getNativeInstance().getTitle();
    };
    return CalendarEvent;
})(commonModule.CalendarEvent);
exports.CalendarEvent = CalendarEvent;
var RadCalendar = (function (_super) {
    __extends(RadCalendar, _super);
    function RadCalendar() {
        _super.call(this);
    }
    Object.defineProperty(RadCalendar.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    RadCalendar.prototype._createUI = function () {
        this._android = new com.telerik.widget.calendar.RadCalendarView(this._context);
        // this.addOnCellClickListener();
        this.addOnDisplayDateChangedListener();
        this.addOnDisplayModeChangedListener();
        this.addOnSelectedDatesChangedListener();
        this.setSelectionMode(commonModule.CalendarSelectionMode.Single);
        this.height = 300;
    };
    RadCalendar.prototype.addOnCellClickListener = function () {
        var that = new WeakRef(this);
        this.android.setOnCellClickListener({
            onCellClick: function (cell) {
            }
        });
    };
    //calendarDidNavigateToDate
    //calendarWillNavigateToDate
    RadCalendar.prototype.addOnDisplayDateChangedListener = function () {
        var that = new WeakRef(this);
        this.android.setOnDisplayDateChangedListener(new com.telerik.widget.calendar.RadCalendarView.OnDisplayDateChangedListener({
            onDisplayDateChanged: function (oldDate, newDate) {
                var navigationStartedArgs = {
                    eventName: commonModule.RadCalendar.navigatingToDateStartedEvent,
                    object: that.get(),
                    date: new Date(newDate)
                };
                that.get().notify(navigationStartedArgs);
                var navigatedArgs = {
                    eventName: commonModule.RadCalendar.navigatedToDateEvent,
                    object: that.get(),
                    date: new Date(newDate)
                };
                that.get().notify(navigatedArgs);
            }
        }));
    };
    // calendarDidChangedViewModeFromTo
    RadCalendar.prototype.addOnDisplayModeChangedListener = function () {
        var that = new WeakRef(this);
        this.android.setOnDisplayModeChangedListener(new com.telerik.widget.calendar.RadCalendarView.OnDisplayModeChangedListener({
            onDisplayModeChanged: function (oldMode, newMode) {
                var args = {
                    eventName: commonModule.RadCalendar.viewModeChangedEvent,
                    object: that.get(),
                    oldValue: RadCalendar.getViewModeFromAndroidViewMode(that.get(), oldMode),
                    newValue: RadCalendar.getViewModeFromAndroidViewMode(that.get(), newMode)
                };
                that.get().notify(args);
            }
        }));
    };
    //calendarDidDeselectedDate
    //calendarDidSelectDate
    //calendarShoudlSelectDate
    RadCalendar.prototype.addOnSelectedDatesChangedListener = function () {
        var that = new WeakRef(this);
        this.android.setOnSelectedDatesChangedListener(new com.telerik.widget.calendar.RadCalendarView.OnSelectedDatesChangedListener({
            onSelectedDatesChanged: function (context) {
                var selectedCount = context.datesAdded().size();
                var deselectedCount = context.datesRemoved().size();
                if (that.get().selectionMode !== commonModule.CalendarSelectionMode.Range && deselectedCount > 0) {
                    for (var i = 0; i < deselectedCount; i++) {
                        var deselectedDate = new Date(context.datesRemoved().get(i).longValue());
                        that.get().notifyDateDeselected(that.get(), deselectedDate);
                    }
                }
                if (that.get().selectionMode === commonModule.CalendarSelectionMode.Range && selectedCount > 0) {
                    var firstSelected = new Date(context.datesAdded().get(0).longValue());
                    var lastSelected = new Date(context.datesAdded().get(selectedCount - 1).longValue());
                    that.get().notifyRangeSelectionChanged(that.get(), firstSelected, lastSelected);
                }
                else {
                    for (var i = 0; i < selectedCount; i++) {
                        var millis = context.datesAdded().get(i).longValue();
                        var selectedDate = new Date(millis);
                        that.get().notifySingleDateSelected(that.get(), selectedDate);
                    }
                }
            }
        }));
    };
    RadCalendar.prototype.notifySingleDateSelected = function (calendar, date) {
        var selectedArgs = {
            eventName: commonModule.RadCalendar.dateSelectedEvent,
            object: calendar,
            date: date
        };
        calendar.notify(selectedArgs);
    };
    RadCalendar.prototype.notifyDateDeselected = function (calendar, date) {
        var selectedArgs = {
            eventName: commonModule.RadCalendar.dateDeselectedEvent,
            object: calendar,
            date: date
        };
        calendar.notify(selectedArgs);
    };
    RadCalendar.prototype.notifyRangeSelectionChanged = function (calendar, firstSelected, lastSelected) {
        var firstSelectedArgs = {
            eventName: commonModule.RadCalendar.dateSelectedEvent,
            object: calendar,
            date: firstSelected
        };
        calendar.notify(firstSelectedArgs);
        var lastSelectedArgs = {
            eventName: commonModule.RadCalendar.dateSelectedEvent,
            object: calendar,
            date: lastSelected
        };
        calendar.notify(lastSelectedArgs);
    };
    RadCalendar.prototype._onViewModePropertyChanged = function (eventData) {
        var newModeString = eventData.newValue;
        if (newModeString) {
            this.setViewMode(newModeString);
        }
    };
    RadCalendar.prototype._onSelectionModePropertyChanged = function (eventData) {
        var newModeString = eventData.newValue;
        if (newModeString) {
            this.clearSelection();
            this.setSelectionMode(newModeString);
        }
    };
    RadCalendar.prototype._onMaxDatePropertyChanged = function (eventData) {
        var newDate = eventData.newValue;
        if (newDate) {
            var calendar = RadCalendar.getCalendarFromDate(newDate);
            this.android.setMaxDate(calendar.getTimeInMillis());
        }
    };
    RadCalendar.prototype._onMinDatePropertyChanged = function (eventData) {
        var newDate = eventData.newValue;
        if (newDate) {
            var calendar = RadCalendar.getCalendarFromDate(newDate);
            this.android.setMinDate(calendar.getTimeInMillis());
        }
    };
    RadCalendar.prototype._onDisplayedDatePropertyChanged = function (eventData) {
        var newDate = eventData.newValue;
        if (newDate) {
            var calendar = RadCalendar.getCalendarFromDate(newDate);
            this.android.setDisplayDate(calendar.getTimeInMillis());
        }
    };
    RadCalendar.prototype._onSelectedDatePropertyChanged = function (eventData) {
        var newDate = eventData.newValue;
        console.log("Data: " + newDate);
        if (newDate) {
            var calendar = RadCalendar.getCalendarFromDate(newDate);
            var selectedDates = new java.util.ArrayList;
            selectedDates.add(new java.lang.Long(calendar.getTimeInMillis()));
            this.android.setSelectedDates(selectedDates);
        }
    };
    RadCalendar.prototype._onSelectedDatesPropertyChanged = function (eventData) {
        var newDates = eventData.newValue;
        if (newDates) {
            var selectedDates = new java.util.ArrayList();
            for (var date in newDates) {
                var newDate = RadCalendar.getCalendarFromDate(newDates[date]);
                selectedDates.add(new java.lang.Long(newDate.getTimeInMillis()));
            }
            this.android.setSelectedDates(selectedDates);
        }
    };
    RadCalendar.prototype._onSelectedDateRangePropertyChanged = function (eventData) {
        var newDateRange = eventData.newValue;
        if (newDateRange) {
            var start = RadCalendar.getCalendarFromDate(newDateRange.startDate);
            var end = RadCalendar.getCalendarFromDate(newDateRange.endDate);
            var androidDateRange = new com.telerik.widget.calendar.DateRange(start.getTimeInMillis(), end.getTimeInMillis());
            this.android.setSelectedRange(androidDateRange);
        }
    };
    RadCalendar.prototype._onEventSourcePropertyChanged = function (eventData) {
        var newSource = eventData.newValue;
        if (newSource) {
            var eventAdapter = this.android.getEventAdapter();
            var list = new java.util.ArrayList();
            for (var event in newSource) {
                var eventObject = newSource[event];
                list.add(eventObject.getNativeInstance());
            }
            eventAdapter.setEvents(list);
        }
    };
    RadCalendar.prototype.reload = function () {
        this.android.invalidate();
    };
    RadCalendar.prototype.navigateForward = function () {
        this.android.shiftDate(true);
    };
    RadCalendar.prototype.navigateBack = function () {
        this.android.shiftDate(false);
    };
    RadCalendar.prototype.goToDate = function (date) {
        this.android.setDisplayDate(date.getTime());
    };
    RadCalendar.prototype.getEventsForDate = function (date) {
        var nativeResult = this.android.getEventAdapter().getEventsForDate(date.getTime());
        var result = new Array();
        var count = nativeResult.size();
        for (var i = 0; i < count; i++) {
            var nativeEvent = nativeResult.get(i);
            var event = new CalendarEvent(nativeEvent.getTitle(), new Date(nativeEvent.getStartDate()), new Date(nativeEvent.getEndDate()));
            result.push(event);
        }
        return result;
    };
    RadCalendar.getCalendarFromDate = function (date) {
        var calendar = java.util.Calendar.getInstance();
        calendar.setTimeInMillis(date.getTime());
        return calendar;
    };
    RadCalendar.getDateFromCalendar = function (calendar) {
        var date = new Date(calendar.getTimeInMillis());
        return date;
    };
    RadCalendar.prototype.clearSelection = function () {
        this.selectedDates = new Array();
    };
    RadCalendar.prototype.setSelectionMode = function (mode) {
        this._android.setSelectionMode(RadCalendar.getAndroiSelectionModeFromSelectionMode(mode));
    };
    RadCalendar.getAndroiSelectionModeFromSelectionMode = function (selectionMode) {
        var result = null;
        var modeString = selectionMode.toLowerCase();
        switch (modeString) {
            case commonModule.CalendarSelectionMode.None.toLocaleLowerCase():
                result = com.telerik.widget.calendar.CalendarSelectionMode.None;
                break;
            case commonModule.CalendarSelectionMode.Single.toLocaleLowerCase():
                result = com.telerik.widget.calendar.CalendarSelectionMode.Single;
                break;
            case commonModule.CalendarSelectionMode.Multiple.toLocaleLowerCase():
                result = com.telerik.widget.calendar.CalendarSelectionMode.Multiple;
                break;
            case commonModule.CalendarSelectionMode.Range.toLocaleLowerCase():
                result = com.telerik.widget.calendar.CalendarSelectionMode.Range;
                break;
        }
        return result;
    };
    RadCalendar.getSelectionModeFromAndroidSelectionMode = function (selectionMode) {
        var result = "";
        switch (selectionMode) {
            case com.telerik.widget.calendar.CalendarSelectionMode.Multiple:
                result = commonModule.CalendarSelectionMode.Multiple;
                break;
            case com.telerik.widget.calendar.CalendarSelectionMode.None:
                result = commonModule.CalendarSelectionMode.None;
                break;
            case com.telerik.widget.calendar.CalendarSelectionMode.Range:
                result = commonModule.CalendarSelectionMode.Range;
                break;
            case com.telerik.widget.calendar.CalendarSelectionMode.Single:
                result = commonModule.CalendarSelectionMode.Single;
                break;
        }
        return result;
    };
    RadCalendar.prototype.setViewMode = function (mode) {
        this._android.setDisplayMode(RadCalendar.getAndroidViewModeFromViewMode(mode));
        this._android.setYearModeCompact(mode.toLowerCase() === commonModule.CalendarViewMode.MonthNames.toLowerCase());
    };
    RadCalendar.getAndroidViewModeFromViewMode = function (viewMode) {
        var modeString = viewMode.toLowerCase();
        var result = null;
        switch (modeString) {
            // case commonModule.CalendarViewMode.Flow.toLocaleLowerCase():
            //     //this._android.setDisplayMode("?????");// = TKCalendarViewMode.TKCalendarViewModeFlow;
            //     break;
            case commonModule.CalendarViewMode.Month.toLocaleLowerCase():
                result = com.telerik.widget.calendar.CalendarDisplayMode.Month;
                break;
            case commonModule.CalendarViewMode.MonthNames.toLocaleLowerCase():
                result = com.telerik.widget.calendar.CalendarDisplayMode.Year;
                break;
            case commonModule.CalendarViewMode.Week.toLocaleLowerCase():
                result = com.telerik.widget.calendar.CalendarDisplayMode.Week;
                break;
            case commonModule.CalendarViewMode.Year.toLocaleLowerCase():
                result = com.telerik.widget.calendar.CalendarDisplayMode.Year;
                break;
        }
        return result;
    };
    RadCalendar.getViewModeFromAndroidViewMode = function (calendar, viewMode) {
        var result = "";
        switch (viewMode) {
            //?? case com.telerik.widget.calendar.CalendarDisplayMode.Flow: result = commonModule.CalendarViewMode.Flow; break;
            case com.telerik.widget.calendar.CalendarDisplayMode.Month:
                {
                    if (calendar.android.isYearModeCompact()) {
                        result = commonModule.CalendarViewMode.MonthNames;
                    }
                    else {
                        result = commonModule.CalendarViewMode.Month;
                    }
                }
                break;
            case com.telerik.widget.calendar.CalendarDisplayMode.Week:
                result = commonModule.CalendarViewMode.Week;
                break;
            case com.telerik.widget.calendar.CalendarDisplayMode.Year:
                result = commonModule.CalendarViewMode.Year;
                break;
        }
        return result;
    };
    return RadCalendar;
})(commonModule.RadCalendar);
exports.RadCalendar = RadCalendar;
