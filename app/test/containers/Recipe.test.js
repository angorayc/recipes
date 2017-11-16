import React from 'react'
import Container, { RecipeContainer } from 'containers/Recipe'
import { mount } from 'enzyme'
import { browserHistory } from 'react-router'

describe('Container::RecipeContainer', function(){


  function renderDoc (props) {
    return mount(<RecipeContainer {...props}/>)
  }


  it('fetches recipe details on mounted', function(){
    let props = {
      loadRecipeDetail: sinon.stub(),
      params: {
        id: 222
      }
    }
    let doc = renderDoc(props)
    expect(props.loadRecipeDetail).to.have.been.calledWith({
      id: props.params.id
    })
  })

  it('show message when no recipe details to show', function(){
    let props = {
      loadRecipeDetail: sinon.stub(),
      params: {
        id: 222
      },
      recipeDetail: {}
    }
    let doc = renderDoc(props)
    expect(doc.find('.error-msg').text()).to.equal('Sorry, this recipe doesn\'t exist or may have been removed.')
  })

})
