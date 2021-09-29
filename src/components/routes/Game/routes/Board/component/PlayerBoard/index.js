import PokemonCard from "../../../../../../PokemonCard";
import cn from 'classnames';
import s from "./style.module.css";
import {useState} from "react";

const PlayerBoard = ({turn, player, cards, onClickCard}) => {
    const [isSelected, setSelected] = useState(null);
    return (
        <div>
            {
                cards.map((item) => {
                    return (<div className={cn(s.cardBoard,
                                               {[s.selected]: isSelected === item.id})}
                         onClick={() => {
                             if (turn === player) {
                                 setSelected(item.id);
                                 onClickCard && onClickCard({player, ...item});
                             }
                         }}>
                        <PokemonCard key={item.key} values={item.values}
                                     name={item.name} type={item.type} id={item.id} img={item.img} isActive minimize
                                     possession/>
                    </div>)
                })
            }
        </div>
    )
}

export default PlayerBoard;