import React from 'react'

export default function Testimonials({
                                         name, image, title, comment
                              }) {
    return (<section
        className="py-[30px] border-gray-300  flex flex-col gap-7">
        <p>{title}</p>
        <p>{comment}</p>
        <div className="flex items-center gap-5">
            <img className="w-[60px] rounded-full" src={image} alt=""/>
            <p className="font-roboto-slab-sans text-color12 font-bold">{name}</p>
        </div>
    </section>)
}
