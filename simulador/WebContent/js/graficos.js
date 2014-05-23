/**
 * Constants
 */
var MAX_GRAFICOS = 8;
var COMMA_CODE = 44;
var SUPR_CODE = 46;
var DEL_CODE = 8;
var LEFT_CURSOR = 37;
var RIGHT_CURSOR = 39;
var DOT_CODE = 110;
var DOT_CODE_KEYBOARD = 190;
var COMMA_CODE_KEYBOARD = 188;
var MIN_CODE_ZERO = 48;
var MAX_CODE_NINE = 57;
var MIN_CODE_ZERO_NUMERIC = 96;
var MAX_CODE_NINE_NUMERIC = 105;
var TABULADOR = 9;
var CONTROLLER_SUFIX = ".action";
var COMMA_CHAR = ",";
var POINT_CHAR = ".";
var MAX_DECIMALS = 2;
var MAX_DECIMALS_RATE = 4;
var YEAR = 1;
var MONTHS_IN_YEAR = 12;
var REGULAR_EXP_TWO_DECIMALS = /^\d+(\,\d{1,2})?$/;
var DEFAULT_SELECT_VALUE = 10;
var HEIGHT_EXPENT = 492;
var HEIGHT_CAPITAL = 462;
var HEIGHT_INTEREST = 432;
var OFFSET = 0;
var OFFSET_HEIGHT_PAIR = 80;
var OFFSET_HEIGHT_FROM_FIFTH = 35;
var MAX_WIDTH = 700;
var MAX_HEIGHT = 600;
var EXPENT_COLOR = '#8B0000';
var INTEREST_COLOR = '#EE2C2C';
var CAPITAL_COLOR = '#e9967a';

/**
 * Global variables
 */
var chart;
var currentDepositPointer = 1;
var periodCounter = 0;
var currentDeposits = new Array();
var settingsDone = new Array();

/**
 * Devuelve el objeto JSON con las opciones comunes de todos los graficos de tipo "column".
 */
