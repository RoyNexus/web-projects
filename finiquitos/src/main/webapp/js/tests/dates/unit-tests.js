QUnit.module("Dates");

QUnit.test("getCurrentMonthDaysOk", function(assert) {
    assert.equal(getCurrentMonthDays("20/06/2007"), 20, "20/06/2007 -> 20");
    assert.equal(getCurrentMonthDays("01/01/2015"), 1, "01/01/2015 -> 1");

});

QUnit.test("getDaysFromNewYearsDayOk", function(assert) {
    assert.equal(getDaysFromNewYearsDay("31/01/2007"), 31, "31/01/2007 -> 31");
    assert.equal(getDaysFromNewYearsDay("31/12/2015"), 365, "31/12/2015 -> 365");

});

QUnit.test("getCurrentYearOK", function(assert) {
    assert.equal(getCurrentYear("31/01/2007"), 2007, "31/01/2007 -> 2007");
    assert.equal(getCurrentYear("31/12/2015"), 2015, "31/12/2015 -> 2015");

});

QUnit.test("getCurrentMonthOk", function(assert) {
    assert.equal(getCurrentMonth("31/01/2007"), 1, "31/01/2007 -> 1");
    assert.equal(getCurrentMonth("31/03/2015"), 3, "31/03/2015 -> 3");
    assert.equal(getCurrentMonth("31/12/2015"), 12, "31/12/2015 -> 12");

});

QUnit.test("getDaysBetweenDatesStringOk", function(assert) {
    assert.equal(getDaysBetweenDatesString("31/01/2007", "01/01/2012"), 1797, "getDaysBetweenDatesOk");
    assert.equal(getDaysBetweenDatesString("31/03/2012", "02/06/2014"), 794, "getDaysBetweenDatesOk");
    assert.equal(getDaysBetweenDatesString("01/04/2012", "02/04/2012"), 2, "getDaysBetweenDatesOk");
});

QUnit.test("isStringDateGreaterThanOk", function(assert) {
    assert.equal(isStringDateGreaterThan("31/01/2007", "01/01/2012"), false, "isStringDateGreaterThanOk");
    assert.equal(isStringDateGreaterThan("31/03/2012", "02/06/2014"), false, "isStringDateGreaterThanOk");
    assert.equal(isStringDateGreaterThan("04/04/2012", "02/04/2012"), true, "isStringDateGreaterThanOk");
    assert.equal(isStringDateGreaterThan("02/04/2012", "02/04/2012"), false, "isStringDateGreaterThanOk");
    assert.equal(isStringDateGreaterThan("03/05/2012", "02/04/2012"), true, "isStringDateGreaterThanOk");
    assert.equal(isStringDateGreaterThan("01/01/2013", "31/12/2012"), true, "isStringDateGreaterThanOk");
});
