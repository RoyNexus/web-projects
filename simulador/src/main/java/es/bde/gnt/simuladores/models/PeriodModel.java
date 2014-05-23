package es.bde.gnt.simuladores.models;

import java.math.BigDecimal;

import org.json.JSONObject;

public class PeriodModel {

	public static final String RATE = "rate";
	public static final String EXPENDITURE = "expenditure";
	public static final String EXPENDITURE_PERIODICITY = "expenditurePeriodicity";
	public static final String MONTHS = "months";
	public static final String ID = "id";
	// Input fields
	private int id;
	private BigDecimal rate;
	private int months;
	private BigDecimal expenditure;
	private int expenditurePeriodicity;
	// Output fields
	private BigDecimal grossInterestPay;
	private String grossInterestPayOutput;
	// Errors
	private boolean errors = false;
	private String expenditureError;
	private String expenditurePeriodicityError;
	private String rateError;
	private String monthsError;

	public static PeriodModel parsePeriod(JSONObject object) {
		PeriodModel period = new PeriodModel();
		period.setExpenditure(new BigDecimal(object.optDouble(EXPENDITURE, 0.00)));
		period.setExpenditurePeriodicity(object.optInt(EXPENDITURE_PERIODICITY, 10));
		period.setMonths(object.optInt(MONTHS, 0));
		if (Double.isNaN(object.optDouble(RATE))) {
			period.setRate(null);
		} else {
			period.setRate(new BigDecimal(object.optDouble(RATE, 0.00)));
		}

		period.setId(object.optInt(ID));
		return period;
	}

	public BigDecimal getRate() {
		return rate;
	}

	public void setRate(BigDecimal rate) {
		this.rate = rate;
	}

	public int getMonths() {
		return months;
	}

	public void setMonths(int months) {
		this.months = months;
	}

	public BigDecimal getExpenditure() {
		return expenditure;
	}

	public void setExpenditure(BigDecimal expenditure) {
		this.expenditure = expenditure;
	}

	public int getExpenditurePeriodicity() {
		return expenditurePeriodicity;
	}

	public void setExpenditurePeriodicity(int expenditurePeriodicity) {
		this.expenditurePeriodicity = expenditurePeriodicity;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public boolean isErrors() {
		return errors;
	}

	public void setErrors(boolean errors) {
		this.errors = errors;
	}

	public String getExpenditureError() {
		return expenditureError;
	}

	public void setExpenditureError(String expenditureError) {
		this.expenditureError = expenditureError;
	}

	public String getExpenditurePeriodicityError() {
		return expenditurePeriodicityError;
	}

	public void setExpenditurePeriodicityError(String expenditurePeriodicityError) {
		this.expenditurePeriodicityError = expenditurePeriodicityError;
	}

	public String getRateError() {
		return rateError;
	}

	public void setRateError(String rateError) {
		this.rateError = rateError;
	}

	public String getMonthsError() {
		return monthsError;
	}

	public void setMonthsError(String monthsError) {
		this.monthsError = monthsError;
	}

	public BigDecimal getGrossInterestPay() {
		return grossInterestPay;
	}

	public void setGrossInterestPay(BigDecimal grossInterestPay) {
		this.grossInterestPay = grossInterestPay;
	}

	public String getGrossInterestPayOutput() {
		return grossInterestPayOutput;
	}

	public void setGrossInterestPayOutput(String grossInterestPayOutput) {
		this.grossInterestPayOutput = grossInterestPayOutput;
	}

}
