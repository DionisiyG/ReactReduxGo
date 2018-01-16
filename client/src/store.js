import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducers/reducers'

const initialState = {
  modalWindows: { isShowing: false },
  hideAddButton: {isShowing: true}
}

const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware));
const store = createStore(reducer, initialState, middleware)
export default store;