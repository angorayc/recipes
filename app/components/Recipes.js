import React, { Component } from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import { get as _get } from 'lodash'
import Recipe from 'components/Recipe'


const NO_STAR_RECIPE_MESSAGE = 'Sorry, you don\'t currently have any starred recipes, get started by starring recipes you like'
const NO_RECIPES_MESSAGE = 'Sorry, we currently have no recipes for you'

class Recipes extends Component {

  constructor(props) {
    super(props)
    this._mapRecipesList = this._mapRecipesList.bind(this)
    this._filterRecipeList = this._filterRecipeList.bind(this)
  }

  _mapRecipesList(list) {
    
    let { handleStarRecipe, likedRecipes } = this.props

    return (list || []).map((q, i) => <Recipe key={`r-${i}`} recipe={q} 
      handleStarRecipe={handleStarRecipe} likedRecipes={likedRecipes} />
    )
  }

  _filterRecipeList() {

    let { handleStarRecipe, likedRecipes, recipes } = this.props,
        faviList = recipes.filter((q, i) => {
          let id = _get(q, 'id')
          return likedRecipes.indexOf(id) >= 0
        })
    return this._mapRecipesList(faviList)
  }


  render() {
    let { recipes, isStar, isFilter, likedRecipes } = this.props,
        message = isFilter ? NO_STAR_RECIPE_MESSAGE : NO_RECIPES_MESSAGE,
        list = isFilter ? this._filterRecipeList() : this._mapRecipesList(recipes)

    return (
      <div>
        <span> Filter: { isFilter ? 'ON' : 'OFF' }</span>
        { list.length ? list : <p>{ message }</p> }
        
      </div>
    )
  }
}

Recipes.propTypes = {
  recipes: PropTypes.array.isRequired,
  isFilter: PropTypes.bool,
  handleStarRecipe: PropTypes.func.isRequired
}


export default Recipes
