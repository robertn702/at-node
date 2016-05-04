# node-at
A cancellable scheduled function that runs once.

## Installation
```
$ npm i --save node-at
```

## Usage
```
const at = require('node-at');

const sayHi = () => {
  console.log('hi');
}

const cancelHi = at('January 1, 2017', sayHi);

let personIsMean = true;

if (personIsMean) {
  cancelHi();
}  
```


