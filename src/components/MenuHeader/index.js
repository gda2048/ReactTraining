import Menu from "../Menu";
import NavBar from "../NavBar";
import {useState} from "react";
import Modal from "../Modal";
import LoginForm from "../LoginForm";
import {NotificationManager} from "react-notifications";
import {useDispatch} from "react-redux";
import {getUserAsync, removeUser} from "../../store/user";
import {useHistory} from "react-router-dom";
import firebase from '../../services/firebase'

const KEY = 'AIzaSyDqdkgenjUR8ch9nA3ceshvxYaxB3ZdWmg'

const loginSignupUser = async ({email, password, type}) => {
     const requestOptions = {
            method: 'POST',
            body: JSON.stringify({email, password, returnSecureToken: true})
     }
     switch (type){
         case 'signup':
             return await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${KEY}`, requestOptions).then(res => res.json());
         case 'login':
             return await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${KEY}`, requestOptions).then(res => res.json());
     }
}

const MenuHeader = ({ bgActive = false }) => {
    const [activeMenu, setActiveMenu] = useState(false);
    const [isOpenModel, setOpenModel] = useState(false)
    const dispatch = useDispatch();
    const history = useHistory()

    const handleMenu = () => {
        setActiveMenu(prevState=>!prevState)
    }

    const handleClickLogout = () => {
        localStorage.removeItem('idToken');
        dispatch(removeUser());
        history.replace('/');
  };

    const handleClickLogin = () => {
        setOpenModel(prevState => !prevState)
    }

    const handleSubmitLoginForm = async (props) => {
        const response = await loginSignupUser(props);

        if (response.hasOwnProperty('error')){
            NotificationManager.error(response.error.message, 'Wrong!');
        } else {
            if (props.type === 'signup'){
                const pokemonStart = await fetch(' https://reactmarathon-api.herokuapp.com/api/pokemons/starter').then(res => res.json());
                for (const item of pokemonStart.data){
                    await fetch(`https://pokemon-game-599b0-default-rtdb.firebaseio.com/${response.localId}/pokemons.json?auth=${response.idToken}`, {
                        method: 'POST',
                        body: JSON.stringify(item)
                    })
                }
            }
            firebase.setLocalID(response.localId)
            localStorage.setItem('idToken', response.idToken)
            NotificationManager.success('Success message');
            dispatch(getUserAsync())
            setOpenModel(false)
        }

    }

    return (
        <>
            <Menu openMenu={activeMenu} onChangeMenu={handleMenu}/>
            <NavBar openMenu={activeMenu} onChangeMenu={handleMenu} bgActive={bgActive}
                    onClickLogin={handleClickLogin} onClickLogout={handleClickLogout}/>
            <Modal title="Authentication" onCloseModal={handleClickLogin} isOpen={isOpenModel}>
                <LoginForm isResetField={!isOpenModel} onSubmit={handleSubmitLoginForm}/>
            </Modal>
        </>
    )
};


export default MenuHeader;