import Menu from "../Menu";
import NavBar from "../NavBar";
import {useState} from "react";
import Modal from "../Modal";
import LoginForm from "../LoginForm";
import {NotificationManager} from "react-notifications";

const MenuHeader = ({ bgActive = false }) => {
    const [activeMenu, setActiveMenu] = useState(false);
    const [isOpenModel, setOpenModel] = useState(true)

    const handleMenu = () => {
        setActiveMenu(prevState=>!prevState)
    }

    const handleClickLogin = () => {
        setOpenModel(prevState => !prevState)
    }

    const handleSubmitLoginForm = async ({email, password}) => {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({email, password, returnSecureToken: true})
        }
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDqdkgenjUR8ch9nA3ceshvxYaxB3ZdWmg',
            requestOptions
        ).then(res => res.json())

        if (response.hasOwnProperty('error')){
            NotificationManager.error(response.error.message, 'Wrong!');
        } else {
            localStorage.setItem('idToken', response.idToken)
            NotificationManager.success('Success message');
            setOpenModel(false)
        }

    }

    return (
        <>
            <Menu openMenu={activeMenu} onChangeMenu={handleMenu}/>
            <NavBar openMenu={activeMenu} onChangeMenu={handleMenu} bgActive={bgActive}
                    onClickLogin={handleClickLogin}/>
            <Modal title="Log in..." onCloseModal={handleClickLogin} isOpen={isOpenModel}>
                <LoginForm onSubmit={handleSubmitLoginForm}/>
            </Modal>
        </>
    )
};


export default MenuHeader;