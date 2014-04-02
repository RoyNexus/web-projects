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
