import { CALL_API, CHAIN_API } from 'middleware/api'

import * as actionCreator from 'actions/recipes'
import * as ActionType from 'actions/recipes'

describe('Action::Question', function(){
  describe('#loadRecipes()', function(){
    it('returns action `CALL_API` info', function(){
      let action = actionCreator.loadRecipes()
      expect(action[CALL_API]).to.deep.equal({
        method: 'get',
        path: '/api/recipes',
        successType: ActionType.LOADED_RECIPES
      })
    })
  })

  describe('#loadRecipeDetail({id})', function(){
    let id = 'the-id'
    it('returns a CHAIN_API to fetch recipe first', function(){
      let action = actionCreator.loadRecipeDetail({ id })
      let callApi = action[CHAIN_API][0]()[CALL_API]

      expect(callApi.method).to.equal('get')
      expect(callApi.path).to.equal(`/api/recipes/${id}`)
      expect(callApi.successType).to.equal(ActionType.LOADED_QUESTION_DETAIL)
    })
    it('navigates to root when request error', ()=> {
      let mockHistory = {
        push: sinon.stub()
      }
      let action = actionCreator.loadRecipeDetail({ id, history: mockHistory })
      let callApi = action[CHAIN_API][0]()[CALL_API]

      expect(callApi.afterError).to.be.an.instanceOf(Function)
      callApi.afterError()

      expect(mockHistory.push).to.have.been.calledWith('/')
    })
    // it('fetches user data after fetching question', function(){
    //   let action = actionCreator.loadRecipeDetail({ id })
    //   let questionRes = { userId: '1234' }

    //   expect(action[CHAIN_API][1](questionRes)[CALL_API]).to.deep.equal({
    //     method: 'get',
    //     path: `/api/users/${questionRes.userId}`,
    //     successType: ActionType.LOADED_QUESTION_USER
    //   })
    // })
  })
})
