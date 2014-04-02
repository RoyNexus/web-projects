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

QUnit.test("getDailyWageFourteenPaysOk", function(assert) {
    assert.equal(getDailyWageFourteenPays(20000), 47.61904761904762, "20000 -> 47.61904761904762");
    assert.equal(getDailyWageFourteenPays(34500), 82.14285714285714, "34500 -> 82.14285714285714");
});

QUnit.test("getDailyWageOk", function(assert) {
    assert.equal(getDailyWage(20000), 55.55555555555556, "20000 -> 55.55555555555556");
    assert.equal(getDailyWage(34000), 94.44444444444444, "34000 -> 94.44444444444444");
});

QUnit.test("getFiniquitoVacacionesOk", function(assert) {
    assert.equal(getFiniquitoVacaciones("31/03/2014", 2, 23, 30000), 307.17592592592587, "getFiniquitoVacacionesOk");
    assert.equal(getFiniquitoVacaciones("28/10/2015", 7, 23, 22060), 749.4612654320987, "getFiniquitoVacacionesOk");
});

QUnit.test("getFiniquitoMes12PagasOk", function(assert) {
    assert.equal(getFiniquitoMes12Pagas(30000, "31/03/2014", 0), 2583.333333333333, "getFiniquitoMes12PagasOk");
    assert.equal(getFiniquitoMes12Pagas(22060, "28/10/2015", 0), 1715.7777777777778, "getFiniquitoMes12PagasOk");
    assert.equal(getFiniquitoMes12Pagas(30000, "31/03/2014", 1), 2260.4166666666665,
	    "getFiniquitoMes12Pagas1HoraReduccion");
    assert.equal(getFiniquitoMes12Pagas(22060, "28/10/2015", 2), 1286.8333333333335,
	    "getFiniquitoMes12Pagas2HorasReduccion");
});

QUnit.test("getFiniquitoMes14PagasOk", function(assert) {
    assert.equal(getFiniquitoMes14Pagas(30000, "31/03/2014", 0), 2214.285714285714, "getFiniquitoMes14PagasOk");
    assert.equal(getFiniquitoMes14Pagas(22060, "28/10/2015", 0), 1470.6666666666667, "getFiniquitoMes14PagasOk");
    assert.equal(getFiniquitoMes14Pagas(30000, "31/03/2014", 1), 1937.5, "getFiniquitoMes14Pagas1HoraReduccion");
    assert.equal(getFiniquitoMes14Pagas(22060, "28/10/2015", 2), 1103, "getFiniquitoMes14Pagas2HorasReduccion");

});

QUnit.test("getFiniquitoPagaExtraOk", function(assert) {
    assert.equal(getFiniquitoPagaExtra(32000, "15/04/2014"), 1523.8095238095239, "getFiniquitoPagaExtraJunioOk");
    assert.equal(getFiniquitoPagaExtra(22000, "15/01/2014"), 261.9047619047619, "getFiniquitoPagaExtraJunioOk");
    assert.equal(getFiniquitoPagaExtra(22000, "04/06/2013"), 1571.4285714285716, "getFiniquitoPagaExtraJunioOk");
    assert.equal(getFiniquitoPagaExtra(32000, "15/10/2014"), 1523.8095238095239, "getFiniquitoPagaExtraNavidadOk");
    assert.equal(getFiniquitoPagaExtra(21000, "01/12/2014"), 1500, "getFiniquitoPagaExtraNavidadOk");
});
