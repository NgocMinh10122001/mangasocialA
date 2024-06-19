import React from "react";
import { Link, NavLink } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useSelector } from "react-redux";
const Comments = () => {
  const cmt = useFetch(12);
  // console.log(cmt);
  const sv = useSelector((state) => state.server.sv);
  const extractNovelId = (url) => {
    const parts = url.split("/");
    return parts[parts.length - 1];
  };
  return (
    <div>
      <div className="comments">
        {cmt?.map((item, index) => (
          <div className="item-comments" key={index}>
            <div className="left-comment">
              <div className="topic-comic">
                <div className="wrap-mask">
                  <img className="mask" src="/images/Mask group.svg"></img>
                </div>
                <p className="name-topic">{item.title_manga}</p>
              </div>
              <div className="viewer">
                <img
                  className="ellips rounded-full"
                  src={item.avatar_user}
                ></img>
                <p className="name-user">{item.name_user}</p>
                <p className="add-cmt">Has add a comment</p>
              </div>
              <div className="coment-user">
                <img className="bxs-chat" src="/images/bxs_chat.svg"></img>
                <p className="mess-chat">{item.content}</p>
                <img className="ri-book" src="/images/ri_book-fill.svg"></img>
                <NavLink
                  className="comic-name"
                  to={`/${sv}/chapter/${extractNovelId(item.url_manga)}
                  `}
                >
                  {item.title_manga}
                </NavLink>
              </div>
            </div>
            <div className="right-comment">
              <div className="number">
                <p className="title-number">Comment</p>
                <p className="number-cm">{item.count_comment}</p>
              </div>
              <div className="number">
                <p className="title-number">Discuss</p>
                <p className="number-cm">{item.count_reply_comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
