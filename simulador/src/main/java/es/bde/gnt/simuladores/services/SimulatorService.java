package es.bde.gnt.simuladores.services;

import java.math.BigDecimal;
import java.math.RoundingMode;

import es.bde.gnt.simuladores.helper.FinancialFlows;
import es.bde.gnt.simuladores.helper.IRRCalculator;
import es.bde.gnt.simuladores.models.DepositModel;
import es.bde.gnt.simuladores.models.PeriodModel;

public class SimulatorService {

	private static int SCALE = 30;

	public DepositModel getDepositSimulationWithPeriods(DepositModel deposit) {

		BigDecimal annualRateGlobal = new BigDecimal(0);
		BigDecimal expenditureGlobal = new BigDecimal(0);
		BigDecimal grossInterestGlobal = new BigDecimal(0);
		double monthsGlobal = calculateMonthsGlobal(deposit);

		// First, TAE for the main period
		deposit = getDepositSimulation(deposit);

		annualRateGlobal = getAnnualRateWeighted(deposit, monthsGlobal);
		expenditureGlobal = expenditureGlobal.add(deposit.getExpenditureGlobalOutput());
		grossInterestGlobal = grossInterestGlobal.add(deposit.getGrossInterest());

		for (PeriodModel period : deposit.getPeriods()) {
			DepositModel depositCopy = (DepositModel) deposit.clone();
			depositCopy.setExpenditure(period.getExpenditure());
			depositCopy.setExpenditurePeriodicity(period.getExpenditurePeriodicity());
			depositCopy.setMonths(period.getMonths());
			depositCopy.setRate(period.getRate());
			// TAE for the single period
			depositCopy = getDepositSimulation(depositCopy);
			annualRateGlobal = annualRateGlobal.add(getAnnualRateWeighted(depositCopy, monthsGlobal));
			expenditureGlobal = expenditureGlobal.add(depositCopy.getExpenditureGlobalOutput());
			grossInterestGlobal = grossInterestGlobal.add(depositCopy.getGrossInterest());
			period.setGrossInterestPay(depositCopy.getGrossInterestPay());
		}

		deposit.setAnnualRate(annualRateGlobal);
		deposit.setMonthsGlobal((int) monthsGlobal);
		deposit.setExpenditureGlobalOutput(expenditureGlobal);
		deposit.setGrossInterest(grossInterestGlobal);
		return deposit;
	}

	public DepositModel getDepositSimulation(DepositModel deposit) {

		// v0 -> deposit.capital
		// rNominal -> deposit.rate
		// nMeses -> deposit.months
		// k (solo en periodico) -> deposit.interestPayments = pagoIntereses {anual, mensual, trimestral, semestral}
		// expenditure -> deposit.expenditure
		// expenditurePeriodicity -> deposit.expenditurePeriodicity

		double numMeses;

		if ((deposit.getInterestPayments() == DepositModel.EXPIRATION)
				|| (deposit.getInterestPayments() == DepositModel.ORIGIN)) {
			double l_rNominal_p1 = deposit.getRate().doubleValue() / 100.0;
			double l_t = deposit.getMonths() / 12.0;
			deposit.setGrossInterestPay(deposit.getCapital().multiply(new BigDecimal(l_rNominal_p1))
					.multiply(new BigDecimal(l_t)));
			deposit.setGrossInterest(deposit.getGrossInterestPay());
			numMeses = ((1.0D / 100.0D) * 12);
		} else {
			BigDecimal rateDivide100 = deposit.getRate().divide(new BigDecimal(100.0));
			deposit.setGrossInterestPay((deposit.getCapital().multiply(rateDivide100)).divide(
					new BigDecimal(deposit.getInterestPayments()), SCALE, RoundingMode.HALF_UP));
			deposit.setGrossInterest(deposit.getGrossInterestPay());
			double aux = deposit.getInterestPayments();
			numMeses = ((1.0D / aux) * 12);
		}

		IRRCalculator flowTable = createDepositTable(deposit.getMonths(), deposit.getRate().doubleValue(),
				deposit.getInterestPayments(), numMeses, deposit.getExpenditure().doubleValue(),
				deposit.getExpenditurePeriodicity(), deposit.getCapital().doubleValue());
		// TAE return
		deposit.setAnnualRate(new BigDecimal(100.0 * convPerATae(callIRR(flowTable), 12.0)));
		deposit.setMonthsGlobal(deposit.getMonths());
		if (deposit.getExpenditure().doubleValue() > 0) {
			deposit.setExpenditureGlobalOutput(getExpenditureTotal(deposit));
		} else {
			deposit.setExpenditureGlobalOutput(deposit.getExpenditure());
		}
		
		deposit.setGrossInterest(getGrossInterestTotal(deposit));

		return deposit;
	}

