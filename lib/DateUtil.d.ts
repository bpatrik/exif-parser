export declare class DateUtil {
    private static parseNumber;
    static hours: number;
    static minutes: number;
    /**
     * take date (year, month, day) and time (hour, minutes, seconds) digits in UTC
     * and return a timestamp in seconds
     * @param dateParts
     * @param timeParts
     * @returns {number}
     */
    static parseDateTimeParts(dateParts: any, timeParts: any): number;
    /**
     * parse date with "2004-09-04T23:39:06-08:00" format,
     * one of the formats supported by ISO 8601, and
     * convert to utc timestamp in seconds
     * @param dateTimeStr
     * @returns {number}
     */
    static parseDateWithTimezoneFormat(dateTimeStr: any): number;
    /**
     * parse date with "YYYY:MM:DD hh:mm:ss" format, convert to utc timestamp in seconds
     * @param dateTimeStr
     * @returns {number}
     */
    static parseDateWithSpecFormat(dateTimeStr: any): number;
    static parseExifDate(dateTimeStr: any): number;
}
