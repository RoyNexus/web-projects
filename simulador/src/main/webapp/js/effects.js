/**
 * It returns an additional period
 * @param id
 * 			- the identifier of the new period
 * @returns {String} the html of the new period
 */
function getNewPeriod(id) {
	var htmlCode = "<div id=\"divperiod_" + id + "\">" +
		"<p class=\"cntr-text\">Periodo " +id+ " adicional con distinto tipo</p>" +
		"<div class=\"col-md-12 box-border\">" +
            		"<div class=\"form-group\">" +
                		"<div class=\"col-md-12\">Duraci&oacute;n del periodo</div>" +	
                		"<div class=\"col-md-2 padding-left-5\">" +
                			"<input type=\"text\" name=\"plazoDeposito\" id=\"plazoDeposito_" + id + "\" class=\"form-control\" value=\"\"" +
                				"oninput=\"updateValue(this.value, 'plazoDepositoRange_"+ id +"');\"" +
                				"onchange=\"updateValue(this.value, 'plazoDepositoRange_" + id +"');\">" +
                		"</div>" +
                		"<div class=\"col-md-4\">" +
                			"<select class=\"form-control\" name=\"tipoPlazo\" id=\"tipoPlazo_" + id + "\">" +
                				"<option value=\"12\">a&ntilde;os</option>" +
                				"<option value=\"1\">meses</option>" +
                			"</select>" +
                		"</div>" +
                		"<div class=\"col-md-5 slider-change\" id=\"plazoDepositoRange_" + id + "\"></div>" +
                		"<div class=\"b-error col-lg-12\" id=\"monthsError_" + id + "\"></div>" +
            		"</div>" +
			"<!-- Inicio Tipo de interes nominal anual -->" +
			"<div class=\"form-group\">" +
				"<div class=\"col-md-12\">Tipo de inter&eacute;s nominal anual</div>" +
				"<div class=\"col-md-3 padding-left-5\"><input type=\"text\" name=\"rate\" id=\"rate_" +id+ "\" class=\"form-control\" value=\"\"" +
									"oninput=\"updateValue(this.value, 'tipoInteresRange_"+ id +"');\"" +
									"onchange=\"updateValue(this.value, 'tipoInteresRange_" + id +"');\">" +
				"</div>" +
				"<div class=\"col-md-1 nopadding\"><label class=\"control-label\">%</label></div>" +				
			        "<div class=\"col-md-1 nopadding\"><label class=\"control-label\">0 %</label></div>" +
			        "<div class=\"col-md-5 slider-change\" id=\"tipoInteresRange_" + id + "\"></div>" +
			        "<div class=\"col-md-1 nopadding\"><label class=\"control-label\">30 %</label></div>" +				
				"<div class=\"b-error col-lg-12\" id=\"rateError_" + id + "\"></div>" +
			"</div>" +
			"<div class=\"form-group\">" +
				"<div class=\"col-md-6-5 nopadding-right\">Gastos totales del periodo</div>" +
				"<div class=\"col-md-5-5\">Periodicidad de gastos</div>" +
				"<div class=\"col-md-3 padding-left-5\">" +
					"<input type=\"text\" id=\"gastosTotales_" + id + "\" class=\"form-control\" value=\"\">" +
				"</div>" +
			        "<div class=\"col-md-1 nopadding\">" +
			            "<label class=\"control-label\">€</label>" + 
			        "</div>" +
				"<div class=\"col-md-2\"></div>" +
				"<div class=\"col-md-6\">" +
					"<select class=\"form-control\" id=\"periodicidadGastos_" + id + "\">" +
						"<option value=\"10\">-seleccionar-</option>" +
						"<option value=\"1\">anual</option>" +
						"<option value=\"2\">semestral</option>" +
						"<option value=\"4\">trimestral</option>" +
						"<option value=\"12\">mensual</option>" +
						"<option value=\"0\">origen</option>" +
						"<option value=\"100\">vencimiento</option>" +
					"</select>"	+
				"</div>" +
				"<div class=\"b-error col-lg-6\" id=\"expenditureError_" + id + "\"></div>" +
				"<div class=\"b-error col-lg-6\" id=\"expenditurePeriodicityError_" + id + "\"></div>" +				
			"</div>" +
			"<!-- Fin Tipo de interes -->" +	
		"</div>" +
		"<script>$(document).ready(function() {" +
		    		"$(\"#plazoDeposito_" + id + "\").keydown(function(event) {" +
		    		    "keyPressEventValidatorPlazoDeposito(event);" +
		    		"});" +
            		    	"$(\"#rate_" + id + "\").keydown(function(event) {" +
            		    	    "keyPressEventValidator(event, this);" +
            		    	"});" +            		    
            		    	"$(\"#gastosTotales_" + id + "\").keydown(function(event) {" +
            		    	    "keyPressEventValidator(event, this);" +
            		    	"});" +													
			"});" +
			"$(document).ready(function() {" +
				"$(\"#plazoDepositoRange_"+ id +"\").slider({" +
					"range : \"max\"," +
					"min : 0," +
					"step : 1," +
					"max : 50," +
					"value : 0," +
					"slide : function(event, ui) {" +
						"$(\"#plazoDeposito_"+ id +"\").val(ui.value);" +
					"}" +
				"});" +
				"$(\"#plazoDeposito_" + id + "\").change(function() {" +
					"if ($.isNumeric(this.value)) {" +
						"$(\"#plazoDepositoRange_" + id + "\").slider(\"value\", this.value);" +
					"}" +
				"});" +
			"});" +		
			"$(document).ready(function() {" +
				"$(\"#tipoInteresRange_" + id + "\").slider({" +
					"range : \"max\"," +
					"min : 0," +
					"step : 0.0005," +
					"max : 30," +
					"value : 0," +
					"slide : function(event, ui) {" +
						"var value = JSON.stringify(ui.value).replace(POINT_CHAR, COMMA_CHAR);" +
						"$(\"#rate_" + id + "\").val(value);" +
						"$(\"#tipoInteresRange_" + id + "\").slider(\"value\", value);" +
					"}" +
				"});" +
				"$(\"#rate_" + id + "\").change(function() {" +
					"if ($.isNumeric(this.value)) {" +
						"$(\"#tipoInteresRange_" + id + "\").slider(\"value\", this.value);" +
					"}" +  
				"});" +
			"});" +
			"$(document).ready(function() {" +
				"$(\"#tipoPlazo_" +id + "\").change(function() {" + 
					"if ($(\"#tipoPlazo_"+ id +"\").val() == 1) {" + 
						"$(\"#plazoDepositoRange_" + id + "\").slider(\"option\", \"max\", 600);" +
						"$(\"#plazoDepositoRange_" + id + "\").slider(\"option\", \"value\", 0);" +
					"} else if ($(\"#tipoPlazo_" + id + "\").val() == 12) {" +
						"$(\"#plazoDepositoRange_" + id + "\").slider(\"option\", \"max\", 50);" +
						"$(\"#plazoDepositoRange_" + id + "\").slider(\"option\", \"value\", 0);" + 
					"}" +
					"$(\"#plazoDeposito_" + id + "\").val(0);" +
				"});" +
			"});" +	
			"$(document).ready(function() {" +
			    "$(\"#gastosTotales_"+ id +"\").change(function() {" +
				"var gastosActuales = parseFloat($(\"#gastosTotales_" + id + "\").val().replace(COMMA_CHAR, POINT_CHAR));" +
				"if ((isNaN(gastosActuales)) || (gastosActuales == 0)) {" +
				    "$(\"#periodicidadGastos_" + id + "\").val(DEFAULT_SELECT_VALUE);" +
			    	"}" +
			    "});" +
			"});" +		
		"</script>" +
	"</div>";
		
	return htmlCode;
}

