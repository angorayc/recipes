import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadRecipeDetail, handleStarRecipe } from 'actions/recipes'
import Helmet from 'react-helmet'
import { browserHistory } from 'react-router'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import Recipe from 'components/Recipe'
import { get as _get } from 'lodash'


class RecipeContainer extends Component {
  static fetchData({ store, params, history }) {
    let id = _get(params, 'id')
    return store.dispatch(loadRecipeDetail(id, history))
  }
  componentDidMount() {
    let id = _get(this.props, 'params', 'id')
    this.props.loadRecipeDetail(id)
  }
  render() {
    let { recipeDetail, handleStarRecipe, params, likedRecipes } = this.props,
        id = _get(recipeDetail, 'id'),
        name = _get(recipeDetail, 'content.name'),
        isLike = likedRecipes.indexOf(id) >= 0

    return name ? (
      <div>
        <Helmet
          title={`Recipe ${name}`}
        />
        <h2>{ `#${id} ${name}` }</h2>
        <Recipe recipe={recipeDetail} handleStarRecipe={handleStarRecipe} likedRecipes={likedRecipes} />
        <Link to="/recipes/page/1">Back</Link>
      </div>
    ) : <p>Sorry, this recipe doesn't exist or may have been removed. <Link to="/recipes">Back</Link></p>
  }
}

function mapStateToProps ({ recipeDetail, likedRecipes }) {
  return { recipeDetail, likedRecipes }
}

const mapDispatchToProps = {
  loadRecipeDetail,
  handleStarRecipe
}

RecipeContainer.propTypes = {
  recipeDetail: PropTypes.object.isRequired
}


export { RecipeContainer }
export default connect(mapStateToProps, mapDispatchToProps)(RecipeContainer)
