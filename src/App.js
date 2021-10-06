import { useLocation, Route, Switch, Redirect  } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import cn from 'classnames'

import HomePage from "./components/routes/Home";
import GamePage from "./components/routes/Game";
import MenuHeader from "./components/MenuHeader";
import Footer from "./components/Footer";
import NotFoundPage from "./components/routes/NotFound";
import AboutPage from "./components/routes/About";
import ContactPage from "./components/routes/Contact";
import PrivateRoute from "./components/PrivateRoute";
import {NotificationContainer} from "react-notifications";


import s from './style.module.css';
import 'react-notifications/lib/notifications.css';
import {getUserAsync, selectUserLoading} from "./store/user";



const App  = () => {
    const isLoading = useSelector(selectUserLoading);
    const location = useLocation();
    const isPadding = location.pathname === '/' || location.pathname === '/game/board';
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUserAsync());
    }, [])
    console.log(isLoading, 'IL')
    if (isLoading) {
        return 'Loading..'
    }

    return (
        <>
            <NotificationContainer/>
            <Switch>
                <Route path="/404" component={NotFoundPage}/>
                <Route>
                    <>
                        <MenuHeader bgActive={!isPadding}/>
                        <div className={cn(s.wrap, {[s.isHomePage]: isPadding})}>
                            <Switch>
                                <Route path="/" exact component={HomePage}/>
                                <Route path="/home" component={HomePage}/>
                                <PrivateRoute path="/game" component={GamePage}/>
                                <PrivateRoute path="/about" component={AboutPage}/>
                                <Route path="/contact" component={ContactPage}/>
                                <Route render={() => <Redirect to="/404" />}/>
                            </Switch>
                        </div>
                        <Footer/>
                    </>
                </Route>
            </Switch>
        </>
    )
}

export default App;