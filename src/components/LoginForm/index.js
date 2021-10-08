import {useEffect, useState} from "react";
import Input from "../Modal/components/Input";

import s from './style.module.css'

const LoginForm = ({onSubmit, isResetField = false}) => {
    const [email, setEmail] = useState('goncharovdma@gmail.com')
    const [password, setPassword] = useState('')
    const [isLogin, setIsLogin] = useState(true)

    useEffect(() => {
        setEmail('')
        setPassword('')
    }, [isResetField]);

    const handleClick = (e) => {
        e.preventDefault()
        onSubmit && onSubmit({email, password, type: isLogin?'login':'signup'});
        setEmail('')
        setPassword('')
    }

    return (
        <form onSubmit={handleClick}>
            <Input label="Email" value={email} name="email" onChange={(e) => setEmail(e.target.value)}/>
            <Input label="Password" value={password} type="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
            <div className={s.flex}>
                <button>
                    {isLogin ? 'Login' : 'Register'}
                </button>
                <div className={s.link} onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'Register':'Login'}
                </div>
            </div>
        </form>
    )
}

export default LoginForm;