/**
 * Reset "periodicidadGastos" combo to "-seleccionar" value when "gastosTotales" becomes zero
 */
$(document).ready(function() {
    $("#gastosTotales").change(function() {
	var gastosActuales = parseFloat($("#gastosTotales").val().replace(COMMA_CHAR, POINT_CHAR));
	if ((isNaN(gastosActuales)) || (gastosActuales == 0)) {
	    $("#periodicidadGastos").val(DEFAULT_SELECT_VALUE);
    	}	
    });
});


/**
 * Validates "input" tags
 */
$(document).ready(function() {
    
    $("#capitalInicial").keydown(function(event) {
	keyPressEventValidator(event, this);
    });

    $("#plazoDeposito").keydown(function(event) {
	keyPressEventValidatorPlazoDeposito(event);
    });

    $("#rate").keydown(function(event) {
	keyPressEventValidator(event, this);
    });
    
    $("#gastosTotales").keydown(function(event) {
	keyPressEventValidator(event, this);
    });
            
});

function keyPressEventValidator(event, object) {
    var keyCode = event.which;
        
    //console.debug("event: "+keyCode);
    
    if (!isValidKeyCode(keyCode)) {
        event.preventDefault();
    }
    	
    if ((keyCode == DOT_CODE) || (keyCode == DOT_CODE_KEYBOARD) || (keyCode == COMMA_CODE_KEYBOARD)) {
        // dot char interpreted as comma char    	        		
        object.value = object.value.concat(COMMA_CHAR);    	    
    }
    	
    if ((keyCode != SUPR_CODE) && (keyCode != DEL_CODE) && 
	(keyCode != LEFT_CURSOR) && (keyCode != RIGHT_CURSOR)) {
		    	    
        if (object.value.indexOf(COMMA_CHAR) != -1) {
            validateDecimalsTwoOrFour(event, object);
        }
    }
}

