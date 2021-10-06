import cn from 'classnames'
import s from './index.module.css'
import {ReactComponent as LoginSVG} from "../../assets/login.svg";
import {ReactComponent as UserSVG} from "../../assets/user.svg";
import {useSelector} from "react-redux";
import {selectLocalId, selectUserLoading} from "../../store/user";
import {Link} from "react-router-dom";


const NavBar = ({openMenu, onChangeMenu, bgActive, onClickLogin}) => {
    const isLoadingUser = useSelector(selectUserLoading)
    const localId = useSelector(selectLocalId)
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

                    { (!isLoadingUser && !localId) && (
                        <div className={s.loginWrap} onClick={onClickLogin}>
                            <LoginSVG/>
                        </div>)
                    }
                    {(!isLoadingUser && localId) &&
                        <Link className={s.loginWrap} to="/user">
                            <UserSVG/>
                        </Link>
                    }
                    <div className={cn(s.menuButton, {[s.active]:openMenu})}>
                        <span onClick={handleClick}/>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;