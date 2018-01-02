import React, { Component } from 'react'
import { connect } from 'react-redux'
import ItemList from '../components/ItemList'
import ModalWindow from '../components/ModalWindow'
import * as actions from '../actions/actions'

import axios from 'axios'


class App extends Component {

    // componentDidMount(){
    //     var _this = this;
    //     this.serverRequest = 
    //       axios
    //         .get("http://localhost:3001/getAll")
    //         .then(function(result) {    
    //           _this.setState({
    //             items: result.data.items  
    //           });
    //         })
    // }

    componentDidMount() {
        this.props.fetchData()
        // axios.get('http://localhost:3001/getAll')
        //     .then((response => {
        //         let itemsss = response.data.ItemList
        //         if (itemsss === null) {
        //             itemsss = []
        //         }
        //         this.setState({
        //             fetchItems: itemsss
        //         })
        //         // return items
        //          console.log('preloaded state', itemsss)
        //     }))
    }
    render() {
        let { items, showModal, hideModal, isShowing, removeItem, setItem, setPreview, preview, fetchData, itemClicked } = this.props
        
         console.log('Items in App', items)
       // console.log(this.state.fetchItems.fetchItems)
        //console.log(this.state.fetchItems)
        return (
            <div className='content'>
                <button className='btn' onClick={() => showModal()}>Click to ADD</button>
                <ItemList
                    items={items}
                    showModalPlusClicked={showModal}
                    deleteItem={removeItem}
                />
                <ModalWindow
                    onCancel={hideModal}
                    onOkClicked={setItem}
                    isShowing={isShowing}
                    setPreview={setPreview}
                    preview={preview}
                    itemClicked={itemClicked}
                />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        // items1: state.addRemoveItem.items,
        // items3:state.fetchItems,
        items: state.operateWithItems,
        // items2:state.getItems,
        isShowing: state.modalWindows.isShowing,
        preview: state.preview.preview,
        itemClicked: state.itemClicked
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        showModal: (id) => dispatch(actions.showModalWhatItemWasClicked(id)),
        hideModal: () => dispatch(actions.hideModal()),
        removeItem: (id) => dispatch(actions.deleteItem(id)),
        setItem: (item) => dispatch(actions.createItem(item)),
        fetchData: () => dispatch(actions.itemsFetchAll()),
        setPreview: (preview) => dispatch(actions.setPreview(preview))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)