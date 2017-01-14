# JSON API Deserializer

This package presents a simple and fast function to deserialize [JSON API](http://jsonapi.org/) documents to simple javascript objects. The implementation is a synchronous (but efficient) alternative to [Seyz/jsonapi-serializer](https://github.com/SeyZ/jsonapi-serializer)'s deserializer.

## Install

`npm install jsonapi-deserializer --save`

## Usage

```
var jsonapiDocument = { /* ... */ };

// Node
var deserialize = require('jsonapi-deserializer').deserialize;
var simpleObj = deserialize(jsonapiDocument);

// ES6 - Typescript
import { deserialize } from 'jsonapi-deserializer';
let simpleObj = deserialize(jsonapiDocument);
```

## Run tests

Get the repo (`git clone`), install dependencies (`npm install`) and run the default test suite (`npm test`). There's not many tests since they're being developed as necessary. [Open a new issue](https://github.com/ShadowManu/jsonapi-deserializer/issues/new) if you find incorrect/undesired behavior.
