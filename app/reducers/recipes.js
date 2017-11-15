import * as ActionType from 'actions/recipes'
import Immutable from 'immutable'
import { get as _get } from 'lodash'


let defaultState = {
  data: [],
  totalPage: null,
  page: 1,
  itemsPerPage: 10,
  totalItems: null
}

export default function (state = defaultState, action) {
  let response = _get(action, 'response', {}),
      { data, totalPage, page, itemsPerPage, totalItems } = response

  switch(action.type) {

    case ActionType.LOADED_RECIPES:
      return Object.assign({}, state, {
        data,
        totalItems
      })
      break

    case ActionType.LOADED_RECIPES_PAGIN:
      return Object.assign({}, state, {
        pagin: data,
        totalPage,
        totalItems,
        itemsPerPage
      })
      break

    // case ActionType.TOGGLE_FILTER:
    //   {
    //     let recipes = _get(state, 'data')state.get('recipes') || [],
    //         likedRecipes = recipes.filter((v) => {
    //           return !!v.get('isStar')
    //         })
    //     return state.setIn(['recipes'], likedRecipes)
    //     break
    //   }

    // case ActionType.LOADED_RECIPES_PAGIN:
    //   return Immutable.fromJS(action.response)
    //   break

    // case ActionType.STAR_RECIPE:
    //   {
    //     let { id } = action,
    //         isRecipeLiked = state.getIn(['recipes', id, 'isStar']),
    //         updatedState = state.setIn(['recipes', id, 'isStar'], !isRecipeLiked)

    //     return updatedState 
    //     break
    //   }
    default:
      return state
  }
}

// function recipes (state = defaultReceipe, action) {
//   switch(action.type) {
//     case ActionType.LOADED_QUESTIONS:
//       return Immutable.fromJS(action.response.recipes) || state
//       break
//     default:
//       return state
//   }
// }

// function totalPage (state = '', action) {
//   switch(action.type) {
//     case ActionType.LOADED_QUESTIONS:
//       return action.response.totalPage || state
//       break
//     default:
//       return state
//   }
// }

// function pageIndex (state = 1, action) {
//   switch(action.type) {
//     case ActionType.LOADED_QUESTIONS:
//       return action.response.pageIndex || state
//       break
//     default:
//       return state
//   }
// }

// function itemsPerPage (state = 3, action) {
//   switch(action.type) {
//     case ActionType.LOADED_QUESTIONS:
//       return action.response.itemsPerPage || state
//       break
//     default:
//       return state
//   }
// }

// function isPagination (state = false, action) {
//   switch(action.type) {
//     case ActionType.TRIGGER_PAGINATION:
//       return !state
//       break
//     default:
//       return state
//   }
// }









