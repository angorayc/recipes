import { CALL_API, CHAIN_API } from 'middleware/api'

export const LOADED_RECIPES = Symbol('LOADED_RECIPES')
export const LOADED_RECIPES_PAGIN = Symbol('LOADED_RECIPES_PAGIN')
export const LOADED_RECIPES_FILETER = Symbol('LOADED_RECIPES_FILETER')

export function loadRecipes(page, type) {
  let successType = type ? type : LOADED_RECIPES

  return {
    [CALL_API]: {
      method: 'get',
      path: '/api/recipes',
      successType,
      query: { page }
    }
  }
}

export const LOADED_RECIPE_DETAIL = Symbol('LOADED_RECIPE_DETAIL')
export function loadRecipeDetail ({ id, history }) {
  return {
    [CALL_API]: {
      method: 'get',
      path: `/api/recipes/${id}`,
      successType: LOADED_RECIPE_DETAIL
    }  
  }
}

export const TRIGGER_PAGINATION = Symbol('TRIGGER_PAGINATION')
export function triggerPagination () {
  return {
    type: TRIGGER_PAGINATION
  }
}

export const STAR_RECIPE = Symbol('STAR_RECIPE')


export function handleStarRecipe (id) {

  return {
    type: STAR_RECIPE,
    id: parseInt(id, 10)
  }

}

export const FILTER_TYPE_STAR = Symbol('FILTER_TYPE_STAR')


export function handleFilterClicked (switchTo) {
  return {
    type: FILTER_TYPE_STAR,
    switchTo
  } 
}

export const FILTER_TYPE_NAME = 'FILTER_TYPE_NAME'
export const FILTER_TYPE_INGREDIENT = 'FILTER_TYPE_INGREDIENT'
export const FILTER_TYPE_CLEAR = 'FILTER_TYPE_CLEAR'
export function handleInputfilter (value = '', filterType) {
  let type = 'FILTER_TYPE_' + filterType.toUpperCase()
  return {
    type: type,
    filterType,
    value: value.toLowerCase()
  }
}
