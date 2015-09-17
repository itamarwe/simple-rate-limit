#  Simple Rate Limit
Simple rate limiting middleware for node.js Express applications.
Limit the number of open requests of your application to limit resource utilization such as socket connection and memory.

Return 429 (Too many requests) errors once there are too many open requests.

## Install
npm install --save simple-rate-limit

## Configuration
- **limit** - The maximum number of simultaneous open requests. Requests sent once the limits is reached will receive a 429 error code.

## Usage
````
var SimpleRateLimiter = require('simple-rate-limit');

var limiter = new SimpleRateLimiter({
  limit:20 //defaults to 5
});

//for global limiting
app.use(limiter);

//Or - for limiting only specific routes
app.get('/rate-limited', limiter, function(req, res){
  ...
});
````

## License
MIT [Itamar Weiss](http://itamarweiss.com)
