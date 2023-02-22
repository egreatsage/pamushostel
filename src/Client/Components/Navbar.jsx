import { useState, useEffect } from "react";
import {Navbar,MobileNav,Typography,Button,IconButton, Menu, MenuHandler, MenuList, MenuItem,} from "@material-tailwind/react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";

const Navbarr = () => {
    const [openNav, setOpenNav] = useState(false);
 
    useEffect(() => {
      window.addEventListener(
        "resize",
        () => window.innerWidth >= 960 && setOpenNav(false)
      );
    }, []);
   
    const navList = (
      <ul className="flex flex-col gap-2 lg:mb-0  lg:flex-row lg:items-center lg:gap-6">
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <Link to="/" className="flex text-xl  hover:font-bold  items-center">
         Home
          </Link>
        </Typography>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <Link to="/" className="flex text-xl  hover:font-bold  items-center">
            About
          </Link>
        </Typography>

        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <Link to='/' className="flex text-xl  hover:font-bold  items-center">
            Pricing
          </Link>
        </Typography>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <Link to='/contactus' className="flex text-xl  hover:font-bold items-center">
            Contact Us
          </Link>
        </Typography>
      </ul>
    );
  return (

    <div>
          <Navbar className="mx-auto max-w-screen-xl py-1 md:rounded-full px-4 lg:px-8 lg:py-1">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          variant="small"
          className="mr-4 cursor-pointer py-1.5 font-normal"
        >
          <span className="text-xl font-bold tracking-wide">Pamus</span>
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <Button variant="gradient" size="sm" className="hidden lg:inline-block">
         <Menu>
            <MenuHandler>
                <button className="bg-none border-white">
                      Login
                </button>
            </MenuHandler>
            <MenuList>
               <Link to='/userprofile'>
               <MenuItem>Hosteller</MenuItem>
                </Link> 
                <Link to='/staffprofile'>
               <MenuItem>Staff</MenuItem>
                </Link> 
            </MenuList>
         </Menu>
        </Button>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
      <AiOutlineClose className="text-xl font-semibold"/>
          ) : (
            <AiOutlineMenu  className="text-xl font-semibold"/>
                     )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navList}
          <Button variant="gradient" size="sm" fullWidth className="mb-2">
          <Menu className='px-6'>
            <MenuHandler>
                <button className="bg-none border-white text-xl">
                      Login
                </button>
            </MenuHandler>
            <MenuList>
               <Link to='/userprofile'>
               <MenuItem className="text-md font-bold mx-6">Hosteller</MenuItem>
                </Link> 
                <Link to='/staffprofile'>
                 <MenuItem className="text-md font-bold mx-6">Staff</MenuItem>
                </Link> 
             </MenuList>
            </Menu>
          </Button>
        </div>
      </MobileNav>
    </Navbar>
    </div>
  )
}

export default Navbarr