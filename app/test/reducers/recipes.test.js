import recipesReducer from 'reducers/recipes'
import * as ActionType from 'actions/recipes'

describe('Reducer::Recipes', function(){
  it('returns an object with default state', function(){
    let action = { type: 'unknown' }
    let newState = recipesReducer(undefined, { type: 'unknown' })
    expect(newState.toJS()).to.deep.equal({
      data: [],
      totalPage: null,
      page: 1,
      itemsPerPage: 10,
      totalItems: null
    })

  describe('on LOADED_RECIPES', function(){
    it('returns the `response` in given action', function(){
      let action = {
        type: ActionType.LOADED_RECIPES,
        response: { data: [{}], totalItems: 3 }
      }
      let newState = recipesReducer(undefined, action)
      expect(newState.toJS()).to.deep.equal(action.response)
    })
  })
})
