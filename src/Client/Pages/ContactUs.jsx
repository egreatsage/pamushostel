import React, {useRef, useState} from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
 
import {BsTelephoneInbound} from 'react-icons/bs'
import {AiOutlineMail} from 'react-icons/ai'
import {GrMapLocation} from 'react-icons/gr'
import emailjs from '@emailjs/browser'
import dbdataservice from '../../Operations';
import { toast } from 'react-toastify'
import Navbarr from '../Components/Navbar'
import { Link } from 'react-router-dom';
const ContactUs = () => {
    const form = useRef();
    const [fullname, setfullname] = useState('');
    const [messsage, setmesssage] = useState('');
    const [email, setemail] = useState('');
    const handleSubmit = async (e) => {
      const newMessage= {
       fullname,messsage,email     
      };
      try {
          await dbdataservice.addMessage(newMessage);  
          toast.success('Message Sent,Thank you for contacting us')
      } catch (err) {
       toast.error('Error sending message,Thank you for contacting Us')
      }  
    };
    const bothh =(e)=>{
      e.preventDefault();
      sendemail();
      handleSubmit();
    }
    const sendemail =(e)=>{
      emailjs.sendForm(
        "service_sq7odd6",
        "template_iudgy6d",
        form.current, 
        "5W1bmGAvNux2p5tEO"
      )
      .then((result)=>{
       console.log('sent')
      }, (error)=>{
        console.log('try again')
      })
     
    }

  return (
    <div>
          <div className='fixed top-2 z-10 w-full'>
    <Navbarr/>
    </div>
      <div className='grid md:grid-cols-2 mt-36 shadow-lg border my-12 gap-2 mb-8 rounded-md'>
           <div>
              <form ref={form} onSubmit={bothh}
               className='mx-4 my-4 md:border rounded-md'>
                <p className='mt-4 text-center tracking-wider text-xl'>Send Us A Message</p>
                <div className='my-8 md:mx-7'>
                <input className='w-full px-2 border border-white-gray-300 py-2 rounded-md focus:bg-gray-50' type='name' placeholder='Your Name' required
                name='user_name'
                onChange={(e)=>setfullname(e.target.value)}/>
                </div>

                <div className='my-8 md:mx-7'>
                <input className='w-full border px-2 border-white-gray-300 py-2 rounded-md focus:bg-gray-50' type='email' placeholder='Your Email' required
                name='user_email'
                onChange={(e)=>setemail(e.target.value)}/>
                </div>

                <div className='my-8 md:mx-7'>
                <textarea className='w-full border px-2 border-white-gray-300 py-2 rounded-md focus:bg-gray-50' type='name' placeholder='Message' required
                name='subject'
                onChange={(e)=>setmesssage(e.target.value)}/>
                </div>
                <div className='my-8 md:mx-7 flex justify-end'>
                <button  className='bg-gray-600 text-white px-2 py-1  rounded-md hover:bg-gray-900'>Send Message</button>
                </div>
                
               
               
              </form>
           </div>
           <div className='md:mt-20'>
                 <div className='flex my-3'>
                 <BsTelephoneInbound className=' m-3 text-3xl '/>
                 <p className='mt-3 tracking-wider'>+254769375210 | +254722820702</p>
                 </div>
          
           
                 <div className='flex my-3'>
                 <AiOutlineMail className=' m-3 text-3xl '/>
                 <p className='mt-3 tracking-wider'>pamushostel@gmail.com</p>
                 </div>
         
           
                 <div className='flex my-3'>
                 <GrMapLocation className=' m-3 text-3xl '/>
                 <p className='mt-3 tracking-wider'> 1471-50200 
                  Bungoma Township,Railway Station</p>
                  <div>
                    <button>View Map</button>
                  </div>
                 </div>
          
           </div> 
      </div>
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
                      <button className='shadow-md font-bold hover:bg-gray-100 hover:text-black hover:shadow-lg px-4 py-1 rounded-md'>Book Now</button>
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
                      <button className='shadow-md font-bold hover:bg-gray-100 hover:text-black hover:shadow-lg px-4 py-1 rounded-md'>Book Now</button>
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
        <Typography variant="small">$899/night</Typography>
        <Typography variant="small" color="gray" className="flex gap-1">
        <Link to='/booking'>
                      <button className='shadow-md font-bold hover:bg-gray-100 hover:text-black hover:shadow-lg px-4 py-1 rounded-md'>Book Now</button>
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
        <Typography variant="small">$899/night</Typography>
        <Typography variant="small" color="gray" className="flex gap-1">
        <Link to='/booking'>
                      <button className='shadow-md font-bold hover:bg-gray-100 hover:text-black hover:shadow-lg px-4 py-1 rounded-md'>Book Now</button>
          </Link>
        </Typography>
      </CardFooter>
    </Card>
       </div>
      </div>
    </div>
  )
}

export default ContactUs