import React, {useContext, useState} from 'react';
import GalleryComponent from './GalleryComponent';
import {DataContext} from "../data/DataProvider";

export default function Gallery() {
    const [activeTab, setActiveTab] = useState(0);

    const {courses} = useContext(DataContext); // Use context


    // Определяем галереи для текущей вкладки
    const activeGalleries = activeTab === 0
        ? courses.flatMap((tab) => tab.galleries)
        : courses.find(tab => tab.id === activeTab)?.galleries || [];

    return (
        <main className="px-5 max-w-[1300px] mx-auto py-5 flex flex-col min-h-[52.3vh]">
            <div className="flex flex-col gap-[20px]">
                <p className="text-5xl text-color12 font-roboto-slab font-bold">Gallery</p>
            </div>
            <div className="grid

             md:grid-cols-6 sm:grid-cols-4 grid-cols-2
             w-full justify-center">
                <button
                    className={`${
                        activeTab === 0
                            ? 'border-b-[1px] border-color56 text-color56'
                            : 'text-color12'
                    } focus:outline-none font-roboto-slab font-bold text-xl mx-16 pb-2 capitalize `}
                    onClick={() => setActiveTab(0)}
                >
                    All
                </button>
                {courses.map((tab) => (
                    <button
                        key={tab.id}
                        className={`${
                            activeTab === tab.id
                                ? 'border-b-[1px] border-color56 text-color56'
                                : 'text-color12'
                        } focus:outline-none font-roboto-slab font-bold text-xl mx-16 pb-2 capitalize `}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.name}
                    </button>
                ))}
            </div>
            <div>
                <GalleryComponent key={activeTab} activeTab={activeTab} galleries={activeGalleries}/>
            </div>
        </main>
    );
}
