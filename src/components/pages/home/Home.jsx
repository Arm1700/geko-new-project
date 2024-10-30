import MainPhoto from './MainPhoto'
import lessonInfoArray from '../../../entities/lessonInfoArray'
import LessonInfo from '../shared/home/LessonInfo'
import eventsArray from '../../../entities/eventsArray'
import Event from '../events/Event'
import React, {useEffect, useLayoutEffect, useState} from "react";
import Course from "../shared/home/Course";
import Certificate from "../certificate/Certificate";
import Cooperating from "../shared/home/Cooperating";
import testimonialsArray from "../../../entities/testimonialsArray";
import Testimonials from "../shared/testimonials/Testimonials";
import Slider from "react-slick";
import img from "../../../images/Picture1.jpg"
import {A11y} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";

export default function Home() {
    const [certificate, setCertificate] = useState([]);
    const [courses, setCourses] = useState([]);
    const [slidesToShow, setSlidesToShow] = useState(4)

    useLayoutEffect(() => {
        function updateSlidesToShow() {
            const screenWidth = window.innerWidth
            if (screenWidth >= 1300) {
                setSlidesToShow(4)
            } else if (screenWidth >= 992) {
                setSlidesToShow(3)
            } else if (screenWidth >= 480) {
                setSlidesToShow(2)
            } else {
                setSlidesToShow(1)
            }
        }

        updateSlidesToShow()
        window.addEventListener('resize', updateSlidesToShow)
        return () => {
            window.removeEventListener('resize', updateSlidesToShow)
        }
    }, [])

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                // const response = await fetch(`http://127.0.0.1:8000/api/courses/`);
                const response = await fetch(`https://grandstage.gekoeducation.com/api/courses/`);
                const data = await response.json();
                console.log(data)
                setCourses(data); // Сохранение категорий в состояние
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                // const response = await fetch(`http://127.0.0.1:8000/api/certificate/`);
                const response = await fetch(`https://grandstage.gekoeducation.com/api/certifucate`);
                const data = await response.json();
                console.log(data)
                setCertificate(data); // Сохранение категорий в состояние
            } catch (error) {
                console.error('Error fetching certifucate:', error);
            }
        };

        fetchCategories();
    }, []);



    const url = ''
    return (<main>
        <MainPhoto image={url} text1="Build online cousse" text2="Get the best LMS WordPress theme "/>
        <div className='flex flex-col md:flex-row items-center justify-center p-20 gap-20 '>
            <img
                src={img}
                alt="a"
                className='w-full1 '/>
            <div className="flex flex-col justify-center gap-10 md:w-[30%] w-full">
                <p className='text-custom-28 text-color12 font-bold'>
                    Hey there, my name is John Doe. I’m the founder of the Academy.
                </p>
                <p className="text-custom-15 text-color66">
                    A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring
                    which I enjoy with my whole heart. I am alone, and feel the charm of in this spot, which was
                    created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed. The point
                    of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to
                    using ‘Content here, content here’, making it look like readable English.
                </p>
                <img
                    src="https://eduma.thimpress.com/demo-instructor/wp-content/uploads/sites/78/2019/07/mr.Johndoe.png"
                    alt="" width='220px'/>
            </div>
        </div>
        <div
            className="py-10 bg-colorF2"
        >
            <div
                className="bg-cover bg-no-repeat max-w-[1300px] mx-[auto] flex  justify-between flex-row middle:flex-row max:flex-col">
                {lessonInfoArray.map(({id, icon, title, desc}) => {
                    return <LessonInfo key={id} Icon={icon} title={title} desc={desc}/>
                })}
            </div>
        </div>

        <div
            className="flex content-center justify-center gap-20 py-10">
            <div className='popularDiv flex flex-col mx-[auto] px-5 gap-5'>
                <div className="flex justify-between gap-5 middle:flex-row flex-col">
                    <div className="text-start">
                        <h1 className="text-3xl font-roboto-slab font-bold text-color12">
                            Popular Course​s
                        </h1>
                        <p className="text-color66">
                            Limitless learning, more possibilities
                        </p>
                    </div>
                </div>
                <div className='popular'>
                    <div className="flex justify-between">
                        <Swiper
                            loop={true}
                            modules={[A11y]}
                            slidesPerView={slidesToShow}
                            spaceBetween={50}
                            speed={500}
                            onSwiper={(swiper) => console.log(swiper)}
                            onSlideChange={() => console.log('slide change')}
                        >
                            {courses.map(({image, id, name}) => (
                                <SwiperSlide key={id}
                                             style={{
                                                 display: 'flex',
                                                 justifyContent: 'center',
                                             }}
                                >
                                    <Course image={image} name={name} id={id}/>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
        <div
            className="flex content-center justify-center gap-20 py-10">
            <div className='popularDiv flex flex-col mx-[auto] px-5 gap-5'>
                <div className="flex justify-between gap-5 middle:flex-row flex-col">
                    <div className="text-start">
                        <h1 className="text-3xl font-roboto-slab font-bold text-color12">
                            Explore Certificates
                        </h1>
                        <p className="text-color66">
                            Lorem ipsum dolor sit amet.
                        </p>
                    </div>
                </div>
                <div className='popular'>
                    <Certificate certificate={certificate} slidesToShow={slidesToShow}/>
                </div>
            </div>
        </div>
        <div className="text-start pt-20 px-5 flex justify-center">
            <div
                className='mid:max-w-[1300px] w-full mid:mx-[auto] gap-5 grid mid:grid-cols-2 grid-cols-1 justify-between'>
                <div className="flex justify-between flex-col bg-colorF2 px-10 py-7  w-full">
                    <div className="text-start">
                        <h1 className="text-custom-28 font-roboto-slab font-bold text-color12 pb-5">
                            Events
                        </h1>
                    </div>
                    {eventsArray.slice(0, 3).map(({id, day, month, title, hour, place, description, image}) => {
                        return (<Event
                            key={id}
                            id={id}
                            day={day}
                            month={month}
                            title={title}
                            hour={hour}
                            place={place}
                            description={description}
                            image={image}
                        />)
                    },)}
                </div>
                <div className="flex flex-col bg-colorF2 px-10 py-7 w-full">
                    <div className="text-start">
                        <h1 className="text-3xl font-roboto-slab font-bold text-color12">
                            Our Testimonials
                        </h1>
                    </div>
                    <div className="w-full">
                        <Slider
                            slidesToShow={1}
                            dots={true}
                            infinite={true}
                            speed={500}
                            slidesToScroll={1}
                            arrows={false}
                        >
                            {testimonialsArray.slice(0, 3).map(({id, name, title, comment, image}) => {
                                return (<Testimonials
                                    key={id}
                                    name={name}
                                    image={image}
                                    title={title}
                                    comment={comment}
                                />)
                            })}
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
        <div className="text-start lg:px-20 py-20 px-5">
            <Cooperating/>
        </div>
    </main>)
}
