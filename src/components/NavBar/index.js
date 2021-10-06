import cn from 'classnames'
import s from './index.module.css'
import {ReactComponent as LoginSVG} from "../../assets/login.svg";


const NavBar = ({openMenu, onChangeMenu, bgActive, onClickLogin}) => {
    const handleClick = () => {
        onChangeMenu && onChangeMenu(openMenu)
    }

    return (
        <nav id={s.navbar} className={cn(s.root, {[s.bgActive]: bgActive})}>
            <div className={s.navWrapper}>
                <p className={s.brand}>
                    LOGO
                </p>
                <div className={s.loginAndMenu}>
                    <div className={s.loginWrap} onClick={onClickLogin}>
                        <LoginSVG/>
                    </div>
                    <div className={cn(s.menuButton, {[s.active]:openMenu})}>
                        <span onClick={handleClick}/>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;