var DATE_FORMAT = "dd/mm/yy";
var DATE_FIRST_DAY = "01";
var DATE_SEPARATOR = "/";
var MILLI_SECONDS_TO_DAYS = 86400000;
var ADD_ONE = 1;

function getCurrentMonthDays(date) {
	var dateObj = getDateObjectFromString(date);
	return dateObj.getDate();
}

function getDaysFromNewYearsDay(date) {
	var dateNewYearsDay = getDateObjectFromString(DATE_FIRST_DAY + DATE_SEPARATOR + DATE_FIRST_DAY + DATE_SEPARATOR
			+ getCurrentYear(date));
	var dateCurrentDate = getDateObjectFromString(date);
	return getDaysBetweenDatesObject(dateNewYearsDay, dateCurrentDate);
}

function getCurrentYear(date) {
	var dateObj = getDateObjectFromString(date);
	return dateObj.getFullYear();
}

function getCurrentMonth(date) {
	var dateObj = getDateObjectFromString(date);
	return dateObj.getMonth() + ADD_ONE;
}

function getDateObjectFromString(dateString) {
	return $.datepicker.parseDate(DATE_FORMAT, dateString);
}

function getDaysBetweenDatesString(dateFrom, dateTo) {
	var dateFromObj = getDateObjectFromString(dateFrom);
	var dateToObj = getDateObjectFromString(dateTo);
	return getDaysBetweenDatesObject(dateFromObj, dateToObj);
}

function getDaysBetweenDatesObject(dateFrom, dateTo) {
	var milliSecondsDiff = dateTo.getTime() - dateFrom.getTime();
	return Math.floor(milliSecondsDiff / MILLI_SECONDS_TO_DAYS) + ADD_ONE;
}