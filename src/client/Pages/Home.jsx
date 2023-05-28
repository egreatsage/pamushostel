import React  from 'react'
import { AiOutlinePhone } from 'react-icons/ai';
import { Link } from 'react-router-dom'
import { Carousel, Typography, Button } from "@material-tailwind/react";
import Navbar from '../Components/Navbar'
const Home = () => {
  return (
    <div>
     <Navbar/>
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
             Affordable Hostel facilites for Students
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
             Affordable Hostel facilites for Students
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
             Affordable Hostel facilites for Students
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
             Affordable Hostel facilites for Students
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
             Affordable Hostel facilites for Students
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
             Affordable Hostel facilites for Students
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