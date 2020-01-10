# Bitbar Cloud API Client for JavaScript

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE.md)
[![Build Status](https://travis-ci.com/bitbar/cloud-api-client-js.svg?branch=master)](https://travis-ci.com/bitbar/cloud-api-client-js)

This repository contains official [Bitbar Cloud](https://bitbar.com/testing/) API Client for JavaScript.
Smartbear's Bitbar Cloud hosts hundreds of Android and iOS devices, enabling users to create and test high quality mobile apps and games.

## Getting Started

### Disclaimer

PLEASE NOTE, that project is under development (versions is below 1.0.0). Because of that not all resources are implemented
and/or tested. List of working resources can be found [here](WORKING-RESOURCES.md).

### Prerequisites

This package is using [UMD](https://github.com/umdjs/umd/blob/master/templates/returnExportsGlobal.js) pattern,
so it means that you can use it:

* in Node.js project
* browser running project

  * without AMD
  * with AMD

### Concepts

The syntax of the library is heavily inspired by the [Chai HTTP](https://github.com/chaijs/chai-http) syntax.
Understanding the following general concepts will allow you to quickly learn the syntax

#### 1. Chaining

Most methods in library is chainable. That's means that you don't need to write long code like:

```js
var meRef = apiClient.me();
var projectRef = me.project(1);
var runRef = project.run(2);
```

Rather it was designed to use it this way:

```js
apiClient.me().project(1).run(2);
```

#### 2. Every URL Part is a Method

Example: API resource to download list of device sessions of run with ID `10` in project with ID `20` will be:

```
GET https://cloud.bitbar.com/api/me/projects/20/runs/10/device-sessions
```

First part is `/me` (`/api` doesn't count because it's "directory" where API is stored). So:

```js
apiClient.me();
```

Second is `/projects`, but next is the ID, so method will be in singular form:

```js
apiClient.me().project(20);
```

Third is `/runs`, but again - there is the ID, so (again) singular form:

```js
apiClient.me().project(20).run(10);
```

Last one is `/device-dessions`. Because it's _kebab-case_, we need to transform it to _camelCase_:

```js
apiclient.me().project(20).runs(10).deviceSessions();
```

Now, because `GET` method is default one in `axios`, then we don't need to explicit set it (but you can if you want).
So what's left is to send it:

```js
apiclient.me().project(20).runs(10).deviceSessions().send();
```

#### 3. Structure

Now that you know how to build a chaining call you probably will want to e.g. set params, or set data to send.
All classes are documented so it should be easy to read docs from code.

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

### Usage

#### CommonJS

```sh
npm install @bitbar/cloud-api-client --save
```

```js
const CloudApiClient = require('@bitbar/cloud-api-client');

const apiClient = new CloudApiClient.API({
  cloudUrl: 'https://cloud.bitbar.com',
  apiKey: 'PASTE_HERE_YOUR_OWN_KEY'
});

apiClient.me().send().then( (resp) => {
  console.log(resp.data);
}).catch( (err) => {
  console.error(err);
});
```

#### AMD

```js
requirejs(['cloud-api-client'], function (CloudApiClient) {
  var api = new CloudApiClient.API({
    cloudUrl: 'https://cloud.bitbar.com',
    apiKey: 'PASTE_HERE_YOUR_OWN_KEY'
  });
});
```

#### Old School

```html
<!-- note that this is URL to version 0.8.0 -- please check which version is latest -->
<script src="https://github.com/bitbar/cloud-api-client-js/releases/download/v0.8.0/cloud-api-client.min.js"></script>
```

```js
var api = new CloudApiClient.API({
  cloudUrl: 'https://cloud.bitbar.com',
  apiKey: 'PASTE_HERE_YOUR_OWN_KEY'
});
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
