import axios from 'axios'

export const ADD_ITEM = 'ADD_ITEM'
export const REMOVE_ITEM = 'REMOVE_ITEM'
export const SHOW_MODAL = 'SHOW_MODAL'
export const HIDE_MODAL = 'HIDE_MODAL'
export const SET_PREVIEW = 'SET_PREVIEW'
export const FETCH_ITEMS = 'FETCH_ITEMS'
export const ITEM_CLICKED = 'ITEM_CLICKED'
export const HIDE_ADD_BUTTON= 'HIDE_ADD_BUTTON'

const localhost = 'http://localhost:'
const port = '3001'
const getAllEndpoint = '/getAll'
const addItemEndpoint = '/addItem'
const deleteItenEndpoint = '/deleteItem?id='


//_______________Modals_______________________
export function showModal() {
    return {
        type: SHOW_MODAL
    }
}

export function whatItemWasClicked(item) {
    return {
        type: 'ITEM_CLICKED',
        item
    }
}

export function showModalWhatItemWasClicked(item) {
    return dispatch => {
        dispatch(showModal())
        dispatch(hideAddButton())
        dispatch(whatItemWasClicked(item))
    }
}


export function hideModal() {
    return {
        type: HIDE_MODAL
    }
}

export function hideAddButton(){
    return {
      type: HIDE_ADD_BUTTON,
    }
  }


  //get preview from Dropzone
export function setPreview(preview) {
    return {
        type: SET_PREVIEW,
        preview
    }
}
//_____________________Adding Item_______________________________________

export function addItem(item) {
    return {
        type: ADD_ITEM,
        item
    }
}

export function createItem(item) {
    item = JSON.stringify({
        Description: item.desc,
        // Src: item.src.replace("blob:", "")
        Src: item.src,
        Lft: item.lft,
        Rgt: item.rgt
    })
    return (dispatch) => {
        axios.post((localhost + port + addItemEndpoint), item)
            .then(response => {
                let _item = JSON.parse(item)
                dispatch(addItem(_item))
                dispatch(itemsFetchAll())
            })
        dispatch(hideModal())
    }
}

//__________________Fetch all items from server_________________________
export function itemsFetchData(items) {
    return {
        type: FETCH_ITEMS,
        items
    };
}

export function itemsFetchAll(items) {
    return (dispatch) => {
        axios.get(localhost + port + getAllEndpoint)
            .then((response => {
                let items = response.data.ItemList
                if (items === null) {
                    items = []
                }
                dispatch(itemsFetchData(items))
            }))
    };
}
//________________Delete Item______________________
export function removeItem(id) {
    return {
        type: REMOVE_ITEM,
        id
    }
}
export function deleteItem(id) {
    return dispatch => {
        axios.delete(localhost + port + deleteItenEndpoint + id)
            .then(res => {
                //console.log(res)
                dispatch(removeItem(id))
                dispatch(itemsFetchAll())
            })
    }
}