function isValidKeyCode(keyCode) {
    var result = false;
    
   
    if ((keyCode >= MIN_CODE_ZERO) && (keyCode <= MAX_CODE_NINE)) {
	result = true;
    }
    
    if ((keyCode >= MIN_CODE_ZERO_NUMERIC) && (keyCode <= MAX_CODE_NINE_NUMERIC)) {
	result = true;
    }
    
    if (keyCode == TABULADOR) {
	result = true;
    }
    
    if ((keyCode == COMMA_CODE) || (keyCode == SUPR_CODE) || (keyCode == DEL_CODE) || 
        (keyCode == LEFT_CURSOR) || (keyCode == RIGHT_CURSOR)) {
	result = true;
    }
    
    return result;
}

function validateDecimalsTwoOrFour(event, object) {
  var currentId = object.id;
   	if (currentId.indexOf("rate") != -1) {
            if ((hasTwoDecimals(object, MAX_DECIMALS_RATE)) && (isInDecimalPart(event, object))) {
                 event.preventDefault();
            }
    	} else {
       	    if ((hasTwoDecimals(object, MAX_DECIMALS)) && (isInDecimalPart(event, object))) {
	         event.preventDefault();
	    }    	    
	}
}

function isInDecimalPart(event, object) {
    return (getCursorPosition(object) > object.value.indexOf(COMMA_CHAR));	       
}

function hasTwoDecimals(object, maxDecimals) {
    return ((object.value.length - object.value.indexOf(COMMA_CHAR)) > maxDecimals);
}


function getCursorPosition(object) {
    if (object.createTextRange) {
	var r = document.selection.createRange().duplicate();
	r.moveStart('character', -object.value.length);
	return r.text.length;
    } else {
	return object.selectionEnd;
    }
}

function keyPressEventValidatorPlazoDeposito(event) {
    var keyCode = event.which;
    
    //console.debug("event: "+keyCode);
    
    if (!isValidKeyCode(keyCode)) {
        event.preventDefault();
    }
}

