import React from 'react'
import RegisteredUsers from './RegisteredUsers'
import Navbar from '../Components/Navbar'
import TheRooms from './TheRooms'

const TheDashboard = () => {
  return (
    <div>
      <div>
      <Navbar/>
      </div>
      <div className='mt-20'>
      <RegisteredUsers/>
      </div>
      <div>
        <TheRooms/>
      </div>
    </div>
  )
}

export default TheDashboard