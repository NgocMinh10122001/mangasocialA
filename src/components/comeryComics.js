import React from "react";
import CardManga from "./cardManga";
import useFetch from "../hooks/useFetch";

const ComedyComics = () => {
  const comedyComics = useFetch(5);
  const firstFiveItem = comedyComics.slice(0, 10);
  return (
    <div className="grid md:grid-cols-7 2xl:grid-cols-10 gap-[20px] px-[60px] pb-[60px]">
      {firstFiveItem.map((item, index) => (
        <CardManga
          key={index}
          poster={item?.image_poster_link_goc}
          title={item?.title_manga}
          rate={item?.rate}
          update={item.time_release}
          chapter={item?.chaper_new}
          path_segment={item?.path_segment_manga}
        />
      ))}
    </div>
  );
};

export default ComedyComics;
