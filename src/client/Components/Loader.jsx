import React from 'react'
import loader from '../../assets/loader.svg'
const Loader = () => {
  return (
    <div className="bg-black bg-opacity-50 flex items-center justify-center fixed left-0 right-0 bottom-0 top-0 z-50">
      <div>
        <img src={loader} alt="Loading..." className="h-24" />
        <p className='italic text-white font-bold'>please wait... </p>
      </div>
    </div>
  )
}
export default Loader