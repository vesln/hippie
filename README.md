[![NPM version](https://badge.fury.io/js/hippie.png)](http://badge.fury.io/js/hippie)
[![Build Status](https://secure.travis-ci.org/vesln/hippie.png)](http://travis-ci.org/vesln/hippie)
[![Code Climate](https://codeclimate.com/github/vesln/hippie.png)](https://codeclimate.com/github/vesln/hippie)

![hippie](http://i.imgur.com/ZEkuNZG.png)

## Synopsis

Thin request wrapper that enables powerful and intuitive API testing.

## Features

* Intuitive and consistent API
* Built-in and custom expectations
* Support for custom parsers and serializers
* Easy to extend
* Middlewares
* Works great with any test runner

## Examples

```
var api = require('hippie');
```

### Hello world

```js
hippie()
.header("User-Agent", "hippie")
.json()
.get('https://api.github.com/users/vesln')
.expectStatus(200)
.end(function(err, res, body) {
  if (err) throw err;
});
```

### Expectations

```js
hippie()
.json()
.base('http://localhost:1234')
.get('/users/vesln')
.expectStatus(200)
.expectHeader('Content-Type', 'application/json; charset=utf-8')
.expectValue('username', 'vesln')
.expectValue('repos[0].name', 'jsmd')
.expectBody({
  username: 'vesln',
  repos: [
    { name: 'jsmd' },
    { name: 'hippie' },
  ]
})
.expectBody(/vesln/g)
.end(function(err, res, body) {
  if (err) throw err;
  process.exit(0);
});
```

### Middlewares

```js
hippie()
.json()
.use(function(options, next) {
  // modify the options for `request` here
  next(options);
})
.get('https://api.github.com/users/vesln')
.end(function(err, res, body) {
  if (err) throw err;
});
```
With middlewares you can modify the options passed to `request`. Here is an
example how you could persist the cookies across multiple requests:

```js
hippie(app)
.get('/')
.use(persistCookies)
.end(function() {});

function persistCookies(opts, next) {
  opts.jar = true;
  next(opts);
}
```

### Serializers and parsers

```js
var xml = require('my-xml-library');

hippie()
.serializer(function(params, fn) {
  var err = new Error('Things went wrong');
  var res = xml.objectToXml(params);
  fn(err, res);
})
.parser(function(body, fn) {
  var err = new Error('Things went wrong');
  var res = xml.xmlToObject(body);
  fn(err, res);
})
.get('https://api.github.com/users/vesln.xml')
.expectStatus(200)
.end(function(err, res, body) {
  if (err) throw err;
});
```

### AssertionError configurations

Similar to Chai.js and other frameworks, you can enable `showDiff`.

```js
var hippie = require('hippie');
hippie.assert.showDiff = true;
```

![showDiff](http://i.imgur.com/hsR8Kbs.png)

### DRY

Since most of the time your test setup is going to be the same, you can simply
create a helper function for your tests that will take care of the repetitive
setup:

```js
var hippie = require('hippie');

function api() {
  return hippie()
    .json()
    .serializer(customSerializer)
    .parser(customParser)
    .use(somethingSpecial)
    .base('http://localhost:3000/api/v1')
    .auth('user', 'pass')
    .expect(somethingRepetable);
}
```
Later on:

```js
test('my awesome api', function(done) {
  api()
  .get('/users')
  .expectStatus(200)
  .end();
});
```

## API

### #timeout

Configure a timeout for the HTTP request.

```js
hippie()
.timeout(1000)
.end(fn);
```

### #qs

Convert an object to query string values:

```js
hippie()
.qs({ foo: 'bar' })
.end(fn);
```

### #base

Configure a base URL, useful when testing the same API endpoint.

```js
hippie()
.base('https://api.github.com')
.get('/users/vesln')
.end(fn);
```

### #url

Set the URL for the HTTP request. Used internally by `get`, `put` etc. and
it should be used in combination with `method`.

```js
hippie()
.url('https://api.github.com')
.method('GET')
.end(fn);
```

### #method

Configure the HTTP method. Used internally by `get`, `put` etc.

```js
hippie()
.url('https://api.github.com')
.method('OPTIONS')
.end(fn);
```

### #header

Set a request header.

```js
hippie()
.header('Content-Type', 'application/json')
.send({ some: 'data' })
.end(fn);
```

### #json

Helper method for:

- Content-Type: application/json
- Accept: application/json
- Serializer: json
- Parser: json

```js
hippie()
.json()
.get('https://github.com/vesln.json', fn);
```

### #form

Helper method for:

- Content-Type: application/x-www-form-urlencoded
- Serializer: urlencoded

```js
hippie()
.form()
.patch('https://api.mindbloom.com/users/vesln');
.send({ timezone: 'UTC' }
.end();
```

### #serializer

Configure a request body serializer.

```js
hippie()
.serializer(function(params, fn) {
  var err = new Error('Things went wrong');
  var res = xml.objectToXml(params);
  fn(err, res);
});
```

### #parser

Configure a response body parser.

```js
hippie()
.parser(function(body, fn) {
  var err = new Error('Things went wrong');
  var res = xml.xmlToObject(body);
  fn(err, res);
});
```

### #send

Set request body.

```js
hippie()
.json()
.patch('https://api.mindbloom.com/users/vesln');
.send({ timezone: 'UTC' }
.end();
```

### #auth

Set Basic Auth credentials.

```js
hippie()
.auth('user', 'password')
.patch('https://api.mindbloom.com/users/vesln');
.send({ timezone: 'UTC' }
.end();
```

### #use

Register a middleware that will be executed before the HTTP request.

```js
hippie()
.json()
.use(function(options, next) {
  // modify the options for `request` here
  // do other suff
  next(options);
})
.get('https://api.github.com/users/vesln')
.end(fn);
```

### #get, #del, #post, #put, #patch, #head

Helper method for:

- Method: `method`
- URL: `url`
- End: `fn` [optional]

```js
hippie()
.get('https://api.github.com/users/vesln')
.end(fn);
```

Or if you want to execute the test immediately:

```js
hippie()
.get('https://api.github.com/users/vesln', fn);
```

### #expectStatusCode, #expectStatus, #expectCode

Set a response status code expectation.

```js
hippie()
.json()
.get('https://api.github.com/users/vesln')
.expectStatus(200)
.end(fn);
```

### #expectHeader

Set a response header expectation.

```js
hippie()
.json()
.get('https://api.github.com/users/vesln')
.expectHeader('Content-Type', 'application/json; charset=utf-8')
.expectHeader('X-API-LIMIT', 3)
.end(fn);
```

### #expectValue

Register a string path expectation.

```js
hippie()
.json()
.get('https://api.github.com/users/vesln')
.expectValue('details.company', 'Awesome.io')
.expectValue('repos[0].name', 'hippie')
.end(fn);
```

For more information about string paths visit
[pathval](https://github.com/chaijs/pathval).

### #expectBody

Strict expectations:

```js
hippie()
.get('https://api.github.com/users/vesln')
.expectBody('{ "username": "vesln" }')
.end(fn);
```

Regular expression expectations:

```js
hippie()
.get('https://api.github.com/users/vesln')
.expectBody(/vesln/)
.end(fn);
```

Object/array expectations:

```js
hippie()
.get('https://api.github.com/users/vesln')
.expectBody({ username: 'vesln' })
.end(fn);
```

### #expect

Register a custom expectation.

```js
hippie()
.get('https://api.github.com/users/vesln')
.expect(function(res, body, next) {
  var err = assertSomething;
  next(err);
})
.end(fn);
```

### #end

Execute the HTTP request and the tests.

```js
hippie()
.json()
.get('https://api.github.com/users/vesln')
.expectValue('details.company', 'Awesome.io')
.expectValue('repos[0].name', 'hippie')
.end(fn);
```

### #app

Fire up an HTTP app and set its address as a base URL.
Also works with HTTP handler functions `function(req res){}`.

```js
hippie(expressApp)
.get('/')
.end(fn);
```

```js
hippie()
.app(function(req, res) {
  res.end('Bye');
})
.get('/')
.end(fn);
```

## Installation

```bash
npm install hippie
```

## Tests

### Running the tests

```bash
$ npm test
```

### Test coverage

```bash
$ npm run-script coverage
```

## Alternative projects

- [supertest](https://github.com/visionmedia/supertest)
- [APIeasy](https://github.com/flatiron/api-easy)
- [chai-http](https://github.com/chaijs/chai-http)

## License

(The MIT License)

Copyright (c) 2013 Veselin Todorov <hi@vesln.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
