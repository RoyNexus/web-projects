package es.bde.gnt.simuladores.services;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.math.BigDecimal;

import org.junit.Test;

import es.bde.gnt.simuladores.models.DepositModel;
import es.bde.gnt.simuladores.models.PeriodModel;

public class SimulatorServiceTest {

	private SimulatorService simulatorService = new SimulatorService();

	@Test
	public void getDepositSimulationThreePercentTest() {
		DepositModel deposit = new DepositModel();
		deposit.setCapital(new BigDecimal(20000));
		deposit.setExpenditure(new BigDecimal(0));
		deposit.setExpenditurePeriodicity(1);
		deposit.setInterestPayments(1);
		deposit.setMonths(240);
		deposit.setRate(new BigDecimal(3.00));

		try {
			deposit = simulatorService.getDepositSimulation(deposit);
			assertEquals(600.00D, deposit.getGrossInterestPay().doubleValue(), 0.00);
			assertEquals(new BigDecimal(3.0000000000001136868377216160297393798828125), deposit.getAnnualRate());
		} catch (Exception ex) {
			assertTrue(false);
		}
	}

	@Test
	public void getDepositSimulationTwoPercentTest() {
		DepositModel deposit = new DepositModel();
		deposit.setCapital(new BigDecimal(40000));
		deposit.setExpenditure(new BigDecimal(0));
		deposit.setExpenditurePeriodicity(1);
		deposit.setInterestPayments(2);
		deposit.setMonths(200);
		deposit.setRate(new BigDecimal(2.41));

		try {
			deposit = simulatorService.getDepositSimulation(deposit);
			assertEquals(482.00D, deposit.getGrossInterestPay().doubleValue(), 0.00);
			assertEquals(new BigDecimal(2.46439825306470350341214725631289184093475341796875), deposit.getAnnualRate());
		} catch (Exception ex) {
			assertTrue(false);
		}
	}

	@Test
	public void getDepositSimulationWithPeriodicityExpenditureTest() {
		DepositModel deposit = new DepositModel();
		deposit.setCapital(new BigDecimal(50000));
		deposit.setExpenditure(new BigDecimal(10));
		deposit.setExpenditurePeriodicity(12);
		deposit.setInterestPayments(1);
		deposit.setMonths(200);
		deposit.setRate(new BigDecimal(3.41));

		try {
			deposit = simulatorService.getDepositSimulation(deposit);
			assertEquals(1705.00D, deposit.getGrossInterestPay().doubleValue(), 0.00);
			assertEquals(new BigDecimal(3.219632326935428778824643814004957675933837890625), deposit.getAnnualRate());
			assertEquals(2000D, deposit.getExpenditureGlobalOutput().doubleValue(), 0.00);
		} catch (Exception ex) {
			assertTrue(false);
		}
	}

	@Test
	public void getDepositSimulationWithPeriodsCase1ExcelTest() {
		DepositModel deposit = new DepositModel();
		deposit.setCapital(new BigDecimal(50000));
		deposit.setExpenditure(new BigDecimal(100));
		deposit.setExpenditurePeriodicity(1);
		deposit.setInterestPayments(1);
		deposit.setMonths(12);
		deposit.setRate(new BigDecimal(5));

		PeriodModel period = new PeriodModel();
		period.setExpenditure(new BigDecimal(100));
		period.setExpenditurePeriodicity(1);
		period.setMonths(12);
		period.setRate(new BigDecimal(5));
		// Add 2nd period
		deposit.getPeriods().add(period);

		period = new PeriodModel();
		period.setExpenditure(new BigDecimal(100));
		period.setExpenditurePeriodicity(1);
		period.setMonths(12);
		period.setRate(new BigDecimal(5));
		// Add 3rd period
		deposit.getPeriods().add(period);
		try {
			deposit = simulatorService.getDepositSimulationWithPeriods(deposit);
			// assertEquals(1705.00D, deposit.getGrossInterestPay().doubleValue(), 0.00);
			assertEquals(4.79999999996894, deposit.getAnnualRate().doubleValue(), 0.00);
			assertEquals(300D, deposit.getExpenditureGlobalOutput().doubleValue(), 0.00);
		} catch (Exception ex) {
			assertTrue(false);
		}
	}

