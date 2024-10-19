import React from 'react'
import './refHeader.css'

const refHeader = () => {
  return (
    <body>
        <div className='header'>
        <div className='enter'>
            <h1 className='font-extrabold  text-green-700'>Our Special Domains</h1>
            <p className="mt-12 text-gray-800 text-lg max-w-prose leading-relaxed font-medium">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.
            </p>
     <button className='bg-green-700 p-5 rounded-lg text-white font-bold mt-7'>
     discover our special domains.
     </button>
        </div>
      
    </div>
    </body>
  )
}

export default refHeader
