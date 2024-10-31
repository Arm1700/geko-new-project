import React, {useLayoutEffect, useState, memo, useRef, useContext} from "react";
import MainPhoto from "./MainPhoto";
import lessonInfoArray from "../../../entities/lessonInfoArray";
import LessonInfo from "../shared/home/LessonInfo";
import Event from "../events/Event";
import Course from "../shared/home/Course";
import Certificate from "../certificate/Certificate";
import Cooperating from "../shared/home/Cooperating";
import testimonialsArray from "../../../entities/testimonialsArray";
import Testimonials from "../shared/testimonials/Testimonials";
import Slider from "react-slick";
import img from "../../../images/Picture1.jpg";
import { A11y, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation'; // Если используете навигацию
import 'swiper/css/pagination';
import {DataContext} from "../data/DataProvider"; // Если используете пагинацию

const MemoizedEvent = memo(Event);
const MemoizedTestimonials = memo(Testimonials);

export default function Home() {
    const {courses, certificate,events} = useContext(DataContext); // Use context
    const swiperRef = useRef(null);
    const [slidesToShow, setSlidesToShow] = useState(4);


    // Adjust slider display based on screen width
    useLayoutEffect(() => {
        function updateSlidesToShow() {
            const screenWidth = window.innerWidth;
            if (screenWidth >= 1300) setSlidesToShow(4);
            else if (screenWidth >= 992) setSlidesToShow(3);
            else if (screenWidth >= 480) setSlidesToShow(2);
            else setSlidesToShow(1);
        }

        updateSlidesToShow();
        window.addEventListener("resize", updateSlidesToShow);
        return () => window.removeEventListener("resize", updateSlidesToShow);
    }, []);

    return (
        <main>
            <MainPhoto image="" text1="Build online courses" text2="Get the best LMS WordPress theme"/>

            <div className="flex flex-col md:flex-row items-center justify-center p-20 gap-20">
                <img src={img} alt="Academy Founder" loading="lazy"/>
                <div className="flex flex-col justify-center gap-10 md:w-[30%] w-full">
                    <p className="text-custom-28 text-color12 font-bold">
                        Hey there, my name is John Doe. I’m the founder of the Academy.
                    </p>
                    <p className="text-custom-15 text-color66">
                        A wonderful serenity has taken possession of my soul, like these sweet mornings of spring. The
                        charm of this spot was created for the bliss of souls like mine. I am so happy, my dear friend,
                        so absorbed. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of
                        letters, making it look like readable English.
                    </p>
                    <img
                        src="https://eduma.thimpress.com/demo-instructor/wp-content/uploads/sites/78/2019/07/mr.Johndoe.png"
                        alt="Founder John Doe" width="220px" loading="lazy"/>
                </div>
            </div>

            <div className="py-10 bg-colorF2">
                <div className="bg-cover bg-no-repeat max-w-[1300px] mx-auto flex justify-between flex-row middle:flex-row max:flex-col">
                    {lessonInfoArray.map(({ id, icon, title, desc }) => (
                        <LessonInfo key={id} Icon={icon} title={title} desc={desc} />
                    ))}
                </div>
            </div>

            <div className="flex content-center justify-center gap-20 py-10">
                <div className="popularDiv flex flex-col mx-auto px- gap-5">
                    <div className="flex justify-between gap-5 middle:flex-row flex-col">
                        <div className="text-start">
                            <h1 className="text-3xl font-roboto-slab font-bold text-color12 ">Popular Courses</h1>
                            <p className="text-color66">Limitless learning, more possibilities</p>
                        </div>
                    </div>
                    <div className="popular flex items-center relative" >
                        <div className="custom-button-prev" onClick={() => swiperRef.current.slidePrev()}>
                            &lt;
                        </div>
                        <Swiper
                            loop
                            modules={[Navigation, A11y]}
                            navigation={{
                                nextEl: '.custom-button-next',
                                prevEl: '.custom-button-prev',
                            }}
                            slidesPerView={slidesToShow}
                            spaceBetween={50}
                            speed={500}
                            onSwiper={(swiper) => {
                                swiperRef.current = swiper; // Сохранение ссылки на Swiper
                            }}

                        >
                            {courses.map(({ image, id, name }, index) => (
                                <SwiperSlide
                                    key={id}
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Course image={image} name={name} id={id} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className="custom-button-next" onClick={() => swiperRef.current.slideNext()}>
                            &gt;
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex content-center justify-center gap-20 py-10">
                <div className="popularDiv flex flex-col mx-auto px-5 gap-5">
                    <div className="flex justify-between gap-5 middle:flex-row flex-col">
                        <div className="text-start">
                            <h1 className="text-3xl font-roboto-slab font-bold text-color12">Explore Certificates</h1>
                            <p className="text-color66">Lorem ipsum dolor sit amet.</p>
                        </div>
                    </div>
                    <div className="popular">
                        <Certificate certificate={certificate} slidesToShow={slidesToShow} />
                    </div>
                </div>
            </div>

            <div className="text-start pt-20 px-5 flex justify-center">
                <div className="mid:max-w-[1300px] w-full mid:mx-auto gap-5 grid mid:grid-cols-2 grid-cols-1 justify-between">
                    <div className="flex justify-between flex-col bg-colorF2 px-10 py-7 w-full">
                        <h1 className="text-custom-28 font-roboto-slab font-bold text-color12 pb-5">Events</h1>
                        {events.slice(0, 3).map(({ id, day, month, title, hour, place, description, image }) => (
                            <MemoizedEvent key={id} id={id} day={day} month={month} title={title} hour={hour}
                                           place={place} description={description} image={image} />
                        ))}
                    </div>
                    <div className="flex flex-col bg-colorF2 px-10 py-7 w-full">
                        <h1 className="text-3xl font-roboto-slab font-bold text-color12">Our Testimonials</h1>
                        <Slider slidesToShow={1} autoplay={true}>
                            {testimonialsArray.map(({ id, name, comment, image }) => (
                                <MemoizedTestimonials key={id} name={name} comment={comment} image={image} />
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
            <Cooperating />
        </main>
    );
}