function isValidKeyCodePlazoDeposito(keyCode) {
    var result = false;

    if ((keyCode >= MIN_CODE_ZERO) && (keyCode <= MAX_CODE_NINE)) {
	result = true;
    }

    if ((keyCode >= MIN_CODE_ZERO_NUMERIC) && (keyCode <= MAX_CODE_NINE_NUMERIC)) {
	result = true;
    }
    
    if (keyCode == TABULADOR) {
	result = true;
    }

    if ((keyCode == SUPR_CODE) || (keyCode == DEL_CODE) || 
        (keyCode == LEFT_CURSOR) || (keyCode == RIGHT_CURSOR)) {
	result = true;
    }
    
    return result;
}

/**
 * Switch between years/months
 */
$(document).ready(function() {
	$("#tipoPlazo").change(function() {
		if ($("#tipoPlazo").val() == 1) {
			// mensual
			$("#plazoDepositoRange").slider("option", "max", 600);
			$("#plazoDepositoRange").slider("option", "value", 0);
		} else if ($("#tipoPlazo").val() == 12) {
			// anual
			$("#plazoDepositoRange").slider("option", "max", 50);
			$("#plazoDepositoRange").slider("option", "value", 0);
		}
		$("#plazoDeposito").val(0);
	});
});

/**
 * jQuery UI Slider "capitalInicialRange"
 */
$(document).ready(function() {
	$("#capitalInicialRange").slider({
		range : "max",
		min : 0,
		step : 500,
		max : 500000,
		value : 0,
		slide : function(event, ui) {
			$("#capitalInicial").val(ui.value);
		}
	});

	$("#capitalInicial").change(function() {
		if ($.isNumeric(this.value)) {
			$("#capitalInicialRange").slider("value", this.value);
		}
		// $("#capitalInicial").val($("#capitalInicialRange").slider("option", "value"));    	
	});
});

/**
 * jQuery UI Slider "tipoInteresRange"
 */
$(document).ready(function() {
	$("#tipoInteresRange").slider({
		range : "max",
		min : 0,
		step : 0.0005,
		max : 30,
		value : 0,
		slide : function(event, ui) {
			var value = JSON.stringify(ui.value).replace(POINT_CHAR, COMMA_CHAR);
			$("#rate").val(value);
			$("#tipoInteresRange").slider("value", value);
		}
	});
	$("#rate").change(function() {
		if ($.isNumeric(this.value)) {
			$("#tipoInteresRange").slider("value", this.value);
		}
		// $("#rate").val($("#tipoInteresRange").slider("option", "value"));    	
	});
});

/**
 * jQuery UI Slider "plazoDepositoRange"
 */
$(document).ready(function() {
	$("#plazoDepositoRange").slider({
		range : "max",
		min : 0,
		step : 1,
		max : 50,
		value : 0,
		slide : function(event, ui) {
			$("#plazoDeposito").val(ui.value);
		}
	});
	$("#plazoDeposito").change(function() {
		if ($.isNumeric(this.value)) {
			$("#plazoDepositoRange").slider("value", this.value);
		}
		// $("#plazoDeposito").val($("#plazoDepositoRange").slider("option", "value"));
	});
});

/**
 * Iniciar button click
 */
$(document).ready(function() {
    $("#iniciarBtn").click(function() {
	$("#mainContainer").hide();
	$("#firstPage").fadeIn("slow");
	chart = null;
	currentDepositPointer = 1;	
	currentDeposits = new Array();	
	cleanDeposit();
	setStatusDetailsButton(currentDeposits);
	setMoveRightButtonVisibility(currentDeposits, currentDepositPointer);
	setMoveLeftButtonVisibility(currentDepositPointer);
    });
});

/** 
 * Initializing
 */
$(document).ready(function() {
	$("#graficos").hide();	
	cleanDeposit();
	setStatusDetailsButton(currentDeposits);
	setMoveRightButtonVisibility(currentDeposits, currentDepositPointer);
	setMoveLeftButtonVisibility(currentDepositPointer);
});

/**
 * Display none and block first page
 * */
$(document).ready(function() {
	$("#displPag").click(function() {
		$("#firstPage").hide();
		$("#mainContainer").fadeIn("slow");
	});
});

/**
 * Ver detalles button click
 */
