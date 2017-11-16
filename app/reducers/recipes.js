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

    
    default:
      return state
  }
}










