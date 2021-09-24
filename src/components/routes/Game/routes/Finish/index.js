import '../../../button.css'
import s from "./style.module.css";
import PokemonCard from "../../../../PokemonCard";
import {PokemonContext} from "../../../../../context/pokemonContext";
import {useContext} from "react";
import {useHistory} from "react-router-dom";

const FinishPage = () => {
    const {pokemons} = useContext(PokemonContext);
    const history = useHistory();

    const finishGame = () => {
        pokemons.p1 = []
        pokemons.p2 = []
        pokemons.isFinished = false

        history.replace('/game')
    }
    if (!pokemons.isFinished){
        finishGame()
    }
    console.log(pokemons)
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
                        <PokemonCard key={item.key} values={item.values} className={s.card}
                                     name={item.name} type={item.type} id={item.id} img={item.img} isActive minimize/>
                    )
                }
            </div>
        </div>
    )
}
export default FinishPage;