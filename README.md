# at-node
schedule a cancellable function to run once

# Installation
```
$ npm i --save at-node
```

# Usage
```
const at = require('at-node');

# schedule function to be run at a specified datetime and bind cancelation function to variable
const cancelHi = at('January 1, 2020', () => {
  console.log('hi');
});

# cancel the scheduled function
cancelHi();
```
