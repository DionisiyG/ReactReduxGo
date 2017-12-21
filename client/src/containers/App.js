import React, { Component } from 'react'
import { connect } from 'react-redux'
import ItemList from '../components/ItemList'
import ModalWindow from '../components/ModalWindow'
import * as actions from '../actions/actions'


class App extends Component {
    // removeItem(id) {
    //     this.props.removeItem(id)
    // }

    componentDidMount(){
        this.props.fetchData()
    }

    render() {
        let { items, showModal, hideModal, isShowing, removeItem, setItem, setPreview, preview,fetchData } = this.props
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
                />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        items2: state.addRemoveItem.items,
        items:state.fetchItems,
        items2:state.getItems,
        isShowing: state.modalWindows.isShowing,
        preview: state.preview.preview
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        showModal: () => dispatch(actions.showModal()),
        hideModal: () => dispatch(actions.hideModal()),
        removeItem: (id) => dispatch(actions.removeItem(id)),
        setItem: (item) => dispatch(actions.createItem(item)),
        fetchData: () => dispatch(actions.itemsFetchAll()),
        setPreview: (preview) => dispatch(actions.setPreview(preview))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)