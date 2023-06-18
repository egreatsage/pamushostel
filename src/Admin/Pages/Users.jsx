import React, { useEffect, useState } from 'react';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../../Common/dbconfig';
import { Input, Option, Select } from '@material-tailwind/react';
import { useUserAuth } from '../../Common/UserAuthContext';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { MdAdminPanelSettings, MdBedroomParent, MdSpaceDashboard } from 'react-icons/md';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import Loader from '../../client/Components/Loader';
import { TbBrandBooking } from 'react-icons/tb';
import { FaUsers } from 'react-icons/fa';
import Profile from '../../Common/Profile';

const Rooms = () => {
  const { signUp } = useUserAuth();
  const [email, setEmail] = useState('');
  const [username] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState([]);
  const [showPassword, setShowPassword] = useState(false); // Add state for show/hide password

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(username, email, password);
      await addDoc(collection(db, 'ActiveUsers'), {
        email: email,
        createdAt: new Date().toISOString(),
        password: password,
      });
      Swal.fire({
        icon: 'success',
        title: 'Account Created',
        timer: 3000,
        confirmButtonText: false,
      });
      setEmail('');
      setPassword('');
    } catch (err) {
      return alert(err);
    }
  };

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'ActiveUsers'));
      const data = querySnapshot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      }));
      setUserData(data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Function to toggle show/hide password
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div className="flex justify-end w-8"></div>

      <div>
        <input type="checkbox" name="" id="sidebar-toggle" />
        <div className="sidebar">
          <div className="sidebar-brand">
            <div className="brand-flex">
              <div className="brand-icons flex ">
                <span>Pamus Admin</span>

                <label htmlFor="sidebar-toggle" className="md:hidden mt-2 flex ml-14">
                  <span>
                    <AiOutlineClose className="cursor-pointer" />
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div className="sidebar-main">
            <div className="md:mt-20 mt-8">
              <div className="my-8 m-8  hover:font-semibold">
                <Link className="flex items-center gap-2" to="/dashboard">
                  <span>
                    <MdSpaceDashboard className="text-xl" />
                  </span>
                  <button>Dashboard</button>
                </Link>
              </div>
              <div className="my-8 m-8  hover:font-semibold">
                <Link className="flex items-center gap-2" to="/bookings">
                  <span className="text-xl">
                    <TbBrandBooking />
                  </span>
                  <button>Bookings</button>
                </Link>
              </div>
              <div className="my-8 m-8  hover:font-semibold">
                <Link className="flex items-center gap-2 " to="/occupants">
                  <span className="text-xl">
                    <FaUsers />
                  </span>
                  <button>Occupants</button>
                </Link>
              </div>
              <div className="my-8 m-8  hover:font-semibold">
                <Link className="flex items-center gap-2 " to="/rooms">
                  <span className="text-xl">
                    <MdBedroomParent />
                  </span>
                  <button>Rooms</button>
                </Link>
              </div>
              <div className="my-8 m-8  hover:font-semibold">
                <Link className="flex items-center gap-2 " to="/users">
                  <span className="text-xl">
                    <FaUsers />
                  </span>
                  <button>Users</button>
                </Link>
              </div>
              <div className='my-8 m-8  hover:font-semibold'>
         <Link className="flex items-center gap-2 " to='/miscelleanous'>
          <span className="text-xl"><MdAdminPanelSettings/></span>
            <button>Miscellenous</button>
          </Link>
         </div>
            </div>
          </div>
        </div>
        <div className="main-content">
          <header className="shadow-md">
            <div className="menu-toggle">
              <label htmlFor="sidebar-toggle">
                <span>
                  <AiOutlineMenu />
                </span>
              </label>
            </div>
            <div className="header-icons">
              <Profile />
            </div>
          </header>
          <main>
            <div className="">
              <div>
                <h1 className="tracking-wider text-xl font-bold text-center mb-8 mt-8">Users Management</h1>
                <form onSubmit={handleSubmit}>
                  <h1 className="text-start font-semibold text-md pl-4 my-4">Add a User</h1>
                  <div className="grid md:py-8 w-full md:border md:rounded-lg shadow-md md:p-3  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 mx-2 md:my-6 my-4 overflow-x-hidden">
                    <div className="my-3">
                      <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        color="teal"
                        type="text"
                        className="text-black"
                        variant="standard"
                        label="Email"
                      />
                    </div>

                    <div className="my-3">
                      <Input
                        color="teal"
                        type={showPassword ? 'password' : 'text'}
                        className="text-black"
                        variant="standard"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                     
                    </div>
                  </div>
                  <div className="flex justify-end mr-8">
                    <button type="submit" className="rounded-md bg-[#8DA2FB] text-white font-bold px-4 py-2">
                      Submit
                    </button>
                  </div>
                </form>

                <div className="">
                  <div className="md:border-r">
                    <h1 className="text-start font-semibold text-md pl-4 my-4 divide-y-2">Active Users</h1>
                    <div class="flex flex-col overflow-x-auto">
                      <div class="sm:-mx-6 lg:-mx-8">
                        <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                          <div class="overflow-x-auto">
                            <table class="min-w-full text-left text-sm font-light">
                              <thead class="border-b font-medium dark:border-neutral-500">
                                <tr>
                                  <th class="px-6 py-4">#</th>
                                  <th class="px-6 py-4">Email</th>
                                  <th class="px-6 py-4  items-center"><span>password</span><span> <input
                          type="checkbox"
                          className="form-checkbox pt-3 text-indigo-600 transition duration-150 ease-in-out"
                          checked={showPassword}
                          onChange={toggleShowPassword}
                        /></span> </th>
                                  <th class="px-6 py-4 hidden">createdAt</th>
                                </tr>
                              </thead>
                              <tbody>
                                {userData.map((user, index) => (
                                  <tr key={user.docId} class="border-b dark:border-neutral-500">
                                    <td class="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                                    <td class="whitespace-nowrap px-6 py-4">{user.email}</td>
                                    <td class="whitespace-nowrap px-6 py-4">
                                
                                      {showPassword ?user.password:"********"}
                                    </td>
                                    <td class="whitespace-nowrap px-6 py-4 hidden">{user.createdAt}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
        <label htmlFor="sidebar-toggle" className="body-label" />
      </div>
    </div>
  );
};

export default Rooms;
