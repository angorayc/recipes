import React from 'react'
import { shallow } from 'enzyme'
import Recipe from 'components/Recipe'
import Recipes from 'components/Recipes'

describe('Component::Recipes', function(){

  function renderDoc (props) {
    return shallow(<Recipes {...props} />)
  }

  describe('render without filter', function() {
    it('renders recipes', function(){
      let props = {
        recipes: [
          {
            id: 0,
            content: {
              name: 'recipe 0',
              ingredients: ['a', 'b', 'c']
            }
          },
          {
            id: 1,
            content: {
              name: 'recipe 1',
              ingredients: ['d']
            }
          }
        ]
      }
      let doc = renderDoc(props)
      let recipeComps = doc.find(Recipe)

      expect(recipeComps.length).to.equal(props.recipes.length)
    })
  })

  describe('render with name filter', function() {
    it('renders recipes', function(){
      let props = {
        recipes: [
          {
            id: 0,
            content: {
              name: 'recipe 0',
              ingredients: ['a', 'b', 'c']
            }
          },
          {
            id: 1,
            content: {
              name: 'recipe 1',
              ingredients: ['d']
            }
          }
        ],
        filterInput: 'recipe 1',
        filterType: 'name'
      }
      let doc = renderDoc(props)
      let recipeComps = doc.find(Recipe)
      //console.log('xxx', recipeComps.props('recipe').recipe.id)
      expect(recipeComps.props('recipe').recipe.id).to.equal(1)
      expect(recipeComps.length).to.equal(1)

    })
  })

  describe('render with ingredients filter', function() {
    it('renders recipes', function(){
      let props = {
        recipes: [
          {
            id: 0,
            content: {
              name: 'recipe 0',
              ingredients: ['a', 'b', 'c']
            }
          },
          {
            id: 1,
            content: {
              name: 'recipe 1',
              ingredients: ['d']
            }
          }
        ],
        filterInput: 'a',
        filterType: 'ingredient'
      }
      let doc = renderDoc(props)
      let recipeComps = doc.find(Recipe)

      expect(recipeComps.props('recipe').recipe.id).to.equal(0)
      expect(recipeComps.length).to.equal(1)

    })
  })

  describe('render with liked recipes filter', function() {
    it('renders recipes', function(){
      let props = {
        recipes: [
          {
            id: 0,
            content: {
              name: 'recipe 0',
              ingredients: ['a', 'b', 'c']
            }
          },
          {
            id: 1,
            content: {
              name: 'recipe 1',
              ingredients: ['d']
            }
          },
          {
            id: 2,
            content: {
              name: 'recipe 1',
              ingredients: ['d']
            }
          }
        ],
        likedRecipes: [ 2 ],
        filterInput: '',
        filterType: 'star'
      }
      let doc = renderDoc(props)
      let recipeComps = doc.find(Recipe)

      expect(recipeComps.props('recipe').recipe.id).to.equal(2)
      expect(recipeComps.length).to.equal(1)

    })
  })

})
