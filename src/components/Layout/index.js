import cn from 'classnames'
import s from './index.module.css'


const Layout = (props) => {
    const background = {backgroundImage: `url("${props.urlBg}")`, backgroundColor: props.colorBg}
    return (
        <section className={s.root} style={background}>
            <div className={s.wrapper}>
                <article>
                    <div className={s.title}>
                        <h3> {props.title} </h3>
                        <span className={s.separator}></span>
                    </div>
                    <div className={cn(s.desc, s.full)}>
                        {props.children}
                    </div>
                </article>
            </div>
        </section>
    )
}

export default Layout;