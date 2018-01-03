import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducers/reducers'
import axios from 'axios'

// let items = axios.get('http://localhost:3001/getAll')
//   .then((response => {
//     let items = response.data.ItemList
//     if (items === null) {
//       items = []
//     }
//     // return items
//     // console.log('preloaded state', items)
//   }))

function getTest() {
  return axios.get('http://localhost:3001/getAll')
}

function getitems() {
  return axios.get('http://localhost:3001/getAll')
    .then((response => {
      let items = response.data.ItemList
      if (items === null) {
        items = []
      }
      return items
    }))
}



const initialState = {
  modalWindows: { isShowing: false },
  // fetchItems: []
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

const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware));
const store = createStore(reducer, initialState, middleware)
console.log(store.getState())
export default store;