
// import { Button, Input} from '@material-tailwind/react';
// import { Alert, Modal, Typography } from '@mui/material';
// import { Box } from '@mui/system';
// import React,{useState,useEffect} from 'react'
// import {useUserAuth} from '../../../Context/UserAuthContext'
// import dbdataservice from '../../../Operations';
// import Profile from '../../../Common/Profile';
// import Navbar from '../../Components/Navbar';
// const StaffProfile = () => {
//     const { user} = useUserAuth();
//     const [staffs, setStaff] = useState([]);
//     const [message, setmessage] = useState();
//     const [idee, setIdee] = useState()
//     const [fullname, setfullname] = useState()
//     const [phonenumber, setphonenumber] = useState()
//     const [category, setcategory] = useState()
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         let userId = user.uid;
//         setmessage("");
//         if (fullname === "" || phonenumber === "") {
//           setmessage({ error: true, msg: "All fields are mandatory!" });
//           return;
//         }
//         const newStaff = {
//          fullname,phonenumber,category,userId,idee
//         };
//         console.log(newStaff);
//         try {
//             await dbdataservice.addStaff(newStaff);
//             setmessage({ error: false, msg: "New Details added successfully!" });
  
//             setTimeout(() => {
//               // eslint-disable-next-line no-restricted-globals
//               location.reload()
//           }, 500);
//         } catch (err) {
//           setmessage({ error: true, msg: err.message });
//         } 
//       };
//       let userId = user.uid;
//     useEffect(() => {
//         getAllStaff();
//     }, []);

//     const getAllStaff = async () => {
//         const data = await dbdataservice.getAllStaff();
//         setStaff(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//     };
    
//       const [open, setOpen] = React.useState(false);
//       const handleOpen = () => setOpen(true);
//       const handleClose = () => setOpen(false);
//       const style = {
//         position: 'absolute',
//         top: '50%',
//         left: '50%',
//         transform: 'translate(-50%, -50%)',
//         bgcolor: 'white',
//         border: '2px solid #white',
//         boxShadow: 24,
//         p: 4,
//       };
//   return (
//     <div>
//       <div className="mb-12">
//         <Navbar/>
//       </div>
//      <div className='md:px-3 pt-6 rounded-md '>
//         <div className="flex justify-between mb-3">
//             <div> New Umployee ?<Button variant='text' className='py-2 hover:underline  text-black hover:text-black' onClick={handleOpen}>Add Your Details</Button></div>  
//                 <div className=''>
                 
//                   <Profile/>
//                 </div>
//               </div>
          
//      {staffs?.filter((staff) => staff.userId === userId).map((doc, index) => {
//             return(
//                 <div className='shadow-lg py-6 mt-12'>
//                        <div className='flex justify-center md:p-9 md:'>
//                       <div>
//                     <h1 className='uppercase font-bold'>Staff Details</h1>
//                  </div>
//           </div>
//           <div className='md:pl-9 pl-5'>
//         <div className="flex gap-2 justify-start">
         
//         </div>
//             <div className='flex py-5 px-5'>
//                 <h1>Full Name: <span className='pl-2 font-bold text-gray-800'>{doc.fullname}</span></h1>
//             </div>
//             <div className='flex py-5 px-5'>
//                 <h1>Phone Number : <span className='pl-2 font-bold text-gray-800'>{doc.phonenumber}</span></h1>
//             </div>
//             <div className='flex py-5 px-5'>
//                 <h1>Email : <span className='pl-2 font-bold text-gray-800'>{user && user.email}</span></h1>
//             </div>
//             <div className='flex py-5 px-5'>
//                 <h1>Staff Category : <span className='pl-2 font-bold text-gray-800'>{doc.category}</span></h1>
//             </div>
          
//           </div>
//                 </div>
//          )
//         })}
//         {/* Add Staff Details */}
//         <div>
//         <div>
    
//       <Modal className=' px-3 md:px-9'
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style} className='w-full px-3 '>
//         {message?.msg && (
         
//          <Alert 
//  color={message?.error?'error' :'info'}
//  onClose={()=> setmessage('')}
//  dismissible='true'
//  >
//    {''}
//    {message?.msg}
//  </Alert>
// )} 
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//            Add Your Details
//           </Typography>
//           <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//            <div >
//              <form onSubmit={handleSubmit} className='md:mx-32' >
//                 <div className='mb-5'>
//                 <Input variant='standard' className='px-2' color='teal'  label='Full Name' type='name'
//                   value={fullname} 
//                   onChange={(e)=>setfullname(e.target.value)}
//                   />
//                 </div>
//                 <div className='mb-5'>
//                 <Input   variant='standard' className='px-2' color='teal'  label='Phone Number' type='name'
//                   value={phonenumber} 
//                   onChange={(e)=>setphonenumber(e.target.value)}
//                   />
//                 </div>
//                 <div className='mb-5'>
//                 <Input   variant='standard' className='px-2' color='teal'  label='Identification number(ID)' type='name'
//                   value={idee} 
//                   onChange={(e)=>setIdee(e.target.value)}
//                   />
//                 </div>
                
//                 <div className='mb-5'>
//                 <Input   variant='standard' className='px-2' color='teal'  label='Work Position'  type='name'
//                  value={category} 
//                  onChange={(e)=>setcategory(e.target.value)}
//                  />
//                 </div>
//                    <div className=' flex justify-end'>
//                         <Button type='submit' className='py-2 bg-blue-600 text-white'>Submit</Button>                                                                                                 
//                    </div>
//              </form>
//            </div>
//           </Typography>
//         </Box>
//       </Modal>
//     </div>
//         </div>
//     </div>
//     </div>
   
//   )
// }

// export default StaffProfile