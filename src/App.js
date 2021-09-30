import { useLocation, Route, Switch, Redirect  } from "react-router-dom";
import cn from 'classnames'

import HomePage from "./components/routes/Home";
import GamePage from "./components/routes/Game";
import MenuHeader from "./components/MenuHeader";
import Footer from "./components/Footer";
import NotFoundPage from "./components/routes/NotFound";
import AboutPage from "./components/routes/About";
import ContactPage from "./components/routes/Contact";

import s from './style.module.css'


const App  = () => {
    const location = useLocation();
    const isPadding = location.pathname === '/' || location.pathname === '/game/board';

    return (
        <Switch>
            <Route path="/404" component={NotFoundPage}/>
            <Route>
                <>
                    <MenuHeader bgActive={!isPadding}/>
                    <div className={cn(s.wrap, {[s.isHomePage]: isPadding})}>
                        <Switch>
                            <Route path="/" exact component={HomePage}/>
                            <Route path="/home" component={HomePage}/>
                            <Route path="/game" component={GamePage}/>
                            <Route path="/about" component={AboutPage}/>
                            <Route path="/contact" component={ContactPage}/>
                            <Route render={() => <Redirect to="/404" />}/>
                        </Switch>
                    </div>
                    <Footer/>
                </>
            </Route>
        </Switch>
    )
}

export default App;