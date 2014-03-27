var DAYS_PER_YEAR = 360;
var DAYS_PER_YEAR_14_PAYS = 420;
var DECIMAL_ACCURACY = 2;
var DATE_FORMAT = "dd/mm/yy";
var DATE_FIRST_DAY = "01";
var DATE_SEPARATOR = "/";
var MILLI_SECONDS_TO_DAYS = 86400000;

function getDailyWageFourteenPays(wage) {
    return parseInt(wage) / DAYS_PER_YEAR_14_PAYS;
}

function getDailyWage(wage) {
    return parseInt(wage) / DAYS_PER_YEAR;
}

function getDateObjectFromString(dateString) {
    return $.datepicker.parseDate(DATE_FORMAT, dateString);
}

function getCurrentMonthDays(date) {
    var dateObj = getDateObjectFromString(date);
    return dateObj.getDate();
}

function getCurrentYear(date) {
    var dateObj = getDateObjectFromString(date);
    return dateObj.getFullYear();
}

function getDaysFromNewYearsDay(date) {    
    var dateNewYearsDay = getDateObjectFromString(DATE_FIRST_DAY + DATE_SEPARATOR + DATE_FIRST_DAY + DATE_SEPARATOR
	    + getCurrentYear(date));
    var dateCurrentDate = getDateObjectFromString(date);    
    var milliSecondsDiff = dateCurrentDate.getTime() - dateNewYearsDay.getTime();    
    return Math.floor(milliSecondsDiff / MILLI_SECONDS_TO_DAYS);
}

function calcularFiniquitoMes(salario, firingDate) {
    var dailyWage = getDailyWage(salario);
    var currentMonthDays = getCurrentMonthDays(firingDate);
    return dailyWage * currentMonthDays;
}

function calcularFiniquitoVacaciones(firingDate, enjoyedDays, officialDays, salario) {
    var daysFromNewYearsDay = getDaysFromNewYearsDay(firingDate);    
    var remainingDays = (daysFromNewYearsDay * officialDays / DAYS_PER_YEAR) - enjoyedDays;
    return getDailyWage(salario) * remainingDays;
}

/**
 * Calcular button click event
 */
$(document).ready(
	function() {
	    $("#simulationForm").submit(
		    function(event) {
			event.preventDefault(); // cancel submit
			var finiquitoMes = calcularFiniquitoMes($("#salario").val(), $("#despido").val());
			var finiquitoVacaciones = calcularFiniquitoVacaciones($("#despido").val(), $("#disfrutadas")
				.val(), $("#officialDays").val(), $("#salario").val());

			$("#finiquitoMes").val(convertirDosDecimalesConComa(finiquitoMes));
			$("#finiquitoVacaciones").val(convertirDosDecimalesConComa(finiquitoVacaciones));
			$("#tabs").tabs("option", "active", 1); // Go to results tab
		    });
	});

/**
 * Dates for Spain
 */
$(function($) {
    $.datepicker.regional['es'] = {
	closeText : 'Cerrar',
	prevText : '<Ant',
	nextText : 'Sig>',
	currentText : 'Hoy',
	monthNames : [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre',
		'Octubre', 'Noviembre', 'Diciembre' ],
	monthNamesShort : [ 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic' ],
	dayNames : [ 'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado' ],
	dayNamesShort : [ 'Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb' ],
	dayNamesMin : [ 'Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá' ],
	weekHeader : 'Sm',
	dateFormat : DATE_FORMAT,
	firstDay : 1,
	isRTL : false,
	showMonthAfterYear : false,
	yearSuffix : ''
    };
    $.datepicker.setDefaults($.datepicker.regional['es']);
});

/**
 * Muestra los componentes de fecha
 */
$(document).ready(function() {
    $("#antiguedad").datepicker({
	changeYear : true,
	beforeShow : function() {
	    setTimeout(function() {
		$('.ui-datepicker').css('z-index', 99999999999999);
	    }, 0);
	}

    });
    $("#despido").datepicker({
	changeYear : true,
	beforeShow : function() {
	    setTimeout(function() {
		$('.ui-datepicker').css('z-index', 99999999999999);
	    }, 0);
	}
    });
});

/**
 * Muestra los componentes buttonset
 */
$(document).ready(function() {
    $(function() {
	$("#pagas").buttonset();
	$("#despidos").buttonset();
    });
});

/**
 * Muestra las tabs
 */
$(document).ready(function() {
    $(function() {
	$("#tabs").tabs();
    });
});

function convertirDosDecimalesConComa(number) {
    number = number.toFixed(DECIMAL_ACCURACY);
    var string = number.toString();
    return string.replace(".", ",");
}
