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

export const TOGGLE_FILTER = Symbol('TOGGLE_FILTER')


export function handleFilterClicked () {
  return {
    type: TOGGLE_FILTER
  }
  
}
