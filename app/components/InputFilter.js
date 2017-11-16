import React, { Component } from 'react'
import { isFunction as _isFunction } from 'lodash'
import classnames from 'classnames'

const FILTERS = [
  {name: 'name', classname: 'btn btn-link'},
  {name: 'ingredient', classname: 'btn btn-link'},
  {name: 'clear', classname: 'btn btn-link'}
]

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

    if (_isFunction(handleInputfilter))
      handleInputfilter(value, type)
  }


  render() {

    return (
      <div className="form-group">
        <input name="inputfilter" ref="inputfilter"/>
        {
          FILTERS.map(({name, classname}) => (
            <button key={`button-${name}`} onClick={this._onFilterClick} value={name} className={classname}>filter by {name}</button>
          ))
        }

      </div>
    )
  }
}


export default InputFilter