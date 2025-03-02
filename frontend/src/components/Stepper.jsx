import React from 'react'

function Stepper({fields=[],step=1}) {
  const steps=fields.length
  if (step>-1 & step<=steps)
    return(
      <ol class="flex items-center w-full w-min-fit text-xs my-5 text-gray-500 font-medium sm:text-base">
        {
          fields.slice(0,steps-1).map((field,index)=>(
            <li class={`flex w-full h-[15px] relative text-black`}>         <div class="flex flex-col items-start w-full  whitespace-nowrap ">
            <span class={`w-[12px] aspect-square ${index<step?"bg-black":"bg-gray-300"} border-2 border-transparent rounded-full flex justify-start items-center  mb-3 text-sm text-white   after:content-['']  after:w-[calc(100%)] after:h-0.5  ${index<step-1?"after:bg-black":"after:bg-gray-300"} after:inline-block after:absolute after:top-1.25 after:left-0 ml-[calc(50%-6px)]  after:ml-[calc(50%+6px)] after:-z-0 z-10 `}></span><p className={` text-center ${index<step?"text-black":"text-gray-400"} w-full flex flex-row justify-center `} >{field}</p>
        </div>
     </li>
          ))
        }

        <li class="flex w-full h-[15px] relative text-gray-900  ">
         <div class="w-full whitespace-nowrap z-10 flex flex-col items-start ">
             <span class={`w-[12px] aspect-square ${step===steps?"bg-black":"bg-gray-300"} border-2 border-transparent  rounded-full flex justify-start items-center mb-3 ml-[50%] text-sm   text-gray-500/50`}></span><p className={` text-center ${step===steps?"text-black":"text-gray-400 w-full flex flex-row justify-center  "} `} >{fields.slice(-1)}</p>
         </div>
      </li>
      </ol>
    )
  else
  return <></>
}


export default Stepper
