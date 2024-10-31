import React, {useContext, useState} from 'react'
import Event from './Event2'
import {DataContext} from "../data/DataProvider";

export default function Events() {
    const [activeTab, setActiveTab] = useState('happening')
    const {events} = useContext(DataContext); // Use context

    const tabs = [
        {title: 'happening', id: 1},
        {title: 'upcoming', id: 2},
        {title: 'expired', id: 3},
    ]

    return (
        <main className="px-5 max-w-[1300px] mx-auto py-5 flex flex-col min-h-[52.3vh]">
            <h1 className="text-5xl font-roboto-slab font-bold text-color12">
                Events
            </h1>
            <div className="flex justify-center w-full flex-wrap">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`${
                            activeTab === tab.title
                                ? 'border-b-[1px] border-color56 text-color56'
                                : 'text-color12'
                        } focus:outline-none font-roboto-slab font-bold text-xl mx-16 pb-2 capitalize `}
                        onClick={() => setActiveTab(tab.title)}
                    >
                        {tab.title}
                    </button>
                ))}
            </div>
            <div className="text-start">
                {events.map(
                    ({
                         id,
                         status,
                         day,
                         month,
                         title,
                         hour,
                         place,
                         description,
                         image,
                     }) => {
                        return (
                            status === activeTab && (
                                <Event
                                    id={id}
                                    day={day}
                                    month={month}
                                    title={title}
                                    hour={hour}
                                    place={place}
                                    description={description}
                                    image={image}
                                />
                            )
                        )
                    },
                )}
            </div>
        </main>
    )
}
