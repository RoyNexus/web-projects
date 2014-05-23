package es.bde.gnt.simuladores.helper;

public class VANCalculator extends FinancialFlows {

	private double capitalInvestment;

	public VANCalculator() {
	}

	public VANCalculator(int numFlows) {
		super(numFlows);
	}

	public double calculatePresentValue(double rate) {
		double result = 0.0;

		for (int i = 0; i < getLenght(); i++) {
			result += this.flows[i] / Math.pow(1.0 + rate, i + 1);
		}

		return result;
	}

	public double calculateNetPresentValue(double rate) {
		return calculatePresentValue(rate) - this.capitalInvestment;
	}

	public double calculateNPVPrime(double rate) {
		double result = 0.0;
		for (int i = 0; i < getLenght(); i++) {
			result -= (this.flows[i] * (i + 1)) / Math.pow(1.0 + rate, (i + 2));
		}
		return result;
	}

	public double getCapitalInvestment() {
		return capitalInvestment;
	}

	public void setCapitalInvestment(double capitalInvestment) {
		this.capitalInvestment = capitalInvestment;
	}
}
