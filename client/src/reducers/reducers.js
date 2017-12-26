import { combineReducers } from 'redux'
import { ADD_ITEM, REMOVE_ITEM, SHOW_MODAL, HIDE_MODAL, SET_PREVIEW, FETCH_ITEMS } from '../actions/actions'

let initItems = {
    items: [
        // {
        //     Src: "https://goo.gl/owfXuz",
        //     Description: "initial description",
        //     Id: 0,
        //     Lft:0,
        //     Rgt:3
        // },
        // {
        //     Src: "https://goo.gl/owfXuz",
        //     Description: "initial description2",
        //     Id: 1,
        //     Lft:1,
        //     Rgt:2
        // }
    ]
}
function addRemoveItem(state = initItems, action) {
    switch (action.type) {
        // case ADD_ITEM:
        //     return Object.assign({}, state, {
        //         items: [
        //             ...state.items,
        //             {
        //                 id: action.id,
        //                 src: action.src,
        //                 description: action.description,
        //                 lft: action.lft,
        //                 rgt: action.rgt
        //             }
        //         ]
        //     })
        // case ADD_ITEM:
        //     return [...state, action.item]
        // case REMOVE_ITEM:
        //     return {
        //         ...state,
        //         items: state.items.filter(item => item.id !== action.id)
        //     }
        default:
            return state
    }
}


export function fetchItems(state = [], action) {
    switch (action.type) {
        case 'ITEMS_FETCH_DATA':
            // return action.items
            return action.items
        case ADD_ITEM:
            return [...state, action.item]
        case REMOVE_ITEM:
            //dont work
            return  {...state,
                items: state.filter(item => item.id !== action.Id)
            }

        default:
            return state;
    }
}


function preview(state = {}, action) {
    switch (action.type) {
        case SET_PREVIEW:
            return Object.assign({}, state, {
                preview: action.preview
            })
        default:
            return state;
    }
}

function modalWindows(state = {}, action) {
    switch (action.type) {
        case SHOW_MODAL:
            return Object.assign({}, state, {
                isShowing: true
            })
        case HIDE_MODAL:
            return Object.assign({}, state, {
                isShowing: false
            })
        default:
            return state
    }
}



export default combineReducers({
    // addRemoveItem,
    modalWindows,
    fetchItems,
    preview
})