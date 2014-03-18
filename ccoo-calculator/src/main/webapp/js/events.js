/**
 * Dates for Spain
 */
$(function($) {
	$.datepicker.regional['es'] = {
		closeText : 'Cerrar',
		prevText : '<Ant',
		nextText : 'Sig>',
		currentText : 'Hoy',
		monthNames : [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
				'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre',
				'Diciembre' ],
		monthNamesShort : [ 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul',
				'Ago', 'Sep', 'Oct', 'Nov', 'Dic' ],
		dayNames : [ 'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves',
				'Viernes', 'Sábado' ],
		dayNamesShort : [ 'Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb' ],
		dayNamesMin : [ 'Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá' ],
		weekHeader : 'Sm',
		dateFormat : 'dd/mm/yy',
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
