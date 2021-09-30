import s from './style.module.css'


const Input = ({value, label, type="text", name, onChange}) => {
    return (
        <div className={s.root} name={name}>
            <input value={value} type={type} className={s.input} onChange={onChange} required/>
            <span className={s.highlight}/>
            <span className={s.bar}/>
            <label className={s.label}>{label}</label>
        </div>
    )
}

export default Input