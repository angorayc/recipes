import React, { Component } from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import { get as _get } from 'lodash'
import Recipe from 'components/Recipe'


const NO_STAR_RECIPE_MESSAGE = 'Sorry, you don\'t currently have any starred recipes, get started by starring recipes you like'
const NO_RECIPES_MESSAGE = 'Sorry, we currently have no recipes for you'
const NO_MATCH_RECIPES = 'Sorry, nothing matched your filter term'


class Recipes extends Component {

  constructor(props) {
    super(props)
    this._mapRecipesList = this._mapRecipesList.bind(this)
    this._filterRecipeList = this._filterRecipeList.bind(this)
    this._filterByName = this._filterByName.bind(this)
    this._filterByIngredient = this._filterByIngredient.bind(this)
    this._getList = this._getList.bind(this)
    this._getMessage = this._getMessage.bind(this)
  }

  _mapRecipesList(list) {
    
    let { handleStarRecipe, likedRecipes } = this.props

    return (list || []).map((q, i) => <Recipe key={`r-${i}`} recipe={q} 
      handleStarRecipe={handleStarRecipe} likedRecipes={likedRecipes} />
    )
  }

  _filterRecipeList() {

    let { likedRecipes, recipes } = this.props,
        faviList = recipes.filter((q, i) => {
          let id = _get(q, 'id')
          return likedRecipes.indexOf(id) >= 0
        })
    return this._mapRecipesList(faviList)
  }

  _filterByName() {
    let { filterInput, recipes } = this.props,
        list = recipes.filter((q, i) => {
          let name = _get(q, 'content.name')
          return filterInput ? name.toLowerCase().indexOf(filterInput) >= 0 : false
        })
    return this._mapRecipesList(list)
  }

  _filterByIngredient() {
    let { filterInput, recipes } = this.props,
        list = recipes.filter((q) => {
          let ingredient = _get(q, 'content.ingredients', []).map((i) => i.toLowerCase())
          return ingredient.indexOf(filterInput) >= 0
        })
    return this._mapRecipesList(list)
  }

  _getList() {
    let { recipes, filterType } = this.props
    filterType = filterType || ''
    switch(filterType.toLowerCase()) {
      case 'star':
        return this._filterRecipeList()
      case 'name':
        return this._filterByName()
      case 'ingredient':
        return this._filterByIngredient()
      default:
        return this._mapRecipesList(recipes)
    }
  }

  _getMessage() {
    let { recipes, filterType } = this.props
    filterType = filterType || ''
    switch(filterType.toLowerCase()) {
      case 'star':
        return NO_STAR_RECIPE_MESSAGE
      case 'name':
      case 'ingredient':
        return NO_MATCH_RECIPES
      default:
        return NO_RECIPES_MESSAGE
    }
  }


  render() {
    let message = this._getMessage(),
        list = this._getList()


    return (
      <div>
        
        { list.length ? list : <p>{ message }</p> }
        
      </div>
    )
  }
}

Recipes.propTypes = {
  recipes: PropTypes.array.isRequired,
  isFilter: PropTypes.bool,
  handleStarRecipe: PropTypes.func
}


export default Recipes
