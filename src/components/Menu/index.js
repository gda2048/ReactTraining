import {Link} from "react-router-dom";
import cn from 'classnames'
import s from './index.module.css'

const MENU = [
    {
        title: 'HOME',
        to: '/'
    },
    {
        title: 'GAME',
        to: '/game'
    },
    {
        title: 'ABOUT',
        to: '/about'
    },
    {
        title: 'CONTACT',
        to: '/contact'
    }
]

const Menu = ({openMenu, onChangeMenu}) => {
    const handleClick = () => {
        onChangeMenu && onChangeMenu(openMenu);
    }
    return (
        <div className={cn(s.menuContainer, openMenu ?s.active:s.deactive)}>
            <div className={s.overlay}/>
            <div className={s.menuItems}>
                <ul>
                    {
                        MENU.map(({title, to}, index) =>
                            <li key={index}>
                                <Link to={to} onClick={handleClick}>
                                    {title}
                                </Link>
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}

export default Menu;