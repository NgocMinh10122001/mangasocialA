import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardManga from "../../components/cardManga";

const MangaCategory = () => {
  const [manga, setManga] = useState([]);
  const params = useParams();
  const { category } = params;
  console.log(manga);

  const getManga = async () => {
    const resposne = await axios.get(
      `https://apimanga.mangasocial.online/manga-categories/${category}`
    );
    setManga(resposne.data);
  };

  useEffect(() => {
    getManga();
  }, []);
    const extractNovelId = (url) => {
    const parts = url.split('/');
    return parts.find(part => part.startsWith('novel_'));
  };
  const extractChapterId = (url) => {
    const parts = url.split('/');
    const chapterPart = parts.find(part => part.startsWith('chapter_'));
    return chapterPart ? chapterPart.split('_')[1] : null;
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <div className="bg-black px-[60px] pb-[60px]">
      <div className="">
        <h2 className="text-[57px] leading-[64px] font-semibold text-[#FFFFFF] pt-[50px] pb-[60px]">
          {capitalizeFirstLetter(category)}
        </h2>
      </div>
      <div className="grid grid-cols-5 gap-[20px]">
        {console.log("chek manga", manga)}
        {manga.slice(0, 20).map((item, index) => (
          <CardManga
            key={index}
            poster={item?.poster}
            title={item?.title}
            rate={item?.rate}
            update={item.time_release}
            chapter={extractChapterId(item?.chaper_new)}
            path_segment={extractNovelId(item?.chaper_new)}
          />
        ))}
      </div>
    </div>
  );
};

export default MangaCategory;
