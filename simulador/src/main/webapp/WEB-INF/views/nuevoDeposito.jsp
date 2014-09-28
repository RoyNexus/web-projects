<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page import="es.bde.gnt.simuladores.models.DepositModel"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="es" lang="es">
<head>
<title>Simuladores BdE</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<!-- Bootstrap -->
<link href="css/bootstrap.min.css" rel="stylesheet" />
<link href="css/banc-es.css" rel="stylesheet" />
<!-- Latest compiled and minified JavaScript --><!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// --><!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
<![endif]-->


<!--[if IE]>
<script type="text/javascript">
var e = ("abbr,article,aside,audio,canvas,datalist,details,figure,footer,header,hgroup,mark,menu,meter,nav,output,progress,section,time,video").split(',');
for (var i=0; i<e.length; i++) {
document.createElement(e[i]);
}
</script>
<![endif]-->

<!-- "AddType text/x-component .htc" this text for apache, tomcat, etc and view css3 in explorer8 -->
</head>
<body>
<div class="container relative-class" id="firstPage">
  <img class="prest-img" src="img/img-form.png" />
    <div class="cont-form resul-dif">
      <div class="col-lg-12 nopadding">
            <h4>Simulador de dep&oacute;sitos bancarios: intereses y TAE</h4>
            <p>Este simulador le permite calcular el importe de los intereses brutos a percibir en un dep&oacute;sito bancario, con un Tipo de Inter&eacute;s, plazo y periocidad de pago determinados, calculando adem&aacute;s su Tasa Anual Equivalente.</p>
        </div>
        <div>
          <a href="#" class="btn btn-default" id="displPag">Comenzar</a>
        </div>
    </div>
