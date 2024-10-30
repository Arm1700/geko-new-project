import Menu from './Menu';
import {useState} from 'react';
import MobileMenu from './MobileMenu';

export default function Header() {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <header className="flex flex-col bg-colorFb w-full">
            <div>
                <Menu toggleMenu={toggleMenu} showMenu={showMenu}/>
            </div>
            <MobileMenu isOpen={showMenu} toggleMenu={toggleMenu}/>
        </header>
    );
}
