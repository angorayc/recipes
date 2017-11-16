import React from 'react'
import { shallow } from 'enzyme'
import Recipe from 'components/Recipe'
import Recipes from 'components/Recipes'

describe('Component::Recipes', function(){
  let props
  beforeEach(function(){
    props = {
      recipes: [
        { id: 1, content: {} },
        { id: 2, content: {} }
      ]
    }
  })
  function renderDoc () {
    return shallow(<Recipes {...props} />)
  }

  it('renders recipes', function(){
    let doc = renderDoc()
    let recipeComps = doc.find(Recipe)

    expect(recipeComps.length).to.equal(props.recipes.length)
  })
})
