import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadRecipeDetail, handleStarRecipe } from 'actions/recipes'
import Helmet from 'react-helmet'
import { browserHistory } from 'react-router'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import Ingredients from 'components/Ingredients'
import Star from 'components/Star'
import { get as _get } from 'lodash'

class Recipe extends Component {
  
  render() {
    let { recipe, handleStarRecipe, likedRecipes } = this.props,
        id = _get(recipe, 'id'),
        content = _get(recipe, 'content', {}),
        name = _get(content, 'name', ''),
        ingredients = _get(content, 'ingredients', ''),
        imageUrl = _get(content, 'imageUrl', ''),
        cookingTime = _get(content, 'cookingTime', ''),
        qty = _get(content, 'qty', '')
        

    return id ? (
        <div key={id} className="card">
          <img src={ imageUrl } alt={ name } className="card-img-top"/>
          <div className="card-body">
            <h4 className="card-title"><Link to={`/recipes/${id}`}>{ `#${id} ${name}` }</Link></h4>
            <p className="card-text">Cooking Time : { cookingTime }</p>
            <Star id={ id } handleStarRecipe={ handleStarRecipe } likedRecipes={likedRecipes} />
            <Ingredients ingredients={ ingredients } qty={qty} />
          </div>
        </div>
    ) : false
  }
}


export default Recipe
