import React from 'react'
import { shallow } from 'enzyme'
import Pagination from 'components/Pagination'
import { Link } from 'react-router'

describe('Component::Pagination', function(){
  let props
  
  function renderDoc (props) {
    return shallow(<Pagination {...props} />)
  }

  
  describe('totalItems is less than 10 items Per Page', function() {
    it('renders no pagination if totalItems is less than 10', function(){
      let props = {
        totalItems: 3
      }
      let doc = renderDoc(props)
      expect(doc.html()).to.equal(null)
    })  
  })

  describe('totalItems is more than 10 items Per Page', function() {
    it('renders pagination', function(){
      let props = {
        totalItems: 15
      }
      let doc = renderDoc(props)
      let recipeComps = doc.find(Link),
          itemsPerPage = 10,
          page = Math.ceil(props.totalItems / itemsPerPage)

      expect(recipeComps).to.have.length(page)
    })
  })
})
