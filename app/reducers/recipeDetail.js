import { LOADED_RECIPE_DETAIL } from 'actions/recipes'

let defaultState = {}

export default function(state = defaultState, action) {
  switch(action.type) {
    case LOADED_RECIPE_DETAIL:
      return action.response || state

    default:
      return state
  }
}