$(document).ready(function() {
	$("#verDetallesBtn").click(function() {		
		if (chart != null) {
			// Reset chart
			chart.destroy();
			chart = null;
		}
		// Drawing graphs
		settingsDone = new Array();
		$.each(currentDeposits, function(index, value) {
			$().crearGrafico("prestamoChart", value);
		});
		$("#mainContainer").hide();
		$("#graficos").fadeIn("fast");
	});
});

/**
 * Return button click
 */
$(document).ready(function() {
	$("#returnBtn").click(function() {
		$("#graficos").hide().delay(1000);
		$("#mainContainer").fadeIn("fast");
	});
});

/**
 * Compare button click
 */
$(document).ready(function() {
	$("#compararBtn").click(function() {
		if (currentDepositPointer < MAX_GRAFICOS) {
			if ((currentDeposits[currentDepositPointer - 1] != null) && 
				(currentDeposits[currentDepositPointer] == null)) {
				currentDepositPointer++;
				cleanDeposit();
				setMoveRightButtonVisibility(currentDeposits, currentDepositPointer);
				setMoveLeftButtonVisibility(currentDepositPointer);
			}
		} else {
			$("#maxSimulators").dialog({resizable: false, draggable: false, modal: true});
		}
	});
});

/**
 * Forward deposit button click
 */
$(document).ready(function() {
	$("#moveRight").click(function() {		
		currentDepositPointer++;
		cleanDeposit();
		showDepositModelInForm(currentDeposits[currentDepositPointer - 1]);
		setMoveRightButtonVisibility(currentDeposits, currentDepositPointer);
		setMoveLeftButtonVisibility(currentDepositPointer);
	});
});

/**
 * Back deposit button click
 */
$(document).ready(function() {
	$("#moveLeft").click(function() {
		currentDepositPointer--;
		cleanDeposit();
		showDepositModelInForm(currentDeposits[currentDepositPointer - 1]);
		setMoveRightButtonVisibility(currentDeposits, currentDepositPointer);
		setMoveLeftButtonVisibility(currentDepositPointer);
	});
});

/**
 * Delete current deposit button click
 */
$(document).ready(function() {
	$("#deleteDepositBtn").click(function() {
		currentDeposits.splice(currentDepositPointer - 1, 1);
		if (currentDepositPointer > 1) {
			currentDepositPointer--;
		}
		cleanDeposit();		
		if (currentDeposits[currentDepositPointer - 1] != null) {
			showDepositModelInForm(currentDeposits[currentDepositPointer - 1]);
		}
		setStatusDetailsButton(currentDeposits);
		setMoveRightButtonVisibility(currentDeposits, currentDepositPointer);
		setMoveLeftButtonVisibility(currentDepositPointer);
	});
});

/**
 * Add period button click
 */
$(document).ready(function() {
	$("#addPeriod").click(function() {
		periodCounter++;
		$("#newPeriods").append(getNewPeriod(periodCounter));
	});
});

/**
 * Del period button click
 */
$(document).ready(function() {
	$("#delPeriod").click(function() {
		$("#divperiod_" + periodCounter).remove();
		if (periodCounter > 0) {
			periodCounter--;
		}
	});
});

/** 
 * Clean current deposit form and its periods
 */
function cleanDeposit() {
	$("#capitalInicial").val("");
	$("#rate").val("");
	$("#plazoDeposito").val("");
	$("#capitalInicialRange").slider("value", 0);
	$("#tipoInteresRange").slider("value", 0);
	$("#plazoDepositoRange").slider("value", 0);
	$("#tipoPlazo").val("12");
	$("#gastosTotales").val("");
	$("#periodicidadGastos").val("10");
	$("#pagoIntereses").val("1");
	$("#TAE").val("");	
	$("#interesesTotalesResult").val("");
	$("#gastosTotalesResult").val("");
	clearInterestList();
	cleanErrorMessages();
			
	for (i = 1; i <= periodCounter; i++) {	    	
	    $("#divperiod_" + i).remove();
	}
	periodCounter = 0;
	
	$("#numDeposito").text("Estás en el depósito bancario " + currentDepositPointer);
}

