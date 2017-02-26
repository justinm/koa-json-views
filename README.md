json-views-express-middleware
===================================

Easily send objects in express responses using JSON views.

[![Build Status](https://travis-ci.org/justinm/json-views-express-middleware.svg?branch=master)](https://travis-ci.org/justinm/json-views-express-middleware)
  [![Code Climate](https://codeclimate.com/github/justinm/json-views-express-middleware/badges/gpa.svg)](https://codeclimate.com/github/justinm/json-views-express-middleware)
  [![Test Coverage](https://codeclimate.com/github/justinm/json-views-express-middleware/badges/coverage.svg)](https://codeclimate.com/github/justinm/json-views-express-middleware/coverage)
  
Example
-------

```javascript

var express = require('express');
var views = require('json-views');
var viewsMiddleware = require('json-views-express-middleware');

var app = express();
app.use(viewsMiddleware.middleware(views));

app.get('/', function(req, res, next) {
  res.view('test', {});  
});

```
