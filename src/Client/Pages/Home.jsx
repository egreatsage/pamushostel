import React, { useEffect, useState } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
 
import {Link} from 'react-router-dom'
import Slider from './Slider';
import { motion } from 'framer-motion';
import dbdataservice from '../../Operations'
import { FcWiFiLogo} from 'react-icons/fc'
import { GiWaterTank,GiSecurityGate } from 'react-icons/gi'
import Navbarr from '../Components/Navbar';


const Home = () => {
 
  const [roomtypes,setRoomTypes] = useState([]);
  useEffect(() => {
    getAllRoomTypes();
  }, []);
  const getAllRoomTypes = async () => {
    const data = await dbdataservice.getAllRoomTypes();
    setRoomTypes(data.docs.map((doc) => ({ ...doc.data(),
      id: doc.id })));
  };
  if (document.getElementById('nav-mobile-btn')) {
    document.getElementById('nav-mobile-btn').addEventListener('click', function () {
        if (this.classList.contains('close')) {
            document.getElementById('nav').classList.add('hidden');
            this.classList.remove('close');
        } else {
            document.getElementById('nav').classList.remove('hidden');
            this.classList.add('close');
        }
    });
}

  return (
   <div className='overflow overflow-hidden'>  
              <div className='fixed top-2 z-10 w-full'>
    <Navbarr/>
    </div>
            <div className='mt-10 md:mt-16'>  
            <div className="mx-1" id="home">
            <div className='grid md:grid-cols-2  bg-[#e1f7fc] md:mt-6 md:mb-16 mt-6 mb-20'>
             <div className='md:mt-9 pt-9 '>
                <p className='flex justify-center text-4xl md:text-5xl extrabold md:justify-start mb-5 md:ml-12'>Pamus Hostels</p>
                 <p className='ml-2 md:ml-4 text-2xl mb-4 bold leading-tight text-gray-800'>Are you a student and needs a place to stay,Dont Worry,we got you covered</p>
                 <p className=' ml-2 md:ml-4 text-2xl mb-5 italic bold leading-tight text-gray-800'>A safe ,secure and satisfactory place to stay</p>
                 <Link to='/booking'>
                 <span className='ml-2 md:ml-4'>
                  <button className='bg-[indigo] hover:px-7 hover:shadow-md transition-transform ease-in-out hover:rounded-r-lg mb-4 px-5 py-1 rounded-md text-white '>Book Now </button></span>
                 </Link>     
             </div>
             <div>
           <Slider/>
             </div>
        </div>
       </div>
        <div className="md:mt-6 mt-6 mx-1" id="aboutus">
         <div>
             <div className='md:mt-10 mt-5'>
             <motion.section className="class" id="AboutUs"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}>
  <div className='w-full md:my-15 overflow-hidden' >
    <div className=' max-w-[1240px] mx-auto'>
      <div className=' text-center '>
        <h2 className='md:text-4xl text-3xl font-bold '>Trusted Hostels With A good Reputation</h2>
        <p className='md:text-3xl text-xl py-6 text-gray-5 '>We have partners and students all around town who are staying at the hostels 
          from all over the town
        </p>
      </div>
      <div className='grid md:grid-cols-3 gap-1 px-2 text-center cursor-pointer'>
        <div className='border py-8 rounded-xl px-2 text-center hover:shadow-md'>
          <p className='text-6xl font-bold text-indigo-600 '>100+</p>
          <p className='text-gray-400 mt-2'>Students</p>
        </div>
        <div className='border py-8 rounded-xl px-2 text-center hover:shadow-md'>
          <p className='text-6xl font-bold text-indigo-600'>15+</p>
          <p className='text-gray-400 mt-2>Students'>Partners</p>
        </div>
        <div className='border py-8 rounded-xl px-2 text-center hover:shadow-md'>
          <p className='text-6xl font-bold text-indigo-600'>20+</p>
          <p className='text-gray-400 mt-2>Institutions'>Institutions</p>
        </div>
      </div>
    </div>
   </div>
  </motion.section>
             </div>
    
    
       
        </div>
        </div>
       <div className="my-24" id="amenities">
         <h1 className='mb-6 text-3xl extrabold uppercase text-center tracking-wide'>Amenities</h1>
           <div className="grid md:grid-cols-3 gap-2">
           <div className='bg-white rounded-sm shadow-sm border'>
              <div className='p-8'>
                <GiWaterTank className=' w-16 cursor-pointer text-7xl text-[blue] mt-[-4rem]' />
                <h3 className='font-bold text-2xl my-6'>Water </h3>
                <p className='text-gray-600 text-xl'> privately owned water 
                pumped within the Hostel with a water bowhole as a backup
                </p>
              </div>
             
            </div>
            <div className='bg-white rounded-sm shadow-sm border'>
              <div className='p-8'>
                <FcWiFiLogo className=' w-16 cursor-pointer text-7xl text-[blue] mt-[-4rem]' />
                <h3 className='font-bold text-2xl my-6'>Wifi </h3>
                <p className='text-gray-600 text-xl'>Fast internet wifi speeds
                Fast internet wifi speeds
                Fast internet wifi speeds
                </p>
              </div>
             
            </div>
            <div className='bg-white rounded-sm shadow-sm border'>
              <div className='p-8'>
                <GiSecurityGate className=' w-16 cursor-pointer text-7xl text-[blue] mt-[-4rem]' />
                <h3 className='font-bold text-2xl my-6'>Security </h3>
                <p className='text-gray-600 text-xl'>  24hrs Security guard from certified company .Fully fenced with only main gate
                  back gate opened
                </p>
              </div>
             
            </div>
           </div>
       </div>
       <div className='md:my-24 my-14' id='pricing'>
       <section className='' id='Pricing'>
       <div>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:ml-10 md:mx-4">
       <Card className="md:w-100 w-full mb-6 mt-3">
      <CardHeader color="white" className="relative h-56">
        <img
          src="https://images.pexels.com/photos/1571450/pexels-photo-1571450.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="img-blur-shadow"
          className="h-full w-full"
        />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h5" className="mb-2">
         Single Rooms
        </Typography>
        <Typography>
        <div><p>  Singel bathroom</p></div>
        <div><p> Single Toilet</p></div>
        </Typography>
      </CardBody>
      <CardFooter divider className="flex items-center justify-between py-3">
        <Typography variant="small">Ksh 6000</Typography>
        <Typography variant="small" color="gray" className="flex gap-1">
          <Link to='/booking'>
                      <button className='shadow-md font-bold hover:bg-gray-100 hover:text-black hover:shadow-lg px-4 py-2 rounded-full'>Book Now</button>
          </Link>
        </Typography>
      </CardFooter>
    </Card>
    <Card className="md:w-100 w-full mb-6 mt-3">
      <CardHeader color="white" className="relative h-56">
        <img
          src="https://media.istockphoto.com/id/648656476/pl/zdj%C4%99cie/czysty-pok%C3%B3j-w-hostelu-z-drewnianymi-%C5%82%C3%B3%C5%BCkami-pi%C4%99trowymi.jpg?s=612x612&w=0&k=20&c=HI6x9VNcXccKJ1QE6BkSq8E0lvJw8bTrACJdh2h9kGE="
          alt="img-blur-shadow"
          className="h-full w-full"
        />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h5" className="mb-2">
          2 Sharing
        </Typography>
        <Typography>
          Bathroom and Toilet Sharing
        </Typography>
      </CardBody>
      <CardFooter divider className="flex items-center justify-between py-3">
        <Typography variant="small">Ksh 4000 /head</Typography>
        <Typography variant="small" color="gray" className="flex gap-1">
        <Link to='/booking'>
                      <button className='shadow-md font-bold hover:bg-gray-100 hover:text-black hover:shadow-lg px-4 py-2 rounded-full'>Book Now</button>
          </Link>
        </Typography>
      </CardFooter>
    </Card>
    <Card className="md:w-100 w-full mb-6 mt-3">
      <CardHeader color="white" className="relative h-56">
        <img
          src="https://i.pinimg.com/564x/f7/48/ff/f748ffa862c97b30825e198d81286d0d--shared-boys-rooms-rooms-for-kids.jpg"
          alt="img-blur-shadow"
          className="h-full w-full"
        />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h5" className="mb-2">
          4 Sharing
        </Typography>
        <Typography>
       Bathroom and Toilet Sharing
        </Typography>
      </CardBody>
      <CardFooter divider className="flex items-center justify-between py-3">
        <Typography variant="small">Ksh 3000/ head</Typography>
        <Typography variant="small" color="gray" className="flex gap-1">
        <Link to='/booking'>
                      <button className='shadow-md font-bold hover:bg-gray-100 hover:text-black hover:shadow-lg px-4 py-2 rounded-full'>Book Now</button>
          </Link>
        </Typography>
      </CardFooter>
    </Card>
      <Card className="md:w-100 w-full mb-6 mt-3">
      <CardHeader color="white" className="relative h-56">
        <img
          src="https://thumbs.dreamstime.com/b/backpackers-stay-hotel-modern-double-decker-beds-inside-dorm-room-twelve-people-window-bedroom-youth-hostel-145333314.jpg"
          alt="img-blur-shadow"
          className="h-full w-full"
        />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h5" className="mb-2">
        6 sharing
        </Typography>
        <Typography>
        Bathroom And Toilet Sharing
        </Typography>
      </CardBody>
      <CardFooter divider className="flex items-center justify-between py-3">
        <Typography variant="small">Ksh 2000/ per head</Typography>
        <Typography variant="small" color="gray" className="flex gap-1">
        <Link to='/booking'>
                      <button className='shadow-md font-bold hover:bg-gray-100 hover:text-black hover:shadow-lg px-4 py-2 rounded-full'>Book Now</button>
          </Link>
        </Typography>
      </CardFooter>
    </Card>
       </div>
      </div>
           </section>
       </div>
       <div className='md:my-24 my-14' id="testimonials">
    <div>
      <h2  className='text-center text-3xl font-bold text-gray-900 mb-4'>What People Say About Us</h2>
          <div id="carouselExampleCaptions" className="carousel slide relative carousel-dark" data-bs-ride="carousel">
  <div  className="carousel-inner relative w-full overflow-hidden">
    <div className="carousel-item active relative float-left w-full text-center">
      <p className="text-xl italic mx-auto text-gray-700 max-w-4xl">
      One of the best hostel arounds and the most clean with a breathable environment
      </p>
      <div className="mt-12 mb-6 flex justify-center">
        <img
          src="https://images.unsplash.com/photo-1597393922738-085ea04b5a07?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmVhdXRpZnVsJTIwYmxhY2slMjB3b21hbnxlbnwwfHwwfHw%3D&w=1000&q=80"
          className="rounded-full w-24 h-24 shadow-lg"
          alt=""
        />
      </div>
      <p className="text-gray-500">- Anna Morian</p>
    </div>
    <div className="carousel-item relative float-left w-full text-center">
      <p className="text-xl italic mx-auto text-gray-700 max-w-4xl">
       I was able to make meaningfull connections with important people and now am happy as i got my job easily from friends there
      </p>
      <div className="mt-12 mb-6 flex justify-center">
        <img
          src="https://nudebabes.realnakedgirls.net/wp-content/uploads/2018/02/rng_fsjdk-1.jpg"
          className="rounded-full w-24 h-24 shadow-lg"
          alt=""
        />
      </div>
      <p className="text-gray-500">- Teresa May</p>
    </div>
    <div className="carousel-item relative float-left w-full text-center">
      <p className="text-xl italic mx-auto text-gray-700 max-w-4xl">
      Interactive and Friendly People who are able to give everything you deserve to live comfortable
      </p>
      <div className="mt-12 mb-6 flex justify-center">
        <img
          src="https://i.pinimg.com/736x/96/47/41/9647413af6614f50ffa0cee691658d13.jpg"
          className="rounded-full w-24 h-24 shadow-lg"
          alt=""
        />
      </div>
      <p className="text-gray-500">- Iman ali</p>
    </div>
  </div>
  <button
    className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
    type="button"
    data-bs-target="#carouselExampleCaptions"
    data-bs-slide="prev"
  >
    <span className="carousel-control-prev-icon inline-block bg-no-repeat" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button
    className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
    type="button"
    data-bs-target="#carouselExampleCaptions"
    data-bs-slide="next"
  >
    <span className="carousel-control-next-icon inline-block bg-no-repeat" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
    </div>
    </div>
</div>
   </div>
  )
}

export default Home
