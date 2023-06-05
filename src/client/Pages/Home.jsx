import React  from 'react'
import Navbar from '../Components/Navbar'
import Carosel from '../Components/Carosel';
import About from './About';
import Footer from './Footer';
const Home = () => {
  return (
    <div className='bg-[#F0F2F5]'>
     <Navbar/>
      <div > 
     <Carosel/>
      </div>
      <div className='my-10 mt-10'>
        <About/>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  )
}

export default Home