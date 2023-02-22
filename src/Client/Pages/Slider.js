import React from 'react'
import ImageSlider from './imageslider';
const Slider = () => {
    const slides = [
        { url: "https://images.pexels.com/photos/4907189/pexels-photo-4907189.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", title: "one" },
        { url: "https://images.pexels.com/photos/7968279/pexels-photo-7968279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", title: "two" },
        { url: "https://media.istockphoto.com/id/182498079/photo/youth-hostel-dorm-room.jpg?b=1&s=612x612&w=0&k=20&c=280TiRECiYUBzto1VoZarRf518UM5VkwTieTrtbQSVw=", title: "three" },
        { url: "https://media.istockphoto.com/id/910999556/photo/dormitory-room-in-the-modern-hostel.jpg?b=1&s=612x612&w=0&k=20&c=TA4mGMydmQ4oNyuO9he0VHEFyYh-35LdCM-9714mp00=", title: "four" },
        { url: "https://images.unsplash.com/photo-1470485856497-86770058d4e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80", title:'five'},
        { url: "https://images.unsplash.com/photo-1533327325824-76bc4e62d560?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODB8fGhvc3RlbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60", title: "six" },
      ];
  return (
    <div>
        <div>
      <div className='md:w-[700px] md:h-[320px] w-full h-[300px] '>
        <ImageSlider slides={slides} />
      </div>
    </div>
    </div>
  )
}

export default Slider