import { RecipesContainer } from 'containers/Recipes'
import Recipes from 'components/Recipes'
import { Link } from 'react-router'
import React from 'react'
import { shallow } from 'enzyme'

describe('Container::Recipes', function(){
  let props
  beforeEach(function(){
    props = {
      loadRecipes: sinon.stub(),
      recipes: [
        { id: 1, content: {} },
        { id: 2, content: {} }
      ]
    }
  })

  it('renders Recipes with recipes in props', function(){
    let doc = shallow(<RecipesContainer {...props}/>)
    let recipesComp = doc.find(Recipes)

    expect(recipesComp.props().recipes).to.equal(props.recipes)
  })
  it('renders a title', function(){
    let doc = shallow(<RecipesContainer {...props}/>)
    let link = doc.find('h2')

    expect(link).to.exist
  })
})
