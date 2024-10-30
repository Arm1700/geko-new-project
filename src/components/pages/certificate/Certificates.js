import React, {useState, useEffect, useCallback} from 'react';
import {IoSearch} from "react-icons/io5";

export default function Certificates() {

    const [certificates, setCertificates] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = useCallback((image) => {
        setSelectedImage(image);
        setIsModalOpen(true); // Открываем модальное окно
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false); // Закрываем модальное окно
        setSelectedImage(null); // Очищаем выбранное изображение
    }, []);

    // Закрытие модального окна при клике на фон
    const handleModalClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal(); // Закрываем окно только если клик на фон, а не на изображение
        }
    };



    useEffect(() => {
        const fetchCategories = async () => {
            try {
                // const response = await fetch(`http://127.0.0.1:8000/api/certificate/`);
                const response = await fetch(`https://grandstage.gekoeducation.com/api/certificate`);
                const data = await response.json();
                console.log(data)
                setCertificates(data); // Сохранение категорий в состояние
            } catch (error) {
                console.error('Error fetching certificate:', error);
            }
        };

        fetchCategories();
    }, []);

    return (<main className="px-5 max-w-[1300px] mx-auto py-5 flex flex-col min-h-[52.3vh]">
        <div className="flex flex-col gap-[20px]">
            <p className="text-5xl text-color12 font-roboto-slab font-bold">Gallery</p>
        </div>
        <div>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-7 pt-5">
                {certificates.map((gallery) => (
                    <div
                        key={gallery.id}
                        className="opacityPopularCourse rounded cursor-pointer relative overflow-hidden aspect-w-1 aspect-h-3"
                    >
                        <img
                            src={gallery.img}
                            alt={gallery.title || "Gallery Image"} // Лучше использовать alt с описанием
                            className="object-cover w-full h-full transition-transform duration-300"
                        />
                        <div
                            className="absolute inset-0 bg-gray-600 opacity-0 hover:opacity-60 transition-opacity duration-300"
                            onClick={() => handleImageClick(gallery.img)} // Обрабатываем клик по изображению
                        >
                            <div className="flex justify-center items-center h-full">
                                <IoSearch
                                    className="text-white text-[30px] transition-transform duration-300 transform"/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Модальное окно */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
                    onClick={handleModalClick} // Обрабатываем клик на фон
                >
                    <div className="relative">
                        <img src={selectedImage} alt="Selected" className="max-w-full max-h-screen"/>
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-white text-[30px] hover:text-red-500"
                        >
                            ✖
                        </button>
                    </div>
                </div>
            )}
        </div>
    </main>);
}
