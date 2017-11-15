let _ = require('lodash')
let data = require('./recipes')
const dataLength = data.recipes.length
const lastIndexOfData = dataLength ? (dataLength - 1) : 0


function recipe (id) {

  let recipe = _.get(data, `recipes.${id}`, {})

  return {
    id,
    content: recipe
  }
}


export function getRecipes (pageIndex) {


  let isPagin = !!pageIndex,
      itemsPerPage = isPagin ? 10 : dataLength,
      page = pageIndex - 1,
      totalPage = Math.ceil(dataLength / itemsPerPage),
      start = !page ? 0 : page * itemsPerPage,
      end = Math.min(start + itemsPerPage, dataLength)

  if (!pageIndex) {
    return {
      data: _.range(start, end).map((id) => recipe(id)),
      totalItems: dataLength  
    } 
  }

  return {
    data: {[pageIndex] : _.range(start, end).map((id) => recipe(id)) },
    totalPage: totalPage,
    page: isPagin ? pageIndex : 1,
    itemsPerPage: itemsPerPage,
    totalItems: dataLength
  }

}


export function getRecipe (id) {

  return recipe(id)
}
