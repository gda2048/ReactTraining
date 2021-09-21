import {useRouteMatch, Switch, Route} from 'react-router-dom'
import BoardPage from "./routes/Board";
import StartPage from "./routes/Start";
import FinishPage from "./routes/Finish";
import {PokemonContext} from "../../../context/pokemonContext";
import {useState} from "react";


const GamePage = () => {
    const [pokemons, selectPokemon] = useState({});
    const handlePokemon = (key, pokemon) => {
        selectPokemon(prevState => ({...prevState, [key]: pokemon}));
    }
    const match = useRouteMatch();
    return (
        <PokemonContext.Provider value={{pokemons: pokemons, selectPokemon: handlePokemon}}>
        <Switch>
            <Route path={`${match.path}/`} exact component={StartPage} />
            <Route path={`${match.path}/board`} component={BoardPage} />
            <Route path={`${match.path}/finish`} component={FinishPage} />
        </Switch>
        </PokemonContext.Provider>
    );
};

export default GamePage;