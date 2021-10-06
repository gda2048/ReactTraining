import s from './style.module.css'
import cn from 'classnames'

const Input = ({value, label, type="text", name, onChange, required}) => {
    return (
        <div className={s.root} name={name}>
            <input className={cn(s.input, {[s.valid]: value && value.length > 0,})}
                   value={value} type={type} onChange={onChange} required/>
            <span className={s.highlight}/>
            <span className={s.bar}/>
            <label className={s.label}>{label}</label>
        </div>
    )
}

export default Input