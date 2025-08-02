import React from 'react';
import image from '../Image/MyBlog.png'


function Logo({width = '100px'}) {
  return (
    <div >
    <img className='h-24 w-24 hover:animate-bounce' src= {image} alt="" />
    </div>
  )
}

export default Logo