/**
 * It shows the deposit info in the html form
 * @param deposit -
 * 					JSON object with the deposit info
 */
function showDepositModelInForm(deposit) {
	$("#capitalInicial").val(getValueInMaxDecimals(deposit.capital));
	$("#capitalInicialRange").slider("value", deposit.capital);
	$("#rate").val(getValueInMaxDecimalsForRate(deposit.rate));
	$("#tipoInteresRange").slider("value", deposit.rate);	
	if (deposit.months % MONTHS_IN_YEAR != 0) {
		// months
		$("#tipoPlazo").val(YEAR);
		$("#plazoDeposito").val(deposit.months);
		$("#plazoDepositoRange").slider("value", deposit.months);
	} else {
		// years		
		$("#tipoPlazo").val(MONTHS_IN_YEAR);
		$("#plazoDeposito").val(deposit.months / MONTHS_IN_YEAR);
		$("#plazoDepositoRange").slider("value", deposit.months / MONTHS_IN_YEAR);
	}			
	$("#gastosTotales").val(getValueInMaxDecimals(deposit.expenditure));
	$("#periodicidadGastos").val(deposit.expenditurePeriodicity);
	$("#pagoIntereses").val(deposit.interestPayments);
	
	// periods array
	var periods = JSON.parse(JSON.stringify(deposit.periods));
	// fixed bug with periods and deposit navigation <->
	periodCounter = periods.length;	
	$.each(periods, function(index, value) {
		showPeriodInForm(value);
	});	
	// Output results
	clearInterestList();
	if (deposit.errors) {
	    showErrorsInForm(deposit);
	} else {
	    $("#TAE").val(getWithPercentFormat(deposit.annualRateOutput));	
	    $("#interesesTotalesResult").val(getWithEuroFormat(getValueInMaxDecimals(deposit.grossInterest)));
	    $("#gastosTotalesResult").val(getWithEuroFormat(getValueInMaxDecimals(deposit.expenditureGlobalOutput)));
	    addInterestList(deposit);
	}
}

/**
 * It shows the period info in the html form
 * @param period -
 * 					JSON object with the period info
 */
function showPeriodInForm(period) {
	$("#newPeriods").append(getNewPeriod(period.id));	
	$("#rate_"+period.id).val(getValueInMaxDecimalsForRate(period.rate));
	$("#tipoInteresRange_"+period.id).slider("value", period.rate);
	$("#gastosTotales_"+period.id).val(getValueInMaxDecimals(period.expenditure));
	$("#periodicidadGastos_"+period.id).val(period.expenditurePeriodicity);
	
	if (period.months % MONTHS_IN_YEAR != 0) {
		// months
		$("#tipoPlazo_"+period.id).val(YEAR);
		$("#plazoDeposito_"+period.id).val(period.months);
		$("#plazoDepositoRange_"+period.id).slider("value", period.months);		
	} else {
		// years
		$("#tipoPlazo_"+period.id).val(MONTHS_IN_YEAR);
		$("#plazoDeposito_"+period.id).val(period.months / MONTHS_IN_YEAR);
		$("#plazoDepositoRange_"+period.id).slider("value", period.months / MONTHS_IN_YEAR);
	}
}

/**
 * Handle capital error message
 * @param error
 */
function showCapitalErrorIfPresent(error) {
	if (!isEmpty(error)) {
		$("#capitalError").text(error);
	}
}

/**
 * Handle months error message
 * @param error
 */
function showMonthsErrorIfPresent(error) {
	if (!isEmpty(error)) {
		$("#monthsError").text(error);
	}	
}

/**
 * Handle rate error message
 * @param error
 */
function showRateErrorIfPresent(error) {
	if (!isEmpty(error)) {
		$("#rateError").text(error);
	}	
}

/**
 * Handle interest payment error message
 * @param error
 */
function showInterestPaymentsErrorIfPresent(error) {
	if (!isEmpty(error)) {
		$("#interestPaymentsError").text(error);
	}
}

