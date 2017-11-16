import React from 'react'
import { get as _get, isNumber as _isNumber } from 'lodash'

const Ingredients = ({ ingredients, qty }) => {

  return (
    <div>
        <p className="card-text">ingredients:</p>
        {
          (ingredients || []).map((ingredient, i) => {
            let quantity = _get(qty, ingredient.toLowerCase(), '')

            quantity = (_isNumber(quantity)) ? `${quantity} x ` : quantity
            return <p className="card-text" key={`${ingredient}-${i}`} >{ quantity }{ ingredient }</p>
          })
        }
    </div>  
  )  
}



export default Ingredients