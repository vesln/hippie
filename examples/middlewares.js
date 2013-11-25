var api = require('../');

api()
.json()
.use(function(options, next) {
  // modify the options for `request` here
  next(options);
})
.get('https://api.github.com/users/vesln')
.end(function(err, res, body) {
  if (err) throw err;
});
