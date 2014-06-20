var DECIMAL_ACCURACY = 2;
var DAYS_PER_YEAR = 360; // 12 * 30
var DAYS_PER_YEAR_14_PAYS = 420; // 14 * 30
var HOURS_PER_DAY = 8;
var HALF_YEAR = 6;
var EXTRA_PAY_MONTHLY = 84; // 14 * 6
var DIAS_DESPIDO_OBJETIVO = 20;

function getFiniquitoDespidoObjetivo(wage, registrationDate, firingDate) {
	var result = 0;
	var workedDays = getDaysBetweenDatesString(registrationDate, firingDate);
	var totalDays = (workedDays * DIAS_DESPIDO_OBJETIVO) / DAYS_PER_YEAR;
	result = totalDays * (wage / DAYS_PER_YEAR);
	return result;
}

function getTwoDecimalsWithFloat(number) {
	try {
		number = number.toFixed(DECIMAL_ACCURACY);
		var numberInString = number.toString();
		return numberInString.replace(".", ",");
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

function getFiniquitoVacaciones(firingDate, enjoyedDays, officialDays, salario) {
	var daysFromNewYearsDay = getDaysFromNewYearsDay(firingDate);
	var remainingDays = (daysFromNewYearsDay * officialDays / DAYS_PER_YEAR) - enjoyedDays;
	return getDailyWage(salario) * remainingDays;
}

function getFiniquitoMes12Pagas(salario, firingDate, hoursReduction) {
	var dailyWage = getDailyWage(salario);
	var currentMonthDays = getCurrentMonthDays(firingDate);
	var result;
	if (hoursReduction > 0) {
		var reducedWage = (dailyWage / HOURS_PER_DAY) * (HOURS_PER_DAY - hoursReduction);
		result = reducedWage * currentMonthDays;
	} else {
		result = dailyWage * currentMonthDays;
	}
	return result;
}

function getFiniquitoMes14Pagas(salario, firingDate, hoursReduction) {
	var dailyWage = getDailyWageFourteenPays(salario);
	var currentMonthDays = getCurrentMonthDays(firingDate);
	var result;
	if (hoursReduction > 0) {
		var reducedWage = (dailyWage / HOURS_PER_DAY) * (HOURS_PER_DAY - hoursReduction);
		result = reducedWage * currentMonthDays;
	} else {
		result = dailyWage * currentMonthDays;
	}
	return result;
}

function getFiniquitoPagaExtra(salario, firingDate) {
	var months = getCurrentMonth(firingDate);
	var fractionPay = salario / EXTRA_PAY_MONTHLY;
	if (months <= HALF_YEAR) {
		return fractionPay * months;
	} else {
		return fractionPay * (months - HALF_YEAR);
	}
}
