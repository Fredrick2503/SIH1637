import React, { useState } from 'react'
import Farm2Biz from '../components/Farm2Bizanimate'
import './loading.css'
function Loading() {
    const [opacity,setopacity]=useState(100);
    setInterval(() => {
        opacity==100?setopacity(0):setopacity(100);
    }, 2000);
  return (
    <div className='w-screen h-screen z-50 bg-white ' >
     < Farm2Biz className={`blink`} />
    </div>
  )
}
  
export default Loading
