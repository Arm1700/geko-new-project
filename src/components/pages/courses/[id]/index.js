import React, {useLayoutEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import popularCoursesArray from '../../../../entities/popularCoursesArray'
import Error404 from '../../shared/Error'
import {coursesArray} from "../../../../entities/coursesArray";
import {A11y, Pagination} from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';
import {Swiper, SwiperSlide} from 'swiper/react';
import PopularCourse from "../../shared/home/PopularCourse";

export default function CoursePage() {
    const {id: course,} = useParams()
    const nav = useNavigate();

    const [slidesToShow, setSlidesToShow] = useState(3)
    const [spaceBetween, setSpaceBetween] = useState(30)

    const pickedCourse =
        popularCoursesArray?.find(el => el.id === +course)
    const courses =
        coursesArray?.find(el => el.id === +pickedCourse.category)

    useLayoutEffect(() => {
        function updateSlidesToShow() {
            const screenWidth = window.innerWidth
            if (screenWidth >= 992) {
                setSlidesToShow(3)
                setSpaceBetween(30)
            } else if (screenWidth >= 480) {
                setSlidesToShow(2)
                setSpaceBetween(10)
            } else {
                setSlidesToShow(1)
                setSpaceBetween(30)
            }
        }

        updateSlidesToShow()
        window.addEventListener('resize', updateSlidesToShow)
        return () => {
            window.removeEventListener('resize', updateSlidesToShow)
        }
    }, [])
    return (
        <section className="bgColorArticle md:before:h-[32%] before:h-[0] relative pb-5">
            {pickedCourse?.id ? (
                <>
                    <article className="grid  md:grid-cols-[70%_1fr] grid-cols-1 max-w-[1300px] mx-[auto] relative">
                        <div className="flex flex-col relative px-auto text-pseudo pt-[75px] justify-center py-5">
                            <div className="flex flex-col gap-[20px] px-5">
                                <p className="text-3xl font-roboto-slab">{pickedCourse.title}</p>
                                <p className="text-custom-15 opacity-80 ">{pickedCourse.desc}</p>
                                <div className="flex flex-col gap-[5px]">
                                    <p className="text-xs capitalize">categories</p>
                                    <p className="text-custom-15">{courses.text}</p>
                                </div>
                            </div>

                            <div className="w-[100%] h-[100%] absolute bg-primaryDark z-[-1]">

                            </div>
                        </div>

                        <div
                            className="flex  flex-col lg:mx-1 mx-5  md:sticky static border-[1px]  top-1 mt-8  h-min  gap-[10px] bg-pseudo"
                            style={{
                                gridRow: "span 2"
                            }}>
                            <img src={pickedCourse.image} alt={pickedCourse.title}/>
                            <div className="flex flex-col justify-start  items-start px-[20px] py-[20px] gap-[10px]">
                                <p className="text-2xl text-center font-bold font-roboto-slab">{pickedCourse.title}</p>
                                <button
                                    onClick={() => nav(`/contacts`)}
                                    className="self-center w-[100%] py-[10px] px-[25px] rounded-[4px] text-white uppercase font-bold text-sm bg-color56">sign
                                    up
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
                        <div className="pr-2 md:order-none py-20 px-5  order-2 ">
                            <div className="border-[1px] p-5">
                                <h2 className="text-lg uppercase w-full font-roboto-slab font-bold pb-5 border-b text-primaryDark">
                                    Overview
                                </h2>
                                <div className="text-start  pt-5 ">
                                    <h1 className="text-lg font-roboto-slab font-bold text-primaryDark">
                                        COURSE DESCRIPTION
                                    </h1>
                                    <p className="text-custom-15 text-color60">{pickedCourse.desc}</p>
                                </div>
                            </div>
                            <p className="relative uppercase font-roboto-slab text-2xl py-10 font-bold">
                                Similar Options
                            </p>
                            <Swiper
                                loop={true}
                                modules={[Pagination, A11y]}
                                spaceBetween={spaceBetween}
                                slidesPerView={slidesToShow}
                                // pagination={{
                                //     clickable: true,
                                //     dynamicBullets: true,
                                //     dynamicMainBullets: 2,
                                //     renderBullet,
                                // }}
                                speed={500}
                                navigation
                                onSwiper={(swiper) => console.log(swiper)}
                                onSlideChange={() => console.log('slide change')}
                            >
                                {popularCoursesArray.slice(0, 6).map(({image, id, title}) => (
                                    <SwiperSlide key={id}>
                                        <PopularCourse
                                            id={id}
                                            image={image}
                                            title={title}
                                            key={id}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                    </article>

                </>
            ) : (
                <Error404/>
            )}
        </section>
    )
}
