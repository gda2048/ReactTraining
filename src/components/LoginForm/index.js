import {useState} from "react";
import Input from "../Modal/components/Input";

const LoginForm = ({onSubmit}) => {
    const [email, setEmail] = useState('some@mail.ru')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit && onSubmit({email, password});
        setEmail('')
        setPassword('')
    }

    return (
        <form onSubmit={handleSubmit}>
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
             <button>
                Login
            </button>
        </form>
    )
}

export default LoginForm;