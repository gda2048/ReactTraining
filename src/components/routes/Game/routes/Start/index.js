import '../../../button.css'
import s from './style.module.css'
import PokemonCard from "../../../../PokemonCard";
import {useContext, useEffect, useState} from "react";
import {useHistory} from 'react-router-dom'
import {FirebaseContext} from "../../../../../context/firebaseContext";
import {PokemonContext} from "../../../../../context/pokemonContext";


const StartPage = ({onChangePage}) => {
    const firebase = useContext(FirebaseContext)
    const pokemonsContext = useContext(PokemonContext)
    const [pokemons, setPokemons] = useState({});

    const history = useHistory()
    const StartGameClick = () => {
        history.push('/game/board')
    }

    const getPokemons = async () => {
        const response = await firebase.getPokemonsOnce();
        setPokemons(response);
    }

    useEffect(() => {
        firebase.getPokemonSocket((pokemons) => {setPokemons(pokemons)} )
        return () => {firebase.offPokemonSocket()}
    }, [])

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

    const selectPokemon = (key) => {
        const pokemon = { ...pokemons[key] }
        if (selectPossible(pokemon.selected)){
            pokemonsContext.selectPokemon(key, pokemon)
            setPokemons(prevState => ({
                ...prevState,
                [key]: {
                    ...prevState[key],
                    selected: !prevState[key].selected
                }
            }))
        }
	}

	const selectPossible = (selected) => {
        return Object.keys(pokemonsContext.pokemons).length < 5 || selected
    }

    const handleNewPokemon = () => {
        const pok = Object.entries(pokemons)[Math.floor(Math.random() * Object.entries(pokemons).length)][1];
        firebase.addPokemon(pok, async () => {await getPokemons()} )
    }
    console.log(pokemons);

    return (
        <div>
            <div>
                <div style={{ marginBottom: "10%" }}>
                    <button onClick={handleNewPokemon}>
                        ADD NEW POKEMON
                    </button>

                    <button
                        onClick={StartGameClick}
                        disabled={Object.keys(pokemonsContext.pokemons).length < 5}
                    >
                        Start Game
                    </button>
                </div>
                <div className={s.flex}>
                    {
                        Object.entries(pokemons).map(
                            ([key, {id, name, img, type, values, selected}]) =>
                                    <PokemonCard
                                        key={key}
                                        name={name}
                                        img={img}
                                        id={id}
                                        type={type}
                                        values={values}
                                        isActive={true}
                                        isSelected={selected}
                                        onClickPokemon={() => selectPokemon(key)}
                                        className={s.card}/>
                        )
                    }
                </div>
            </div>

        </div>
    )
}

export default StartPage;