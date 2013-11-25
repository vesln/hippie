[![NPM version](https://badge.fury.io/js/hippie.png)](http://badge.fury.io/js/hippie)
[![Build Status](https://secure.travis-ci.org/vesln/hippie.png)](http://travis-ci.org/vesln/hippie)
[![Coverage Status](https://coveralls.io/repos/vesln/hippie/badge.png?branch=master)](https://coveralls.io/r/vesln/hippie?branch=master)
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
api()
.json()
.get('https://api.github.com/users/vesln')
.expectStatus(200)
.end(function(err, res, body) {
  if (err) throw err;
});
```

### Expectations

```js
api()
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
```

### Serializers and parsers

```js
var xml = require('my-xml-library');

api()
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

### Authentication

### DRY

## API

### #timeout

### #qs

### #base

### #url

### #header

### #method

### #json

### #form

### #serializer

### #parser

### #send

### #auth

### #use

### #get

### #post

### #delete

### #put

### #head

### #patch

### #expect

### #expectStatusCode

### #expectHeader

### #expectValue

### #expectBody

### #end

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
