import cn from 'classnames'
import s from './index.module.css'


const NavBar = ({openMenu, onChangeMenu, bgActive}) => {
    const handleClick = () => {
        onChangeMenu && onChangeMenu(openMenu)
    }

    return (
        <nav id={s.navbar} className={cn(s.root, {[s.bgActive]: bgActive})}>
            <div className={s.navWrapper}>
                <p className={s.brand}>
                    LOGO
                </p>
                <div className={cn(s.menuButton, {[s.active]:openMenu})}>
                    <span onClick={handleClick}/>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;