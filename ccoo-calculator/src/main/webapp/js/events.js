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
						var totalFiniquito = 0;
						var indemnizacion = 0;

						if ($("#12pagas").prop("checked")) {
							finiquitoMes = getFiniquitoMes12Pagas($("#salario").val(), $("#despido").val(), $("#reduccion")
									.val());
						} else {
							finiquitoMes = getFiniquitoMes14Pagas($("#salario").val(), $("#despido").val(), $("#reduccion")
									.val());
							finiquitoPagaExtra = getFiniquitoPagaExtra($("#salario").val(), $("#despido").val());
						}

						finiquitoVacaciones = getFiniquitoVacaciones($("#despido").val(), $("#disfrutadas").val(), $(
								"#officialDays").val(), $("#salario").val());

						if ($("#objetivo").prop("checked")) {
							// Despido Objetivo
							$("#indemnizacionLbl").html("Indemnizaci&oacute;n (20 d&iacute;as por a\u00F1o trabajado)");
							indemnizacion = getFiniquitoDespidoObjetivo($("#salario").val(), $("#antiguedad").val(), $(
									"#despido").val());
						} else if ($("#obra").prop("checked")) {
							// Despido fin de obra
							var diasIndemnizacion = getDiasIndemnizacionObra($("#antiguedad").val());
							$("#indemnizacionLbl").html(
									"Indemnizaci&oacute;n (" + diasIndemnizacion + " d&iacute;as por a\u00F1o trabajado)");
							indemnizacion = getFiniquitoDespidoObra($("#salario").val(), $("#antiguedad").val(), $(
									"#despido").val());

						} else if ($("#improcedente").prop("checked")) {
							// Despido Improcedente
							$("#indemnizacionLbl").html("Indemnizaci&oacute;n (45/33 d&iacute;as por a\u00F1o trabajado)");
							indemnizacion = getFiniquitoDespidoImprocedente($("#salario").val(), $("#antiguedad").val(), $(
									"#despido").val());
						}

						totalFiniquito = finiquitoMes + finiquitoPagaExtra + finiquitoVacaciones + indemnizacion;

						$("#finiquitoMes").val(getTwoDecimalsWithFloat(finiquitoMes));
						$("#finiquitoVacaciones").val(getTwoDecimalsWithFloat(finiquitoVacaciones));
						$("#pagaExtra").val(getTwoDecimalsWithFloat(finiquitoPagaExtra));
						$("#totalFiniquito").val(getTwoDecimalsWithFloat(totalFiniquito));
						$("#totalIndemnizacion").val(getTwoDecimalsWithFloat(indemnizacion));
						$("#tabs").tabs("option", "active", 1); // Go
						// to
						// results
						// tab
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
		monthNames : [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre',
				'Noviembre', 'Diciembre' ],
		monthNamesShort : [ 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic' ],
		dayNames : [ 'Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado' ],
		dayNamesShort : [ 'Dom', 'Lun', 'Mar', 'Mie', 'Juv', 'Vie', 'Sab' ],
		dayNamesMin : [ 'Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa' ],
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
		yearRange : '2000:2018',
		beforeShow : function() {
			setTimeout(function() {
				$('.ui-datepicker').css('z-index', 99999999999999);
			}, 0);
		}

	});
	$("#despido").datepicker({
		changeYear : true,
		yearRange : '2000:2018',
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
