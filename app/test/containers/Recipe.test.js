import React from 'react'
import Container, { RecipeContainer } from 'containers/Recipe'
import { mount } from 'enzyme'
import { browserHistory } from 'react-router'

describe('Container::RecipeContainer', function(){
  let props

  function renderDoc () {
    return mount(<RecipeContainer {...props}/>)
  }
  beforeEach(function(){
    props = {
      loadRecipeDetail: sinon.stub(),
      params: {
        id: 222
      },
      question: {
        id: 222,
        content: {}
      }
    }
  })

  it('fetches recipe details on mounted', function(){
    let doc = renderDoc()
    expect(props.loadRecipeDetail).to.have.been.calledWith({
      id: props.params.id
    })
  })

})
