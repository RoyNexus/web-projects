var DECIMAL_ACCURACY = 2;
var DAYS_PER_YEAR = 360;
var DAYS_PER_YEAR_14_PAYS = 420;

function getTwoDecimalsWithFloat(number) {
	try {
		number = number.toFixed(DECIMAL_ACCURACY);
		var string = number.toString();
		return string.replace(".", ",");
	} catch (exception) {
		return "NaN";
	}
}

function getDailyWageFourteenPays(wage) {
	return parseInt(wage) / DAYS_PER_YEAR_14_PAYS;
}

function getDailyWage(wage) {
	return parseInt(wage) / DAYS_PER_YEAR;
}

function calcularFiniquitoVacaciones(firingDate, enjoyedDays, officialDays, salario) {
	var daysFromNewYearsDay = getDaysFromNewYearsDay(firingDate);
	var remainingDays = (daysFromNewYearsDay * officialDays / DAYS_PER_YEAR) - enjoyedDays;
	return getDailyWage(salario) * remainingDays;
}

function calcularFiniquitoMes(salario, firingDate) {
	var dailyWage = getDailyWage(salario);
	var currentMonthDays = getCurrentMonthDays(firingDate);
	return dailyWage * currentMonthDays;
}
