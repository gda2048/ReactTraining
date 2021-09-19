import '../button.css'
import s from './style.module.css'
import PokemonCard from "../../PokemonCard";
import {useEffect, useState} from "react";
import database from "../../../services/firebase";


const GamePage = ({onChangePage}) => {
    const [pokemons, setPokemons] = useState({});

    useEffect(() => {
        database.ref('pokemons').once('value', (snapshot) => {
            setPokemons(snapshot.val());
        })
    })

    const handleOpenPokemon = (id) => {
        setPokemons(prevState => {
            return Object.entries(prevState).reduce((acc, item) => {
                const pokemon = {...item[1]};
                const key = item[0];
                if (pokemon.id === id) {
                    pokemon.active = !pokemon.active;
                    database.ref('pokemons/' + key).set(pokemon);
                };
                acc[key] = pokemon;
                return acc;
                },
                {}
            );
        });
    };

    const handleNewPokemon = () => {
        const pok = Object.entries(pokemons)[Math.floor(Math.random() * Object.entries(pokemons).length)][1];
        console.log(pok, 'POK')
        const newKey = database.ref().child('pokemons').push().key;
        database.ref('pokemons/' + newKey).set(pok);
    }

    return (
        <div>
            <div>
                <button onClick={handleNewPokemon}>
                    ADD NEW POKEMON
                </button>
                <div className={s.flex}>
                    {
                        Object.entries(pokemons).map(
                            ([key, {id, name, img, type, values, active}]) => {
                                if (id !== undefined) {
                                    return <PokemonCard key={key} name={name} img={img} id={id} type={type}
                                                        values={values}
                                                        isActive={active} onClickPokemon={handleOpenPokemon}/>
                                }
                            }
                        )
                    }
                </div>
            </div>

        </div>
    )
}

export default GamePage;