/**
 * Handle expenditure periodicity error message
 * @param error
 */
function showExpenditurePeriodicityErrorIfPresent(error) {
	if (!isEmpty(error)) {
		$("#expenditurePeriodicityError").text(error);
	}
}

/**
 * Handle expenditure error message
 * @param error
 */
function showExpenditureErrorIfPresent(error) {
	if (!isEmpty(error)) {
		$("#expenditureError").text(error);
	}
}

/**
 * Handle expenditure periodicity error message for periods
 * @param error
 * @param id
 */
function showExpenditurePeriodicityPeriodErrorIfPresent(error, id) {
	if (!isEmpty(error)) {
		$("#expenditurePeriodicityError_"+id).text(error);
	}
}

/**
 * Handle expenditure error message for periods
 * @param error
 * @param id
 */
function showExpenditurePeriodErrorIfPresent(error, id) {
	if (!isEmpty(error)) {
		$("#expenditureError_"+id).text(error);
	}
}

/**
 * Handle months error message for periods
 * @param error
 * @param id 
 */
function showMonthsPeriodErrorIfPresent(error, id) {
	if (!isEmpty(error)) {
		$("#monthsError_"+id).text(error);
	}	
}

/**
 * Handle rate error message for periods
 * @param error
 * @param id
 */
function showRatePeriodErrorIfPresent(error, id) {
	if (!isEmpty(error)) {
		$("#rateError_"+id).text(error);
	}	
}

/**
 * Clean error messages on form
 */
function cleanErrorMessages() {
	$("#capitalError").text("");
	$("#monthsError").text("");
	$("#rateError").text("");
	$("#interestPaymentsError").text("");
	$("#expenditureError").text("");
	$("#expenditurePeriodicityError").text("");
	// for periods
	for (id = 1; id <= periodCounter; id++) {
		$("#expenditureError_"+id).text("");
		$("#expenditurePeriodicityError_"+id).text("");
		$("#monthsError_"+id).text("");
		$("#rateError_"+id).text("");
	}
	// output
	$("#TAE").val("");
	$("#interesesTotalesResult").val("");
	$("#gastosTotalesResult").val("");
	clearInterestList();
}


function getWithEuroFormat(value) {
    return value + " €";
}

function getWithPercentFormat(value) {
    return value + " %";
}

/**
 * Check if a string is empty, null or undefined
 */
function isEmpty(str) {
    return (!str || 0 === str.length);
}

function setStatusDetailsButton(currentDeposits) {
	if (isCleanErrorsAndExistsDeposits(currentDeposits)) {
		$("#verDetallesBtn").removeAttr("disabled");	
	} else {
		$("#verDetallesBtn").attr("disabled", "disabled");
	}
}

function isCleanErrorsAndExistsDeposits(currentDeposits) {
    if (currentDeposits.length > 0) {
	var errorCounter = 0;
	$.each(currentDeposits, function(index, value) {
	    if (value.errors) {
		errorCounter++;
	    }
	});	
	return (errorCounter == 0);
		
    } else {
	return false;
    }
}

function setMoveRightButtonVisibility(deposits, pointer) {
	if (deposits[pointer] != null) {
		$("#moveRight").show();
	} else {
		$("#moveRight").hide();
	}
}

function setMoveLeftButtonVisibility(pointer) {
	if (pointer > 1) {
		$("#moveLeft").show();
	} else {
		$("#moveLeft").hide();
	}	
}

function getValueInMaxDecimals(value) {
    	if (value != null) {
    	    var fixed = value.toFixed(MAX_DECIMALS);
    	    return fixed.replace(POINT_CHAR, COMMA_CHAR);
    	} else {
    	    return "";
    	}
}

function getValueInMaxDecimalsForRate(value) {
    	if (value != null) {
    	    var fixed = value.toFixed(MAX_DECIMALS_RATE);
    	    return fixed.replace(POINT_CHAR, COMMA_CHAR);
    	} else {
    	    return "";
    	}
}

