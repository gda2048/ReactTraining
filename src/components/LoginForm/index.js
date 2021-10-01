import {useState} from "react";
import Input from "../Modal/components/Input";

import s from './style.module.css'

const LoginForm = ({onSubmit}) => {
    const [email, setEmail] = useState('some@mail.ru')
    const [password, setPassword] = useState('')
    const [isLogin, setIsLogin] = useState(false)

    const handleClick = (e) => {
        e.preventDefault()
        onSubmit && onSubmit({email, password, isLogin});
        setEmail('')
        setPassword('')
    }

    return (
        <form onSubmit={handleClick}>
            <div>
                <Input
                      label="Email"
                      value={email}
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <Input
                      label="Password"
                      value={password}
                      type="password"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className={s.wrapper}>
                <button>
                    {isLogin ? 'Login' : 'Register'}
                </button>
                <button className={s.change} onClick={() => setIsLogin(prevState => !prevState)}>
                    {isLogin ? 'Register':'Login'}
                </button>
            </div>
        </form>
    )
}

export default LoginForm;