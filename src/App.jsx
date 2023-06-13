
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Booking from './client/Pages/Booking'
import ContactUs from './client/Pages/ContactUs'
import Home from './client/Pages/Home'
import Login from './client/Pages/Login'
import SignUp from './client/Pages/SignUp'
import SNotices from './client/Pages/SNotices'
import StudentProfile from './client/Pages/StudentProfile'
import Reply from './client/Pages/Reply'
import ForgotPassword from './Common/ForgotPassword'
import HostellarPr from './Routes/HostellarPr'
import AdminPr from './Routes/AdminPr'
import Rules from './client/Pages/Rules'
import Dashboard from './Admin/Pages/Dashboard'
import Occupants from './Admin/Pages/Occupants'
import Bookings from './Admin/Pages/Bookings'
import { useState } from 'react'
import UserLogin from './client/Pages/UserLogin'
import UserSignUp from './client/Pages/UserSignUp'
import MyProfile from './Common/MyProfile'
import SignIn from './client/Pages/SignIn'
import MessageAdmin from './client/Pages/MessageAdmin'
import MessageStudent from './Admin/Pages/MessageStudent'
import Rooms from './Admin/Pages/Rooms'
import Adminprofile from './Admin/Components/Adminprofile'
import PaymentStuff from './Admin/Components/PaymentStuff'
import Allotment from './Admin/Pages/Allotment'
function App() {
  const [bookingId, setBookingId] = useState('');
  const [occupantId, setOccupantId] = useState('');
  const [roomId, setRoomId] = useState('');
  const getOccupantHandler = (id)=>{
    setOccupantId(id);
  }
  const getBookingIdHandler=(id) =>{
    setBookingId(id);
  }  
  const getRoomIdHandler=(id) =>{
    setRoomId(id);
  }  
  return (
  <div className=' overflow-hidden'>
    
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/contactus' element={<ContactUs/>}/>
          <Route path='/studentprofile' element={
          <HostellarPr><StudentProfile/></HostellarPr> }/>
          <Route path='/booking' element={
          <HostellarPr><Booking/></HostellarPr>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/rooms' element={<Rooms id={roomId} setRoomId={setRoomId} getRoomId={getRoomIdHandler}/>}/>
          <Route path='/userlogin' element={<UserLogin/>}/>
          <Route path='/usersignup' element={<UserSignUp/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/allotment' element={<Allotment/>}/>
          <Route path='/dashboard' element={<Dashboard/> }/>
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
          <Route path='/notices' element={<SNotices/>}/>
          <Route path='/reply' element={<Reply/>}/>
          <Route path='/messagestudent' element={<MessageStudent/>}/>
          <Route path='/messageadmin' element={<MessageAdmin/>}/>
          <Route path='/rules' element={<Rules/>}/>
          <Route path='/myprofile' element={<MyProfile/>}/>
          <Route path='/occupants' element={<Occupants  id={occupantId} setOccupantId={setOccupantId} getOccupantId={getOccupantHandler} />}/>
      
          <Route path='/paymentstuff' element={<PaymentStuff/>}/>
          <Route path='/adminprofile' element={<Adminprofile/>}/>
          <Route path='/bookings' element={ <Bookings getBookingId={getBookingIdHandler}/>}/>
         
        
       
        </Routes>
     

        
  </div>
  
  )
}

export default App
