# at-node
schedule a cancellable function to run once

# Installation
```
$ npm i --save at-node
```

# Usage
```
const at = require('at-node');
const cancelHi = at('January 1, 2020', () => {
  console.log('hi');
});

cancelHi();
```
