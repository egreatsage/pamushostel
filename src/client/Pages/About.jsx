import React from 'react'
import security from '../../assets/security.png'
import wifi from '../../assets/wifi.png'
import tree from '../../assets/tree.png'
import curricular from '../../assets/curricular.png'
import { AiOutlineWifi } from 'react-icons/ai'
export default function About() {
  return (
    <div className='px-3'>
        <div className="">
         
          <div className="md:mt-44 mt-8  border-b">
          <h1 className="md:text-3xl text-center text-2xl tracking-widest font-bold text-gray-900">About Us</h1>
       
       <p className=' text-center my-2 tracking-wider text-gray-700 md:mx-10 text-xl md:text-2xl'>Pamus Residency is a mixed student accomodation that offers cheap and affordable accomodations for students all around the country from different institutions </p>
            <div className='flex my-6 mt-10  justify-center gap-8'>
               <div className="rounded-full bg-white gap-2 ">
                  <span className='text-[orange] text-5xl font-bold '>15+</span> <span className='text-2xl text-gray-800 font-medium '>parters</span>
               </div>
               <div className="rounded-full bg-white ">
                  <span className='text-[orange] text-5xl font-bold '>200+</span> <span className='text-2xl text-gray-800 font-medium '>residents</span>
               </div>
            </div>
          </div>
             <div className='mt-44 border-b'>
             <h1 className='md:text-3xl text-center text-2xl tracking-widest font-bold text-gray-900 my-8 mt-8 '>Residence Amenities</h1>
              <div className='grid grid-cols-2 gap-3 mb-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3  xl:grid-cols-4 justify-center '>
                  <div className='md:flex content-center  my-7 w-44 h-44 md:w-80 md:h-60 '>
                    <img className='h-32 w-32 md:h-40 md:w-42' src={security} alt=" security" />
                   <div className=''>
                   <h1 className='text-[orange] text-md font-bold  underline md:pl-9 tracking-wider' >Security</h1>
                    <p className='tracking-tight leading-8 text-gray-800 mt-2 text-center'>24hr full security with certified company</p>
                   </div>
                   
                  </div>
                  <div className='md:flex content-center  my-7 w-44 h-44 md:w-80 md:h-60 '>
                    <AiOutlineWifi className='h-32 w-32 md:h-40 text-blue-700 md:w-46' src={wifi}  />
                   <div className=''>
                   <h1 className='text-[orange] text-md font-bold  underline md:pl-9 tracking-wider' >Free Wifi</h1>
                    <p className='tracking-tight leading-8 text-gray-800 mt-2 text-center '>Fast and Reliable wifi connection 24/7</p>
                   </div>
                   
                  </div>
                  <div className='md:flex content-center  my-7 w-48 h-48 md:w-84 md:h-64 '>
                    <img className='h-32 w-32 md:h-40 md:w-42' src={curricular} alt=" curricular" />
                   <div className=''>
                   <h1 className='text-[orange] text-md font-bold  underline md:pl-9 tracking-wider' >Activites/Interaction</h1>
                    <p className='tracking-tight leading-8 text-gray-800 mt-2 text-center'>Clubs,Sports,Pool and inhostel curricular </p>
                   </div>
                   
                  </div>
                  <div className='md:flex content-center  my-7 w-44 h-44 md:w-80 md:h-60 '>
                    <img className='h-32 w-32 md:h-40 md:w-42' src={tree} alt="tree" />
                   <div className=''>
                   <h1 className='text-[orange] text-md font-bold  underline md:pl-9 tracking-wider' >Serene Environment</h1>
                    <p className='tracking-tight leading-8 text-gray-800 mt-2 text-center'>Cool and Comfortable Study/Relaxation spots</p>
                   </div>
                   
                  </div>
                
               

              </div>
             </div>
        </div>
    </div>
  )
}
