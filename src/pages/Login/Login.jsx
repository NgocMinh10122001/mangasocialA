import React, { useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import * as message from "../../components/Message/Message";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import Handle_function from "../../handle_account/handle";

import { Buffer } from 'buffer';



export default function Login() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(true);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInput((preState) => ({
      ...preState,
      [name]: value,
    }));
  };
//  const loginSubmit = () =>{
//   Handle_function.Handle_login(input);
//   Cookies.get("jwt")?navigate("/"):message.error("some things wrong!")
  
//  }
const token = Buffer.from(`dooxxinhgai@gmail.com:12345678`, 'utf8').toString('base64')
  const loginSubmit = async () => {
    try {
      // console.log("check input", input);
      const response = await axios.post("https://apimanga.mangasocial.online/login", input);
      if (response?.data.errCode !== 200) {
        message.error(response.data.message);
        console.log(response);
        
      } else {
        message.success(response.data.message);
        
        sessionStorage.setItem("user", response?.data.account);
        sessionStorage.setItem("user_email", response?.data.account.email);
        sessionStorage.setItem("user_id", response?.data.account.id_user);
        sessionStorage.setItem("jwt", response?.data.account.jwt);
        console.log(response)
        // console.log(response.headers.getSetCookie());
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async () => {
      // console.log("check input", input);

    await loginSubmit();
  };

  return (
  <>
    <div className="header-top">
        <Link to="/">
          <div className="title">
            <img className="img-manga" src="/images/Ellipse 1.svg" alt=""></img>
            <h3>MangaSocial</h3>
          </div>
        </Link>
        <div className="menu-header">
          <Link to="/">
            <div
              className="comic"
            >
              <p>Comic</p>
              <img
                className="arrow-img"
                alt="Arrow"
              />
            </div>
          </Link>

          <Link to="/genres">
            <p>Genres</p>
          </Link>

          <p>Popular</p>

         
          <div className="dropdown">
            <button >Server</button>
          </div>
          

          <Link to="/contact-us">
            <p className="contact">Contact us</p>
          </Link>
          <Link to="/policy">
            <p className="policy">Policy</p>
          </Link>
          <Link
            to={`https://apps.apple.com/us/app/manga-reader-mangakomi-online/id6446646720`}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg"
              alt=""
              className="w-5 h-5 lg:w-12 lg:h-12 hover:scale-105 transition-all cursor-pointer"
            />
          </Link>
        </div>
        <div className="avatar_search">
          <CiSearch
            color="red"
            size={32}
            className="mr-2"
          />
          <input
            className="w-full border-none outline-none bg-transparent opacity-100"
            placeholder="Search"
            name="content"
          />
      
            <div className="flex justify-center align-middle items-center ml-4">
              <Link to="/login">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                  Login
                </button>
              </Link>
            </div>

        </div>
      </div>
      <Outlet></Outlet>

    <div className="bg-[url('/public/images/Login/bg-login.jpeg')] w-full h-full  bg-cover bg-center bg-no-repeat " >
      <div className="flex justify-center items-center h-full font-semibold">
        <div className="w-[520px] h-[746px] bg-[#353434] flex flex-col gap-[31px] items-center justify-center rounded-xl  ">
          <div className="flex items-center flex-col gap-3 ">
            <h1 className="text-4xl  text-white">Login</h1>
            <h1 className="text-xl text-white">
              You can use your app or account to login
            </h1>
          </div>

          <div className="w-[378px] text-base text-white flex flex-col gap-3">
            <div className="w-full p-[10px] bg-[#747474] rounded-md">
              <input
                className="w-full border-none outline-none bg-transparent opacity-100"
                placeholder="Enter your email"
                type="email"
                name="email"
                onChange={handleOnChange}
              />
            </div>

            <div className="w-full p-[10px] bg-[#747474] rounded-md flex items-center">
              <input
                className="w-full border-none outline-none bg-transparent opacity-100"
                placeholder="Password"
                type={hidden ? "password" : "text"}
                name="password"
                onChange={handleOnChange}
              />
              {hidden ? (
                <IoMdEyeOff
                  size={26}
                  className="cursor-pointer"
                  onClick={() => setHidden(!hidden)}
                />
              ) : (
                <IoEye
                  size={26}
                  className="cursor-pointer"
                  onClick={() => setHidden(!hidden)}
                />
              )}
            </div>

            <div className="w-full p-[10px] bg-[#929292] rounded-md hover:bg-[#EA6016] cursor-pointer" onClick={ handleSubmit}>
              <input
                className="w-full border-none outline-none text-white opacity-100 uppercase bg-transparent cursor-pointer"
                type="submit"
                value={"Log in"}
                onClick={ handleSubmit}
              />
            </div>
          </div>

          <div>
            <h1 className="text-[#EA6016] cursor-pointer hover:underline hover:font-extrabold text-base">
              Forgot Password?
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <img
              src="https://raw.githubusercontent.com/Exorcist11/MangaSocial/main/public/images/Login/QR.png"
              alt=""
              className="w-[50px] h-[50px]"
            />
            <h1 className="text-[#EA6016] cursor-pointer hover:font-extrabold text-bases">
              Scan QR Code to Login
            </h1>
          </div>

          <div className="relative flex py-5 items-center w-[378px]">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-400">
              Or Continue with
            </span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>

          <div className="flex gap-1 cursor-pointer hover:font-extrabold text-bases">
            <h1 className="text-[#747474]">Don't have an account?</h1>
            <p
              className="text-[#EA6016] hover:underline"
              onClick={() => navigate("/sign-up")}
            >
              Sign up
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
