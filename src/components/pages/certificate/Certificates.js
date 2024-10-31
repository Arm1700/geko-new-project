import React, {useState, useContext, useEffect, useRef} from 'react';
import { IoSearch } from "react-icons/io5";
import { DataContext } from "../data/DataProvider";
import {Swiper, SwiperSlide} from "swiper/react";
import {A11y, Navigation} from "swiper/modules";

export default function Certificates() {
    const swiperRef4 = useRef(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const { certificate } = useContext(DataContext); // Используем контекст


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
    // Обработка нажатий клавиш
    const handleKeyDown = (event) => {
        if (event.key === 'ArrowRight') {
            swiperRef4.current?.slideNext(); // Переключаем на следующий слайд
        } else if (event.key === 'ArrowLeft') {
            swiperRef4.current?.slidePrev(); // Переключаем на предыдущий слайд
        }
    };
    // Добавляем обработчик событий клавиатуры
    useEffect(() => {
        if (isModalOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isModalOpen]);
    return (
        <main className="px-5 max-w-[1300px] mx-auto py-5 flex flex-col min-h-[52.3vh]">
            <div className="flex flex-col gap-[20px]">
                <p className="text-5xl text-color12 font-roboto-slab font-bold">Gallery</p>
            </div>
            <div>
                <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-14 pt-5">
                    {certificate.map((gallery, index) => (
                        <div
                            key={gallery.id}
                            className="rounded cursor-pointer relative overflow-hidden"
                        >
                            <img
                                src={gallery.img}
                                alt={gallery.title || "Gallery Image"}
                                className="transition-transform duration-300"
                            />
                            <div
                                className="absolute inset-0 bg-gray-600 opacity-0 hover:opacity-60 transition-opacity duration-300"
                                onClick={() => handleImageClick(index)}
                            >
                                <div className="flex justify-center items-center h-full">
                                    <IoSearch className="text-white text-[30px] transition-transform duration-300 transform" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Модальное окно */}
                {isModalOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
                        onClick={handleModalClick} // Обрабатываем клик на фон
                    >
                        <div className="custom-button-prev3" onClick={() => swiperRef4.current?.slidePrev()}>
                            &lt; {/* Левый символ */}
                        </div>
                        <div className="relative w-full h-full max-w-5xl max-h-[90%] flex items-center justify-center">
                            <Swiper
                                loop={true}
                                initialSlide={selectedImageIndex} // Начинаем с выбранного изображения
                                modules={[Navigation, A11y]}
                                slidesPerView={1}
                                navigation={{
                                    nextEl: '.custom-button-next3',
                                    prevEl: '.custom-button-prev3',
                                }}
                                onSwiper={(swiper) => {
                                    swiperRef4.current = swiper; // Сохраняем ссылку на экземпляр Swiper
                                }}
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
                            <div className="custom-button-next3" onClick={() => swiperRef4.current?.slideNext()}>
                                &gt; {/* Правый символ */}
                            </div>
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
        </main>
    );
}
