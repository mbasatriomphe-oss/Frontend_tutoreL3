import React, { useState } from 'react'
import './Home.css' 
import Header from '../../components/Header/Header'
import ExloreMenu from '../../components/ExploreMenu/ExloreMenu'

const Home = () => {
  const[category, setCategory] =useState("All");

  return (
    <div>
      <Header/>
      <ExloreMenu category={category} setCategory={setCategory}/>
    </div>
  )
}

export default Home