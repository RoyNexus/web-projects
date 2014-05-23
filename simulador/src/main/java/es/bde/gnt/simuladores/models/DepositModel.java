package es.bde.gnt.simuladores.models;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

public class DepositModel implements Cloneable {

	public static final int MONTHLY = 12;
	public static final int QUARTERLY = 4;
	public static final int SEMIANNUALLY = 2;
	public static final int ANNUALLY = 1;
	public static final int ORIGIN = 0;
	public static final int EXPIRATION = 100;

	// Input fields
	private int id;
	private BigDecimal capital;
	private BigDecimal rate;
	private int months;
	private int interestPayments;
	private BigDecimal expenditure;
	private int expenditurePeriodicity;
	private List<PeriodModel> periods = new ArrayList<PeriodModel>();
	private String periodsStr;
	// Output fields
	private BigDecimal grossInterest;
	private BigDecimal grossInterestPay;
	private BigDecimal annualRate;
	private String annualRateOutput;
	private String grossInterestOutput;
	private String grossInterestPayOutput;
	private int monthsGlobal;
	private BigDecimal expenditureGlobalOutput;
	private BigDecimal expenditureGlobalOutputNegative;
	private BigDecimal capitalExpenditureLess;
	// Errors
	private String capitalError;
	private String rateError;
	private String monthsError;
	private String interestPaymentsError;
	private String expenditureError;
	private String expenditurePeriodicityError;
	private boolean errors = false;

	public JSONArray parsePeriodsJSON(String periods) {
		JSONArray jSON = new JSONArray(periods);
		return jSON;
	}

	public void addPeriods(JSONArray periods) {
		for (int n = 0; n < periods.length(); n++) {
			JSONObject object = periods.getJSONObject(n);
			getPeriods().add(PeriodModel.parsePeriod(object));
		}
	}

	public Object clone() {
		Object obj = null;
		try {
			obj = super.clone();
		} catch (CloneNotSupportedException ex) {
		}
		return obj;
	}

	// Getters and Setters
	public BigDecimal getCapital() {
		return capital;
	}

	public void setCapital(BigDecimal capital) {
		this.capital = capital;
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

	public int getInterestPayments() {
		return interestPayments;
	}

	public void setInterestPayments(int interestPayments) {
		this.interestPayments = interestPayments;
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

	public BigDecimal getGrossInterest() {
		return grossInterest;
	}

	public void setGrossInterest(BigDecimal grossInterest) {
		this.grossInterest = grossInterest;
	}

	public BigDecimal getGrossInterestPay() {
		return grossInterestPay;
	}

	public void setGrossInterestPay(BigDecimal grossInterestPay) {
		this.grossInterestPay = grossInterestPay;
	}

	public BigDecimal getAnnualRate() {
		return annualRate;
	}

	public void setAnnualRate(BigDecimal annualRate) {
		this.annualRate = annualRate;
	}

	public String getAnnualRateOutput() {
		return annualRateOutput;
	}

	public void setAnnualRateOutput(String annualRateOutput) {
		this.annualRateOutput = annualRateOutput;
	}

	public List<PeriodModel> getPeriods() {
		return periods;
	}

	public void setPeriods(List<PeriodModel> periods) {
		this.periods = periods;
	}

	public String getPeriodsStr() {
		return periodsStr;
	}

	public void setPeriodsStr(String periodsStr) {
		this.periodsStr = periodsStr;
	}

	public String getCapitalError() {
		return capitalError;
	}

	public void setCapitalError(String capitalError) {
		this.capitalError = capitalError;
	}

	public boolean isErrors() {
		return errors;
	}

	public void setErrors(boolean errors) {
		this.errors = errors;
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

	public String getInterestPaymentsError() {
		return interestPaymentsError;
	}

	public void setInterestPaymentsError(String interestPaymentsError) {
		this.interestPaymentsError = interestPaymentsError;
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

	public String getGrossInterestOutput() {
		return grossInterestOutput;
	}

	public void setGrossInterestOutput(String grossInterestOutput) {
		this.grossInterestOutput = grossInterestOutput;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getMonthsGlobal() {
		return monthsGlobal;
	}

	public void setMonthsGlobal(int monthsGlobal) {
		this.monthsGlobal = monthsGlobal;
	}

	public BigDecimal getExpenditureGlobalOutput() {
		return expenditureGlobalOutput;
	}

	public void setExpenditureGlobalOutput(BigDecimal expenditureGlobalOutput) {
		this.expenditureGlobalOutput = expenditureGlobalOutput;
	}

	public String getGrossInterestPayOutput() {
		return grossInterestPayOutput;
	}

	public void setGrossInterestPayOutput(String grossInterestPayOutput) {
		this.grossInterestPayOutput = grossInterestPayOutput;
	}

	public BigDecimal getExpenditureGlobalOutputNegative() {
		return expenditureGlobalOutputNegative;
	}

	public void setExpenditureGlobalOutputNegative(BigDecimal expenditureGlobalOutputNegative) {
		this.expenditureGlobalOutputNegative = expenditureGlobalOutputNegative;
	}

	public BigDecimal getCapitalExpenditureLess() {
		return capitalExpenditureLess;
	}

	public void setCapitalExpenditureLess(BigDecimal capitalExpenditureLess) {
		this.capitalExpenditureLess = capitalExpenditureLess;
	}

}
