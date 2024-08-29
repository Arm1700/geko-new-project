import React, {useState} from 'react'
import {MdOutlinePlace} from 'react-icons/md'
import {TbClockHour3} from 'react-icons/tb'
import {useNavigate} from "react-router-dom";

export default function Event({
                                 id, day, month, title, hour, place
                              }) {
    const nav = useNavigate();
    const handleCategoryClick = (id) => {
        nav(`/events/${id}`);
    };
    const [isMenuVisible, setMenuVisible] = useState(false);
    const handleMouseEnter = () => {
        setMenuVisible(true);
    };

    const handleMouseLeave = () => {
        setMenuVisible(false);
    };
    return (<section
        className=" border-t-[1px] py-[30px] border-gray-300 flex gap-5 sm:items-center sm:flex-row max:relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <div
            className={`flex flex-col px-3 py-1 max:bg-white max:text-center border-[1px] ${isMenuVisible ? 'border-color56' : ''}`}>
                <span
                    className={`text-color12 font-bold text-xl leading-60`}>
          {day}
        </span>
            <span className="text-color66 leading-[25px] font-sans-serif">{month.slice(0, 3)}</span>
        </div>
        <div className={`gap-2 flex md:pr-32 px-0 flex-col`}

        >
            <h5 className="text-lg font-bold hover:text-color56 text-color12 font-roboto-slab transition-colors duration-300 cursor-pointer"
                onClick={() => handleCategoryClick(id)}
            >{title}</h5>
            <div className="flex gap-3 items-center text-color66 ">
                <TbClockHour3 className="w-[21px]"/> <span className="text-sm">{hour}</span>
                <MdOutlinePlace/> <span className="text-sm">{place}</span>
            </div>
        </div>
    </section>)
}
