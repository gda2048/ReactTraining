import '../../../button.css'
import s from "./style.module.css";
import PokemonCard from "../../../../PokemonCard";
import {useState} from "react";
import {useHistory} from "react-router-dom";
import FirebaseClass from "../../../../../services/firebase";
import {useSelector} from "react-redux";
import {selectP1, selectP2, selectIsFinished} from "../../../../../store/board";

const FinishPage = () => {
    const p1 = useSelector(selectP1)
    const p2 = useSelector(selectP2)
    const isFinished = useSelector(selectIsFinished)
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
    const finishGame = async () => {
       if (card && cardID) {
           await FirebaseClass.addPokemon({...card, player:1, possession: 'blue'}, () => {})
       }
        history.replace('/game')
    }
    if (!isFinished){
        finishGame()
    }

    return (
        <div>
            <div className={s.flex}>
                {
                    p1.map((item) =>
                        <PokemonCard key={item.key} values={item.values} className={s.card}
                                     name={item.name} type={item.type} id={item.id} img={item.img} isActive minimize/>

                    )
                }
            </div>
            <button onClick={finishGame}>END GAME</button>
            <div className={s.flex}>
                {
                    p2.map((item) =>
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