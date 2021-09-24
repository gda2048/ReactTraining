import '../../../button.css'
import s from "./style.module.css";
import PokemonCard from "../../../../PokemonCard";
import {FirebaseContext} from "../../../../../context/firebaseContext";
import {PokemonContext} from "../../../../../context/pokemonContext";
import {useContext, useState} from "react";
import {useHistory} from "react-router-dom";

const FinishPage = () => {
    const firebase = useContext(FirebaseContext);
    const {pokemons} = useContext(PokemonContext);
    const history = useHistory();
    const [cardID, setCardID] = useState(null)
    const [card, setCard] = useState(null)

    const handleClick = (item) => {
        if (item.id === cardID){
            setCardID(null);
            setCard(null);
        } else {
            setCardID(item.id);
            setCard(item);
        }
    }
    console.log('card', card)
    const finishGame = async () => {
        if (cardID){
            await firebase.addPokemon(card, () => {})
        }
        pokemons.p1 = []
        pokemons.p2 = []
        pokemons.isFinished = false

        history.replace('/game')
    }
    if (!pokemons.isFinished){
        finishGame()
    }

    return (
        <div>
            <div className={s.flex}>
                {
                    pokemons.p1.map((item) =>
                        <PokemonCard key={item.key} values={item.values} className={s.card}
                                     name={item.name} type={item.type} id={item.id} img={item.img} isActive minimize/>

                    )
                }
            </div>
            <button onClick={finishGame}>END GAME</button>
            <div className={s.flex}>
                {
                    pokemons.p2.map((item) =>
                        <div onClick={() => handleClick(item)} className={s.card}>
                            <PokemonCard key={item.key} values={item.values} name={item.name}
                                         type={item.type} id={item.id} img={item.img} isSelected={item.id===cardID}
                                         isActive minimize/>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
export default FinishPage;