function opcionesComunesGrafico() {
    var options = {
	chart : {
	    type : 'column'
	},
	colors : [ EXPENT_COLOR, INTEREST_COLOR, CAPITAL_COLOR ],
	title : {
	    text : 'Simulaci\u00F3n dep\u00F3sitos'
	},
	credits : {
	    href : 'http://www.bde.es',
	    text : 'BdE'
	},
	xAxis : {
	    categories : []
	},
	yAxis : {
	    //min : 0,
	    startOnTick: false,
	    title : {
		text : 'Euros'
	    },
	    stackLabels : {
		enabled : false
	    },
	    labels : {
		formatter : function() {
		    return Highcharts.numberFormat(this.value, 0);
		}
	    }
	},
	tooltip : {
	    enabled: false
	},
	plotOptions : {
	    column : {
		stacking : 'normal',
		borderWidth : 0,
		dataLabels : {
		    enabled : true,
		    color : (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'black',
		    formatter : function() {
			var chart = this.series.chart;
			var n = currentDeposits.length;
			var deposit = getDepositNumberFromCategory(this.x + "");
			var addedText;
			var dynamicFont = '11px';

			if (deposit != 0) {
			    var xPosition = (MAX_WIDTH / (n + 1) + (OFFSET / n)) * deposit;
			    var yPosition = 0;

			    if (n >= 5) {
				dynamicFont = '9px';
				yPosition += OFFSET_HEIGHT_FROM_FIFTH;
				if ((deposit % 2) == 0) {
				    yPosition += OFFSET_HEIGHT_PAIR;
				}
			    }

			    if (this.series.name == 'Capital inicial') {
				var labelCapital = getLabelCapitalFromCurrentDeposits(deposit);
												
				addedText = chart.renderer.text(labelCapital + '\u20AC (' + 'Capital' + ')', xPosition,
					HEIGHT_CAPITAL - yPosition).attr({
				    zIndex : 12,
				}).css({
				    fontSize : dynamicFont
				}).add();
				drawLabelBox(addedText, chart);

			    } else if (this.series.name == 'Intereses') {
				addedText = chart.renderer.text(this.y + '\u20AC (' + 'Intereses' + ')', xPosition,
					HEIGHT_INTEREST - yPosition).attr({
				    zIndex : 12
				}).css({
				    fontSize : dynamicFont
				}).add();
				drawLabelBox(addedText, chart);
			    } else {
				addedText = chart.renderer.text(this.y + '\u20AC (' + 'Gastos' + ')', xPosition,
					HEIGHT_EXPENT - yPosition).attr({
				    zIndex : 12
				}).css({
				    fontSize : dynamicFont
				}).add();
				drawLabelBox(addedText, chart);
			    }
			}
		    }
		}
	    }
	},
	exporting : {
	    buttons : {
		contextButton : {
		    enabled : false
		}
	    }
	},
	lang : {
	    contextButtonTitle : 'Descargar PDF',
	    printChart : 'Imprimir'
	}
    };

    // Si no se establece mediante este metodo, no funciona
    Highcharts.setOptions({
	lang : {
	    thousandsSep : '.',
	    decimalPoint : ','
	}
    });

    // Boton de imprimir
    $("#printBtn").click(function() {
	chart.print();
    });

    // Boton de exportar a PDF
    $('#pdfBtn').click(function() {
	chart.exportChart({
	    type : "application/pdf",
	    filename : 'miSimulacion'
	});
    });

    return options;
}

function getLabelCapitalFromCurrentDeposits(deposit) {
    var realPosition = deposit - 1; 
    return currentDeposits[realPosition].capital;
}

function drawLabelBox(addedText, chart) {
    var box = addedText.getBBox();
    chart.renderer.rect(box.x - 5, box.y - 5, box.width + 10, box.height + 10, 5).attr({
	fill : '#FFFFEF',
	stroke : 'gray',
	'stroke-width' : 1,
	zIndex : 10
    }).add();
}

/**
 * Genera el codigo HTML que define una categoria (eje X) con la informacion del prestamo.
 * 
 * @param depositModel -
 *                JSON con los datos del deposito
 * @returns cadena de texto con el codigo HTML que representa la nueva categoria
 */
function crearHTMLCategory(depositModel) {
    return "<strong>Dep\u00F3sito " + depositModel.id + "</strong><br/><strong>TAE</strong>: "
	    + depositModel.annualRateOutput + "%<br/><strong>Plazo</strong>: " + depositModel.monthsGlobal + " meses";
}

/**
 * Inserta una nueva categoria en el grafico (eje X)
 * 
 * @param chart -
 *                Chart object reference
 * @param depositModel -
 *                JSON con los datos del deposito
 * @returns updated Chart object reference
 */
function insertCategory(chart, depositModel) {
    var categories = chart.xAxis[0].categories;
    categories.push(crearHTMLCategory(depositModel));
    chart.xAxis[0].setCategories(categories, true);
    return chart;
}

/**
 * Delete last category (deposit's graph) in the X axis
 * 
 * @param chart -
 *                Chart object reference
 * @returns updated Chart object reference
 */
function deleteCategory(chart) {
    var categories = chart.xAxis[0].categories;
    categories.pop();
    chart.xAxis[0].setCategories(categories, true);
    return chart;
}

/**
 * Se ocupa de dibujar la grafica de los depositos, a partir de los datos recibidos como parametro.
 * 
 * @param container -
 * @param depositModel -
 */
function drawDepositoChart(container, depositModel) {

    if (chart == null) {
	// Solo para dibujar el primer grafico de depositos
	var dataStr = JSON.stringify(getFirstDepositData(depositModel));
	var commonOptions = opcionesComunesGrafico();

	commonOptions.chart.renderTo = container;
	commonOptions.series = JSON.parse(dataStr);
	chart = new Highcharts.Chart(commonOptions);
    } else {
	// Para el segundo y sucesivos graficos de depositos
	chart.series[0].addPoint(depositModel.expenditureGlobalOutputNegative, false); // Gastos totales
	chart.series[1].addPoint(depositModel.grossInterest, false); // Intereses
	chart.series[2].addPoint(depositModel.capitalExpenditureLess, false); // Capital
	// chart.redraw();
    }
    // Siempre insertamos la nueva categoria
    chart = insertCategory(chart, depositModel);
    return chart;
}

/**
 * Parsea los datos de entrada a la funcion que dibuja el grafico.
 */
$.fn.crearGrafico = function(container, depositModel) {
    depositModel.capitalExpenditureLess = depositModel.capital - depositModel.expenditureGlobalOutput;
    depositModel.expenditureGlobalOutputNegative = (- depositModel.expenditureGlobalOutput); 
    
    
    chart = drawDepositoChart(container, depositModel);
};

function calculate() {

    var promiseResponse = callSimulatorController();

    cleanErrorMessages();
    promiseResponse.success(function(depositModel) {

	if (!depositModel.errors) {
	    $("#TAE").val(getWithPercentFormat(depositModel.annualRateOutput));
	    $("#interesesTotalesResult").val(getWithEuroFormat(getValueInMaxDecimals(depositModel.grossInterest)));
	    $("#gastosTotalesResult").val(getWithEuroFormat(getValueInMaxDecimals(depositModel.expenditureGlobalOutput)));
	    clearInterestList();
	    addInterestList(depositModel);	    
	    // Actualizamos array de depositos
	    currentDeposits[currentDepositPointer - 1] = depositModel;
	} else {
	    // Handle errors messages
	    showErrorsInForm(depositModel);
	    // Actualizamos array de depositos
	    // currentDeposits.splice(currentDepositPointer - 1, 1);
	    currentDeposits[currentDepositPointer - 1] = depositModel;
	}
	setStatusDetailsButton(currentDeposits);
	setMoveRightButtonVisibility(currentDeposits, currentDepositPointer);
	setMoveLeftButtonVisibility(currentDepositPointer);
    });
}

function showErrorsInForm(depositModel) {
    showCapitalErrorIfPresent(depositModel.capitalError);
    showMonthsErrorIfPresent(depositModel.monthsError);
    showRateErrorIfPresent(depositModel.rateError);
    showInterestPaymentsErrorIfPresent(depositModel.interestPaymentsError);
    showExpenditurePeriodicityErrorIfPresent(depositModel.expenditurePeriodicityError);
    showExpenditureErrorIfPresent(depositModel.expenditureError);
    // for periods
    var periods = JSON.parse(JSON.stringify(depositModel.periods));
    $.each(periods, function(index, value) {
	showMonthsPeriodErrorIfPresent(value.monthsError, value.id);
	showRatePeriodErrorIfPresent(value.rateError, value.id);
	showExpenditurePeriodicityPeriodErrorIfPresent(value.expenditurePeriodicityError, value.id);
	showExpenditurePeriodErrorIfPresent(value.expenditureError, value.id);
    });
}

function callSimulatorController() {
    var capital = $("#capitalInicial").val();
    var rate = $("#rate").val();
    var expenditure = $("#gastosTotales").val();
    var expenditurePeriodicity = $("#periodicidadGastos").val();
    var interestPayments = $("#pagoIntereses").val();
    var months = $("#tipoPlazo").val() * $("#plazoDeposito").val();
    var periods = [];

    for ( var i = 1; i <= periodCounter; i++) {
	periods.push(getPeriodFromDOM(i));
    }

    var ajaxData = {
	"id" : currentDepositPointer,
	"capital" : capital.replace(COMMA_CHAR, POINT_CHAR),
	"rate" : rate.replace(COMMA_CHAR, POINT_CHAR),
	"expenditure" : expenditure.replace(COMMA_CHAR, POINT_CHAR),
	"expenditurePeriodicity" : expenditurePeriodicity,
	"interestPayments" : interestPayments,
	"months" : months,
	"periodsStr" : JSON.stringify(periods)
    };

    return $.ajax({
	type : "POST",
	url : "getDepositSimulation" + CONTROLLER_SUFIX,
	data : ajaxData,
	error : function(e) {
	    $("#ajaxError").dialog({
		resizable : false,
		draggable : false,
		modal : true
	    });
	}
    });
}

function getFirstDepositData(depositModel) {
    var depositData = [ {
	name : 'Gastos totales',	
    	data : [ depositModel.expenditureGlobalOutputNegative ]
    }, {
	name : 'Intereses',
	data : [ depositModel.grossInterest ]
    }, {
	name : 'Capital inicial',
	data : [ depositModel.capitalExpenditureLess ]
    }        
    ];
    return depositData;
}

function getPeriodFromDOM(id) {
    var period;
    var rate = $("#rate_" + id).val();
    var expenditure = $("#gastosTotales_" + id).val();
    var expenditurePeriodicity = $("#periodicidadGastos_" + id).val();
    var months = $("#tipoPlazo_" + id).val() * $("#plazoDeposito_" + id).val();

    period = {
	"rate" : rate.replace(COMMA_CHAR, POINT_CHAR),
	"months" : months,
	"expenditure" : expenditure.replace(COMMA_CHAR, POINT_CHAR),
	"expenditurePeriodicity" : expenditurePeriodicity,
	"id" : id
    };

    return period;
}

/**
 * Actualiza el valor de un tag (destino) a partir de un nuevo valor.
 * 
 * @param valor -
 *                nuevo valor para el elemento destino
 * @param destino -
 *                identificador del tag que se quiere actualizar
 */
function updateValue(valor, destino) {
    $("#" + destino).val(valor);
}

function getNewPeriodOutput(id, payment) {
    return "<li>" + getOrdinalFromCardinal(id) + ": " + getWithEuroFormat(payment) + "</li>";
}

function getInitialPeriod(payment) {
    return "<li>Primer periodo: " + getWithEuroFormat(payment) + "</li>";
}

function addInterestList(depositModel) {
    if (depositModel.interestPayments == 0 || depositModel.interestPayments == 100 || depositModel.periods == "") {
	$(".interest-box").css("font-size", "24px");
	if (depositModel.interestPayments == 0 || depositModel.interestPayments == 100) {
	    $("#interestOutput ul").append(getWithEuroFormat(getValueInMaxDecimals(depositModel.grossInterest)));
	} else {
	    $("#interestOutput ul").append(getWithEuroFormat(depositModel.grossInterestPayOutput));
	}
    } else {
	$(".interest-box").css("font-size", "17px");
	$("#interestOutput ul").append(getInitialPeriod(depositModel.grossInterestPayOutput));
	var periods = JSON.parse(JSON.stringify(depositModel.periods));
	$.each(periods, function(index, value) {
	    $("#interestOutput ul").append(getNewPeriodOutput(value.id, value.grossInterestPayOutput));
	});
    }

}

function getOrdinalFromCardinal(cardinal) {
    switch(cardinal) {
    	case 1:
    	    return "Segundo periodo";
    	    break;
    	case 2:
    	    return "Tercer periodo";
    	    break;
    	case 3:
    	    return "Cuarto periodo";
    	    break;
    	case 4:
    	    return "Quinto periodo";
    	    break;
    	case 5:
    	    return "Sexto periodo";
    	    break;
    	case 6:
    	    return "S&eacute;ptimo periodo";
    	    break;
    	case 7:
    	    return "Octavo periodo";
    	    break;
    	case 8:
    	    return "Noveno periodo";
    	    break;
    	case 9:
    	    return "D&eacute;cimo periodo";
    	    break;
    	default:
    	    cardinal++;
    	    return cardinal + "º periodo";
    } 
}

function getDepositNumberFromCategory(category) {
    // alert(category);
    if (category.indexOf("sito ") != -1) {
	category = category.substring(category.indexOf("sito ") + 5);
	return parseInt(category.substring(0, 1));
    } else {
	return 0;
    }
}

function clearInterestList() {
    $("#interestOutput ul").empty();
}
