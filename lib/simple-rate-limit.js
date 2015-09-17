var klass       = require('klass');
var DEFAULT_LIMIT = 5;

var RateLimiter = klass({
  initialize: function (options) {
    this.openRequests = 0;
    this.limit = (options && options.limit) || DEFAULT_LIMIT;
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
    this.middleware = bind(this.middleware, this);
    this.reachedLimit = bind(this.reachedLimit, this);
    this.requestOpenedHandler = bind(this.requestOpenedHandler, this);
    this.requestClosedHandler = bind(this.requestClosedHandler, this);
  },

  middleware: function (req, res, next) {
    this.requestOpenedHandler();

    res.on('finish', this.requestClosedHandler);

    if (this.reachedLimit()) {
      var err = new Error ("Too many requests");
      err.status = 429;
    }
    req.openRequests = this.openRequests;
    next(err);
  },

  reachedLimit: function(){
    return this.openRequests >= this.limit;
  },
  requestOpenedHandler: function(){
    this.openRequests++;
  },
  requestClosedHandler: function(){
    this.openRequests--;
  }

});

module.exports = RateLimiter;
