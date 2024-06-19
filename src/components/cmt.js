import React, { useState } from "react";

const CMT = (props) => {
    const {cmt} = props;
    const [viewReply, setViewReply] = useState(false);
    const handleReply = () =>{
      setViewReply(!viewReply);
      console.log(viewReply)
    }
  return (
    // <!-- component -->
    <div className=" mx-auto  mt-4 w-full">

      <div className="space-y-4">
        <div className="flex">
          <div className="flex-shrink-0 mr-3">
            <img
              className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
              src={cmt.avatar_user}
              alt=""
            />
          </div>
          <div className="flex-1 border rounded-lg px-4 py-2 leading-relaxed">
            <strong className="text-white">{cmt?.name_user}</strong>{" "}
            <span className="text-xs text-white">{cmt?.time_comment}</span>
            <p className="text-lg text-white">
            {cmt?.content}
            </p>
            <div className="mt-4 flex items-center gap-3">
              
              <div className="text-sm text-white font-semibold">{cmt?.likes} {cmt?.likes==0?"Like":"Likes"}</div>
              <div className="text-sm text-white font-semibold cursor-pointer" onClick={()=>handleReply()}>{cmt.replies.length} {cmt.replies.length==0?"Reply":"Replies"}</div>
            </div>
          </div>
        </div>

       
      </div>
      {viewReply?(
       <div className="mt-0 ml-10 w-[full]">
         <CMT cmt={cmt.replies[0]}/>
       </div>
      ):(
        null
      )}
    </div>
    
  );
};

export default CMT;
