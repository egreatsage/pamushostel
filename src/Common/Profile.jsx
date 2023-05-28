import { Fragment, useEffect, useState } from "react";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Menu, MenuHandler, MenuList, MenuItem,
} from "@material-tailwind/react";
import { useNavigate } from "react-router";
import { upload } from './Operations';
import { useUserAuth } from "./UserAuthContext";
import { Link } from "react-router-dom";
const Profile = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const [photo,setPhoto] = useState(null)
  
    const [loading,setLoading] = useState(false)
    const [photoURL, setPhotoURL] = useState("https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png")
   
    const handleChange=(e)=> {
       if  ( e.target.files[0]){
        setPhoto(e.target.files[0])
       }
    }
    
    const handleClick=()=> {
       upload(photo,user,setLoading)
    }
    const { user,logOut } = useUserAuth();
    useEffect(() => {
        if (user?.photoURL ) {
            setPhotoURL(user.photoURL)   
            console.log(user.photoURL)
        }
    }, [user])
    const navigate = useNavigate()
    const handlelogout= async ()=>{
        try{
            await logOut();
               navigate('/')
        }catch{     
        }
      }
  return (
    <div>
         <Menu className='overflow-x-hidden'>
      <MenuHandler>
          <button className='rounded-full '>
            <img src={photoURL} alt="Profile" className=' w-8 h-8  object-cover mt-2 rounded-full border border-gray-500 shadow-md'/>
            </button>
      </MenuHandler>
      <MenuList>
        <h1 className='text-center font-bold my-3 mb-4 text-black'>Account Details</h1>
        <MenuItem className='my-2 bold tracking-wide ml-3 hover:bg-gray-100 px-2 rounded-md py-1 text-black'>{user && user.displayName}</MenuItem>
        <MenuItem className='my-2 bold tracking-wide ml-3 hover:bg-gray-100 px-2 rounded-md py-1 text-black'>{user && user.email}</MenuItem>
        <MenuItem  className='my-2 mb-4 bold tracking-wide ml-3 hover:bg-gray-100 px-2 rounded-md py-2 text-black'><button  onClick={handleOpen}>Update Photo</button></MenuItem>
        <MenuItem  className='my-2 mb-4 bold tracking-wide ml-3 hover:bg-gray-100 px-2 rounded-md py-1 text-black'> {user && user.email === "adminpamus@gmail.com" && (
              <div>
              <Link className='font-bold' to='/dashboard'>My Dashboard</Link>
              </div>
            )}</MenuItem>
             <MenuItem  className='my-2 mb-4 bold tracking-wide ml-3 hover:bg-gray-100 px-2 rounded-md py-1 text-black'> {user && user.email === "caretaker@gmail.com" && (
              <div>
              <Link className='font-bold' to='/dashboard'>My Dashboard</Link>
              </div>
            )}</MenuItem>
  
        <Link to='/' className='text-[red] cursor-pointer flex ml-4 '>
        <button onClick={handlelogout}>Logout</button>
        </Link>
      </MenuList>
    </Menu>
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
        <input  type='file'
            onChange={handleChange}/>
         <button disabled={loading || !photo} onClick={handleClick} className='bg-[green] px-2 py-1 rounded-md mt-2 text-white '>upload</button>
        </DialogBody>
        <DialogFooter>
             <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
    </div>
  )
}

export default Profile