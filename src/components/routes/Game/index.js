import '../button.css'
import {useHistory} from "react-router-dom";
import s from './style.module.css'
import PokemonCard from "../../PokemonCard";
import POKEMONS from "../../PokemonCard/pokemons";
import {useState} from "react";


const GamePage = ({onChangePage}) => {
    const [pokemons, setPokemons] = useState(() => [...POKEMONS]);
    const handleOpenPokemon = (id) => {
        setPokemons((prevState) => prevState.map(pokemon => pokemon.id === id ? { ...pokemon, "active":!pokemon.active} : pokemon))
    }
    return (
        <div>
            <div>
                <div className={s.flex}>
                    {
                        pokemons.map(item => <PokemonCard key={item.id} name={item.name} img={item.img} id={item.id}
                                                          type={item.type} values={item.values} isActive={item.active}
                                                          onClickPokemon={handleOpenPokemon}/>)
                    }
                </div>
            </div>

        </div>
    )
}

export default GamePage;