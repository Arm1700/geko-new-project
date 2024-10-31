import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Error404 from '../../shared/Error';
import Slider from "react-slick";
import {DataContext} from "../../data/DataProvider";

export default function CoursePage() {
    const { id: courseId } = useParams();
    const nav = useNavigate();
    const { getCourseById, loading, error } = useContext(DataContext); // Получаем необходимые данные из контекста
    const courseOne = getCourseById(courseId); // Получаем курс по ID

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const sliderSettings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        speed: 500,
        lazyLoad: "progressive",
        arrows: false
    };

    return (
        <section className="bgColorArticle relative pb-5">
            {courseOne ? (
                <article className="grid md:grid-cols-[50%_50%] md:grid-rows-[60%_50%] grid-cols-1 max-w-[1200px] mx-auto relative">
                    <div className="flex flex-col relative px-auto text-pseudo items-center justify-center py-10">
                        <div className="flex flex-col gap-[20px] px-5">
                            <p className="text-2xl text-center font-bold font-roboto-slab text-color12">{courseOne.name}</p>
                            <p className="text-custom-15 opacity-80 text-color12">{courseOne.desc}</p>
                        </div>
                    </div>
                    <div className="flex flex-col lg:mx-1 mx-5 md:sticky static border-[1px] top-1 mt-8 h-min gap-[10px] bg-pseudo">
                        {courseOne?.galleries?.length > 1 ? (
                            <Slider {...sliderSettings}>
                                {courseOne.galleries.map(({ img, id }) => (
                                    <div key={id} className="w-full h-full">
                                        <img
                                            src={img}
                                            alt={`Course_${id}`}
                                            style={{
                                                width: '100%',
                                                maxWidth: '100%',
                                                height: 'auto',
                                                maxHeight: '60vh',
                                                objectFit: 'cover',
                                                aspectRatio: '4/3'
                                            }}
                                        />
                                    </div>
                                ))}
                            </Slider>
                        ) : (
                            courseOne?.galleries?.[0] && (
                                <img
                                    src={courseOne.galleries[0].img}
                                    alt="Gallery"
                                    style={{
                                        width: '100%',
                                        maxWidth: '100%',
                                        height: 'auto',
                                        maxHeight: '60vh',
                                        objectFit: 'cover',
                                        aspectRatio: '4/3'
                                    }}
                                />
                            )
                        )}
                        <div className="flex flex-col justify-start items-start px-[10%] py-[20px] gap-[10px]">
                            <button
                                onClick={() => nav(`/contacts`)}
                                className="self-center w-full py-[10px] px-[25px] rounded-[4px] text-white uppercase font-bold text-sm bg-color56">
                                Sign Up
                            </button>
                            <ul className="flex px-[9px] justify-center items-center gap-3 w-full pt-3">
                                <li className="flex items-center justify-center w-[32px] h-[32px] border-2 rounded-full opacity-50">
                                    <a href="https://www.facebook.com/">
                                        <i className="fa fa-facebook-f"></i>
                                    </a>
                                </li>
                                <li className="flex items-center justify-center w-[32px] h-[32px] border-2 rounded-full opacity-50">
                                    <a href="https://www.instagram.com/">
                                        <i className="fa fa-instagram"></i>
                                    </a>
                                </li>
                                <li className="flex items-center justify-center w-[32px] h-[32px] border-2 rounded-full opacity-50">
                                    <a href="https://www.youtube.com/">
                                        <i className="fa fa-youtube-play"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </article>
            ) : (
                <Error404 />
            )}
        </section>
    );
}
