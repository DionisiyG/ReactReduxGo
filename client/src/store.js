import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducers/reducers'
import axios from 'axios'
import promise from 'redux-promise';



 let items = axios.get('http://localhost:3001/getAll')
  .then((response => {
    let items = response.data.ItemList
    if (items === null) {
      items = []
    }
    console.log('preloaded state', items)
  }))

// const reducer = asyncInitialState.reducer.fetchItems(combineReducers({
//   ...reducers
// }))

// const loadStore =() => {
//   return new Promise (resolve => {
//     fetch('http://localhost:3001/getAll')
//     .then(response => response.data.ItemList)
//     .then(resolve)
//   })
// }

const initialState = {
  modalWindows: { isShowing: false },
  // fetchItems: [
  //     {
  //       Src: "https://goo.gl/owfXuz",
  //       Description: "initial description",
  //       Id: 0,
  //       Lft: 0,
  //       Rgt: 3 
  //     },
  //     {
  //       Src: "https://goo.gl/owfXuz",
  //       Description: "initial description2",
  //       Id: 1,
  //       Lft: 1,
  //       Rgt: 2
  //     }
  //   ]
}
const middleware = composeWithDevTools(applyMiddleware( thunkMiddleware));
const store = createStore(reducer, initialState, middleware)
console.log(store.getState())
// let store = createStore(reducer, initialState,
//   composeWithDevTools(
//     applyMiddleware(thunkMiddleware))
// )

// const store = createStore(
//   reducer,
//   compose(applyMiddleware(asyncInitialState.middleware(loadStore))
// ))
export default store;