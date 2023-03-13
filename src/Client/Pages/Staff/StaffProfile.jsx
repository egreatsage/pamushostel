
import {  Input, Button, Dialog, DialogHeader, DialogBody, DialogFooter} from '@material-tailwind/react';
import React,{useState,useEffect, Fragment} from 'react'
import {useUserAuth} from '../../../Context/UserAuthContext'
import dbdataservice from '../../../Operations';
import Profile from '../../../Common/Profile';
import { toast } from 'react-toastify';
import Navbarr from '../../Components/Navbar';

const StaffProfile = () => {
    const { user} = useUserAuth();
    const [staffs, setStaff] = useState([]);
    const [idee, setIdee] = useState()
    const [fullname, setfullname] = useState()
    const [phonenumber, setphonenumber] = useState()
    const [category, setcategory] = useState()
    const handleSubmit = async (e) => {
        e.preventDefault();
        let userId = user.uid;
      
        if (fullname === "" || phonenumber === "") {
          toast.error('All Fields Required')
          return;
        }
        const newStaff = {
         fullname,phonenumber,category,userId,idee
        };
        try {
            await dbdataservice.addStaff(newStaff);
        toast.success("Details Added Successfully")
        } catch (err) {
          toast.error('There was a problem adding new details')
        } 
      };
      let userId = user.uid;
    useEffect(() => {
        getAllStaff();
    }, []);

    const getAllStaff = async () => {
        const data = await dbdataservice.getAllStaff();
        setStaff(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
   
  return (
    <div>
        <div className='fixed top-2 z-10 w-full'>
    <Navbarr/>
    </div>
     <div className='md:px-3 pt-6 rounded-md mt-24 '>
        <div className="flex justify-between mb-3">
            <div> New Umployee ?<Button variant='text' className='py-2 hover:underline  text-black hover:text-black' onClick={handleOpen}>Add Your Details</Button></div>  
                <div className=''>
                 
                  <Profile/>
                </div>
              </div>
          
     {staffs?.filter((staff) => staff.userId === userId).map((doc, index) => {
            return(
                <div className='shadow-lg py-6 mt-12'>
                       <div className='flex justify-center md:p-9 md:'>
                      <div>
                    <h1 className='uppercase font-bold'>Staff Details</h1>
                 </div>
          </div>
          <div className='md:pl-9 pl-5'>
        <div className="flex gap-2 justify-start">
         
        </div>
            <div className='flex py-5 px-5'>
                <h1>Full Name: <span className='pl-2 font-bold text-gray-800'>{doc.fullname}</span></h1>
            </div>
            <div className='flex py-5 px-5'>
                <h1>Phone Number : <span className='pl-2 font-bold text-gray-800'>{doc.phonenumber}</span></h1>
            </div>
            <div className='flex py-5 px-5'>
                <h1>Email : <span className='pl-2 font-bold text-gray-800'>{user && user.email}</span></h1>
            </div>
            <div className='flex py-5 px-5'>
                <h1>Staff Category : <span className='pl-2 font-bold text-gray-800'>{doc.category}</span></h1>
            </div>
          
          </div>
                </div>
         )
        })}
        {/* Add Staff Details */}
       
        
           <Fragment>
      <Dialog
        open={open}
        size='xl'
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Update your details</DialogHeader>
        <DialogBody divider>
        <div >
             <form onSubmit={handleSubmit} className='md:mx-32' >
                <div className='mb-5'>
                <Input variant='standard' className='px-2' color='teal'  label='Full Name' type='name'
                  value={fullname} 
                  onChange={(e)=>setfullname(e.target.value)}
                  />
                </div>
                <div className='mb-5'>
                <Input   variant='standard' className='px-2' color='teal'  label='Phone Number' type='name'
                  value={phonenumber} 
                  onChange={(e)=>setphonenumber(e.target.value)}
                  />
                </div>
                <div className='mb-5'>
                <Input   variant='standard' className='px-2' color='teal'  label='Identification number(ID)' type='name'
                  value={idee} 
                  onChange={(e)=>setIdee(e.target.value)}
                  />
                </div>
                
                <div className='mb-5'>
                <Input   variant='standard' className='px-2' color='teal'  label='Work Position'  type='name'
                 value={category} 
                 onChange={(e)=>setcategory(e.target.value)}
                 />
                </div>
                   <div className=' flex justify-end'>
                        <Button type='submit' className='py-2 bg-blue-600 text-white'>Submit</Button>                                                                                                 
                   </div>
             </form>
           </div>
        </DialogBody>
        <DialogFooter>
             <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
   </div>
   </div>
  )
}

export default StaffProfile