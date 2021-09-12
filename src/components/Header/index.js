import s from './index.module.css'

const Header = ({title, descr}) => {
    // let count = 1;
    // setInterval(() => {
    //     count++;
    //     console.log(count);
    // }, 1000)
    return (
        <header className={s.root}>
            <div className={s.forest}> </div>
            <div className={s.container}>
                <h1>{title}</h1>
                <p>{descr}</p>
            </div>
        </header>
    )
}

export default Header;