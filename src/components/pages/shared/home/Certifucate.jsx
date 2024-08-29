// import {FaExternalLinkAlt} from 'react-icons/fa'
// import {useNavigate} from 'react-router-dom'
// import {useState} from 'react'

export default function Certifucate({
                                        id,
                                          image,
                                          name,
                                      }) {
    return (<article className="border-[1px] flex flex-col justify-center items-center">
            <img src={image} alt=""/>
            <p className="py-[20px] text-lg text-color12 font-roboto-slab font-bold">{name}</p>
        </article>
    )
}
