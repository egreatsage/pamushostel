import React from 'react'
import Nav from '../Components/Nav'

const MyProfile = () => {
  return (
    <div>
      <Nav/>
      <div>

        <div className='border md:mx-4 mx-1 mt-24'>
             <div className='grid md:grid-cols-2'>
                    <div className="bg-white md:ml-20 pl-20 md:mx-10 md:h-screen md">
                                <img src="https://rare-gallery.com/mocahbig/75347-Saitama-One-Punch-ManOne-Punch-Man-4k-Ultra-HD-Wallpaper.png"
                                className='h-28 flex justify-center w-28 rounded-md  ' alt="" /> 
                               
                    </div>
                  
             <div className='md:mt-1 mt-9'>  
                  <h1 className='text-2xl tracking-wider bold'>Account Informartion</h1>
                  <div className='px-4 mb-4 py-2 md:w-96 bg-gray-50 rounded-md'>
                       <p className='flex text-gray-700'> UserName: </p>
                  </div>
                  <div className='px-4 mb-4 py-2 md:w-96 bg-gray-50 rounded-md'>
                       <p className='flex text-gray-700'> Email: </p>
                  </div>
                  <div className='px-4 mb-4 py-2 md:w-96 bg-gray-50 rounded-md'>
                       <p className='flex text-gray-700'> UserName: </p>
                  </div>
               </div>
             </div>
        </div>
      </div>
    </div>
  )
}
export default MyProfile