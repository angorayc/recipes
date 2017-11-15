import React, { Component } from 'react'
import { isFunction as _isFunction } from 'lodash'
import classnames from 'classnames'

class Star extends Component {


  constructor(props) {
    super(props)
    this._onLikeButtonClick = this._onLikeButtonClick.bind(this)
  }

  _onLikeButtonClick(e) {
    e.preventDefault()
    let { id, handleStarRecipe } = this.props
    if (_isFunction(handleStarRecipe))
      handleStarRecipe(id)
  }


  render() {
    let { likedRecipes, id } = this.props,
        idx = parseInt(id, 10),
        isStar = likedRecipes.indexOf(idx) >= 0,
        starClasses = classnames({
          active: isStar === true,
          like: true
        })
    return (
      <a onClick={this._onLikeButtonClick} className={starClasses}>Like</a>
    )
  }
}

Star.defaultProps = {
  likedRecipes: []
}

export default Star