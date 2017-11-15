import React, { Component } from 'react'
import { isFunction as _isFunction } from 'lodash'
import classnames from 'classnames'

class InputFilter extends Component {


  constructor(props) {
    super(props)
    this._onFilterClick = this._onFilterClick.bind(this)
  }

  _onFilterClick(e) {
    e.preventDefault()
    let { handleInputfilter } = this.props,
        value = this.refs.inputfilter.value,
        type = e.target.value

    //console.log(type, value)
    if (_isFunction(handleInputfilter))
      handleInputfilter(value, type)
  }


  render() {

    return (
      <div>
        <input name="inputfilter" ref="inputfilter"/>
        {
          ['name', 'ingredient'].map((type) => (
            <button key={`button-${type}`} onClick={this._onFilterClick} value={type}>filter by {type}</button>
          ))
        }

      </div>
    )
  }
}


export default InputFilter