</div>  
<div class="container" id="mainContainer">
  <h3>Simulador dep&oacute;sitos bancarios a distintos plazos: intereses y TAE</h3>
  <div class="cont-form"> 
    <!-- prestamoForm -->
    <form id="prestamoForm" role="form" class="form-horizontal">
      <div class="row"> <!-- row 1 --> 
        <!-- Inicio Capital Inicial -->
        <h5>Capital inicial</h5>
      </div>
      <!-- /row 1 -->
      
      <div class="row"> <!-- row 2 -->
        <div class="col-md-12">
          <div class="form-group">
            <div class="col-md-3 padding-left-5">
              <div class="form-group">
                <input type="text" name="capitalInicial" id="capitalInicial"
             class="form-control" value="" oninput="updateValue(this.value, 'capitalInicialRange');"
           onchange="updateValue(this.value, 'capitalInicialRange');" />
              </div>
            </div>
            <div class="col-md-1">
              <label class="control-label">&euro;</label>
            </div>
            <div class="col-md-2 align-right">
              <label class="control-label">0 &euro;</label>
            </div>
            <div class="col-md-5 slider-change" id="capitalInicialRange"> </div>
      <div class="b-error col-lg-12 padding-left-5" id="capitalError"></div>
            <!--
          <div class="col-md-1">
            <label class="control-label">500.000 &euro; </label>
          </div>
          <div class="col-md-1"></div>
          <div class="col-md-1"></div>
          --> 
          </div>
        </div>
      </div>
      <!-- /row 2 --> 
       <div class="row">         
        <h5>Periodo inicial</h5>
      </div>     
      <!-- Inicio Plazo del deposito -->
      <div class="row box-border"> <!-- row 2 -->
        <div class="form-group">
          <div class="col-md-12">Duraci&oacute;n del periodo</div>
        </div>
        <div class="form-group">
          <div class="col-md-2 padding-left-5">
            <input type="text" name="plazoDeposito" id="plazoDeposito"
             class="form-control" value="" oninput="updateValue(this.value, 'plazoDepositoRange');"
             onchange="updateValue(this.value, 'plazoDepositoRange');" />
          </div>
          <div class="col-md-4"><!-- label class="control-label">a&ntilde;os</label-->
            <select class="form-control" name="tipoPlazo" id="tipoPlazo">
              <option value="12">a&ntilde;os</option>
              <option value="1">meses</option>
            </select>
          </div>
          <div class="col-md-5 slider-change" id="plazoDepositoRange"></div>
      <div class="b-error col-lg-12" id="monthsError"></div>
        </div>
        <!-- Fin Plazo del deposito --> <!-- Inicio Tipo de interes nominal anual -->
        <div class="form-group">
          <div class="col-md-12">Tipo de inter&eacute;s nominal anual</div>
        </div>
        <div class="form-group">
          <div class="col-md-3 padding-left-5">
            <input type="text" name="rate" id="rate" class="form-control" value=""
   			 oninput="updateValue(this.value, 'tipoInteresRange');" onchange="updateValue(this.value, 'tipoInteresRange');" />
          </div>
          <div class="col-md-1 nopadding">
            <label class="control-label">%</label>
          </div>
          <div class="col-md-1 nopadding">
            <label class="control-label">0 %</label>
          </div>
          <div class="col-md-5 slider-change" id="tipoInteresRange"></div>
          <div class="col-md-1 nopadding">
            <label class="control-label">30 %</label>
          </div>
      <div class="b-error col-lg-12" id="rateError"></div>
        </div>
        
        <!-- Inicio Gastos totales del periodo y periodicidad de gastos -->
        <div class="form-group">
          <div class="col-md-6-5 nopadding-right">Gastos totales del periodo</div>
          <div class="col-md-5-5">Periodicidad de gastos</div>
        </div>
        <div class="form-group">
          <div class="col-md-3 padding-left-5">
            <input type="text" name="gastosTotales" id="gastosTotales" class="form-control" value="" />
          </div>
          <div class="col-md-1 nopadding">
            <label class="control-label">&euro;</label>
          </div>          
          <div class="col-md-2 sep"></div>
          <div class="col-md-6">
            <select class="form-control" name="periodicidadGastos" id="periodicidadGastos">
              <option value="10">-seleccionar-</option>
              <option value="1">anual</option>
              <option value="2">semestral</option>
              <option value="4">trimestral</option>
              <option value="12">mensual</option>
              <option value="0">origen</option>
              <option value="100">vencimiento</option>
            </select>
          </div>
        <div class="b-error col-lg-6" id="expenditureError"></div>
        <div class="b-error col-lg-6" id="expenditurePeriodicityError"></div>
        </div>
        <!-- Fin Gastos totales del periodo y periodicidad de gastos --></div>
      
      <!-- Inicio nuevos periodos -->
      <div id="newPeriods" class="row"></div>
      <!-- Fin nuevos periodos -->
      <!-- Botones anadir y eliminar periodo -->      
      <div class="form-group top-margin">
        <div class="col-md-2">
          <input value=" + " id="addPeriod" type="button" class="btn btn-default nomargin" />
        </div>
        <div class="col-md-4 nopadding margin-top-8">A&ntilde;adir periodo</div>
        <div class="col-md-2">
          <input value=" - " id="delPeriod" type="button" class="btn btn-default nomargin" /> 
        </div>
        <div class="col-md-4 nopadding margin-top-8">Eliminar periodo</div>
      </div>
      <!-- Inicio Pago de intereses -->
      <div class="form-group">
        <div class="col-md-8 nopadding">Pago de intereses</div>
        <div class="col-md-5 nopadding">
          <select class="form-control" name="pagoIntereses" id="pagoIntereses">
            <option value="1">anual</option>
            <option value="2">semestral</option>
            <option value="4">trimestral</option>
            <option value="12">mensual</option>
            <option value="0">origen</option>
            <option value="100">vencimiento</option>
          </select>
        </div> 
    	<div class="b-error col-lg-12 padding-left-5" id="interestPaymentsError"></div>
      </div>
      <!-- Boton de calcular -->
      <div class="form-group top-margin">
      	<div class="col-md-8">      	
      	</div>
        <div class="col-md-4">
          <input value="  Calcular  " type="button" class="btn btn-default" onclick="calculate();" />
        </div>
      </div>      
    </form> 
  </div> <!-- /cont-form -->
  <div class="cont-resul" >
    <div class="row relative-class nomargin new-width-right">
      <div class="col-md-1 absolute-class"><input type="button" class="btn" id="moveLeft" value="&larr;" style="display: none;" /></div>
      <div class="col-md-12">       
        <div class="border-button">
          <input value="Comparar dep&oacute;sitos" type="button" class="btn btn-default" id="compararBtn" />
        </div>                
      </div>
      <div class="col-md-1 absolute-class absolute-class-right"><input type="button" class="btn" id="moveRight" value="&rarr;" style="display: none;"/></div>
      <div class="col-md-12" id="numDeposito">Est&aacute;s en el dep&oacute;sito bancario 1       
      </div>
      <div class="col-md-12">
        <p class="separator">. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .</p>
      </div>
      <div class="col-md-12 nopadding">
        <p>Utlilice los botones de navegaci&oacute;n para cambiar de dep&oacute;sito o pulse <a href="#" id="deleteDepositBtn">aqu&iacute;</a> para eliminar esta comparativa</p>
      </div>
    </div>
    <div class="content-aunt flca col-md-12">
      <div class="form-group row">
        <div class="col-md-4" id="numDeposito"></div>
      </div>
      <div class="form-group row">
        <div class="col-md-12">Intereses brutos en cada pago</div>
        <div class="col-md-12 nopadding" id="interestOutput">
          <ul class="interest-box"></ul>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-md-12">Intereses totales</div>
        <div class="col-md-12">
          <input type="text" class="form-control nopadding" id="interesesTotalesResult" readonly="readonly" />
        </div>
      </div>      
      <div class="form-group row">
        <div class="col-md-12">Gastos totales</div>
        <div class="col-md-12">
          <input type="text" class="form-control nopadding" id="gastosTotalesResult" readonly="readonly" />
        </div>
      </div>      
      <div class="form-group row">
        <div class="col-md-12">TAE</div>
        <div class="col-md-12">
          <input type="text" class="form-control nopadding" id="TAE" readonly="readonly" />
        </div>
      </div>
    </div>
  </div> <!-- /cont-resul -->


  <div class="col-md-12 bsck-bt">
  	<div class="border-button left">
  	  <input value="Iniciar" type="button" class="btn btn-default" id="iniciarBtn" />
  	</div>
    <div class="border-button">
      <input value="Ver detalles" type="button" class="btn btn-default" id="verDetallesBtn" />
    </div>
  </div>

