import React, { Component } from 'react'
import { connect } from 'react-redux'
import ItemList from '../components/ItemList'
import ModalWindow from '../components/ModalWindow'
import * as actions from '../actions/actions'

class App extends Component {

    componentDidMount() {
        this.props.fetchData()
    }
    render() {
        let { items, showModal, hideModal, isShowing, removeItem, setItem, setPreview, preview, fetchData, itemClicked, addButtonIsShowing } = this.props
        return (
            <div className='content'>  
                {/* {items.length === 0 && 
                 <button className='btn' onClick={() => showModal()}>Click to ADD</button> } */}
                 <button className={addButtonIsShowing.isShowing ? 'btn' : 'hideBtn'} onClick={() => showModal()}>Click to ADD</button>
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
        items: state.operateWithItems,
        isShowing: state.modalWindows.isShowing,
        preview: state.preview.preview,
        itemClicked: state.itemClicked,
        addButtonIsShowing: state.hideAddButton
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