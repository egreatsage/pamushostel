import React from 'react'
import { AiOutlinePhone } from 'react-icons/ai';
import { Link } from 'react-router-dom'
import { Carousel, Typography, Button } from "@material-tailwind/react";
export default function Carosel() {
  return (
    <div>
         <Carousel autoplay loop   className="rounded-sm overflow-x-hidden">
       <div className="relative h-[400] md:h-[550px] md:mt-0 mt-16  ">
         <img
           src="https://images.unsplash.com/photo-1648301033733-44554c74ec50?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
           alt="image 2"
           className="h-[400] w-full md:h-[550px] object-cover"
         />
         <div className="absolute inset-0 grid h-[400] md:h-[550px] items-center bg-black/75">
           <div className="w-3/4  ml-2 md:w-2/4 md:pl-20 lg:pl-32">
             <Typography
               variant="h1"
               color="white"
               className="mb-4 text-3xl md:text-4xl lg:text-5xl text-[orange] font-extrabold font-sans"
             >
               Le Pamus Residency
             </Typography>
             <Typography
               variant="lead"
               color="white"
               className="mb-12 opacity-80"
             >
             Affordable Hostel facility for Students
             </Typography>
             <div className="flex gap-2">
             <Link to={'/signin'}>
               <Button  className='px-7 py-4 ' color="white">
                 Book now
               </Button>
               </Link>
               <Link to={'/contactus'}>
               <Button  className='flex gap-1 opacity-90 px-7 py-4 items-center font-bold' color="white" variant="lead">
                 <span><AiOutlinePhone className='text-[brown] text-lg'/></span>  <span>Call/Contact Us</span>
               </Button>
               </Link>
             </div>
           </div>
         </div>
       </div>
       <div className="relative h-[400] md:h-[550px] md:mt-0 mt-16  ">
         <img
           src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80"
           alt="image 2"
           className="h-[400] w-full md:h-[550px] object-cover"
         />
         <div className="absolute inset-0 grid h-[400] md:h-[550px] items-center bg-black/75">
           <div className="w-3/4  ml-2 md:w-2/4 md:pl-20 lg:pl-32">
             <Typography
               variant="h1"
               color="white"
               className="mb-4 text-3xl md:text-4xl lg:text-5xl text-[orange] font-extrabold font-sans"
             >
               Le Pamus Residency
             </Typography>
             <Typography
               variant="lead"
               color="white"
               className="mb-12 opacity-80"
             >
             Affordable Hostel facility for Students
             </Typography>
             <div className="flex gap-2">
             <Link to={'/signin'}>
               <Button  className='px-7 py-4 ' color="white">
                 Book now
               </Button>
               </Link>
               <Link to={'/contactus'}>
               <Button  className='flex gap-1 opacity-90 px-7 py-4 items-center font-bold' color="white" variant="lead">
                 <span><AiOutlinePhone className='text-[brown] text-lg'/></span>  <span>Call/Contact Us</span>
               </Button>
               </Link>
             </div>
           </div>
         </div>
       </div>
       <div className="relative h-[400] md:h-[550px] md:mt-0 mt-16  ">
         <img
           src="https://images.unsplash.com/photo-1519973759984-cf5a6c557cd8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80"
           alt="image 2"
           className="h-[400] w-full md:h-[550px] object-cover"
         />
         <div className="absolute inset-0 grid h-[400] md:h-[550px] items-center bg-black/75">
           <div className="w-3/4  ml-2 md:w-2/4 md:pl-20 lg:pl-32">
             <Typography
               variant="h1"
               color="white"
               className="mb-4 text-3xl md:text-4xl lg:text-5xl text-[orange] font-extrabold font-sans"
             >
               Le Pamus Residency
             </Typography>
             <Typography
               variant="lead"
               color="white"
               className="mb-12 opacity-80"
             >
             Affordable Hostel facility for Students
             </Typography>
             <div className="flex gap-2">
             <Link to={'/signin'}>
               <Button  className='px-7 py-4 ' color="white">
                 Book now
               </Button>
               </Link>
               <Link to={'/contactus'}>
               <Button  className='flex gap-1 opacity-90 px-7 py-4 items-center font-bold' color="white" variant="lead">
                 <span><AiOutlinePhone className='text-[brown] text-lg'/></span>  <span>Call/Contact Us</span>
               </Button>
               </Link>
             </div>
           </div>
         </div>
       </div>
       <div className="relative h-[400] md:h-[550px] md:mt-0 mt-16  ">
         <img
           src="https://images.unsplash.com/photo-1460518451285-97b6aa326961?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
           alt="image 2"
           className="h-[400] w-full md:h-[550px] object-cover"
         />
         <div className="absolute inset-0 grid h-[400] md:h-[550px] items-center bg-black/75">
           <div className="w-3/4  ml-2 md:w-2/4 md:pl-20 lg:pl-32">
             <Typography
               variant="h1"
               color="white"
               className="mb-4 text-3xl md:text-4xl lg:text-5xl text-[orange] font-extrabold font-sans"
             >
               Le Pamus Residency
             </Typography>
             <Typography
               variant="lead"
               color="white"
               className="mb-12 opacity-80"
             >
             Affordable Hostel facility for Students
             </Typography>
             <div className="flex gap-2">
             <Link to={'/signin'}>
               <Button  className='px-7 py-4 ' color="white">
                 Book now
               </Button>
               </Link>
               <Link to={'/contactus'}>
               <Button  className='flex gap-1 opacity-90 px-7 py-4 items-center font-bold' color="white" variant="lead">
                 <span><AiOutlinePhone className='text-[brown] text-lg'/></span>  <span>Call/Contact Us</span>
               </Button>
               </Link>
             </div>
           </div>
         </div>
       </div>
       <div className="relative h-[400] md:h-[550px] md:mt-0 mt-16  ">
         <img
           src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
           alt="image 2"
           className="h-[400] w-full md:h-[550px] object-cover"
         />
         <div className="absolute inset-0 grid h-[400] md:h-[550px] items-center bg-black/75">
           <div className="w-3/4  ml-2 md:w-2/4 md:pl-20 lg:pl-32">
             <Typography
               variant="h1"
               color="white"
               className="mb-4 text-3xl md:text-4xl lg:text-5xl text-[orange] font-extrabold font-sans"
             >
               Le Pamus Residency
             </Typography>
             <Typography
               variant="lead"
               color="white"
               className="mb-12 opacity-80"
             >
             Affordable Hostel facility for Students
             </Typography>
             <div className="flex gap-2">
             <Link to={'/signin'}>
               <Button  className='px-7 py-4 ' color="white">
                 Book now
               </Button>
               </Link>
               <Link to={'/contactus'}>
               <Button  className='flex gap-1 opacity-90 px-7 py-4 items-center font-bold' color="white" variant="lead">
                 <span><AiOutlinePhone className='text-[brown] text-lg'/></span>  <span>Call/Contact Us</span>
               </Button>
               </Link>
             </div>
           </div>
         </div>
       </div>
     </Carousel>
    </div>
  )
}
