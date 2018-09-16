# Bitbar Cloud API Client for JavaScript

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE.md)
[![Build Status](https://travis-ci.com/bitbar/cloud-api-client-js.svg?branch=master)](https://travis-ci.com/bitbar/cloud-api-client-js)

This repository contains [Bitbar Cloud](https://bitbar.com/testing/) API Client for JavaScript.
Bitbar Cloud hosts hundreds of Android and iOS devices, enabling users to create and test high quality mobile apps and games.


## Getting Started

### Prerequisites

This package is using [UMD](https://github.com/umdjs/umd/blob/master/templates/returnExportsGlobal.js) pattern,
so it means that you can use it:

  * in Node.js project
  * browser running project
    * without AMD
    * with AMD


### Concepts

The syntax of the library is heavily inspired by the [Chai HTTP](https://github.com/chaijs/chai-http) syntax.
Understanding the following general concepts will allow you to quickly memorize the syntax, and as a result,
the only tool you will use (which we recommend) is Swagger.

To open Swagger:

  1. Go to Bitbar Cloud UI
  2. Open _My Account_ view
  3. In the _My Integrations_ widget click on _API Access_
  4. In the modal click _Open Swagger_ button
  5. Done!


#### 1. Chaining

AFAIR all API methods in library are chainable. That's means that you don't need to write long code like:

```js
var meRef = api.me();
var projectRef = me.project(1);
var runRef = project.run(2);
```

Rather it was designed to use it this way:

```js
api.me().projects(1).run(2);
```

#### 2. Every URL Part is a Method

You have found some cool resource in Swagger and now you want to use with this library. Algorithm to create such is
very simple:

  0. Ommit `/api/v2/`.
  1. Let _callString_ be our call string that we are writing.
  2. Let _part_ be a URL part

      1. If _part_ begins with `{` and ends with `}` then ommit this part and take next one.

  3. Let _nextPart_ be a next URL part

      1. If _nextPart_ begins with `{` and ends with `}` then it means that _part_ is most likely resource,
         that returns *single object*.
      2. Else it means that _part_ is most likely resource, that returns *list of objects*. 

  4. Let _methodName_ be our method name that we want append to _callString_.

      1. If _part_ returns *single object* then _methodName_ is _part_ in the singular version
         and converted to [camelCase](https://simple.wikipedia.org/wiki/CamelCase). This method will user as argument
         _nextPart_ content.
      2. Else _methodName_ is part_ converted to [camelCase](https://simple.wikipedia.org/wiki/CamelCase).
         This method don't have any arguments.

  5. Append `.` and _methodName_ to _callString_.
  6. If _nextPart_ is not empty then go to point 2.
  
> Tip: If you are not sure if resource is single or list then just use _Try it out_ button in Swagger.

You may think now "Well, it's not simple at all". Let me show you some examples:


  1. `/api/v2/me/projects/{id}/runs`

      1. Let's assume that `id = 1`
      2. My call string will be: `.me().project(1).runs()`
      3. So assuming that my API client reference is in variable `api` then my call will look like this:

          ```js
          api.me().project(1).runs()
          ```

  2. `/api/v2/me/projects/{projectId}/runs/{testRunId}/data-availability`

      1. Let's assume that `projectId = 1` and `testRunId = 2`
      2. My call string will be: `.me().project(1).run(2).dataAvailability()`
      3. So assuming that my API client reference is in variable `api` then my call will look like this:

          ```js
          api.me().project(1).run(2).dataAvailability()
          ```

  3. `/api/v2/me/billing-periods/{billingPeriodId}/receipt`

      1. Let's assume that `billingPeriodId = 3`
      2. My call string will be: `.me().billingPeriod(3).receipt()`
      3. So assuming that my API client reference is in variable `api` then my call will look like this:

          ```js
          api.me().billingPeriod(3).receipt()
          ```

#### 3. Structure

Now that you know how to build a chaining call you probably will want to e.g. set params, or set data to send.
All Coffee classes are documented so it should be easy to read docs from code. 

If resource chain ends on method that is _singular_ (so in Swagger it returns single object) then it's descendant of
[APIResource](src/APIResource.coffee). It means that you can use all methods that are there.

If resource chain ends on method that is _plural_ (so in Swagger it returns list) then it's descendant of
[APIList](src/APIList.coffee). It means that you can use all methods that are there.

Both `APIResource` and `APIList` are children of `APIEntity`.


#### 4. HTTP Methods

HTTP methods are also methods.

* If you want to send GET request then add to your chain `.get()`.
* If you want to send POST request then add to your chain `.post()`.
* If you want to send DELETE request then add to your chain `.delete()`.


#### 5. Send

Method `.send()` is sending request and returning `Promise`. With this kind of approach you can chain all you want.
When you are ready, then just call `.send()`.


### Usage for Node.js
    
#### Install

```sh
npm install @bitbar/cloud-api-client --save
```

#### Use

```js
const CloudApiClient = require('@bitbar/cloud-api-client');

const api = new CloudApiClient.API({
  cloudUrl: 'https://cloud.bitbar.com',
  apiKey: 'PASTE_HERE_YOUR_OWN_KEY'
});
```


### Usage for Browser

```
TODO
```


### Examples

Simple examples are placed in [examples directory](examples/README.md)


### Documentation

[https://bitbar.github.io/cloud-api-client-js/](https://bitbar.github.io/cloud-api-client-js/)


## Contribution

### Checking code quality

```sh
npm run lint
```

### Running tests

```sh
npm run test
```

### Building

```sh
npm run build
```


## Authors

* **Marek Sierociński** - [marverix](https://github.com/marverix)

See also the list of [contributors](https://github.com/bitbar/cloud-api-client-js/contributors)
who participated in this project.


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
