package es.bde.gnt.simuladores.helper;

public class Mortgage extends IRRCalculator {

	// private final static byte TA_SIZE = 5;
	private final static byte TA_TIPOINTERES = 0;
	private final static byte TA_CUOTA = 1;
	private final static byte TA_AMORTIZADO = 2;
	private final static byte TA_INTERESES = 3;
	private final static byte TA_CAPITALPENDIENTE = 4;

	public static Mortgage buildMortgage(double amountBorrowed, double fees, double expenditure, double expenditurePeriodicity, double rate,
			int months) {

		double netCapital = amountBorrowed - fees;
		Mortgage mortgage = new Mortgage();

		double[][] mortgageTables = calculaTablaRufmMasGastoPeriodico(months, rate, amountBorrowed, fees, expenditure,
				((1 / expenditurePeriodicity) * 12));
		mortgage.setCapital(netCapital);
		mortgage.setFlows(copyOfRange(mortgageTables[TA_CUOTA], 1, mortgageTables[TA_CUOTA].length));

		return mortgage;
	}

	private static double[][] calculaTablaRufmMasGastoPeriodico(int months, double rate, double amountBorrowed, double fees,
			double expenditure, double expenditurePeriodicity) {
		double l_interesPeriodo = rate / 1200.0;
		double l_cuota = redondea(amountBorrowed / rufFactorValorInicial(months, l_interesPeriodo), 2);

		double[][] flows = tablaAmortizacionPeriodoMasGastoPeriodicoInicial(amountBorrowed, months, months, l_interesPeriodo, l_cuota,
				fees, expenditure, expenditurePeriodicity);
		tablaAmortizacionMasGastoPeriodicoFin(flows, months, l_interesPeriodo, expenditure, expenditurePeriodicity);
		return flows;
	}

	private static double[][] tablaAmortizacionMasGastoPeriodicoFin(double[][] a_tabla, int a_periodoFin, double a_tipo,
			double a_gastoPeriodico, double a_periodoGastoPeriodico) {
		double l_pendienteAnterior = a_tabla[TA_CAPITALPENDIENTE][a_periodoFin - 1];
		a_tabla[TA_TIPOINTERES][a_periodoFin] = a_tipo;
		double l_intereses = redondea(l_pendienteAnterior * a_tipo, 2);
		a_tabla[TA_INTERESES][a_periodoFin] = l_intereses;
		a_tabla[TA_CUOTA][a_periodoFin] = (a_periodoFin % a_periodoGastoPeriodico != 0) ? l_pendienteAnterior + l_intereses
				: l_pendienteAnterior + l_intereses + a_gastoPeriodico;
		a_tabla[TA_AMORTIZADO][a_periodoFin] = l_pendienteAnterior;
		a_tabla[TA_CAPITALPENDIENTE][a_periodoFin] = 0.0;
		return a_tabla;
	}

	private static double rufFactorValorInicial(int months, double rate) {
		if (rate == 0.0) {
			return months;
		} else {
			double l_factorFinal = Math.pow(1 + rate, months);
			return (l_factorFinal - 1) / (rate * l_factorFinal);
		}
	}

	private static double redondea(double importe, double decimales) {
		double l_factorEscala = Math.pow(10.0, decimales);
		return Math.round(importe * l_factorEscala) / l_factorEscala;
	}

	private static double[][] tablaAmortizacionPeriodoMasGastoPeriodicoInicial(double amountBorrowed, int months, int endMonths,
			double rate, double quota, double fees, double expenditure, double expenditurePeriodicity) {

		int l_numMesesTabla = months + 1;
		double[] l_tiposInteres = new double[l_numMesesTabla];
		double[] l_cuotas = new double[l_numMesesTabla];
		double[] l_amortizados = new double[l_numMesesTabla];
		double[] l_intereses = new double[l_numMesesTabla];
		double[] l_capitalesPendientes = new double[l_numMesesTabla];
		double[][] l_tabla = { l_tiposInteres, l_cuotas, l_amortizados, l_intereses, l_capitalesPendientes };

		l_tiposInteres[0] = 0;
		l_cuotas[0] = -(amountBorrowed - fees);
		l_amortizados[0] = 0;
		l_intereses[0] = 0;
		l_capitalesPendientes[0] = amountBorrowed;

		l_tabla = tablaAmortizacionPeriodoMasGastoPeriodicoIntermedio(l_tabla, 1, endMonths, rate, quota, expenditure,
				expenditurePeriodicity);
		return l_tabla;
	}

	private static double[][] tablaAmortizacionPeriodoMasGastoPeriodicoIntermedio(double[][] a_tabla, int a_periodoInicio,
			int a_periodoFin, double a_tipo, double a_cuota, double a_gastoPeriodico, double a_periodoGastoPeriodico) {
		double l_pendienteAnterior = a_tabla[TA_CAPITALPENDIENTE][a_periodoInicio - 1];
		for (int idxPeriodo = a_periodoInicio; idxPeriodo < a_periodoFin; idxPeriodo++) {
			a_tabla[TA_TIPOINTERES][idxPeriodo] = a_tipo;
			if (idxPeriodo % a_periodoGastoPeriodico == 0) {
				a_tabla[TA_CUOTA][idxPeriodo] = a_cuota + a_gastoPeriodico;
			} else {
				a_tabla[TA_CUOTA][idxPeriodo] = a_cuota;
			}

			double l_importeInteres = redondea(l_pendienteAnterior * a_tipo, 2);
			a_tabla[TA_INTERESES][idxPeriodo] = l_importeInteres;
			double l_amortizado = a_cuota - l_importeInteres;
			a_tabla[TA_AMORTIZADO][idxPeriodo] = l_amortizado;
			l_pendienteAnterior -= l_amortizado;
			a_tabla[TA_CAPITALPENDIENTE][idxPeriodo] = l_pendienteAnterior;
		}

		return a_tabla;
	}

}
