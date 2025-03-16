import React from 'react'

function Container({className,children,...props}) {
  return (
    <div className={' rounded-xl shadow-[0px_0px_5px_rgba(0,0,0,0.19)] p-3 mt-1.5 mb-1.5 relative '+className} {...props}>
      {children}
    </div>
  )
}

export default Container
