import { combineReducers } from 'redux'
import recipes from 'reducers/recipes'
import recipeDetail from 'reducers/recipeDetail'
import { FILTER_TYPE_STAR, STAR_RECIPE, LOADED_RECIPES, 
  FILTER_TYPE_INGREDIENT, FILTER_TYPE_NAME, FILTER_TYPE_CLEAR } from 'actions/recipes'
import { clone as _clone } from 'lodash'


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

function filterType (state = '', action) {
  switch(action.type) {
    case FILTER_TYPE_STAR:
      return action.switchTo ? 'star' : ''
    case FILTER_TYPE_NAME:
    case FILTER_TYPE_INGREDIENT:
      return action.filterType || state
      break
    case FILTER_TYPE_CLEAR:
      return ''
    default:
      return state
  }
}

function filterInput (state = '', action) {
  switch(action.type) {
    case FILTER_TYPE_NAME:
    case FILTER_TYPE_INGREDIENT:
      return action.value || state
      break
    case FILTER_TYPE_CLEAR:
      return ''
    default:
      return state
  }
}

const rootReducer = combineReducers({
  recipes,
  likedRecipes,
  recipeDetail,
  filterType,
  filterInput
})

export default rootReducer
