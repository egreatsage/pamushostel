import React, { Fragment, useState } from 'react'
import { AiFillFacebook, AiFillYoutube, AiOutlinePhone, AiOutlineWhatsApp } from 'react-icons/ai'
import { FaTiktok } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { CarouselProps } from '@material-tailwind/react'
import { Carousel, Typography, Button } from "@material-tailwind/react";
import Navbar from '../Components/Navbar'
const Home = () => {
  return (
    <div>
     <Navbar/>
      {/* <div className="container  bg-bg-image">
        <div className="row">
          <div className="col-1">
            <h2>Le Pamus </h2>
            <h3>Mixed Hostels for Students</h3>
            <p>Safe Secure Satisfactor</p>

        
            <Link to='/booking'>         
               <button >
                Book Now
             <img className='animate-pulse ' src="https://cdn.pixabay.com/photo/2012/04/11/10/24/arrow-27324__340.png" alt="" /></button>
         </Link>

          </div>
        
          <div className="col-2">
             <img className='bgimage ' src="https://images.unsplash.com/photo-1522079185018-c7dfc98897c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80" alt="" />
          <div className="color-box">
          <div className="color-box">
          <div className="color-box">
          </div>
          </div>
          </div>
          <div className="color-box2">
          </div>
          
          </div>
        </div>
        <div className="social-links flex md:gap-4 mb-6">
          <div className='hover:bg-blue-600 text-[blue] hover:text-white border rounded-full shadow-lg text-2xl p-2 border-gray-300 cursor-pointer'><AiFillFacebook/></div>
          <div className='hover:bg-[#212121]  hover:outline-[#B4003A]  hover:text-white border rounded-full shadow-lg text-2xl p-2 border-gray-300 cursor-pointer'><FaTiktok/></div>
          <div className='border text-[red] hover:text-white hover:bg-[red] rounded-full shadow-lg text-2xl p-2 border-gray-300 cursor-pointer'><AiFillYoutube /></div>
          <div className='border text-[green] hover:text-white hover:bg-[green] rounded-full shadow-lg text-2xl p-2 border-gray-300 cursor-pointer'><AiOutlineWhatsApp/></div>
        </div>
      </div> */}
      <div>
      
     <Carousel autoplay='true' loop='true'    className="rounded-sm overflow-x-hidden">
     
       <div className="relative h-[400] md:h-[550px]">
         <img
           src="https://images.unsplash.com/photo-1648301033733-44554c74ec50?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
           alt="image 2"
           className="h-[400] w-full md:h-[550px] object-cover"
         />
         <div className="absolute inset-0 grid h-[400] md:h-[550px] items-center bg-black/75">
           <div className="w-3/4 pl-12 md:w-2/4 md:pl-20 lg:pl-32">
             <Typography
               variant="h1"
               color="white"
               className="mb-4 text-3xl md:text-4xl lg:text-5xl"
             >
               Le Pamus Residency
             </Typography>
             <Typography
               variant="lead"
               color="white"
               className="mb-12 opacity-80"
             >
               It is not so much for its beauty that the forest makes a claim
               upon men&apos;s hearts, as for that subtle something, that
               quality of air that emanation from old trees, that so
               wonderfully changes and renews a weary spirit.
             </Typography>
             <div className="flex gap-2">
             <Link to={'/booking'}>
               <Button size="lg" color="white">
                 Book now
               </Button>
               </Link>
               <Link to={'/contactus'}>
               <Button size="lg" className='flex gap-1 opacity-80 items-center font-bold' color="white" variant="lead">
                 <span><AiOutlinePhone className='text-[brown] text-xl'/></span>  <span>Call/Contact Us</span>
               </Button>
               </Link>
             </div>
           </div>
         </div>
       </div>
       <div className="relative h-[400] md:h-[550px]">
         <img
           src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80"
           alt="image 2"
           className="h-[400] w-full md:h-[550px] object-cover"
         />
         <div className="absolute inset-0 grid h-[400] md:h-[550px] items-center bg-black/75">
           <div className="w-3/4 pl-12 md:w-2/4 md:pl-20 lg:pl-32">
             <Typography
               variant="h1"
               color="white"
               className="mb-4 text-3xl md:text-4xl lg:text-5xl"
             >
               Le Pamus Residency
             </Typography>
             <Typography
               variant="lead"
               color="white"
               className="mb-12 opacity-80"
             >
               It is not so much for its beauty that the forest makes a claim
               upon men&apos;s hearts, as for that subtle something, that
               quality of air that emanation from old trees, that so
               wonderfully changes and renews a weary spirit.
             </Typography>
             <div className="flex gap-2">
             <Link to={'/booking'}>
               <Button size="lg" color="white">
                 Book now
               </Button>
               </Link>
               <Link to={'/contactus'}>
               <Button size="lg" className='flex gap-1 opacity-80 items-center font-bold' color="white" variant="lead">
                 <span><AiOutlinePhone className='text-[brown] text-xl'/></span>  <span>Call/Contact Us</span>
               </Button>
               </Link>
             </div>
           </div>
         </div>
       </div>
       
       <div className="relative h-[400] md:h-[550px]">
         <img
           src="https://images.unsplash.com/photo-1519973759984-cf5a6c557cd8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80"
           alt="image 3"
           className="h-[400] w-full md:h-[550px] object-cover"
         />
         <div className="absolute inset-0 grid h-[400] md:h-[550px] items-end bg-black/75">
           <div className="w-3/4 pl-12 pb-12 md:w-2/4 md:pl-20 md:pb-20 lg:pl-32 lg:pb-32">
             <Typography
               variant="h1"
               color="white"
               className="mb-4 text-3xl md:text-4xl lg:text-5xl"
             >
             Le Pamus Residency
             </Typography>
             <Typography
               variant="lead"
               color="white"
               className="mb-12 opacity-80"
             >
               It is not so much for its beauty that the forest makes a claim
               upon men&apos;s hearts, as for that subtle something, that
               quality of air that emanation from old trees, that so
               wonderfully changes and renews a weary spirit.
             </Typography>
             <div className="flex gap-2">
             <Link to={'/booking'}>
               <Button size="lg" color="white">
                 Book now
               </Button>
               </Link>
               <Link to={'/contactus'}>
               <Button size="lg" className='flex gap-1 opacity-80 items-center font-bold' color="white" variant="lead">
                 <span><AiOutlinePhone className='text-[brown] text-xl'/></span>  <span>Call/Contact Us</span>
               </Button>
               </Link>
             </div>
           </div>
         </div>
       </div>
       <div className="relative h-[400] md:h-[550px]">
         <img
           src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
           alt="image 3"
           className="h-[400] w-full md:h-[550px] object-cover"
         />
         <div className="absolute inset-0 grid h-[400] md:h-[550px] items-end bg-black/75">
           <div className="w-3/4 pl-12 pb-12 md:w-2/4 md:pl-20 md:pb-20 lg:pl-32 lg:pb-32">
             <Typography
               variant="h1"
               color="white"
               className="mb-4 text-3xl md:text-4xl lg:text-5xl"
             >
             Le Pamus Residency
             </Typography>
             <Typography
               variant="lead"
               color="white"
               className="mb-12 opacity-80"
             >
               It is not so much for its beauty that the forest makes a claim
               upon men&apos;s hearts, as for that subtle something, that
               quality of air that emanation from old trees, that so
               wonderfully changes and renews a weary spirit.
             </Typography>
             <div className="flex gap-2">
             <Link to={'/booking'}>
               <Button size="lg" color="white">
                 Book now
               </Button>
               </Link>
               <Link to={'/contactus'}>
               <Button size="lg" className='flex gap-1 opacity-80 items-center font-bold' color="white" variant="lead">
                 <span><AiOutlinePhone className='text-[brown] text-xl'/></span>  <span>Call/Contact Us</span>
               </Button>
               </Link>
             </div>
           </div>
         </div>
       </div>
       <div className="relative h-[400] md:h-[550px]">
         <img
           src="https://images.unsplash.com/photo-1507537509458-b8312d35a233?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
           alt="image 3"
           className="h-[400] w-full md:h-[550px] object-cover"
         />
         <div className="absolute inset-0 grid h-[400] md:h-[550px] items-end bg-black/75">
           <div className="w-3/4 pl-12 pb-12 md:w-2/4 md:pl-20 md:pb-20 lg:pl-32 lg:pb-32">
             <Typography
               variant="h1"
               color="white"
               className="mb-4 text-3xl md:text-4xl lg:text-5xl"
             >
             Le Pamus Residency
             </Typography>
             <Typography
               variant="lead"
               color="white"
               className="mb-12 opacity-80"
             >
               It is not so much for its beauty that the forest makes a claim
               upon men&apos;s hearts, as for that subtle something, that
               quality of air that emanation from old trees, that so
               wonderfully changes and renews a weary spirit.
             </Typography>
             <div className="flex gap-2">
             <Link to={'/booking'}>
               <Button size="lg" color="white">
                 Book now
               </Button>
               </Link>
               <Link to={'/contactus'}>
               <Button size="lg" className='flex gap-1 opacity-80 items-center font-bold' color="white" variant="lead">
                 <span><AiOutlinePhone className='text-[brown] text-xl'/></span>  <span>Call/Contact Us</span>
               </Button>
               </Link>
             </div>
           </div>
         </div>
       </div>
       <div className="relative h-[400] md:h-[550px]">
         <img
           src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
           alt="image 3"
           className="h-[400] w-full md:h-[550px] object-cover"
         />
         <div className="absolute inset-0 grid h-[400] md:h-[550px] items-end bg-black/75">
           <div className="w-3/4 pl-12 pb-12 md:w-2/4 md:pl-20 md:pb-20 lg:pl-32 lg:pb-32">
             <Typography
               variant="h1"
               color="white"
               className="mb-4 text-3xl md:text-4xl lg:text-5xl"
             >
             Le Pamus Residency
             </Typography>
             <Typography
               variant="lead"
               color="white"
               className="mb-12 opacity-80"
             >
               It is not so much for its beauty that the forest makes a claim
               upon men&apos;s hearts, as for that subtle something, that
               quality of air that emanation from old trees, that so
               wonderfully changes and renews a weary spirit.
             </Typography>
             <div className="flex gap-2">
             <Link to={'/booking'}>
               <Button size="lg" color="white">
                 Book now
               </Button>
               </Link>
               <Link to={'/contactus'}>
               <Button size="lg" className='flex gap-1 opacity-80 items-center font-bold' color="white" variant="lead">
                 <span><AiOutlinePhone className='text-[brown] text-xl'/></span>  <span>Call/Contact Us</span>
               </Button>
               </Link>
             </div>
           </div>
         </div>
       </div>
     </Carousel>
  
      </div>
    </div>
  )
}

export default Home