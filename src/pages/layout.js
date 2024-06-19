import { useState, useContext, useRef } from "react";
import { div, Link, NavLink, Outlet, useParams } from "react-router-dom";
import SubMenu from "../components/SubMenu/SubMenu";
import platform from "platform";
import ios from "../pages/img/ios.png";
import adroi from "../pages/img/adroi.png";
import { CiSearch } from "react-icons/ci";
import { useEffect } from "react";
import axios from "axios";
import "../assets/scss/_dropdown.scss";
import { SviContext } from ".";
import { changeServer } from "../Redux/Feature/serverSlice";
import { setIsLoading } from "../Redux/Feature/serverSlice";
import { useDispatch, useSelector } from "react-redux";
import Handle_function from "../handle_account/handle";
// import { IoLogoAndroid } from "react-icons/io";
import { LiaFlagUsaSolid } from "react-icons/lia";
import JP from "country-flag-icons/react/3x2/JP";
import US from "country-flag-icons/react/3x2/US";
import VN from "country-flag-icons/react/3x2/VN";
import AC from "country-flag-icons/react/3x2/AC";
import IC from "country-flag-icons/react/3x2/IC";
import EU from "country-flag-icons/react/3x2/EU";
import XK from "country-flag-icons/react/3x2/XK";
import RU from "country-flag-icons/react/3x2/RU";
import FR from "country-flag-icons/react/3x2/FR";
import { useNavigate } from "react-router-dom";

