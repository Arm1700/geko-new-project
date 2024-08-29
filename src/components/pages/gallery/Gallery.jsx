import React, {useState} from 'react'
import galleryArray from '../../../entities/galleryArray'

export default function Gallery() {
    const [activeTab, setActiveTab] = useState(1)
    const [hoveredImage, setHoveredImage] = useState(null);
    const tabs = [
        {title: 'All', id: 1},
        {title: 'Business', id: 2},
        {title: 'Design / Branding', id: 3},
        {title: 'Blog', id: 4},
    ]
    const handleMouseEnter = (id) => {
        setHoveredImage(id);
    };

    const handleMouseLeave = () => {
        setHoveredImage(null);
    };

    return (
        <main className="px-5 max-w-[1300px] mx-auto py-5 flex flex-col">
            <div className="flex flex-col gap-[20px]">
                <p className="text-5xl text-color12 font-roboto-slab font-bold">Gallery</p>
            </div>
            <div className="flex justify-center w-full flex-wrap">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`${
                            activeTab === tab.id
                                ? 'border-b-[1px] border-color56 text-color56'
                                : 'text-color12'
                        } focus:outline-none font-roboto-slab font-bold text-xl mx-16 pb-2 capitalize `}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.title}
                    </button>
                ))}
            </div>
            <div>
                <div className="opacityPopularCourse grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-7 pt-5">
                    {galleryArray.map((items) => (
                        (items.status === activeTab || activeTab === 1) && (
                            <div
                                key={items.id} // Make sure each item has a unique key
                                className={`rounded cursor-pointer relative overflow-hidden max-h-[400px]`}
                                onMouseEnter={() => handleMouseEnter(items.id)}
                                onMouseLeave={handleMouseLeave}
                            >
                                {hoveredImage === items.id ? (
                                    <>
                                        <div className="w-full relative overflow-hidden items-end">
                                            <div className="bottom-0 w-full text-white flex items-center p-10"
                                                 style={{
                                                     backgroundColor: items.color
                                                 }}>
                                                <p className="text-2xl font-roboto-slab font-bold">
                                                    {items.name}
                                                </p>
                                            </div>
                                            {hoveredImage === items.id && (
                                                <div
                                                    className=" inset-0 bg-blue-500 opacity-50 transition-opacity  duration-300"
                                                    style={{backgroundColor: items.color}}
                                                >
                                                    <img
                                                        src={items.image}
                                                        alt=""
                                                        className={`cursor-pointer overflow-hidden w-full object-cover`}
                                                    />
                                                    <div
                                                        className="absolute inset-0 bg-blue-500 opacity-50 transition-opacity h-full duration-300"
                                                        style={{backgroundColor: items.color}}
                                                    >
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <img
                                        src={items.image}
                                        alt=""
                                        className="rounded cursor-pointer w-full transition-transform duration-300"
                                    />
                                )}

                            </div>
                        )
                    ))}
                </div>
            </div>
        </main>
    )
}