</div> <!-- /mainContainer -->

<div class="row" id="graficos">
  <div class="col-md-12" id="prestamoChart" style="width: 700px; height: 600px; display: block;">
  </div>
  <div class="col-md-12 center-chart">
    <button id="printBtn"><img src="img/imprimir.png" width="40" height="35" /></button>
      <button id="pdfBtn"><img src="img/descargarPDF.png" width="40" height="35" /></button>
      <input id="returnBtn" value="Volver" type="button" class="btn btn-default" />     
  </div>
</div>

<div id="maxSimulators" title="Mensaje" style="display: none;">
  <p>Se ha alcanzado el l&iacute;mite de dep&oacute;sitos</p>
</div>

<div id="ajaxError" title="Error" style="display: none;">
  <p>Por favor, revise los campos introducidos</p>
</div>

<!-- jQuery --> 
<script type="text/javascript" src="js/jquery-1.11.0.min.js"></script>
<!-- Bootstrap imports -->
<script src="js/bootstrap.min.js"></script>
<!-- jQuery UI imports  -->
<link rel="stylesheet" href="css/jquery-ui-1.10.4.custom.min.css" />
<script type="text/javascript" src="js/jquery-ui-1.10.4.custom.min.js"></script>
<!-- Highcharts imports  -->
<script src="js/highcharts.js" charset="UTF-8"></script>
<script src="js/exporting.js" charset="UTF-8"></script>
<!-- Selectivizr  pseudo-classes  -->
<script type="js/javascript" src="js/selectivizr-min.js"></script>

<script src="js/graficos.js" charset="UTF-8"></script>
<script src="js/effects.js" charset="UTF-8"></script>
</body>
</html>