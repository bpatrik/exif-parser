"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DateUtil = /** @class */ (function () {
    function DateUtil() {
    }
    DateUtil.parseNumber = function (s) {
        return parseInt(s, 10);
    };
    /**
     * take date (year, month, day) and time (hour, minutes, seconds) digits in UTC
     * and return a timestamp in seconds
     * @param dateParts
     * @param timeParts
     * @returns {number}
     */
    DateUtil.parseDateTimeParts = function (dateParts, timeParts) {
        dateParts = dateParts.map(DateUtil.parseNumber);
        timeParts = timeParts.map(DateUtil.parseNumber);
        var year = dateParts[0];
        var month = dateParts[1] - 1;
        var day = dateParts[2];
        var hours = timeParts[0];
        var minutes = timeParts[1];
        var seconds = timeParts[2];
        var date = Date.UTC(year, month, day, hours, minutes, seconds, 0);
        var timestamp = date / 1000;
        return timestamp;
    };
    /**
     * parse date with "2004-09-04T23:39:06-08:00" format,
     * one of the formats supported by ISO 8601, and
     * convert to utc timestamp in seconds
     * @param dateTimeStr
     * @returns {number}
     */
    DateUtil.parseDateWithTimezoneFormat = function (dateTimeStr) {
        var dateParts = dateTimeStr.substr(0, 10).split('-');
        var timeParts = dateTimeStr.substr(11, 8).split(':');
        var timezoneStr = dateTimeStr.substr(19, 6);
        var timezoneParts = timezoneStr.split(':').map(DateUtil.parseNumber);
        var timezoneOffset = (timezoneParts[0] * DateUtil.hours) +
            (timezoneParts[1] * DateUtil.minutes);
        var timestamp = DateUtil.parseDateTimeParts(dateParts, timeParts);
        //minus because the timezoneOffset describes
        //how much the described time is ahead of UTC
        timestamp -= timezoneOffset;
        if (typeof timestamp === 'number' && !isNaN(timestamp)) {
            return timestamp;
        }
    };
    /**
     * parse date with "YYYY:MM:DD hh:mm:ss" format, convert to utc timestamp in seconds
     * @param dateTimeStr
     * @returns {number}
     */
    DateUtil.parseDateWithSpecFormat = function (dateTimeStr) {
        var parts = dateTimeStr.split(' '), dateParts = parts[0].split(':'), timeParts = parts[1].split(':');
        var timestamp = DateUtil.parseDateTimeParts(dateParts, timeParts);
        if (typeof timestamp === 'number' && !isNaN(timestamp)) {
            return timestamp;
        }
    };
    DateUtil.parseExifDate = function (dateTimeStr) {
        //some easy checks to determine two common date formats
        //is the date in the standard "YYYY:MM:DD hh:mm:ss" format?
        var isSpecFormat = dateTimeStr.length === 19 &&
            dateTimeStr.charAt(4) === ':';
        //is the date in the non-standard format,
        //"2004-09-04T23:39:06-08:00" to include a timezone?
        var isTimezoneFormat = dateTimeStr.length === 25 &&
            dateTimeStr.charAt(10) === 'T';
        var timestamp;
        if (isTimezoneFormat) {
            return DateUtil.parseDateWithTimezoneFormat(dateTimeStr);
        }
        else if (isSpecFormat) {
            return DateUtil.parseDateWithSpecFormat(dateTimeStr);
        }
    };
    //in seconds
    DateUtil.hours = 3600;
    DateUtil.minutes = 60;
    return DateUtil;
}());
exports.DateUtil = DateUtil;
//# sourceMappingURL=DateUtil.js.map