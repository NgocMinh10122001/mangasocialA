import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import prodApis from "../api/home";
import { useSelector } from "react-redux";
const NewUsers = () => {
  const [newUser, setNewUser] = useState([]);
  useEffect(() => {
    getNewUser();
  }, []);
  const sv = useSelector((state) => state.server.sv);
  const getNewUser = async () => {
    // (async () => {
    //     const newsResponse = await prodApis.index();

    //     setNewUser(newsResponse.data.User_New_Register);
    // })();
    const newsResponse = await prodApis.server(sv);
    setNewUser(newsResponse.data[11].data);
    // console.log(newsResponse.data[11].data);
  };

  return (
    <>
      <div>
        <div className="news-right">
          <div className="lab">
            <label>NEW USER</label>{" "}
          </div>
          {newUser &&
            newUser.map((newUser, index) => {
              return (
                <Link
                  to={`/${sv}/view-user-profile`}
                  state={newUser.id_user}
                  key={index}
                >
                  <div className="username md:pt-0 xl:pt-[30px]">
                    <img
                      className="avatar"
                      src={newUser.avatar_user}
                      alt="avatar"
                    />
                    <span className="text-avatar">{newUser.name_user}</span>
                    <span className="date-text">
                      {newUser.participation_time}
                    </span>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default NewUsers;
