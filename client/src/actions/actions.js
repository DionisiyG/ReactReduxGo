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

let nextId = 2

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

export function addItem(description, src, lft, rgt) {
    return {
        type: ADD_ITEM,
        id: nextId++,
        description: description,
        src,
        lft,
        rgt
    }
}
export function removeItem(id) {
    return {
        type: REMOVE_ITEM,
        id
    }
}

//get preview from Dropzone
export function setPreview(preview) {
    return {
        type: SET_PREVIEW,
        preview
    }
}

//speaking with server
export function createItem(item) {
    item = JSON.stringify({
        description: item.desc,
        src: item.src
    })
    return (dispatch) => {
        axios.post((localhost + port + addItemEndpoint), item)
            .then(response => {
                dispatch(addItem(response.data))
            })
    }
}

export function itemsFetchDataSuccess(items) {
    return {
        type: 'ITEMS_FETCH_DATA',
        items
    };
}

export function itemsFetchAll() {
    return (dispatch) => {
        axios.get(localhost + port + getAllEndpoint)
            .then((response => {
                dispatch(itemsFetchDataSuccess(response.data.ItemList))
            }))
    };
}

// export function getItems() {
//     const request = axios.get(localhost + port + getAllEndpoint);
//     return {
//         type: FETCH_ITEMS,
//         items: request
//     };
// }