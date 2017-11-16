import { RecipesContainer } from 'containers/Recipes'
import Recipes from 'components/Recipes'
import { Link } from 'react-router'
import React from 'react'
import { shallow } from 'enzyme'

describe('Container::RecipesContainer', function(){
  let props
  beforeEach(function(){
    props = {
      loadRecipes: sinon.stub(),
      recipes: {
        data: [
          { id: 1, content: {} },
          { id: 2, content: {} }
        ]  
      }
    }
  })

  it('renders Recipes with recipes in props', function(){
    let doc = shallow(<RecipesContainer {...props}/>)
    let recipesComp = doc.find(Recipes)

    expect(recipesComp.props().recipes).to.equal(props.recipes.data)
  })
  it('renders a Recipes component', function(){
    let doc = shallow(<RecipesContainer {...props}/>)
    

    expect(doc.find(Recipes)).to.exist
  })
})
