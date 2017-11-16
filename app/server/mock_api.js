let _ = require('lodash')
let data = require('./recipes')
const DATA_LENGTH = (data.recipes || []).length
const ITEMS_PER_PAGE = 10

function recipe (id) {

  let recipe = _.get(data, `recipes.${id}`, {})

  return {
    id,
    content: recipe
  }
}


export function getRecipes (pageIndex) {

  let isPagin = !!pageIndex,
      itemsPerPage = (isPagin && DATA_LENGTH > ITEMS_PER_PAGE) ? ITEMS_PER_PAGE : DATA_LENGTH,
      page = pageIndex - 1,
      totalPage = Math.ceil(DATA_LENGTH / itemsPerPage),
      start = !page ? 0 : page * itemsPerPage,
      end = Math.min(start + itemsPerPage, DATA_LENGTH)

  if (!pageIndex) {
    return {
      data: _.range(start, end).map((id) => recipe(id)),
      totalItems: DATA_LENGTH  
    } 
  }

  return {
    data: {[pageIndex] : _.range(start, end).map((id) => recipe(id)) },
    totalPage: totalPage,
    page: isPagin ? pageIndex : 1,
    itemsPerPage: itemsPerPage,
    totalItems: DATA_LENGTH
  }

}


export function getRecipe (id) {

  return recipe(id)
}
