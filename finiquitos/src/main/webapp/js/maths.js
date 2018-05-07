var DECIMAL_ACCURACY = 2;
var DAYS_PER_YEAR = 365; // 12 * 32.5 ha cambiado por jurisprudencia
var DAYS_PER_YEAR_14_PAYS = 420; // 14 * 30
var HOURS_PER_DAY = 8;
var HALF_YEAR = 6;
var EXTRA_PAY_MONTHLY = 84; // 14 * 6
var DIAS_DESPIDO_OBJETIVO = 20;
var DIAS_DESPIDO_IMPROCEDENTE = 33;
var DIAS_DESPIDO_IMPROCEDENTE_ANTES = 45;

function getFiniquitoDespidoImprocedente(wage, registrationDate, firingDate) {
	var result = 0;
	result = getIndemnizacion(wage, registrationDate, FECHA_REFORMA_LABORAL, DIAS_DESPIDO_IMPROCEDENTE_ANTES);
	if (isStringDateGreaterThan(registrationDate, FECHA_REFORMA_LABORAL)) {
		result += getIndemnizacion(wage, registrationDate, firingDate, DIAS_DESPIDO_IMPROCEDENTE);
	} else {
		result += getIndemnizacion(wage, FECHA_REFORMA_LABORAL, firingDate, DIAS_DESPIDO_IMPROCEDENTE);
	}
	return result;
}

function getFiniquitoDespidoObra(wage, registrationDate, firingDate) {
	var result = 0;
	var diasIndemnizacion = getDiasIndemnizacionObra(registrationDate);
	result = getIndemnizacion(wage, registrationDate, firingDate, diasIndemnizacion);
	return result;
}

function getFiniquitoDespidoObjetivo(wage, registrationDate, firingDate) {
	var result = 0;
	result = getIndemnizacion(wage, registrationDate, firingDate, DIAS_DESPIDO_OBJETIVO);
	return result;
}

function getIndemnizacion(wage, registrationDate, firingDate, diasIndemnizacion) {
	var result = 0;
	var workedDays = getDaysBetweenDatesString(registrationDate, firingDate);
	if (workedDays > 0) {
		var totalDays = (workedDays * diasIndemnizacion) / DAYS_PER_YEAR;
		result = totalDays * (wage / DAYS_PER_YEAR);
	}
	return result;
}

function getDiasIndemnizacionObra(registrationDate) {
	var currentYear = getCurrentYear(registrationDate);
	if (currentYear > 2015) {
		currentYear = 2015;
	}
	switch (currentYear) {
	case 2015:
		return 12;
		break;
	case 2014:
		return 11;
		break;
	case 2013:
		return 10;
		break;
	case 2012:
		return 9;
		break;
	default:
		return 8;
		break;
	}
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
	var result;
	var dailyWage = getDailyWageFourteenPays(salario);
	var currentMonthDays = getCurrentMonthDays(firingDate);
	var vPagaExtra12Meses = ((salario / 14) / HALF_YEAR);
	if (hoursReduction > 0) {
		var reducedWage = (dailyWage / HOURS_PER_DAY) * (HOURS_PER_DAY - hoursReduction);
		result = reducedWage * currentMonthDays;
	} else {
		result = dailyWage * currentMonthDays;
	}

	result += vPagaExtra12Meses
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
	var currentMonth = getCurrentMonth(firingDate);
	var fractionPay = salario / EXTRA_PAY_MONTHLY;
	if (currentMonth <= HALF_YEAR) {
		return fractionPay * currentMonth;
	} else {
		return fractionPay * (currentMonth - HALF_YEAR);
	}
}
