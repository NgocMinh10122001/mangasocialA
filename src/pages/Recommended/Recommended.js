import React from "react";
import CardManga from "../../components/cardManga";
import useFetch from "../../hooks/useFetch";

const Page_Recommended = () => {
    const recommended = useFetch(2);
    function getRandomGenres(arr, count) {
        const shuffled = arr.slice();
        const result = [];

        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * shuffled.length);
            const selectedMonth = shuffled.splice(randomIndex, 1)[0];

            result.push(selectedMonth);
        }

        return result;
    }

    return (
        <div className="bg-black px-[60px] pb-[60px]">
            <div className="grid grid-cols-6 gap-[20px]">
                {getRandomGenres(recommended, 6).map((item, index) => (
                    <CardManga
                        key={index}
                        poster={item?.image_poster_link_goc}
                        title={item?.title_manga}
                        rate={item?.rate}
                        update={item?.time_release}
                        chapter={item?.chapter_new}
                        path_segment={item?.path_segment_manga}

                    />
                ))}
            </div>
        </div>
    );
};

export default Page_Recommended;
