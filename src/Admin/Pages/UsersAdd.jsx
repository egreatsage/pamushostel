// import React, { useState } from 'react'
// import { AiOutlineMail,AiOutlineLock, AiOutlineUser, AiOutlineLogin } from 'react-icons/ai'
// import {useNavigate } from 'react-router-dom'
// import { useUserAuth } from '../../Context/UserAuthContext'
// import dbdataservice from '../../Operations'
// const StaffSignUp = () => {
//   const {signUp,user} = useUserAuth();
//   const [email, setEmail] = useState()
//   const [username, setUsername] = useState()
//   const [password, setPassword] = useState()
//   const navigate = useNavigate();
//   let userId = user.uid
//  const handleSubmit = async (e)=>{
//   try{
//     await signUp(username, email,password);
//       navigate('/dashboard')
//       setmessage('User Added Successfully')
//   }catch(err){
//     setError("Problem Adding User")
//           }  
//       }
//       const [message, setmessage] = useState();
//       const AddUser = async (e) => {
//         setmessage("");
//         const newUser = {
//          username,email,password,userId
//         };
//         try {
          
//             await dbdataservice.addUser(newUser);
//             setmessage({ error: false, msg: "New User added successfully!" });
//               navigate('/dashboard');
//         } catch (err) {
//           setmessage({ error: true, msg: err.message });
//         }
//       };
//       const bothh =(e)=>{
//         e.preventDefault();
//         AddUser();
//         handleSubmit();
        
  
//       }
//   return (
//    <div>
//       <div className="min-h-screen max-w-full flex flex-col items-center justify-center bg-white">
//       <div className="flex flex-col bg-white shadow-md
//           px-4
//           sm:px-6
//           md:px-8
//           lg:px-10
//           md:py-8
//           rounded-3xl
//           w-full
//           max-w-md
//         "
//       >
//         <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
//          Add User
//         </div>
//         <div>
//           {error?.msg && (
         
//                 <Alert 
//         color={error?.error?'error' :'info'}
//         onClose={()=> setError('')}
//         dismissible='true'
//         >
//           {''}
//           {error?.msg}
//         </Alert>
         
       
//       )}
//           </div>
//         <div className="mt-10">
//           <form onSubmit={bothh}>
//           <div className="flex flex-col mb-5">
//               <label
                
//                 className="mb-1 text-xs tracking-wide text-gray-600"
//                 >UserName:</label>
//               <div className="relative">
//                 <div
//                   className="
//                     inline-flex
//                     items-center
//                     justify-center
//                     absolute
//                     left-0
//                     top-0
//                     h-full
//                     w-10
//                     text-gray-400
//                   "
//                 >
//                   <AiOutlineUser/>
//                 </div>

//                 <input
                  
//                   type="name"
//                   name="name"
//                   className="
//                     text-sm
//                     placeholder-gray-500
//                     pl-10
//                     pr-4
//                     rounded-2xl
//                     border border-gray-400
//                     w-full
//                     py-2
//                     focus:outline-none focus:border-blue-400
//                   "
//                   placeholder="Enter your Username"
//                   onChange={e=>setUsername(e.target.value)}
//                 />
//               </div>
//             </div>
//             <div className="flex flex-col mb-5">
//               <label
            
//                 className="mb-1 text-xs tracking-wide text-gray-600">E-Mail Address:</label>
//               <div className="relative">
//                 <div
//                   className="
//                     inline-flex
//                     items-center
//                     justify-center
//                     absolute
//                     left-0
//                     top-0
//                     h-full
//                     w-10
//                     text-gray-400
//                   "
//                 >
//                   <AiOutlineMail/>
//                 </div>

//                 <input
                  
//                   type="email"
//                   name="email"
//                   className="
//                     text-sm
//                     placeholder-gray-500
//                     pl-10
//                     pr-4
//                     rounded-2xl
//                     border border-gray-400
//                     w-full
//                     py-2
//                     focus:outline-none focus:border-blue-400
//                   "
//                   placeholder="Enter your email"
//                   onChange={e=>setEmail(e.target.value)}
//                 />
//               </div>
//             </div>
//             <div className="flex flex-col mb-6">
//               <label
               
//                 className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Password:</label>
//               <div className="relative">
//                 <div
//                   className="
//                     inline-flex
//                     items-center
//                     justify-center
//                     absolute
//                     left-0
//                     top-0
//                     h-full
//                     w-10
//                     text-gray-400
//                   "
//                 >
//                   <span>
//                     <AiOutlineLock/>
//                   </span>
//                 </div>

//                 <input
                
//                   type="password"
//                   name="password"
//                   className="
//                     text-sm
//                     placeholder-gray-500
//                     pl-10
//                     pr-4
//                     rounded-2xl
//                     border border-gray-400
//                     w-full
//                     py-2
//                     focus:outline-none focus:border-blue-400
//                   "
//                   placeholder="Enter your password"
//                   onChange={e=>setPassword(e.target.value)}
//                 />
//               </div>
//             </div>
//             <div className="flex w-full">
//               <button
//                 type="submit"
//                 className="
//                   flex
//                   mt-2
//                   items-center
//                   justify-center
//                   focus:outline-none
//                   text-white text-sm
//                   sm:text-base
//                   bg-blue-500
//                   hover:bg-blue-600
//                   rounded-2xl
//                   py-2
//                   w-full
//                   transition
//                   duration-150
//                   ease-in
//                 "
//               >
//                 <span className="mr-2 uppercase">Add</span>
//                 <span>
//                 <AiOutlineLogin/>
//                 </span>
//               </button>
//             </div>
//           </form>
//         </div>
//       </div> 
//     </div>
//    </div>
//   )
// }
// export default StaffSignUp