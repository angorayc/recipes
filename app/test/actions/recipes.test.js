import { CALL_API, CHAIN_API } from 'middleware/api'

import * as actionCreator from 'actions/recipes'
import * as ActionType from 'actions/recipes'

describe('Action::Recipes', function(){
  describe('#loadRecipes()', function(){
    it('returns action `CALL_API` info', function(){
      let action = actionCreator.loadRecipes()
      expect(action[CALL_API]).to.deep.equal({
        method: 'get',
        path: '/api/recipes',
        successType: ActionType.LOADED_RECIPES,
        query: { page: '' }
      })
    })
  })

  describe('#loadRecipeDetail()', function(){
    it('returns action `CALL_API` info', function(){
      let id = 1,
          action = actionCreator.loadRecipeDetail({id})
      expect(action[CALL_API]).to.deep.equal({
        method: 'get',
        path: `/api/recipes/${id}`,
        successType: ActionType.LOADED_RECIPE_DETAIL
      })
    })
  })

  describe('#handleInputfilter()', function(){
    describe('given "clear" as filterType', function() {
      it('should returns correct action type', function(){
        let filterType = 'CLEAR',
            action = actionCreator.handleInputfilter('', filterType)

        expect(action).to.deep.equal({
          type: ActionType.FILTER_TYPE_CLEAR
        })
      })
    })

    describe('given other value as filterType', function() {
      it('returns correct action type', function(){
        let filterType = 'FILTER_TYPE',
            value = 'VALUE',
            action = actionCreator.handleInputfilter(value, filterType)

        expect(action).to.deep.equal({
          type: ActionType.FILTER_TYPE_INPUT,
          filterType: filterType.toLowerCase(),
          value: value.toLowerCase()
        })
      })
    })
  })
})
