import React, { Component } from 'react'
import { Link } from 'react-router'
import { range as _range } from 'lodash'

const ITEMS_PER_PAGE = 10

class Pagination extends Component {

  render() {

    let { totalItems } = this.props,
        totalPage = Math.ceil(totalItems / ITEMS_PER_PAGE)

    return parseInt(totalItems, 10) > ITEMS_PER_PAGE ? (
      <ul>
        <li>Pagination</li>
        {
          _range(1, totalPage + 1).map((id) => (
            <li key={`page-${id}`}>
              <Link to={`/recipes/page/${id}`}>{ id }</Link>
            </li>
          ))
        }
      </ul>
    ) : false
  }

}

export default Pagination