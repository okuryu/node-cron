var testCase = require('nodeunit').testCase,
    cron = require('../lib/cron');

module.exports = testCase({
  'test second (* * * * * *)': function(assert) {
    assert.expect(1);
    var c = new cron.CronJob('* * * * * *', function() {
      assert.ok(true);
    }, null, true);
    setTimeout(function() {
      c.stop();
      assert.done();
    }, 1250);
  },
  'test second with oncomplete (* * * * * *)': function(assert) {
    assert.expect(1);
    var c = new cron.CronJob('* * * * * *', function(done) {
      done();
    }, function () {
      assert.ok(true);
    }, true);
    setTimeout(function() {
      c.stop();
      assert.done();
    }, 1250);
  },
  'test every second for 5 seconds (* * * * * *)': function(assert) {
    assert.expect(5);
    var c = new cron.CronJob('* * * * * *', function() {
      assert.ok(true);
    }, null, true);
    setTimeout(function() {
      c.stop();
      assert.done();
    }, 5250);
  },
  'test every second for 5 seconds with oncomplete (* * * * * *)': function(assert) {
    assert.expect(5);
    var c = new cron.CronJob('* * * * * *', function(done) {
      done();
    }, function() {
      assert.ok(true);
    }, true);
    setTimeout(function() {
      c.stop();
      assert.done();
    }, 5250);
  },
  'test every 1 second for 5 seconds (*/1 * * * * *)': function(assert) {
    assert.expect(5);
    var c = new cron.CronJob('*/1 * * * * *', function() {
      assert.ok(true);
    }, null, true);
    setTimeout(function() {
      assert.done();
      c.stop();
    }, 5250);
  },
  'test every 1 second for 5 seconds with oncomplete (*/1 * * * * *)': function(assert) {
    assert.expect(5);
    var c = new cron.CronJob('*/1 * * * * *', function(done) {
      done();
    }, function() {
      assert.ok(true);
    }, true);
    setTimeout(function() {
      c.stop();
      assert.done();
    }, 5250);
  },
  'test every second for a range ([start]-[end] * * * * *)': function(assert) {
    assert.expect(5);
    var prepDate = new Date();
    if ((54 - prepDate.getSeconds()) <= 0) {
      setTimeout(testRun, (60000 - (prepDate.getSeconds()*1000)) + 1000);
    } else {
      testRun();
    }

    function testRun() {
      var d = new Date();
      var s = d.getSeconds()+2;
      var e = s + 6; //end value is inclusive
      var c = new cron.CronJob(s + '-' + e +' * * * * *', function() {
        assert.ok(true);
      }, null, true);
      setTimeout(function() {
        c.stop();
        assert.done();
      }, 6250);
    }
  },
  'test every second for a range with oncomplete ([start]-[end] * * * * *)': function(assert) {
    assert.expect(5);
    var prepDate = new Date();
    if ((54 - prepDate.getSeconds()) <= 0) {
      setTimeout(testRun, (60000 - (prepDate.getSeconds()*1000)) + 1000);
    } else {
      testRun();
    }

    function testRun() {
      var d = new Date();
      var s = d.getSeconds()+2;
      var e = s + 6; //end value is inclusive
      var c = new cron.CronJob(s + '-' + e +' * * * * *', function() {
        assert.ok(true);
      }, function() {
        assert.ok(true);
      }, true);
      setTimeout(function() {
        c.stop();
        assert.done();
      }, 6250);
    }
  },
  'test second (* * * * * *) object constructor': function(assert) {
    assert.expect(1);
    var c = new cron.CronJob({
      cronTime: '* * * * * *',
      onTick: function() {
        assert.ok(true);
      },
      start: true
    });
    setTimeout(function() {
      c.stop();
      assert.done();
    }, 1250);
  },
  'test second with oncomplete (* * * * * *) object constructor': function(assert) {
    assert.expect(1);
    var c = new cron.CronJob({
      cronTime: '* * * * * *',
      onTick: function(done) {
        done();
      },
      onComplete: function () {
        assert.ok(true);
      },
      start: true
    });
    setTimeout(function() {
      c.stop();
      assert.done();
    }, 1250);
  },
  'test start/stop': function(assert) {
    assert.expect(1);
    var c = new cron.CronJob('* * * * * *', function() {
      assert.ok(true);
      this.stop();
    });
    setTimeout(function() {
      c.start();
    }, 1000);
    setTimeout(function() {
      assert.done();
    }, 3250);
  },
  'test specifying a specific date': function(assert) {
    assert.expect(1);
    var prepDate = new Date();
    if ((58 - prepDate.getSeconds()) <= 0) {
      setTimeout(testRun, (60000 - (prepDate.getSeconds()*1000)) + 1000);
    } else {
      testRun();
    }

    function testRun() {
      var d = new Date();
      var s = d.getSeconds()+1;
      d.setSeconds(s);
      var c = new cron.CronJob(d, function() {
        assert.ok(true);
      }, null, true);
      setTimeout(function() {
        c.stop();
        assert.done();
      }, 2250);
    }
  },
  'test specifying a specific date with oncomplete': function(assert) {
    assert.expect(1);
    var prepDate = new Date();
    if ((58 - prepDate.getSeconds()) <= 0) {
      setTimeout(testRun, (60000 - (prepDate.getSeconds()*1000)) + 1000);
    } else {
      testRun();
    }

    function testRun() {
      var d = new Date();
      var s = d.getSeconds()+1;
      d.setSeconds(s);
      var c = new cron.CronJob(d, function() {
        assert.ok(true);
      }, function() {
        assert.ok(true);
      }, true);
      setTimeout(function() {
        c.stop();
        assert.done();
      }, 2250);
    }
  },
});
