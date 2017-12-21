import React, { Component } from 'react'
import { Provider } from 'react-redux'
import App from '../containers/App'
import store from '../store'
import ItemItem from '../containers/test'




export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
     // <ItemItem/>
    )
  }
}