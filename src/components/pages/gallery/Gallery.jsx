import React, { useEffect, useState } from 'react';
import GalleryComponent from './GalleryComponent';

export default function Gallery() {
    const [tabs, setTabs] = useState([]);
    const [activeTab, setActiveTab] = useState(0);
    const [allGalleries, setAllGalleries] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/courses/`);
                const data = await response.json();
                setTabs(data);
                const combinedGalleries = data.flatMap((tab) => tab.galleries);
                setAllGalleries(combinedGalleries);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCourses();
    }, []);

    // Определяем галереи для текущей вкладки
    const activeGalleries = activeTab === 0
        ? allGalleries
        : tabs.find(tab => tab.id === activeTab)?.galleries || [];

    return (
        <main className="px-5 max-w-[1300px] mx-auto py-5 flex flex-col min-h-[52.3vh]">
            <div className="flex flex-col gap-[20px]">
                <p className="text-5xl text-color12 font-roboto-slab font-bold">Gallery</p>
            </div>
            <div className="flex justify-center w-full flex-wrap">
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
                        {tab.name}
                    </button>
                ))}
            </div>
            <div>
                <GalleryComponent key={activeTab} activeTab={activeTab} galleries={activeGalleries} />
            </div>
        </main>
    );
}
