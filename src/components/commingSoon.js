import React from "react";

import CardComming from "./cardComming";
import useFetch from "../hooks/useFetch";

const CommingSoon = () => {
    const commingSoon = useFetch(3);


    const firstThreeItem = commingSoon.slice(0, 4);

    return (
        <div className="grid md:grid-cols-2 2xl:grid-cols-4 gap-[30px] px-[60px] pb-[60px]">
            {firstThreeItem.map((item, index) => (
                <CardComming
                    key={index}
                    poster={item?.image_poster_link_goc}
                    title={item?.title_manga}
                    genres={item?.categories}
                    update={item.time_release}
                />
            ))}
        </div>
    );
};

export default CommingSoon;
