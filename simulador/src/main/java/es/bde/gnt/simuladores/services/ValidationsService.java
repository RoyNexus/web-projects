package es.bde.gnt.simuladores.services;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;

import es.bde.gnt.simuladores.models.DepositModel;
import es.bde.gnt.simuladores.models.PeriodModel;

public class ValidationsService {

	private static double ZERO_DOUBLE = 0.00;
	private static int ZERO_INT = 0;
	private static double CAPITAL_MAX = 9999999.00;
	private static double RATE_MAX = 30.00;
	private static int MONTHS_MAX = 600;
	private static int SCALE_TWO_DECIMALS = 2;

	@Autowired
	private ReloadableResourceBundleMessageSource messages;

	public DepositModel validate(DepositModel deposit) {

		deposit.setCapital(initBigDecimal(deposit.getCapital()));
		deposit.setExpenditure(initBigDecimal(deposit.getExpenditure()));

		if ((deposit.getCapital().doubleValue() <= ZERO_DOUBLE) || (deposit.getCapital().doubleValue() > CAPITAL_MAX)) {
			deposit.setCapitalError(messages.getMessage("input.error.value", null, new Locale("es")));
			deposit.setErrors(true);
		}

		if ((deposit.getRate() == null) || (deposit.getRate().doubleValue() < ZERO_DOUBLE)
				|| (deposit.getRate().doubleValue() > RATE_MAX)) {
			deposit.setRateError(messages.getMessage("input.error.value", null, new Locale("es")));
			deposit.setErrors(true);
		}

		if ((deposit.getMonths() <= ZERO_INT) || (deposit.getMonths() > MONTHS_MAX)) {
			deposit.setMonthsError(messages.getMessage("input.error.value", null, new Locale("es")));
			deposit.setErrors(true);
		}

		if (!(deposit.getInterestPayments() == 100 || deposit.getInterestPayments() == 0)) {
			double rest = (double) deposit.getMonths() % ((1 / (double) deposit.getInterestPayments()) * 12);
			if (rest != 0) {
				deposit.setInterestPaymentsError(messages.getMessage("input.deposit.period", null, new Locale("es")));
				deposit.setErrors(true);
			}
		}

		if ((deposit.getExpenditure().doubleValue() <= ZERO_DOUBLE)
				|| (deposit.getExpenditure().doubleValue() > CAPITAL_MAX)) {
			if (deposit.getExpenditurePeriodicity() != 10) {
				deposit.setExpenditureError(messages.getMessage("input.error.value", null, new Locale("es")));
				deposit.setErrors(true);
			}
		}

		// If expenditure periocidity equals 10 ("-seleccionar-" value)
		if (deposit.getExpenditurePeriodicity() == 10) {
			if (!((deposit.getExpenditure() == null) || (deposit.getExpenditure().doubleValue() <= ZERO_DOUBLE) || (deposit
					.getExpenditure().doubleValue() > CAPITAL_MAX))) {
				deposit.setExpenditurePeriodicityError(messages.getMessage("input.deposit.payments", null, new Locale("es")));
				deposit.setErrors(true);
			}
		}

		if (!(deposit.getExpenditurePeriodicity() == 100 || deposit.getExpenditurePeriodicity() == 0 || deposit
				.getExpenditurePeriodicity() == 10)) {
			double rest = (double) deposit.getMonths() % ((1 / (double) deposit.getExpenditurePeriodicity()) * 12);
			if (rest != 0) {
				deposit.setExpenditurePeriodicityError(messages.getMessage("input.deposit.periodicity", null, new Locale(
						"es")));
				deposit.setErrors(true);
			}
		}

		for (PeriodModel period : deposit.getPeriods()) {
			period = validate(period);
			if (period.isErrors()) {
				deposit.setErrors(true);
			}
		}

		return deposit;
	}

	public PeriodModel validate(PeriodModel period) {
		period.setExpenditure(initBigDecimal(period.getExpenditure()));

		if ((period.getRate() == null) || (period.getRate().doubleValue() < ZERO_DOUBLE)
				|| (period.getRate().doubleValue() > RATE_MAX)) {
			period.setRateError(messages.getMessage("input.error.value", null, new Locale("es")));
			period.setErrors(true);
		}

		if ((period.getMonths() <= ZERO_INT) || (period.getMonths() > MONTHS_MAX)) {
			period.setMonthsError(messages.getMessage("input.error.value", null, new Locale("es")));
			period.setErrors(true);
		}

		if ((period.getExpenditure().doubleValue() <= ZERO_DOUBLE) || (period.getExpenditure().doubleValue() > CAPITAL_MAX)) {
			if (period.getExpenditurePeriodicity() != 10) {
				period.setExpenditureError(messages.getMessage("input.error.value", null, new Locale("es")));
				period.setErrors(true);
			}
		}

		// If expenditure periocidity equals 10 ("-seleccionar-" value)
		if (period.getExpenditurePeriodicity() == 10) {
			if (!((period.getExpenditure() == null) || (period.getExpenditure().doubleValue() <= ZERO_DOUBLE) || (period
					.getExpenditure().doubleValue() > CAPITAL_MAX))) {
				period.setExpenditurePeriodicityError(messages.getMessage("input.deposit.payments", null, new Locale("es")));
				period.setErrors(true);
			}
		}

		if (!(period.getExpenditurePeriodicity() == 100 || period.getExpenditurePeriodicity() == 0 || period
				.getExpenditurePeriodicity() == 10)) {
			double rest = (double) period.getMonths() % ((1 / (double) period.getExpenditurePeriodicity()) * 12);
			if (rest != 0) {
				period.setExpenditurePeriodicityError(messages
						.getMessage("input.period.periodicity", null, new Locale("es")));
				period.setErrors(true);
			}
		}
		return period;
	}

	public String getTwoDecimalPrecission(BigDecimal bigDecimalValue) {

		String result;
		DecimalFormat formatterTwo = new DecimalFormat("###,##0.00", new DecimalFormatSymbols(new Locale("es")));
		DecimalFormat formatterFour = new DecimalFormat("###,##0.0000", new DecimalFormatSymbols(new Locale("es")));

		// Redondeo correcto a 4 decimales
		result = formatterFour.format(bigDecimalValue);
		result = result.replace(".", "");
		result = result.replace(",", ".");
		// Vamos a pasar a 2 decimales
		result = getTwoDecimal(result);
		// Formateamos el valor a 2 decimales
		result = formatterTwo.format(Double.parseDouble(result));
		return result.replace(".", "");
	}

	public BigDecimal adjustBigDecimalsTwo(BigDecimal bigDecimalValue) {
		return bigDecimalValue.setScale(SCALE_TWO_DECIMALS, RoundingMode.HALF_UP);
	}

	private String getTwoDecimal(String x) {
		int pos = x.indexOf('.');
		if (pos >= 0) {
			int end = Math.min(pos + 2, x.length() - 1);
			while (x.charAt(end) == '0')
				end--;
			if (x.charAt(end) == '.')
				end--;
			x = x.substring(0, end + 1);
		}
		return x;
	}

	private BigDecimal initBigDecimal(BigDecimal value) {
		if (value == null) {
			return new BigDecimal(0.00);
		} else {
			return value;
		}
	}
}
