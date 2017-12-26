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

export function addItem1(description, src, lft, rgt) {
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
export function deleteItem(id){
    return dispatch =>{
        axios.delete(localhost+port+"/deleteItem?id="+id)
        .then(res=> {
            console.log(res)
            dispatch(removeItem(id))
        })
    }
}
//____________________________________________________________________

export function addItem(item) {
    return {
        type: ADD_ITEM,
        // id: item.Id,
        // description: item.description,
        // src: item.src,
        // lft: item.lft,
        // rgt:item.rgt
        item
    }
}
//speaking with server
export function createItem(item) {
    item = JSON.stringify({
        Description: item.desc,
        Src: item.src,
        Id: item.id
    })
    return (dispatch) => {
        axios.post((localhost + port + addItemEndpoint), item)
            .then(response => {
                console.log(item)
                let itemm = JSON.parse(item)
                console.log(itemm)
                dispatch(addItem(itemm))
            })
        dispatch(hideModal())
    }
}

export function itemsFetchData(items) {
    return {
        type: 'ITEMS_FETCH_DATA',
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

