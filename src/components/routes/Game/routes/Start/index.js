import '../../../button.css'
import s from './style.module.css'
import PokemonCard from "../../../../PokemonCard";
import {useEffect, useState} from "react";
import {useHistory} from 'react-router-dom'

import {
    selectPokemonsData, getPokemonsAsync, selectPok, selectSelectedPokemons, emptyPokemons,
} from "../../../../../store/pokemons";
import {useDispatch, useSelector} from "react-redux";
import {emptyBoard} from "../../../../../store/board";


const StartPage = ({onChangePage}) => {
    const pokemonsRedux = useSelector(selectPokemonsData)
    const pokemonsSelectedRedux = useSelector(selectSelectedPokemons)

    const dispatch = useDispatch()
    const [pokemons, setPokemons] = useState({});

    const history = useHistory()
    const StartGameClick = () => {
        history.push('/game/board')
    }


    useEffect(() => {
        dispatch(emptyBoard())
        dispatch(emptyPokemons())
        dispatch(getPokemonsAsync());
    }, [])
    useEffect(() => {
        setPokemons(pokemonsRedux);
    }, [pokemonsRedux])


    const selectPokemon = (key) => {
        const pokemon = { ...pokemons[key] }

        if (selectPossible(pokemon.selected)){
            dispatch(selectPok({key, pokemon}))
            setPokemons(prevState => ({...prevState,
                    [key]: {...prevState[key], selected: !prevState[key].selected}}))
        }
	}

	const selectPossible = (selected) => {
        return Object.keys(pokemonsSelectedRedux).length < 5 || selected
    }

    return (
        <div>
            <div>
                <div style={{ marginBottom: "10%" }}>
                    <button onClick={StartGameClick} disabled={Object.keys(pokemonsSelectedRedux).length < 5}>
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