import React from 'react'

export default function Loader() {
  return (
    <div className='flex justify-center items-center backdrop my-4'>
        <div class="dot-spinner">
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
</div>
     <div className='text-blue-gray-800 text-xl bold mx-2'>
       loading
     </div>
    </div>
  )
}
