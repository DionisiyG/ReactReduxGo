import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducers/reducers'

const middleware = composeWithDevTools(applyMiddleware( thunkMiddleware));
const store = createStore(reducer, initialState, middleware)
console.log(store.getState())


//  let items = axios.get('http://localhost:3001/getAll')
//   .then((response => {
//     let items = response.data.ItemList
//     if (items === null) {
//       items = []
//     }
//     console.log('preloaded state', items)
//   }))


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


export default store;