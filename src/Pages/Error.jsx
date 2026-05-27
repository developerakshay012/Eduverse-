import React from 'react'

const Error = () => {
  return (
    <div className='flex h-screen items-center justify-center  text-white font-sans'>
      <div className='flex items-center gap-5'>
        {/* Error Code */}
        <h1 className='text-2xl font-semibold border-r border-white/30 pr-5 leading-none'>
          404
        </h1>
        {/* Error Message */}
        <p className='text-sm font-normal leading-none'>
          This page could not be found.
        </p>
      </div>
    </div>
  )
}

export default Error