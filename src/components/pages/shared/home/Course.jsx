import React from 'react';
import {coursesArray} from '../../../../entities/coursesArray'; // Assuming correct import path
import 'swiper/css';
import 'swiper/css/pagination';

import {useNavigate} from "react-router-dom";
import popularCoursesArray from "../../../../entities/popularCoursesArray";
const countPostsPerCategory = (popularCoursesArray) => {
    const counts = {};
    popularCoursesArray.forEach(({ category }) => {
        counts[category] = (counts[category] || 0) + 1;
    });
    return counts;
};

const postCounts = countPostsPerCategory(popularCoursesArray);
const CourseSlider = () => {
    const nav = useNavigate()

    return (<div className="max:px-5 py-16 mx-auto max-w-[1300px] grid md:grid-cols-4 mid:grid-cols-2 grid-cols-1 gap-7">
                {coursesArray.map(({image, id, text}) => (
                    <article
                        key={id}
                        onClick={() => nav(`/course-category/${id}`)}
                        className="cursor-pointer relative hover:border-color56 opacityPopularCourse2 border-[1px] flex flex-col gap-3 justify-center p-7 items-center ">
                        <img src={image} alt="Course"/>
                        <p className="font-bold text-color12  hover:text-color56 text-base font-roboto-slab w-[90%] text-center">{text}</p>
                        {/* eslint-disable-next-line array-callback-return */}
                        <p className="text-color66  text-base font-roboto-slab w-[90%] text-center">{`${postCounts[id] || 0} Courses`}</p>
                    </article>
                ))}
        </div>
    );
};

export default CourseSlider;
