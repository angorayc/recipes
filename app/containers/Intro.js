import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Helmet from 'react-helmet'

class Intro extends Component {
  render() {
    return (
      <div className="intro">
        <Helmet
          title="Recipes"
        />
        <h1>Recipes</h1>
        <Link to="/recipes/page/1">list recipes</Link>
      </div>
    )
  }
}

function mapStateToProps() {
  return {}
}

export default connect(mapStateToProps)(Intro)
