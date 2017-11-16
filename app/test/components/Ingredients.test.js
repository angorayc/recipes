import React from 'react'
import { shallow } from 'enzyme'
import Recipe from 'components/Recipe'
import Ingredients from 'components/Ingredients'

describe('Component::Ingredients', function(){
  let props
  beforeEach(function(){
    props = {
      ingredients: [ 'a', 'b', 'c'],
      qty: {
        'a': 1,
        'b': 2,
        'c': '2 tea spoon'
      }
    }
  })
  function renderDoc () {
    return shallow(<Ingredients {...props} />)
  }

  describe('render', function() {
    it('renders Ingredients', function(){
      let doc = renderDoc()
      let comp = doc.find('.ingredient')
      expect(comp).to.have.length(props.ingredients.length)
    })  
  })
  
  describe('quantity', function() {
    it('renders quantity x ingredient if number of quantity is provided', function(){
      let doc = renderDoc()
      let comp = doc.find('.ingredient'),
          text = comp.get(0).props.children
      expect(text).to.equal('1 x a')
    })

    it('renders quantity ingredient if quantity in string is provided', function(){
      let doc = renderDoc()
      let comp = doc.find('.ingredient'),
          text = comp.get(2).props.children
      expect(text).to.equal('2 tea spoon c')
    })
  })
})
