/**
 * Calcular button click event
 */
$(document).ready(
	function() {
	    $("#simulationForm").submit(
		    function(event) {
			event.preventDefault(); // cancel submit
			var finiquitoMes = 0;
			var finiquitoVacaciones = 0;
			var finiquitoPagaExtra = 0;

			if ($("#12pagas").prop("checked")) {
			    finiquitoMes = getFiniquitoMes12Pagas($("#salario").val(), $("#despido").val(), $(
				    "#reduccion").val());
			} else {
			    finiquitoMes = getFiniquitoMes14Pagas($("#salario").val(), $("#despido").val(), $(
				    "#reduccion").val());
			    finiquitoPagaExtra = getFiniquitoPagaExtra($("#salario").val(), $("#despido").val());
			}

			var finiquitoVacaciones = getFiniquitoVacaciones($("#despido").val(), $("#disfrutadas").val(),
				$("#officialDays").val(), $("#salario").val());

			var totalFiniquito = finiquitoMes + finiquitoPagaExtra + finiquitoVacaciones;

			$("#finiquitoMes").val(getTwoDecimalsWithFloat(finiquitoMes));
			$("#finiquitoVacaciones").val(getTwoDecimalsWithFloat(finiquitoVacaciones));
			$("#pagaExtra").val(getTwoDecimalsWithFloat(finiquitoPagaExtra));
			$("#totalFiniquito").val(getTwoDecimalsWithFloat(totalFiniquito));
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
