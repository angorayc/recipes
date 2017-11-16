import React from 'react'
import { shallow } from 'enzyme'
import Recipe from 'components/Recipe'
import { Link } from 'react-router'

describe('Component::Recipe', function(){

  function renderDoc (props) {
    return shallow(<Recipe {...props} />)
  }

  it('should render image', function(){
    let props = {
      recipe: {
        id: 1,
        content: {
        name: 'recipe',
        imageUrl: 'https://xxx',
        ingredients: ['a'],
        cookingTime: '20 min'
      }}
    }
    let doc = renderDoc(props)
    expect(doc.find('img')).to.have.length(1)
  })

  it('render the cookingTime of recipe', function(){
    let props = {
      recipe: {
        id: 1,
        content: {
        name: 'recipe',
        imageUrl: 'https://xxx',
        ingredients: ['a'],
        cookingTime: '20 min'
      }}
    }
    let doc = renderDoc(props)
    let recipeComps = doc.find('.time')
    expect(recipeComps.text()).to.equal('Cooking Time : ' + props.recipe.content.cookingTime)
  })

  it('render the name of recipe with a link that take you to the recipe page', function(){
    let props = {
      recipe: {
        id: 1,
        content: {
        name: 'recipe',
        imageUrl: 'https://xxx',
        ingredients: ['a'],
        cookingTime: '20 min'
      }}
    }
    let doc = renderDoc(props)
    let recipeComps = doc.find(Link)
    expect(recipeComps.exists()).to.equal(true)
  })

  it('should not render if the recipe doesn\'t exists', function() {
    let props = {
      recipe: {}
    }
    let doc = renderDoc(props)
    expect(doc.html()).to.equal(null)
  })
})
