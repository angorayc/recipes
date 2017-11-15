import * as ActionType from 'actions/recipes'
import _ from 'lodash'

let defaultState = {}

export default function(state = defaultState, action) {
  switch(action.type) {
    case ActionType.LOADED_RECIPE_DETAIL:
      return action.response

    //case ActionType.STAR_RECIPE:
      //return state.set('isStar', !state.get('isStar'))

    default:
      return state
  }
}