	@Test
	public void getDepositSimulationWithPeriodsCase2ExcelTest() {
		DepositModel deposit = new DepositModel();
		deposit.setCapital(new BigDecimal(50000));
		deposit.setExpenditure(new BigDecimal(200));
		deposit.setExpenditurePeriodicity(2);
		deposit.setInterestPayments(2);
		deposit.setMonths(12);
		deposit.setRate(new BigDecimal(5));

		PeriodModel period = new PeriodModel();
		period.setExpenditure(new BigDecimal(200));
		period.setExpenditurePeriodicity(2);
		period.setMonths(6);
		period.setRate(new BigDecimal(5));
		// Add 2nd period
		deposit.getPeriods().add(period);

		period = new PeriodModel();
		period.setExpenditure(new BigDecimal(200));
		period.setExpenditurePeriodicity(2);
		period.setMonths(6);
		period.setRate(new BigDecimal(5));
		// Add 3rd period
		deposit.getPeriods().add(period);
		try {
			deposit = simulatorService.getDepositSimulationWithPeriods(deposit);
			// assertEquals(1705.00D, deposit.getGrossInterestPay().doubleValue(), 0.00);
			assertEquals(4.244099999994256, deposit.getAnnualRate().doubleValue(), 0.00);
			assertEquals(800D, deposit.getExpenditureGlobalOutput().doubleValue(), 0.00);
		} catch (Exception ex) {
			assertTrue(false);
		}
	}

	@Test
	public void getDepositSimulationWithPeriodsCase3ExcelTest() {
		DepositModel deposit = new DepositModel();
		deposit.setCapital(new BigDecimal(50000));
		deposit.setExpenditure(new BigDecimal(0));
		deposit.setExpenditurePeriodicity(0);
		deposit.setInterestPayments(0);
		deposit.setMonths(12);
		deposit.setRate(new BigDecimal(3));

		PeriodModel period = new PeriodModel();
		period.setExpenditure(new BigDecimal(0));
		period.setExpenditurePeriodicity(0);
		period.setMonths(12);
		period.setRate(new BigDecimal(2));
		// Add 2nd period
		deposit.getPeriods().add(period);

		period = new PeriodModel();
		period.setExpenditure(new BigDecimal(0));
		period.setExpenditurePeriodicity(0);
		period.setMonths(12);
		period.setRate(new BigDecimal(4));
		// Add 3rd period
		deposit.getPeriods().add(period);
		try {
			deposit = simulatorService.getDepositSimulationWithPeriods(deposit);
			// assertEquals(1705.00D, deposit.getGrossInterestPay().doubleValue(), 0.00);
			assertEquals(3.100088832780227, deposit.getAnnualRate().doubleValue(), 0.00);
			assertEquals(0D, deposit.getExpenditureGlobalOutput().doubleValue(), 0.00);
		} catch (Exception ex) {
			assertTrue(false);
		}
	}

	@Test
	public void getDepositSimulationWithPeriodsCase4ExcelTest() {
		DepositModel deposit = new DepositModel();
		deposit.setCapital(new BigDecimal(20000));
		deposit.setExpenditure(new BigDecimal(50));
		deposit.setExpenditurePeriodicity(4);
		deposit.setInterestPayments(4);
		deposit.setMonths(12);
		deposit.setRate(new BigDecimal(2));

		PeriodModel period = new PeriodModel();
		period.setExpenditure(new BigDecimal(40));
		period.setExpenditurePeriodicity(4);
		period.setMonths(6);
		period.setRate(new BigDecimal(2.5));
		// Add 2nd period
		deposit.getPeriods().add(period);

		period = new PeriodModel();
		period.setExpenditure(new BigDecimal(20));
		period.setExpenditurePeriodicity(4);
		period.setMonths(6);
		period.setRate(new BigDecimal(3));
		// Add 3rd period
		deposit.getPeriods().add(period);
		try {
			deposit = simulatorService.getDepositSimulationWithPeriods(deposit);
			// assertEquals(1705.00D, deposit.getGrossInterestPay().doubleValue(), 0.00);
			assertEquals(1.5859601937984191, deposit.getAnnualRate().doubleValue(), 0.00);
			assertEquals(320D, deposit.getExpenditureGlobalOutput().doubleValue(), 0.00);
		} catch (Exception ex) {
			assertTrue(false);
		}
	}

}
