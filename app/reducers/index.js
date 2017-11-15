import { combineReducers } from 'redux'
import recipes from 'reducers/recipes'
import recipeDetail from 'reducers/recipeDetail'
import { TOGGLE_FILTER, STAR_RECIPE, LOADED_RECIPES, FILTER_TYPE_INGREDIENT, FILTER_TYPE_NAME } from 'actions/recipes'
import { clone as _clone } from 'lodash'

function isFilter (state = false, action) {
  switch(action.type) {
    case TOGGLE_FILTER:
      return !state
      break

    default:
      return state
  }
}

function likedRecipes (state = [], action) {
  let { id } = action,
      idx = state.indexOf(id),
      likes = _clone(state)

  idx >= 0 ? likes.splice(idx, 1) : likes.push(id)

  switch(action.type) {
    case STAR_RECIPE:
      return likes
      break
    default:
      return state
  }
}

function inputFilter (state = {}, action) {
  switch(action.type) {
    case FILTER_TYPE_NAME:
    case FILTER_TYPE_INGREDIENT:
      return {
        filterType: action.filterType,
        value: action.value
      }
      break
    default:
      return state
  }
}

const rootReducer = combineReducers({
  recipes,
  isFilter,
  likedRecipes,
  recipeDetail,
  inputFilter
})

export default rootReducer
