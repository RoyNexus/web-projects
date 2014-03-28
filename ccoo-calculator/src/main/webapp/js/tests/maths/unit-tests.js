QUnit.module("Maths");

QUnit.test("getTwoDecimalsWithFloatOk", function(assert) {
	assert.equal(getTwoDecimalsWithFloat(30000), "30000,00", "30000 -> 30000,00");
	assert.equal(getTwoDecimalsWithFloat(30.99999), "31,00", "30.99999 -> 31,00");
	assert.equal(getTwoDecimalsWithFloat(30.3333), "30,33", "30.3333 -> 30.33");
	assert.equal(getTwoDecimalsWithFloat(10.1), "10,10", "10.1 -> 10,10");	
});

QUnit.test("getTwoDecimalsWithFloatNaN", function(assert) {
	assert.equal(getTwoDecimalsWithFloat("3000"), "NaN", "Not a Number");
	assert.equal(getTwoDecimalsWithFloat("ddd"), "NaN", "Not a Number");	
});