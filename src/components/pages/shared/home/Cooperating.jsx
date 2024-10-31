import React, {useRef} from 'react';
import Slider from 'react-slick';
import cooperatingArray from "../../../../entities/cooperatingArray";

export default function Cooperating() {
    let sliderRef2 = useRef(null);

    console.log()
    return (
        <div className="slider-container relative py-7">
            <div>
                <div className='px-5 max-w-[1300px] mx-[auto]'>
                    <Slider
                        ref={sliderRef2}
                        slidesToShow={5} // Dynamically adjust based on array length
                        swipeToSlide={true}
                        focusOnSelect={true}
                        centerMode={true}
                        initialSlide={0} // Start at the center
                        centerPadding={"0"}  // Remove center padding for smaller screens
                        variableWidth={false}  // Disable variable width for smaller screens
                        autoplay={true} // Enable autoplay
                        autoplaySpeed={3000} // Set autoplay speed in milliseconds (e.g., 3000ms = 3s)
                        arrows={false}
                        responsive={[
                            {
                                breakpoint: 768, // Adjust breakpoint for smaller screens if needed
                                settings: {
                                    slidesToShow: 3,
                                    initialSlide: 3, // Start at the center
                                },
                            },
                        ]} // Handle responsiveness (optional)
                    >
                        {cooperatingArray.map((review, i) => (
                            <div key={review.id} className="text-center">
                                <img
                                    src={review.image}

                                    className={`rounded-full mx-auto p-2 border-color86 `}
                                    style={{
                                        aspectRatio: "1 / 1",
                                    }}
                                    alt={'user ' + review.name}
                                />
                                <div key={review.id} className="flex justify-center items-center text-center">
                                    <p className="mt-5 text-primaryDark font-bold text-lg">{review.name}</p>
                                </div>
                            </div>

                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
}
