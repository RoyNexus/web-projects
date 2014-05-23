package es.bde.gnt.simuladores.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import es.bde.gnt.simuladores.models.DepositModel;
import es.bde.gnt.simuladores.models.PeriodModel;
import es.bde.gnt.simuladores.services.SimulatorService;
import es.bde.gnt.simuladores.services.ValidationsService;

@Controller
public class SimulatorController {

	@Autowired
	private SimulatorService simulatorService;
	@Autowired
	private ValidationsService validationsService;

	/**
	 * Dispatcher AJAX method for JSP views
	 * 
	 * @param deposit
	 *            - the deposit input data
	 * @param result
	 * @return DepositModel in a JSON object format with the deposit output data
	 */
	@RequestMapping(value = "/getDepositSimulation", method = RequestMethod.POST)
	public @ResponseBody
	DepositModel getDepositSimulation(@ModelAttribute(value = "deposit") DepositModel deposit, BindingResult result) {
		// Add extra periods
		deposit.addPeriods(deposit.parsePeriodsJSON(deposit.getPeriodsStr()));
		// Fields validations
		deposit = validationsService.validate(deposit);
		if (!deposit.isErrors()) {
			// Deposit simulation
			if (deposit.getPeriods().isEmpty()) {
				// Only the main period
				deposit = simulatorService.getDepositSimulation(deposit);
			} else {
				// Simulation with extra periods
				deposit = simulatorService.getDepositSimulationWithPeriods(deposit);
			}
			// Output fields
			deposit.setAnnualRateOutput(validationsService.getTwoDecimalPrecission(deposit.getAnnualRate()));
			deposit.setGrossInterestOutput(validationsService.getTwoDecimalPrecission(deposit.getGrossInterest()));
			deposit.setGrossInterestPayOutput(validationsService.getTwoDecimalPrecission(deposit.getGrossInterestPay()));
			deposit.setGrossInterest(validationsService.adjustBigDecimalsTwo(deposit.getGrossInterest()));
			deposit.setCapital(validationsService.adjustBigDecimalsTwo(deposit.getCapital()));
			deposit.setExpenditure(validationsService.adjustBigDecimalsTwo(deposit.getExpenditure()));
			if (deposit.getExpenditureGlobalOutput() != null) {
				deposit.setExpenditureGlobalOutput(validationsService.adjustBigDecimalsTwo(deposit
						.getExpenditureGlobalOutput()));
			}
			for (PeriodModel period : deposit.getPeriods()) {
				period.setGrossInterestPayOutput(validationsService.getTwoDecimalPrecission(period.getGrossInterestPay()));
			}
		}
		return deposit;
	}

	/**
	 * It shows the "nuevoDeposito.jsp" view
	 * 
	 * @param uiModel
	 * @return the view id
	 */
	@RequestMapping(value = "/index", method = RequestMethod.GET)
	public String showNewIndex(Model uiModel) {
		return "nuevoDeposito";
	}

}