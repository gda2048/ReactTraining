import '../../../button.css'
import s from './style.module.css'
import PokemonCard from "../../../../PokemonCard";
import {useContext, useEffect, useState} from "react";
import {FirebaseContext} from "../../../../../context/firebaseContext";
import {PokemonContext} from '../../../../../context/pokemonContext';


const StartPage = ({onChangePage}) => {
    const firebase = useContext(FirebaseContext)
    const [pokemons, setPokemons] = useState({});

    const getPokemons = async () => {
        const response = await firebase.getPokemonsOnce();
        setPokemons(response);
    }

    useEffect(() => {
        firebase.getPokemonSocket((pokemons) => {setPokemons(pokemons)} )
    })

    const handleOpenPokemon = (id) => {
        setPokemons(prevState => {
            return Object.entries(prevState).reduce((acc, item) => {
                const pokemon = {...item[1]};
                const key = item[0];
                if (pokemon.id === id) {
                    pokemon.active = !pokemon.active;
                    firebase.postPokemon(key, pokemon)
                }
                acc[key] = pokemon;
                return acc;
                },
                {}
            );
        });
    };

    const handleNewPokemon = () => {
        const pok = Object.entries(pokemons)[Math.floor(Math.random() * Object.entries(pokemons).length)][1];
        firebase.addPokemon(pok, async () => {await getPokemons()} )
    }

    return (
        <PokemonContext.Provider value={[]}>
            <div>
                <button onClick={handleNewPokemon}>
                    ADD NEW POKEMON
                </button>
                <div className={s.flex}>
                    {
                        Object.entries(pokemons).map(
                            ([key, {id, name, img, type, values, active}]) =>
                                    <PokemonCard
                                        key={key}
                                        name={name}
                                        img={img}
                                        id={id}
                                        type={type}
                                        values={values}
                                        isActive={active}
                                        onClickPokemon={handleOpenPokemon}/>

                        )
                    }
                </div>
            </div>

        </PokemonContext.Provider>
    )
}

export default StartPage;