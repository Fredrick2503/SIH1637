import React from 'react'
import Stepper from '../components/Stepper'

function Test() {
  return (
    <div className='w-screen h-screen ' >
      <div className="w-[90%] h-fit shadow-[0_0_5px_rgba(0,0,0,0.5)] rounded-md p-24 ">
        <Stepper fields={["pending","accepted","completed"]} step={1}/>
      </div>
    </div>
  )
}

export default Test


