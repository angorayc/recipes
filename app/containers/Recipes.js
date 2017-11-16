import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadRecipes, triggerPagination, handleFilterClicked, handleStarRecipe,
  LOADED_RECIPES_PAGIN, LOADED_RECIPES, handleInputfilter } from 'actions/recipes'
import { Link } from 'react-router'
import { get as _get, isFunction as _isFunction } from 'lodash'
import Recipes from 'components/Recipes'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import Pagination from 'components/Pagination'
import InputFilter from 'components/InputFilter'

class RecipesContainer extends Component {
  static fetchData({ store, params }) {
    let page = _get(params, 'page'),
        type = page ? LOADED_RECIPES_PAGIN : LOADED_RECIPES
    return store.dispatch(loadRecipes(page, type))
  }

  constructor(props) {
    super(props)
    this._handleStarFilterClicked = this._handleStarFilterClicked.bind(this)
    this._enableStarFilter = this._handleStarFilterClicked.bind(this, 1)
    this._disableStarFilter = this._handleStarFilterClicked.bind(this, 0)
    this._getTitle = this._getTitle.bind(this)
  }

  componentDidMount() {
    let { loadRecipes, location, params } = this.props,
        { page } = params,
        type = page ? LOADED_RECIPES_PAGIN : LOADED_RECIPES
    if (_isFunction(loadRecipes))
      loadRecipes(page, type)
  }

  componentWillReceiveProps(nextProps) {
    let { loadRecipes, params, isFilter } = this.props,
        thisPage = _get(params, 'page'),
        nextPage = _get(nextProps, 'params.page'),
        nextFilter = _get(nextProps, 'isFilter')


    if (thisPage !== nextPage && _isFunction(loadRecipes))
      loadRecipes(nextPage, LOADED_RECIPES_PAGIN)

    if (isFilter !== nextFilter)
      loadRecipes()
  }

  _handleStarFilterClicked(switchTo) {
    let { handleFilterClicked } = this.props
    if (_isFunction(handleFilterClicked))
      handleFilterClicked(switchTo)
  }

  _getTitle() {
    let { filterType, params } = this.props,
        page = _get(params, 'page'),
        title = 'List page'

    if (filterType)
      return `List Recipes by ${filterType}`

    if (page)
      return `List Page - Page ${page}`

    return title
  }


  render() {
    let { params, recipes, handleStarRecipe, likedRecipes, handleInputfilter,
          filterType, filterInput } = this.props,
        page = _get(params, 'page'),
        isPagin = !!page,
        paginData = isPagin ? _get(recipes, ['pagin', page], []) : _get(recipes, 'data', []),
        totalPage = _get(recipes, 'totalPage'),
        totalItems = _get(recipes, 'totalItems'),
        title = this._getTitle()

    return (
      <div>
        <Helmet
          title={ title }
        />
        <h2>{ title }</h2>
        <InputFilter handleInputfilter={handleInputfilter} />
        <p>
          <span>Show only my Favourite recipes:</span>
          <span to="#" onClick={this._enableStarFilter} className="btn btn-success">on</span> |
          <span to="#" onClick={this._disableStarFilter} className="btn btn-danger">off</span>
        </p>
        
        <Recipes recipes={ paginData }
          handleStarRecipe={ handleStarRecipe } likedRecipes={likedRecipes}
          filterType={filterType} filterInput={filterInput} />

        { filterType ? false : <Pagination totalPage={ totalPage } totalItems={totalItems} /> }

      </div>
    )
  }
}

function mapStateToProps ({ recipes, likedRecipes, filterType, filterInput }) {
  return { recipes, likedRecipes, filterType, filterInput }
}

const mapDispatchToProps = {
  triggerPagination,
  loadRecipes,
  handleFilterClicked,
  handleStarRecipe,
  handleInputfilter
}

export { RecipesContainer }
export default connect(mapStateToProps, mapDispatchToProps)(RecipesContainer)
