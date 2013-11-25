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
.expectValue('login', 'vesln')
.end(function(err, res, body) {
  if (err) throw err;
});
```

### Expectations

### Middlewares

### Serializers and parsers

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