	private BigDecimal getExpenditureTotal(DepositModel deposit) {
		BigDecimal result = new BigDecimal(0.00);
		if ((deposit.getExpenditurePeriodicity() == DepositModel.ORIGIN)
				|| (deposit.getExpenditurePeriodicity() == DepositModel.EXPIRATION)) {
			result = deposit.getExpenditure();
		} else {
			BigDecimal factor = new BigDecimal(deposit.getExpenditurePeriodicity()).divide(new BigDecimal(
					DepositModel.MONTHLY), SCALE, RoundingMode.HALF_UP);
			result = deposit.getExpenditure().multiply(new BigDecimal(deposit.getMonths())).multiply(factor);
		}
		return result;
	}

	private BigDecimal getGrossInterestTotal(DepositModel deposit) {
		BigDecimal result = new BigDecimal(0.00);

		if ((deposit.getInterestPayments() == DepositModel.ORIGIN)
				|| (deposit.getInterestPayments() == DepositModel.EXPIRATION)) {
			result = deposit.getGrossInterest();
		} else {
			BigDecimal factor = new BigDecimal(deposit.getInterestPayments()).divide(new BigDecimal(DepositModel.MONTHLY),
					SCALE, RoundingMode.HALF_UP);
			result = deposit.getGrossInterest().multiply(new BigDecimal(deposit.getMonths())).multiply(factor);
		}

		return result;
	}

	private BigDecimal getAnnualRateWeighted(DepositModel deposit, double monthsGlobal) {
		return deposit.getAnnualRate().multiply(new BigDecimal(deposit.getMonths()))
				.divide(new BigDecimal(monthsGlobal), SCALE, RoundingMode.HALF_UP);
	}

	private double calculateMonthsGlobal(DepositModel deposit) {
		double result = 0;
		result += deposit.getMonths();
		for (PeriodModel period : deposit.getPeriods()) {
			result += period.getMonths();
		}
		return result;
	}

	private static double callIRR(IRRCalculator flowTable) {
		// To calculate IRR
		flowTable.setCapital(-(flowTable.getFlows()[0]));
		flowTable.setFlows(FinancialFlows.copyOfRange(flowTable.getFlows(), 1, flowTable.getLenght()));
		return flowTable.getIRRValue();
	}

	private static IRRCalculator createDepositTable(int months, double interestRate, int periodicidadInteres,
			double pagoInteres, double a_gastoPeriodico, double a_periodicidadGastoPeriodico, double a_capital) {

		double l_interesPeriodo = interestRate / 1200.0;
		int l_numMesesTabla = months + 1;

		IRRCalculator depositTable = new IRRCalculator(l_numMesesTabla);

		depositTable.getFlows()[0] = (-(a_capital));
		depositTable.getFlows()[depositTable.getLenght() - 1] = a_capital;

		for (int idxPeriodo = 1; idxPeriodo < months; idxPeriodo++) {
			depositTable.getFlows()[idxPeriodo] = (idxPeriodo % pagoInteres != 0) ? 0
					: (a_capital * (l_interesPeriodo * pagoInteres));
			if ((a_periodicidadGastoPeriodico != 100) && (a_periodicidadGastoPeriodico != 0)) {
				double a_periodoGastoPeriodico = ((1 / a_periodicidadGastoPeriodico) * 12);
				if (idxPeriodo % a_periodoGastoPeriodico == 0) {
					depositTable.getFlows()[idxPeriodo] += -(a_gastoPeriodico);
				} else {
					depositTable.getFlows()[idxPeriodo] += 0;
				}
			} else {
				depositTable.getFlows()[idxPeriodo] += 0;
			}
		}

		if (periodicidadInteres == 0) { // si el pago de intereses es en origen
			depositTable.getFlows()[0] += (a_capital * (l_interesPeriodo * months));
		} else {
			if (periodicidadInteres == 100) { // si el pago es al vencimiento
				depositTable.getFlows()[depositTable.getLenght() - 1] += (a_capital * (l_interesPeriodo * months));
			} else {
				depositTable.getFlows()[depositTable.getLenght() - 1] += (a_capital * (l_interesPeriodo * pagoInteres));
			}
		}

		if (a_periodicidadGastoPeriodico == 0) { // si el gasto periodico es en
													// origen
			depositTable.getFlows()[0] += -(a_gastoPeriodico);
		} else {
			if (a_periodicidadGastoPeriodico == 100) { // si el gasto periodico
														// es al vencimiento
				depositTable.getFlows()[depositTable.getLenght() - 1] += -(a_gastoPeriodico);
			} else {
				depositTable.getFlows()[depositTable.getLenght() - 1] += -(a_gastoPeriodico);
			}
		}

		return depositTable;

	}

	private static double convPerATae(double a_interesTae, double a_periodosPorAnyo) {
		return Math.pow(1 + a_interesTae, a_periodosPorAnyo) - 1;
	}

}
