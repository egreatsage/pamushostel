import React  from 'react'

import Navbar from '../Components/Navbar'
import Carosel from '../Components/Carosel';
import About from './About';
const Home = () => {
  return (
    <div>
     <Navbar/>
      <div > 
  <Carosel/>
      </div>
      <div className='my-10 mt-10'>
        <About/>
      </div>
    </div>
  )
}

export default Home