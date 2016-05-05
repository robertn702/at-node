# At
A cancellable, scheduled function for node

## Installation
```bash
npm i --save at-node
```

## Usage
```javascript
const at = require('at-node');

// schedule a function by passing in a date or a datestring
at(new Date('10/10/2018'), cb);
at('10/10/2018', cb);

// a function is returned that cancels the scheduled function
const cancelCb = at('January 1, 2018', cb);

// change your mind?
cancelCb();
```

## Testing
```bash
npm test
```
