import React, { useEffect, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai';
import EmployeeDataService from '../../Operations'
import NoticeAdd from './NoticeAdd';
export default function Notices() {
  useEffect(() => {
    getAllNotices();
  }, []);
  const getAllNotices = async () => {
    const data = await EmployeeDataService.getAllNotices();
    setNotices(data.docs.map((doc) => ({ ...doc.data(),
      id: doc.id })));
  };
  const deleteHandler = async (id) => {
    await EmployeeDataService.deleteNotice(id);
    getAllNotices();
  };
  const [notices, setNotices] = useState([]);
  return (
    <div>
       <div className='mb-5'>
              <h1 className='text-center text-2xl tracking-wider bold mb-4'>Notices</h1>
              <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModalXl">Add Notice</button>
              {notices.map((doc,index )=>{
return(
              <div className="accordion" id="accordionExample">
  <div className="accordion-item bg-white border border-gray-200">
    <h2 className="accordion-header mb-0" id="headingThree">
      <button className=" accordion-button collapsed relative flex items-center w-full py-4  px-5 text-base text-blue-800 text-left bg-white border-0 rounded-none transition focus:outline-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false"
        aria-controls="collapseThree">
       <span className='mr-4 text-black'>{index + 1}.</span>
       <p className='text-center'>{doc.Reff}</p>
      </button>
    </h2>
    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree"
      data-bs-parent="#accordionExample">
      <div className="accordion-body py-4 px-5">
        <div className=" text-sm  mb-3  text-gray-800 underline">
            <div className='font-bold '>{doc.name}</div>
            <div className='font-bold '>{doc.TheDate}</div>
            <div className='font-bold '>{doc.Reff}</div>
        </div>
            <p>{doc.Notice}</p>
            <span className='flex justify-end my-3'><button onClick={(e) => deleteHandler(doc.id)}><AiFillDelete className='text-red-900'/></button></span>
          </div>
    </div>
  </div>
</div>
)
})}
   <div class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto" id="exampleModalXl" tabindex="-1" aria-labelledby="exampleModalXlLabel" aria-modal="true" role="dialog">
  <div class="modal-dialog modal-xl relative w-auto pointer-events-none">
    <div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
      <div class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
        <button type="button"
          class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
          data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body relative p-4">
      <NoticeAdd/>
      </div>
    </div>
  </div>
</div>
              </div>
    </div>
  )
}
