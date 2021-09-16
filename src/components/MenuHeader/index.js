import Menu from "../Menu";
import NavBar from "../NavBar";
import {useState} from "react";

const MenuHeader = ({ bgActive = false }) => {
    const [activeMenu, setActiveMenu] = useState(false);
    const handleMenu = () => {
        setActiveMenu(prevState=>!prevState)
    }
    return (
        <>
            <Menu openMenu={activeMenu} onChangeMenu={handleMenu}/>
            <NavBar openMenu={activeMenu} onChangeMenu={handleMenu} bgActive={bgActive}/>
        </>
    )
};


export default MenuHeader;