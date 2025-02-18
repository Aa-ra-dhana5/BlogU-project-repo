import React, {useId} from 'react'

function Select({
    options,
    label,
    className='',
    ...props
}, ref) {

    const id =useId ()
  return (
    <div className='w-full'>
      {label  && <label htmlFor={id} className=''></label>}
      <Select
      {...props}
      id={id}
      ref={ref}
      // why we use backtext (``) cuz by this we can add custom classes given by user
      //in ${classname} if there is no value no changes so for better code we can gitve value empty string insted of nothing
      className={`px-3 py-2 roun-lg bg-white text-block outline-none focus:bg-gray-50 duration-200 broder-gray-200 w-full ${className}`}>
      
      {/**Options are always in Array cuz we are taking more than one value
       * here we do not taking loop cuz what is we do not ahve aby values then code will crash
       * so insted we will loop the options insted
       */}        
       {options?.map((option) => (
        <option key={option} value={option}></option>
       ))} 
      </Select>
    </div>
  )
}

export default React.forwardRef(Select)
