import React from 'react'
import { shallow } from 'enzyme'
import Recipe from 'components/Recipe'
import Recipes, { NO_STAR_RECIPE_MESSAGE, NO_RECIPES_MESSAGE, NO_MATCH_RECIPES } from 'components/Recipes'

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

  describe('no recipes to show', function() {
    describe('with name filter enabled', function() {
      it('should display correct message', function() {
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
          filterInput: 'recipe 2',
          filterType: 'name'
        }
        let message = renderDoc(props).find('.error-msg')
        expect(message).to.have.length(1)
        expect(message.text()).to.equal(NO_MATCH_RECIPES)

      })
    })

    describe('with ingredient filter enabled', function() {
      it('should display correct message', function() {
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
          filterInput: 'e',
          filterType: 'ingredient'
        }
        let message = renderDoc(props).find('.error-msg')
        expect(message).to.have.length(1)
        expect(message.text()).to.equal(NO_MATCH_RECIPES)

      })
    })

    describe('with star filter enabled,', function() {
      it('should display correct message', function() {
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
          filterType: 'star',
          likedRecipes: []
        }
        let message = renderDoc(props).find('.error-msg')
        expect(message).to.have.length(1)
        expect(message.text()).to.equal(NO_STAR_RECIPE_MESSAGE)

      })
    })

    describe('without any filter enabled,', function() {
      it('should display correct message', function() {
        let props = {
          recipes: [],
          filterType: '',
          likedRecipes: []
        }
        let message = renderDoc(props).find('.error-msg')
        expect(message).to.have.length(1)
        expect(message.text()).to.equal(NO_RECIPES_MESSAGE)

      })
    })
    
  })

})
