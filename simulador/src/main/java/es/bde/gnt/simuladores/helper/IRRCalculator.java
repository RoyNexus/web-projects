package es.bde.gnt.simuladores.helper;

public class IRRCalculator extends FinancialFlows {

	private double capital;

	public IRRCalculator() {
	}

	public IRRCalculator(int numFlows) {
		super(numFlows);
	}

	public double getIRRValue() {
		VANCalculator vanCalculator = new VANCalculator();
		vanCalculator.setCapitalInvestment(this.capital);
		vanCalculator.setFlows(this.flows);

		double tir = 0.0;
		double tir2;
		double van;
		double vanprima;
		double delta = -1.0;

		for (int i = 0; i < 200 && (int) (delta * 10000000) != 0; i++) {
			van = vanCalculator.calculateNetPresentValue(tir);
			vanprima = vanCalculator.calculateNPVPrime(tir);
			tir2 = tir - (van / vanprima);
			delta = Math.abs(tir - tir2);

			tir = tir2;
		}

		return tir;
	}

	public double getCapital() {
		return this.capital;
	}

	public void setCapital(double capital) {
		this.capital = capital;
	}
}
