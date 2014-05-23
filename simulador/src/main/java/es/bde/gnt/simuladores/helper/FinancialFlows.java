package es.bde.gnt.simuladores.helper;

public class FinancialFlows {

	protected double[] flows;

	public FinancialFlows() {
	}

	public FinancialFlows(double[] flows) {
		this.flows = flows;
	}

	public FinancialFlows(int numFlows) {
		this.flows = new double[numFlows];
	}

	public double[] getFlows() {
		return flows;
	}

	public void setFlows(double[] flows) {
		this.flows = flows;
	}

	public int getLenght() {
		return this.flows.length;
	}
	
	public static double[] copyOfRange(double[] original, int from, int to) {
		int newLength = to - from;
		if (newLength < 0)
			throw new IllegalArgumentException(from + " > " + to);
		double[] copy = new double[newLength];
		System.arraycopy(original, from, copy, 0, Math.min(original.length - from, newLength));
		return copy;
	}

}
