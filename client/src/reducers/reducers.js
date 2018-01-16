import { combineReducers } from 'redux'
import { ADD_ITEM, REMOVE_ITEM, SHOW_MODAL, HIDE_MODAL, SET_PREVIEW, FETCH_ITEMS, ITEM_CLICKED, HIDE_ADD_BUTTON } from '../actions/actions'

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

let items1 = [
    {
        Src: "https://goo.gl/owfXuz",
        Description: "initial description",
        Id: 1,
        Lft:0,
        Rgt:9,
        Children: [
            {
                Src: "https://goo.gl/owfXuz",
                Description: "initial description2",
                Id: 2,
                Lft:1,
                Rgt:2,
                Children: []
            },
            {
                Src: "https://goo.gl/owfXuz",
                Description: "initial description",
                Id: 3,
                Lft:3,
                Rgt:8,
                Children: [
                    {
                        Src: "https://goo.gl/owfXuz",
                        Description: "initial description2",
                        Id: 4,
                        Lft:4,
                        Rgt:5,
                        Children: []
                    },
                    {
                        Src: "https://goo.gl/owfXuz",
                        Description: "initial description2",
                        Id: 5,
                        Lft:6,
                        Rgt:7,
                        Children: []
                    }
                ]
            }
            
        ]
    }
    
]

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
        case ADD_ITEM:
            return [...state, action.item]
        case REMOVE_ITEM:
            return [...state, state.filter(item => item.id !== action.Id)]
        default:
            return state;
    }
}

function hideAddButton(state = {}, action) {
    switch (action.type) {
      case HIDE_ADD_BUTTON:
        return Object.assign({}, state, {
          isShowing: false
        })
      default:
        return state
    }
  }

export default combineReducers({
    modalWindows,
    operateWithItems,
    preview,
    itemClicked,
    hideAddButton
})
