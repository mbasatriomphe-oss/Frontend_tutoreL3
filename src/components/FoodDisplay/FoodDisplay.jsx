import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../Context/StoreContext'

const FoodDisplay = ({category}) => {

    const {food_list} = useContext(StoreContext)


  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near tou</h2>
    </div>
  )
}

export default FoodDisplay