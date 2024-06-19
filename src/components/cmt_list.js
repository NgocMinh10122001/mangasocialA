import React from 'react'
import CMT from './cmt';

const CMT_list = (props) => {
    const {cmt_arr} = props;
    console.log(props)
  return (
   <div className='w-[1000px]'>
    {
         cmt_arr.map((cmt,index)=>(
            <CMT key={index} cmt={cmt} />
      ))
    }
   </div>
  )
}

export default CMT_list