let path = "";
let arr_id_manga = [""];
let arr_url = [""];
let arr_path = [""];
export default function Layout() {
  const [isHovered, setIsHovered] = useState(false);
  const [isServerHovered, setIsServerHovered] = useState(false);
  const [link, setLink] = useState("");
  const submenuRef = useRef(null);

  //handle search
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState("");
  const [idMangaList, setIdMangaList] = useState("0");
  const [open, setOpen] = useState(false);
  const [checkSearch, setCheckSearch] = useState(false);
  const [url, setURL] = useState("");
  const sv = useSelector((state) => state.server.sv);
  const loading = useSelector((state) => state.server.loading);
  const navigate = useNavigate();

  //  14    "https://br.ninemanga.com",
  //                                 13    "https://de.ninemanga.com",
  //                                 16    "https://es.ninemanga.com",
  //                                 17    "https://fr.ninemanga.com",
  //                                 18    "https://it.ninemanga.com",
  //                                  5    "https://mangajar.com/manga",
  //                                  8    "https://mangajar.com",
  //                             *    6    "https://mangakomi.io/",
  //                             *    2    "https://mangareader.cc",
  //                                  7    "https://readm.org/",
  //                                  1    "https://ww5.manganelo.tv",
  //                                  0    "https://www.mangainn.net",
  const serverName = [
    {
      sv: 0,
      name: "mangainn.net",
      icon: <US title="Vietnamese" className="h-4 w-4" />,
    },
    {
      sv: 1,
      name: "ww5.manganelo.tv",
      icon: <JP title="Vietnamese" className="h-4 w-4" />,
    },
    {
      sv: 2,
      name: "mangareader.cc",
      icon: <JP title="Vietnamese" className="h-4 w-4" />,
    },
    {
      sv: 3,
      name: "ninemanga.com",
      icon: <JP title="Vietnamese" className="h-4 w-4" />,
    },
    {
      sv: 4,
      name: "bestlightnovel.com",
      icon: <XK title="Vietnamese" className="h-4 w-4" />,
    },
    {
      sv: 5,
      name: "mangajar.com/manga",
      icon: <EU title="Vietnamese" className="h-4 w-4" />,
    },
    {
      sv: 6,
      name: "mangakomi.io",
      icon: <US title="Vietnamese" className="h-4 w-4" />,
    },
    {
      sv: 7,
      name: "readm.org",
      icon: <EU title="Vietnamese" className="h-4 w-4" />,
    },
    // {
    //   sv: 8,
    //   name: "mangajar.com",
    //   icon: <XK title="Vietnamese" className="h-4 w-4" />,
    // },
    {
      sv: 9,
      name: "swatmanga.com",
      icon: <EU title="Vietnamese" className="h-4 w-4" />,
    },
    {
      sv: 10,
      name: "mangajar.com",
      icon: <JP title="Vietnamese" className="h-4 w-4" />,
    },
    {
      sv: 11,
      name: "novelhall.com",
      icon: <JP title="Vietnamese" className="h-4 w-4" />,
    },
    {
      sv: 12,
      name: "mto.com",
      icon: <JP title="Vietnamese" className="h-4 w-4" />,
    },
    {
      sv: 13,
      name: "de.ninemanga.com",
      icon: <JP title="Vietnamese" className="h-4 w-4" />,
    },
    {
      sv: 14,
      name: "br.ninemanga.com",
      icon: <JP title="Vietnamese" className="h-4 w-4" />,
    },
    {
      sv: 15,
      name: "ru.ninemanga.com",
      icon: <RU title="Vietnamese" className="h-4 w-4" />,
    },
    {
      sv: 16,
      name: "es.ninemanga.com",
      icon: <JP title="Vietnamese" className="h-4 w-4" />,
    },
    {
      sv: 17,
      name: "fr.ninemanga.com",
      icon: <FR title="Vietnamese" className="h-4 w-4" />,
    },
    {
      sv: 18,
      name: "it.ninemanga.com",
      icon: <US title="Vietnamese" className="h-4 w-4" />,
    },
    // {
    //   sv: 19,
    //   name: "azoranov.com/series/",
    //   icon: <US title="Vietnamese" className="h-4 w-4" />,
    // },
  ];

  const dispatch = useDispatch();
  function test() {
    console.log("sv:", sv);
  }
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInput((preState) => ({
      ...preState,
      [name]: value,
    }));
  };

  const handleClickOutside = (event) => {
    if (submenuRef.current && !submenuRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    navigate("/" + sv);
  }, []);
  const fetchData = (value) => {
    fetch("https://apimanga.mangasocial.online/")
      .then((response) => response.json())
      .then((res) => {
        console.log(res[1].data);
        // const results = data.filter((data) => {
        //     return data && data.title_manga && data.title_manga.toLowerCase().includes(value)
        // })
        // console.log(results)
      });
  };
  const fetchServer = async () => {
    try {
      const response = await axios.get(
        "https://apimanga.mangasocial.online/all-server"
      );
      console.log("Response: ", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.post(
        "https://apimanga.mangasocial.online/search-manga-by-name-in-sever/" +
          sv,
        input
      );
      setSearchData(response.data);
      console.log(response.data);
      if (response.status == 200) {
        setCheckSearch(true);
      }

      let a = response.data[0].id_manga;
      let url = a.lastIndexOf("/");
      path = a.slice(url + 1, 1000);
      setSearch(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  for (let i = 0; i < searchData?.length; i++) {
    arr_id_manga[i] = searchData[i].id_manga;
    arr_url[i] = arr_id_manga[i].lastIndexOf("/");
    arr_path[i] = arr_id_manga[i].slice(arr_url[i] + 1, 1000);
  }
  // console.log(arr_path);
  // console.log(path);
  const handleCloseSearch = () => {
    setCheckSearch(false);
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleServerMouseEnter = () => {
    setIsServerHovered(true);
  };

  const handleServerMouseLeave = () => {
    setIsServerHovered(false);
  };

  let getSessionData = () => {
    return sessionStorage.getItem("user_email");
    // return Handle_function.isAuthen
  };

  let isLogin = getSessionData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  useEffect(() => {
    const os = platform.os.family;

    if (os === "iOS") {
      setModalContent(ios);
      setIsModalOpen(true);
      setLink(
        "https://apps.apple.com/us/app/manga-reader-mangakomi-online/id6446646720"
      );
    } else if (os === "Android") {
      console.log("androi");
      setModalContent(adroi);
      setIsModalOpen(true);
      setLink(
        "https://play.google.com/store/apps/details?id=com.thinkdiffai.futurelove"
      );
    } else {
      console.log("Đây là laptop");
    }
  }, []);
  useEffect(() => {
    dispatch(setIsLoading(true));
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  function changeSV(index) {
    dispatch(changeServer(index));
    this.forceUpdate();
  }
  return (
    <>
      <div className="header-top">
        <div onClick={() => navigate(`/` + sv)}>
          <div className="title">
            <img
              className="img-manga"
              src="/images/logo-thinkdiff.png"
              alt=""
            ></img>
            <h3>MangaSocial</h3>
          </div>
        </div>
        <div className="menu-header">
          <div onClick={() => navigate(`/` + sv)}>
            <div
              className="comic"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <p>Comic</p>
              <img
                className="arrow-img"
                src={
                  isHovered
                    ? "/images/Polygon cam.svg"
                    : "/images/Polygon 1.svg"
                }
                alt="Arrow"
              />
            </div>
          </div>

          <div onClick={() => navigate("/" + sv + "/genres")}>
            <p>Genres</p>
          </div>

          <p>Popular</p>

          {/* <div
            className="server"
            onMouseEnter={handleServerMouseEnter}
            onMouseLeave={handleServerMouseLeave}
          >
            <p>Server</p>
            <img
              className="arrow-img"
              src={
                isServerHovered
                  ? "/images/Polygon cam.svg"
                  : "/images/Polygon 1.svg"
              }
              alt="Arrow"
            />
          </div> */}
          <div className="dropdown relative">
            <button ref={submenuRef} onClick={() => handleOpen()}>
              Server
            </button>
            {open ? (
              <ul
                className="menu grid grid-cols-2"
                onClick={() => handleOpen()}
              >
                {serverName &&
                  serverName.length > 0 &&
                  serverName.map((item) => (
                    <li
                      key={item.sv}
                      className="menu-item flex justify-start items-center pe-2"
                      onClick={() => navigate("/" + item.sv)}
                    >
                      <button onClick={() => dispatch(changeServer(item.sv))}>
                        {item.name}
                      </button>
                      <div className="">{item.icon}</div>
                    </li>
                  ))}
              </ul>
            ) : null}

            {open ? (
              ""
            ) : (
              <>
                {serverName.map((item) =>
                  item.sv === sv ? (
                    <div
                      key={item.sv}
                      className="text-red-700 text-base tracking-wide font-normal absolute top-full w-full flex justify-start items-center gap-[6px]"
                    >
                      <span>{item.name}</span>
                      <div>{item.icon}</div>
                    </div>
                  ) : (
                    ""
                  )
                )}
              </>
            )}
          </div>
          {/* SERVER LIST       index    link
          --------------------------NOVEL------------------------------------
                                        "https://www.ninemanga.com",
                                        "https://mangajar.com/",
                                  11    "https://www.novelhall.com"
                                        "https://azoranov.com/series/",         
                                   4    "https://bestlightnovel.com/",
                                  12    "https://mto.to/",
                                        "https://ru.ninemanga.com",
                                   9    "https://swatmanga.net",
                --------------------MANGA-----------------------------                        
                                  14    "https://br.ninemanga.com",
                                  13    "https://de.ninemanga.com",
                                  16    "https://es.ninemanga.com",
                                  17    "https://fr.ninemanga.com",
                                  18    "https://it.ninemanga.com",
                                   5    "https://mangajar.com/manga",
                                   8    "https://mangajar.com",
                              *    6    "https://mangakomi.io/",
                              *    2    "https://mangareader.cc",   
                                   7    "https://readm.org/",   
                                   1    "https://ww5.manganelo.tv",
                                   0    "https://www.mangainn.net",
                                        
    */}

          <div
            onClick={() => {
              dispatch(changeServer(4));

              navigate("/" + 4 + "/novel");
            }}
            // onClick={() => dispatch(changeServer(4))}
          >
            {/* redirect to server novel : bestlightnovel.com*/}
            <p className="novel">Novel</p>
          </div>
          <div onClick={() => navigate("/" + sv + `/contact-us`)}>
            <p className="contact">Contact us</p>
          </div>
          <div onClick={() => navigate("/" + sv + `/policy`)}>
            <p className="policy">Policy</p>
          </div>
          <div
            to={`https://apps.apple.com/us/app/manga-reader-mangakomi-online/id6446646720`}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg"
              alt=""
              className="w-5 h-5 lg:w-12 lg:h-12 hover:scale-105 transition-all cursor-pointer"
            />
          </div>
        </div>
        <div className="avatar_search">
          <CiSearch
            color="red"
            size={32}
            onClick={handleSearch}
            className="mr-2 cursor-pointer"
          />
          <input
            className="w-full border-none outline-none bg-transparent opacity-100"
            placeholder="Search..."
            name="content"
            onChange={handleOnChange}
            onKeyDown={handleSearch}
          />
          {!isLogin ? (
            <div className="flex justify-center align-middle items-center ml-4">
              <Link to={`/login`}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                  Login
                </button>
              </Link>
            </div>
          ) : (
            // <div to="/user-profile">
            //     <div className="avatar">
            //         <img src="/images/usersquare.svg" alt="usersquare"></img>
            //     </div>
            // </div>
            <SubMenu />
          )}
          {/*  */}
          {checkSearch ? (
            <div className="h-80 w-[17rem] bg-[#DADADA] absolute mt-[375px] ml-[50px] rounded-lg border-double flex justify-center flex-col items-center overflow-y-auto ">
              <hr className="mt-[150px]" />
              {searchData ? (
                searchData.slice(0, 3).map((item, index) => (
                  <div
                    key={index}
                    className="w-[90%] h-full border-double border-red-900 rounded-lg flex border-4 cursor-pointer  "
                  >
                    <img
                      className="w-1/3 h-[69%] py-2 rounded-lg"
                      src={item.poster}
                      alt=""
                    />
                    <div
                      to={"/" + sv + `/chapter/` + arr_path[index]}
                      onClick={() =>
                        navigate("/ + sv + /chapter/" + arr_path[index])
                      }
                      className="flex"
                    >
                      <div className="text-lg flex flex-col ml-6 justify-center">
                        <div>{item.title}</div>
                        <div>Rate:{item.rate}</div>
                        <div>Views: {item.views}</div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>Not found @@</p>
              )}

              <div className="text-white border-5 border-white bg-blue-400 rounded-lg h-6 w-24 flex text-center content-center justify-center my-2">
                <button onClick={() => handleCloseSearch()}>Close</button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <Outlet></Outlet>

      {isModalOpen && (
        <div className="absolute inset-0 flex items-center justify-center ">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="z-10 p-8 text-center bg-white rounded-md">
            <h2 className="mb-4 text-2xl font-bold">Dowload App</h2>
            <div to={link}>
              <img src={modalContent} alt="ios" style={{ width: "200px" }} />
            </div>
            <button
              onClick={closeModal}
              className="px-4 py-2 mt-4 text-white bg-red-500 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
