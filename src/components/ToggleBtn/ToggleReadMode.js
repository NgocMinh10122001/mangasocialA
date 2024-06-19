import React, { useEffect, useState } from "react";
import "./ToggleReadMode.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { changeReadMode } from "../../Redux/Feature/readModeSlice";


const ToggleReadMode = () => {
 
  const dispatch = useDispatch();

  const sv = useSelector((state)=>state.server.sv);
  const readmode = useSelector((state)=>state.ReadMode.readmode);
  const id_user = () =>{
    if(sessionStorage.getItem("user_id")==null){
        return 0;
    }
    else
    return sessionStorage.getItem("user_id");
}
  const getDataRead = async () =>{
      try {
          await axios.get("http://apimanga.mangasocial.online/"+sv+"/manga/"+id_user()+"/")
          const res = await axios.get("http://apimanga.mangasocial.online/mode/web-server/"+id_user()+"/");
          console.log(res)
          const res2 = await axios.get("http://apimanga.mangasocial.online/mode/get-web-server/"+id_user()+"/");
          console.log(res2.data.msg);
          if(res2.data.msg==="on"){
            dispatch(changeReadMode(true));
            
          }
          else{
            dispatch(changeReadMode(false))
          }
      } catch (error) {
          console.log(error)
      }
  }
  const checkReadMode = async () =>{
      try {
          const res = await axios.get("http://apimanga.mangasocial.online/mode/get-web-server/"+id_user()+"/");
          console.log(res.data.msg)
      } catch (error) {
          console.log(error)
      }
  }

//   const getDataRead = () => {
//     fetch("apimanga.mangasocial.online/1/manga", {
//       method: "GET",
//     })
//     //   .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//       })
//       .catch((error) => console.log(error));
//   };
//   const checkReadMode = async () => {
//     fetch("http://apimanga.mangasocial.online/mode/get-web-server/").then(
//       (data) => console.log(data)
//     );
//   };
  const handleReadMode = () => {
    getDataRead();
    checkReadMode();
    
    // setReadMode(readMode);
  };
  return (
    <>
      <div className="bg-red-300 w-40 h-40 rounded-full flex flex-col gap-2 justify-center items-center fixed bottom-4 right-4 z-100">
        <p>Read Mode: {readmode==true?"On":"Off"}</p>
        {
          readmode==true?(
            <input
          type="checkbox"
          id="switch"
          checked
          className="switch-input"
          onChange={handleReadMode}
        />
          ):(
            <input
          type="checkbox"
          id="switch"
          className="switch-input"
          onChange={handleReadMode}
        />
          )
        }
        <label htmlFor="switch" className="switch" />
      </div>
    </>
  );
};

export default ToggleReadMode;
