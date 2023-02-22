import React, { useEffect, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai';
import EmployeeDataService from '../../Operations'
export default function Messages() {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
      getAllMessages();
    }, []);
    const getAllMessages = async () => {
      const data = await EmployeeDataService.getAllMessages();
      setMessages(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    const deleteHandler = async (id) => {
      await EmployeeDataService.deleteMessage(id);
      getAllMessages();
    };
  return (
    <div>
          <div className='mb-6 shadow-md bg-gray-50'>
          <h1 className='text-center tracking-wider'>
                Messages And Notifications</h1> 
                {messages.map((doc,index)=>{
return(
              <div className="accordion accordion-flush " id="accordionFlushExample">
  <div className="accordion-item border-l-0 border-r-0 border-b-0 rounded-none bg-white border border-gray-200 mb-2">
    <h2 className="accordion-header mb-0" id="flush-headingThree">
      <button className="accordion-button collapsed relative flex items-center w-full py-4 px-5 text-base text-gray-800 text-left bg-white border-0 rounded-none transition focus:outline-none" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
        <span className='mr-3 italic text-sm'>{index + 1}.   New Message from </span><span className='text-blue-800'>{doc.fullname}</span>
      </button>
    </h2>
    <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree"
      data-bs-parent="#accordionFlushExample">
      <div className="accordion-body py-4 px-5">
       <span className='underline pb-3 italic text-sm '>{doc.email}</span>
       <p className=' mt-4 text-gray-900'>{doc.messsage}</p>
       <span className='flex justify-end my-3'><button onClick={(e) => deleteHandler(doc.id)}><AiFillDelete className='text-red-900'/></button></span>
        </div>
    </div>
  </div>
</div>
)
})}
              </div>
    </div>
  )
}
