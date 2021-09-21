import s from './style.module.css';
import {useContext} from "react";
import {PokemonContext} from "../../../../../context/pokemonContext";
import PokemonCard from "../../../../PokemonCard";

const BoardPage = () => {
    const {pokemons} = useContext(PokemonContext);
    return (
        <div>
            <div className={s.root}>
                            <div className={s.playerOne}>
                                        {Object.values(pokemons).map(( { key, values, name, type, id, img }) => (
                                              <PokemonCard className={s.card} key={key} values={values}
                                                name={name} type={type} id={id} img={img} isActive minimize
                                              />
                                            ))}
                            </div>
                <div className={s.board}>
                    <div className={s.boardPlate}>1</div>
                    <div className={s.boardPlate}>2</div>
                    <div className={s.boardPlate}>3</div>
                    <div className={s.boardPlate}>4</div>
                    <div className={s.boardPlate}>5</div>
                    <div className={s.boardPlate}>6</div>
                    <div className={s.boardPlate}>7</div>
                    <div className={s.boardPlate}>8</div>
                    <div className={s.boardPlate}>9</div>
                </div>
            </div>
        </div>
    );
};

export default BoardPage;