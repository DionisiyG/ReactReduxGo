import { combineReducers } from 'redux'
import { ADD_ITEM, REMOVE_ITEM, SHOW_MODAL, HIDE_MODAL, SET_PREVIEW, FETCH_ITEMS, ITEM_CLICKED, itemsFetchData } from '../actions/actions'

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

//get ID of item on which '+' was clicked
export function itemClicked(state = {}, action) {
    switch (action.type) {
        case ITEM_CLICKED:
            return Object.assign({}, state,
                action.item
            )
        default:
            return state
    }
}

export function operateWithItems(state = [], action) {
    switch (action.type) {
        case FETCH_ITEMS:
            return action.items
        // return [ ...state , action.items]
        //   return Object.assign({}, state, {
        //     items: action.items
        // })
        case ADD_ITEM:
            return [...state, action.item]
        case REMOVE_ITEM:
            return [...state, state.filter(item => item.id !== action.Id)]
        default:
            return state;
    }
}



export default combineReducers({
    modalWindows,
    operateWithItems,
    preview,
    itemClicked
})

// function addRemoveItem(state = initItems, action) {
//     switch (action.type) {
//         // case ADD_ITEM:
//         //     return Object.assign({}, state, {
//         //         items: [
//         //             ...state.items,
//         //             {
//         //                 id: action.id,
//         //                 src: action.src,
//         //                 description: action.description,
//         //                 lft: action.lft,
//         //                 rgt: action.rgt
//         //             }
//         //         ]
//         //     })
//         // case ADD_ITEM:
//         //     return [...state, action.item]
//         // case REMOVE_ITEM:
//         //     return {
//         //         ...state,
//         //         items: state.items.filter(item => item.id !== action.id)
//         //     }
//         default:
//             return state
//     }
// }
