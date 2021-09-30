import Layout from "../../../components/Layout";
import Header from "../../../components/Header";
import PokemonCard from "../../../components/PokemonCard";
import LayoutImage from "../../../assets/bg1.jpg"
import POKEMONS from "../../PokemonCard/pokemons";

import '../button.css'
import s from "./style.module.css"
import {useState} from "react";



const HomePage = ({onChangePage}) => {
    const [pokemons, setPokemons] = useState(() => [...POKEMONS]);
    const handleOpenPokemon = (id) => {
        setPokemons((prevState) => prevState.map(pokemon => pokemon.id === id ? { ...pokemon, "active":!pokemon.active} : pokemon))
    }

    const handleClickButton = (page) => {
        onChangePage && onChangePage(page);
    }
    return (
        <>
            <Header title='Dmytro Honcharov Game' descr='React Learning' onClickButton={handleClickButton}/>
            <Layout title='Game' urlBg={LayoutImage} desc="First Layout">
                <p>In the game two players face off against one another, one side playing as "blue", the other as "red"
                    on a 3x3 grid.</p>
                <p>Each player has five cards in a hand and the aim is to capture the opponent's cards by turning them
                    into the player's own color of red or blue.</p>
                <p>To win, a majority of the total ten cards played (including the one card that is not placed on the
                    board) must be of the player's card color. To do this, the player must capture cards by placing a
                    card adjacent to an opponent's card whereupon the 'ranks' of the sides where the two cards touch
                    will be compared. If the rank of the opponent's card is higher than the player's card, the player's
                    card will be captured and turned into the opponent's color. If the player's rank is higher, the
                    opponent's card will be captured and changed into the player's color instead. </p>
            </Layout>
            <Layout title='Cards' colorBg='red'>
                <div className={s.flex}>
                    {
                        pokemons.map(item => <PokemonCard key={item.id} name={item.name} img={item.img} id={item.id}
                                                          type={item.type} values={item.values} className={s.card}
                                                          isActive={item.active} onClickPokemon={handleOpenPokemon}/>)
                    }
                </div>
            </Layout>

            <Layout title='Title 3' urlBg={LayoutImage}>
                <p>Third</p>
                <img src={LayoutImage} alt='Logo' width='50%'/>
            </Layout>
        </>
    );
};

export default HomePage;
