import reducer from 'reducers/recipeDetail'
import * as ActionType from 'actions/recipes'

describe('Reducer::::RecipeDetail', function(){
  describe('on ACTION_TYPE', function(){
    describe('on LOADED_QUESTION_DETAIL', function(){
      it('merges state to response', function(){
        let action = {
          type: ActionType.LOADED_RECIPE_DETAIL,
          response: { id: '1', content: {} }
        }

        let newState = reducer(undefined, action)

        expect(newState.toJS()).to.deep.equal({ id: '1', content: {} })
      })
    })

  })
})
