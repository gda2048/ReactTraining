import cn from 'classnames'
import s from './index.module.css'


const NavBar = ({openMenu, onChangeMenu}) => {
    const handleClick = () => {
        onChangeMenu && onChangeMenu(openMenu)
    }

    console.log('NavBar', openMenu)
    return (
        <nav className={s.root}>
            <div className={s.navWrapper}>
                <p className={s.brand}>
                    LOGO
                </p>
                <a className={cn(s.menuButton, openMenu?s.active:'')}>
                    <span onClick={handleClick}/>
                </a>
            </div>
        </nav>
    )
}

export default NavBar;