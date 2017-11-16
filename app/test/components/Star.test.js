import React from 'react'
import { shallow } from 'enzyme'
import Star from 'components/Star'

describe('Component::Star', function(){

  function renderDoc (props) {
    return shallow(<Star {...props} />)
  }

  describe('id doesn\'t exist in likedRecipes', function() {
    it('renders default star button', function(){
      let props = {
        id: 1,
        likedRecipes: []
      }
      let doc = renderDoc(props)
      let recipeComps = doc.find('.btn')
      expect(recipeComps.hasClass('btn-light')).to.equal(true)
    })
  })

  describe('id exist in likedRecipes', function() {
    it('renders special star button', function(){
      let props = {
        id: 1,
        likedRecipes: [ 1 ]
      }
      let doc = renderDoc(props)
      let recipeComps = doc.find('.btn')

      expect(recipeComps.hasClass('btn-warning')).to.equal(true)
    })
  })
})
