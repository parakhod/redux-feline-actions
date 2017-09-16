# Redux feline actions
Easiest way to create Redux actions
## Installation
__npm install -s redux-feline-actions__
## Usage
```
import { createActions } from 'redux-feline-actions';

const actions = createActions({
  justSomeString: 'cats are cool', // will be called reducer JUST_SOME_STRING
  someFunction: v => 'payload with ' + v,
  someObject: {
    use: 'cat',
    method: 'eatFood',
    meta: 'blackCatMetaValue', // meta: {blackCatMetaValue: true}
    id: 'my_cat_number_one'
  },
  someObjectWithCustomPayload: {
    payload: 'two cats and five kittens'
    meta: {
      one: 1,
      two: 2
    }
  },
  someMoreComplexFunction: (a, b, meta) => ({
    payload: {
      cats: a,
      catFood: b
    },
    meta
  }),
  andIfINeedToCallSomeOtherReducer: {
    useReducer: 'customReducer', // will be called reducer CUSTOM_REDUCER
    payload: 'meow'
  }
})
```