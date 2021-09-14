import Menu from "../Menu";
import NavBar from "../NavBar";
import {useState} from "react";

const MenuHeader = () => {
    const [activeMenu, setActiveMenu] = useState(false);
    const handleMenu = (activeMenu) => {
        setActiveMenu(!activeMenu)
    }
    return (
        <>
            <Menu openMenu={activeMenu}/>
            <NavBar openMenu={activeMenu} onChangeMenu={handleMenu}/>
        </>
    )
};


export default MenuHeader;