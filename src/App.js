import {useState} from "react";
import HomePage from "./components/routes/Home";
import GamePage from "./components/routes/Game";

const App  = () => {
    const [page, setPage] = useState('app')

    const handleChangePage = (page) => {
        setPage(page)
    }

    switch (page) {
        case "app":
            return <HomePage onChangePage={handleChangePage}/>
        case "game":
            return <GamePage onChangePage={handleChangePage}/>
        default:
            return <HomePage />
    }
}

export default App;