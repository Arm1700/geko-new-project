import { FaExternalLinkAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Course({
                                          gridStyleTF = true,
                                          image,
                                          id,
                                          name,
                                          desc,
                                      }) {
    const nav = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <article
            className={`w-full border-gray h-min transition-opacity duration-1000 ${isMounted ? 'opacity-100' : 'opacity-0'} ${gridStyleTF === true ? "none border" : "sm:flex border-b pb-5"}`}
        >
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => nav(`/courses/${id}`)}
                className={`relative bg-no-repeat bg-cover cursor-pointer ${gridStyleTF === true ? "w-[100%]" : "sm:w-[400px] w-full"}`}
                style={{
                    backgroundImage: isHovered
                        ? `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${image})`
                        : `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center', // Центрирует изображение
                    width: '100%', // Полная ширина контейнера
                    height: '100%', // Полная высота контейнера
                    aspectRatio: '1/1', // Квадратное соотношение сторон
                }}
            >
                <FaExternalLinkAlt
                    className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-pseudo transition-opacity duration-300 ${isHovered ? 'opacity-80' : 'opacity-0'}`}
                />
            </div>
            <div
                className={`w-[100%] ${gridStyleTF === true ? "h-[35%] items-center py-[30px] px-[20px]" : "w-full py-[30px] sm:pl-10 sm:px-0 sm:py-0 h-[100%] gap-4"} flex flex-col justify-center`}
            >
                <p
                    className={`hover:text-color56 cursor-pointer transition-colors uppercase duration-300 ${gridStyleTF === true ? "text-custom-15 text-center" : "text-xl"} font-medium text-primaryDark font-roboto-slab transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-70'}`}
                    onClick={() => nav(`/courses/${id}`)}
                >
                    {name}
                </p>
                <p
                    className={`${gridStyleTF === true ? "items-center" : ""} text-custom-15 font-medium text-color60 font-roboto `}
                >
                    {gridStyleTF === true ? "" : desc}
                </p>
            </div>
        </article>
    );
}
