var DAYS_PER_YEAR = 360;
var DAYS_PER_YEAR_14_PAYS = 420;
var DECIMAL_ACCURACY = 2;
var DATE_FORMAT = "dd/mm/yy";


function calculateDailyWageFourteenPays(wage) {
	return parseInt(wage) / DAYS_PER_YEAR_14_PAYS;
}

function calculateDailyWage(wage) {
	return parseInt(wage) / DAYS_PER_YEAR;
}

function calculateCurrentMonthDays(date) {		
	var dateObj = $.datepicker.parseDate(DATE_FORMAT, date);	
	return dateObj.getDate();
}

function calcularFiniquitoMes(salario, firingDate) {
	var dailyWage = calculateDailyWage(salario);
	var currentMonthDays = calculateCurrentMonthDays(firingDate);
	return dailyWage * currentMonthDays;
}

function calcularFiniquitoVacaciones() {
	return 0;
}


/**
 * Calcular button click event
 */
$(document).ready(function() {
	$("#simulationForm").submit(function(event) {
		event.preventDefault(); // cancel submit
		var finiquitoMes = calcularFiniquitoMes($("#salario").val(), $("#despido").val());
		var finiquitoVacaciones = calcularFiniquitoVacaciones($("#despido").val(), $("#disfrutadas").val());
		
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
