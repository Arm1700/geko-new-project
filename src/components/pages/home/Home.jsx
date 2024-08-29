import MainPhoto from './MainPhoto'
import PopularCourse from '../shared/home/PopularCourse'
import popularCoursesArray from '../../../entities/popularCoursesArray'
import lessonInfoArray from '../../../entities/lessonInfoArray'
import LessonInfo from '../shared/home/LessonInfo'
import eventsArray from '../../../entities/eventsArray'
import Event from '../events/Event'
import {useState} from "react";
import {coursesArray} from "../../../entities/coursesArray";
import Course from "../shared/home/Course";
import certifucateArray from "../../../entities/certifucateArray";
import Certifucate from "../shared/home/Certifucate";
import Cooperating from "../shared/home/Cooperating";
import testimonialsArray from "../../../entities/testimonialsArray";
import Testimonials from "../shared/testimonials/Testimonials";
import Slider from "react-slick";

export default function Home() {
    const [selectedCategory, setSelectedCategory] = useState(1);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const filteredCourses = selectedCategory
        ? popularCoursesArray.filter(course => course.category === selectedCategory)
        : popularCoursesArray;
    console.log(filteredCourses)

    const url = '../../../images/banner-home-2.jpg'
    return (<main>
            <MainPhoto image={url} text1="Build online cousse" text2="Get the best LMS WordPress theme "/>
            <div className='flex flex-col md:flex-row items-center justify-center p-20 gap-20 '>
                <img src="https://eduma.thimpress.com/demo-instructor/wp-content/uploads/sites/78/2019/07/img-about-min.png" alt=""/>
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
                    <img src="https://eduma.thimpress.com/demo-instructor/wp-content/uploads/sites/78/2019/07/mr.Johndoe.png" alt="" width='220px'/>
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
                        <div className="flex sm:gap-10 justify-between">
                            {coursesArray.slice(0, 4).map(({id, text}) => (
                                <button
                                    key={id}
                                    className={`font-roboto-slab-sans capitalize opacityPopularCourse font-bold ${selectedCategory === id ? 'text-color56' : 'text-color12'}`}
                                    onClick={() => handleCategoryClick(id)}
                                >
                                    {text}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="popular transition-all duration-300">
                        {filteredCourses.slice(0, 4).map(({image, id, title}) => {
                            return (<PopularCourse
                                id={id}
                                image={image}
                                title={title}
                                key={id}
                            />)
                        })}
                    </div>
                </div>
            </div>
            <Course/>
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
                    <div className="popular">
                        {certifucateArray.slice(0, 4).map(({id, image, name}) => {
                            return (<Certifucate
                                id={id}
                                image={image}
                                name={name}
                                key={id}
                            />)
                        })}
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
                                },)}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-start lg:px-20 py-20 px-5">
                <Cooperating/>
            </div>
        </main>
    )
}
