import React from 'react'

export default function Newsletter() {
  return (
    <div className='md:w-1/4 mt-4 text-sm '>
      <div>
        <p>Subscribe to our newsletter</p>
      </div>
      <div className='flex flex-col lg:flex-row gap-4 mt-4 '>
        <input
          type='Full Name'
          id='name'
          placeholder='Enter your full name'
          className='text-zinc-800 p-2'
        />
        <input
          type='email'
          id='email'
          placeholder='Enter email address'
          className='text-zinc-800 p-2 '
        />
      </div>
      <button className='text-md mt-4'>SIGN UP</button>
      <div>{}</div>
      <div className='mt-12'>
        <p className='text-sm'>
          By clicking submit you agree to receive emails from Reveillerstudios
          and accept our web terms of use and privacy and cookie apply. Terms
          apply
        </p>
      </div>
    </div>
  );
}
