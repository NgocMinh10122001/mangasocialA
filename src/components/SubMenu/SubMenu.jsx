import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { GoPerson } from "react-icons/go";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const SubMenu = () => {
  const navigate = useNavigate();
  const [avatarUser,setAvatarUser] = useState("");
  // Set value hidden
  const [onHidden, setHidden] = useState(false);

  const submenuRef = useRef(null);

  const user_id = sessionStorage?.getItem("user_id");

  const handleButtonClick = () => {
    setHidden(!onHidden);
  };

  const handleClickOutside = (event) => {
    if (submenuRef.current && !submenuRef.current.contains(event.target)) {
      setHidden(false);
    }
  };
  const getUserImg = async () => {
    try {
      const res = await axios.get('http://apimanga.mangasocial.online/user/'+user_id);
      setAvatarUser((res.data).avatar_user);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect( () => {
    document.addEventListener("click", handleClickOutside);
    getUserImg();

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handelAccount = () => {
    navigate("/user-profile");
    setHidden(false);
  };

  const handelLogout = async () => {
    try {
      await axios.get("https://apimanga.mangasocial.online/logout");
      sessionStorage.clear();
      navigate("/");
      console.log(sessionStorage.getItem("user"));
    } catch (error) {
      console.log(error);
      sessionStorage.clear();
      navigate("/login");
    }
  };

  return (
    <div className="inline-block overflow-x-hidden overflow-y-auto" ref={submenuRef}>
     
       <div className="w-12 h-12 rounded-full cursor-pointer">
          <img onClick={handleButtonClick} className="h-full w-full rounded-full" src={avatarUser?avatarUser:null} alt="" srcset="" />
     
       </div>

      <div
        className={`${
          onHidden
            ? "block origin-top-right mt-2 w-72 rounded-md shadow-lg bg-white divide-y-2 fixed z-1000"
            : "hidden "
        }`}
      >
        <div
          className="w-full flex gap-3 items-center h-11 px-5 cursor-pointer hover:opacity-80 text-xl"
          onClick={handelAccount}
        >
          <GoPerson />
          Account
        </div>

        <div
          className="w-full flex gap-3 items-center h-11 px-5 cursor-pointer hover:opacity-80 text-xl"
          onClick={handelLogout}
        >
          <RiLogoutBoxRLine />
          Logout
        </div>
      </div>
    </div>
  );
};

export default SubMenu;
