import React from 'react';
import Logo from '../pages/shared/Logo';
import {FaPhoneAlt} from 'react-icons/fa';
import {MdOutlinePlace} from 'react-icons/md';
import {MdMarkEmailRead} from 'react-icons/md';
import {routesArray} from '../../entities/routesArray';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import socialsArray from '../../entities/socialsArray';

const Footer = () => {
    const {t} = useTranslation()
    return (
        <footer className="bg-color33 text-pseudo h-[auto]  bottom-0 left-0 w-full">
            <div
                className="flex middle:flex-row flex-col middle:items-center justify-between px-5 py-20 mx-[auto] gap-5 max-w-[1300px]">
                <div className="flex flex-col gap-5 ">
                    <Logo/>
                    <p className="flex text-color92">
                        <FaPhoneAlt className="mx-2 text-white"/>
                        +374 898989889
                    </p>
                    <p className="flex text-color92">
                        <MdOutlinePlace className="mx-2 text-white"/>
                        London,UK
                    </p>
                    <p className="flex text-color92">
                        <MdMarkEmailRead className="mx-2 text-white"/>
                        sadasd@aasd.sda
                    </p>
                </div>
                <ul className='flex content-start middle:flex-row flex-col flex-wrap gap-3 middle:order-none order-2 text-color92'>
                    {routesArray.map(({path, name, id}) => {
                        return (
                            <li className='' key={id}>
                                <Link to={path}>
                                    {t(name)}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
                <ul className='flex gap-3 middle:justify-between'>
                    {
                        socialsArray.map(({id, name, Icon, href}) => {
                            return (
                                <a href={href}>
                                    <Icon title={name} key={id} className='text-white text-3xl'/>
                                </a>
                            )
                        })
                    }
                </ul>
            </div>
        </footer>
    );
};

export default Footer;