import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, A11y} from "swiper/modules";
import React, {useContext, useRef, useState} from "react";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/swiper-bundle.css';
import {DataContext} from "../data/DataProvider";

export default function Certificate({slidesToShow}) {
    const swiperRef2 = useRef(null);
    const { certificate } = useContext(DataContext); // Use context

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const handleImageClick = (index) => {
        setSelectedImageIndex(index);
        setIsModalOpen(true); // Открываем модальное окно
    };

    const closeModal = () => {
        setIsModalOpen(false); // Закрываем модальное окно
        setSelectedImageIndex(0); // Сбрасываем индекс выбранного изображения
    };

    // Закрытие модального окна при клике на фон
    const handleModalClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal(); // Закрываем окно только если клик на фон, а не на изображение
        }
    };

    return (
        <div className='flex justify-between items-center relative'>
            {/* Кастомные стрелки */}
            <div className="custom-button-prev2" onClick={() => swiperRef2.current?.slidePrev()}>
                &lt; {/* Левый символ */}
            </div>
            <Swiper
                loop={true}
                modules={[Navigation, A11y]}
                navigation={{
                    nextEl: '.custom-button-next2',
                    prevEl: '.custom-button-prev2',
                }}
                slidesPerView={slidesToShow}
                spaceBetween={50}
                speed={500}
                onSwiper={(swiper) => {
                    swiperRef2.current = swiper; // Сохраняем ссылку на экземпляр Swiper
                }}
                onSlideChange={() => console.log('slide change')}
            >
                {certificate.map(({id, img}, index) => (
                    <SwiperSlide key={id}
                                 style={{
                                     display: 'flex',
                                     justifyContent: 'center',
                                 }}
                    >
                        <div
                            className=" py-[30px]  border border-gray-300 flex justify-center flex-col gap-7"
                            onClick={() => handleImageClick(index)}
                            style={{
                                textAlign: 'center',
                                padding: '15px',
                            }}
                        >
                            <img
                                src={img}
                                alt={`Certificate ${id}`}
                                className="certificate-image max-w-full max-h-[200px] object-contain mx-auto"
                                style={{
                                    height: 'auto',
                                    maxHeight: '300px',
                                    width: '100%',
                                }}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="custom-button-next2" onClick={() => swiperRef2.current?.slideNext()}>
                &gt; {/* Правый символ */}
            </div>
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
                    onClick={handleModalClick} // Обрабатываем клик на фон
                >
                    <div className="relative w-full h-full max-w-5xl max-h-[90%] flex items-center justify-center">
                        <Swiper
                            loop={true}
                            initialSlide={selectedImageIndex} // Начинаем с выбранного изображения
                            modules={[Navigation, A11y]}
                            slidesPerView={1}
                            navigation
                            pagination={{clickable: true}}
                            onSlideChange={(swiper) => setSelectedImageIndex(swiper.activeIndex)}
                        >
                            {certificate.map(({id, img}) => (
                                <SwiperSlide key={id}>
                                    <div className="flex justify-center items-center h-[80vh]">
                                        <img src={img} alt={`Certificate ${id}`}
                                             className="max-w-full max-h-full object-contain"/>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-white text-[30px] hover:text-red-500"
                        >
                            ✖
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
