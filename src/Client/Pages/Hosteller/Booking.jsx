
import React, { useState} from 'react'
import dbdataservice from '../../../Operations';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../../Context/UserAuthContext';
import Navbar from '../../Components/Navbar';
import { toast } from 'react-toastify';
import Navbarr from '../../Components/Navbar';
const Booking = () => {
  const {user} = useUserAuth();
  const [FName, setFName] = useState('');
  const [LName, setLName] = useState('');
  const [PNumber, setPNumber] = useState('');
  const [email, setEmail] = useState('');
  const [PGEmail, setPGEmail] = useState('');
  const [EEmail, setEEmail] = useState('');
  const [Gender, setGender] = useState('');
  const [Age, setAge] = useState('');
  const [PGContact, setPGContact] = useState('');
  const [PGName, setPGName] = useState('');
  const [EName, setEName] = useState('');
  const [EContact, setEContact] = useState('');
  const [Relation, setRelation] = useState('');
  const [Institution, setInstitution] = useState('');
  const [YearOfStudy, setYearOfStudy] = useState('');
  const [MaritalStatus, setMaritalStatus] = useState('');
  const [Homecounty, setHomecounty] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let userId = user.uid;
    if (FName === "" || LName === "") {
     toast.error('All fields required')
      return;
    }
    const newBooking = {
     FName,LName,Gender,PNumber,PGContact,Age,PGName,
     EName,EContact,Relation,Institution,YearOfStudy,
     MaritalStatus,Homecounty,userId,email,PGEmail,EEmail
    };
    try {
        await dbdataservice.addBooking(newBooking);
        toast.success('Details Submitted Succeddfully')
          navigate('/reply');
    } catch (err) {
     toast.error('Problem Adding Details')
    }
    setFName(""); setLName("");setGender("");setPGContact("");setPNumber("");
    setAge("");setPGName(""); setEName(''); setEContact(''); setRelation(''); 
    setInstitution(''); setMaritalStatus('');setPGEmail('');
    setYearOfStudy(''); setHomecounty('');setEmail("");setEEmail('');
    
  };

  return (
    <div className='mt-4 mb-16'>
             <div className='fixed top-2 z-10 w-full'>
    <Navbarr/>
    </div>
              <div className="container md:mx-7 mx-2">
        <form onSubmit={handleSubmit}>
            <div className="form first">
                <div className="details mb-16 personal">
                    <div className="mt-12">
                    <span className="title">Personal Details</span>
                    <div className="fields">
                        <div className="input-field">
                            <label>First Name</label>
                            <input type="text" placeholder="Enter your first name"
                            value={FName}
                            onChange={(e)=>setFName(e.target.value)} required/>
                        </div>
                        <div className="input-field">
                            <label>Last Name</label>
                            <input type="text" placeholder="Enter your last name"
                             required/>
                        </div>

                        <div className="input-field">
                            <label>Phone Number</label>
                            <input type="text" placeholder="Enter phone number"
                             value={LName} 
                             onChange={(e)=>setLName(e.target.value)} required/>
                        </div>

                        <div className="input-field">
                            <label>Email</label>
                            <input type="email" placeholder="Enter your email" 
                             value={email} 
                             onChange={(e)=>setEmail(e.target.value)} required/>
                        </div>

                        <div className="input-field">
                            <label>Age</label>
                            <input type="number" placeholder="Enter your Age" required
                            value={Age} 
                            onChange={(e)=>setAge(e.target.value)}/>
                        </div>
                        <div className="input-field">
                            <label>Gender</label>
                            <select required>
                                <option disabled selected>Select gender</option>
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                        </div>
                        <div className="input-field">
                            <label>Marital Status</label>
                            <select required>
                                <option disabled selected>Select Status</option>
                                <option>Single</option>
                                <option>Married</option>
                                <option>Other</option>
                            </select>
                        </div>
                        
                    </div>
                    </div>
                    
                    <div className="mt-12">
                    <span className="title">Guardian / Parent Information</span>
                    <div className="fields">
                        <div className="input-field">
                            <label>Parent/Guardian Name</label>
                            <input type="text" placeholder="Enter full name"
                            value={PGName} 
                            onChange={(e)=>setPGName(e.target.value)} required/>
                        </div>
                        <div className="input-field">
                            <label>Parent/Guardian Contact</label>
                            <input type="text" placeholder="Enter phone number" required/>
                        </div>
                        <div className="input-field">
                            <label>Parent/Guardian Email</label>
                            <input type="email" placeholder="Enter your email"
                            value={PGEmail} 
                            onChange={(e)=>setPGEmail(e.target.value)}
                            required/>
                        </div>
                    </div>
                    </div>
                     <div className="mt-12">
                     <span className="title">Emergency Contact Information</span>
                    <div className="fields">
                        <div className="input-field">
                            <label>Emergency Contact Name</label>
                            <input type="text" placeholder="Enter full name"
                            value={EName} 
                            onChange={(e)=>setEName(e.target.value)} required/>
                        </div>
                        <div className="input-field">
                            <label>Emergency Contact</label>
                            <input type="text" placeholder="Enter phone number"
                            value={EContact} 
                            onChange={(e)=>setEContact(e.target.value)} required/>
                        </div>
                        <div className="input-field">
                            <label>Emergency Email</label>
                            <input type="email" placeholder="Enter your email"
                            value={EEmail} 
                            onChange={(e)=>setEEmail(e.target.value)}/>
                        </div>
                        <div className="input-field">
                            <label>Emergency Relation</label>
                            <input type="text" placeholder="Enter Your Relationship"
                            value={Relation} 
                            onChange={(e)=>setRelation(e.target.value)}/>
                        </div>
                    </div>
                     </div>
                     <div className="mt-12">
                     <span className="title">Academic  Information</span>
                    <div className="fields">
                        <div className="input-field">
                            <label>Current Institution Of Study</label>
                            <input type="text" placeholder="Enter College/University Name" 
                               value={Institution} 
                               onChange={(e)=>setInstitution(e.target.value)}
                            required/>
                        </div>
                        <div className="input-field">
                            <label>Year Of Study</label>
                            <select required>
                                <option disabled selected>Select Year</option>
                                <option>First Year</option>
                                <option>Second Year</option>
                                <option>Third Year</option>
                                <option>Fourth Year</option>
                                <option>Fifth Year</option>
                                <option>Sixth Year</option>
                                <option>Seventh Year</option>
                                <option>Eighth Year</option>   
                            </select>
                        </div>
                    </div>
                     </div>
                    
                  
                    <button className='px-6 py-1 rounded-md my-5 bg-blue-800 text-white '>Submit</button>
                </div>
            </div>
            
        </form>
    </div>
    </div>
  )
}

export default Booking