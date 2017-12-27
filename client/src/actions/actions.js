import axios from 'axios'

export const ADD_ITEM = 'ADD_ITEM'
export const REMOVE_ITEM = 'REMOVE_ITEM'
export const SHOW_MODAL = 'SHOW_MODAL'
export const HIDE_MODAL = 'HIDE_MODAL'
export const SET_PREVIEW = 'SET_PREVIEW'
export const FETCH_ITEMS = 'FETCH_ITEMS'

const localhost = 'http://localhost:'
const port = '3001'
const getAllEndpoint = '/getAll'
const addItemEndpoint = '/addItem'


//modals
export function showModal() {
    return {
        type: SHOW_MODAL
    }
}
export function hideModal() {
    return {
        type: HIDE_MODAL
    }
}
//get preview from Dropzone
export function setPreview(preview) {
    return {
        type: SET_PREVIEW,
        preview
    }
}

//________________Deleting Item______________________
export function removeItem(id) {
    return {
        type: REMOVE_ITEM,
        id
    }
}
export function deleteItem(id){
    return dispatch =>{
        axios.delete(localhost+port+"/deleteItem?id="+id)
        .then(res=> {
            console.log(res)
            dispatch(removeItem(id))
            dispatch(itemsFetchAll())
        })
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
        Src: item.src
    })
    return (dispatch) => {
        axios.post((localhost + port + addItemEndpoint), item)
            .then(response => {
                console.log(item)
                let _item = JSON.parse(item)
                console.log(_item)
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

export function itemsFetchAll() {
    return (dispatch) => {
        axios.get(localhost + port + getAllEndpoint)
            .then((response => {
                let items = response.data.ItemList
                if(items===null){
                    items = []
                }
                dispatch(itemsFetchData(items))
            }))
    };
}

// export function addItem(description, src, lft, rgt) {
//     return {
//         type: ADD_ITEM,
//         id: nextId++,
//         description: description,
//         src,
//         lft,
//         rgt
//     }
// }