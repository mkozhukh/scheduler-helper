var assert = require('chai').assert;
var helper = require('../index');
var data = require("./testdata/data")



describe('#getValues', function() {
  it('works for plain events', function() {
    var res = helper.getEvents( data.normal );
    assert.lengthOf(res, 3);
    assert.equal(res[0].text, "a");
    assert.equal(res[1].text, "b");
    assert.equal(res[2].text, "c");
  });

  it('works for plain events, with limits', function() {
    var res = helper.getEvents( data.normal, new Date(2015, 1, 10, 8, 0, 0), new Date(2015, 1, 10, 10, 0, 0) );
    assert.lengthOf(res, 1);
    assert.equal(res[0].text, "a");

    var res = helper.getEvents( data.normal, new Date(2016, 1, 10, 8, 0, 0), null);
    assert.lengthOf(res, 0);

    var res = helper.getEvents( data.normal, null, new Date(2014, 1, 10, 10, 0, 0) );
    assert.lengthOf(res, 0);
  });

  it('works for daily recurring events', function() {
    var res = helper.getEvents( data.recurring_dayly );
    assert.lengthOf(res, 8);
    assert.equal(res[0].text, "a");
    assert.equal(res[7].text, "a");
  });

  it('works for montly recurring events', function() {
    var res = helper.getEvents( data.recurring_monthly );
    assert.lengthOf(res, 7);
  });

  it('works for yearly recurring events', function() {
    var res = helper.getEvents( data.recurring_yearly );
    assert.lengthOf(res, 6);
  });

  it('works for infinity recurring events with limits', function() {
    var res = helper.getEvents( data.recurring_infinity, new Date(2015, 1, 10), new Date(2015, 2, 10) );
    assert.lengthOf(res, 28);
  });

});