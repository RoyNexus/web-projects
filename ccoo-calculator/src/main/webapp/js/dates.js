var DATE_FORMAT = "dd/mm/yy";
var DATE_FIRST_DAY = "01";
var DATE_SEPARATOR = "/";
var MILLI_SECONDS_TO_DAYS = 86400000;



function getCurrentMonthDays(date) {
	var dateObj = getDateObjectFromString(date);
	return dateObj.getDate();
}

function getDaysFromNewYearsDay(date) {
	var dateNewYearsDay = getDateObjectFromString(DATE_FIRST_DAY + DATE_SEPARATOR + DATE_FIRST_DAY + DATE_SEPARATOR
			+ getCurrentYear(date));
	var dateCurrentDate = getDateObjectFromString(date);
	var milliSecondsDiff = dateCurrentDate.getTime() - dateNewYearsDay.getTime();
	return Math.floor(milliSecondsDiff / MILLI_SECONDS_TO_DAYS);
}

function getCurrentYear(date) {
	var dateObj = getDateObjectFromString(date);
	return dateObj.getFullYear();
}

function getDateObjectFromString(dateString) {
	return $.datepicker.parseDate(DATE_FORMAT, dateString);
}