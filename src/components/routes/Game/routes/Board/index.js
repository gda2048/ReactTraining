import s from './style.module.css';
import {useContext, useEffect, useState} from "react";
import {PokemonContext} from "../../../../../context/pokemonContext";
import PokemonCard from "../../../../PokemonCard";
import {useHistory} from "react-router-dom";
import PlayerBoard from "./component/PlayerBoard";


const counterWIN = (board, player1, player2) => {
    let p1Count = player1.length;
    let p2Count = player2.length;
    let p1 = []
    let p2 = []
    board.forEach(
        item => {
            if (item.card.possession === 'red'){
                p2.push(item.card)
                p2Count++;
            }
            if (item.card.possession === 'blue'){
                p1.push(item.card)
                p1Count++;
            }
        }
    )
    return [p1, p2, p1Count, p2Count]
}

const BoardPage = () => {
    const {pokemons} = useContext(PokemonContext);
    const [board, setBoard] = useState([]);
    const [player1, setPlayer1] = useState(() => {
        return Object.values(pokemons).map(item => ({...item, possession: 'blue'}))
    });
    const [player2, setPlayer2] = useState([]);
    const [steps, setSteps] = useState(0);
    const [choiceCard, setChoiceCard] = useState(null);
    const history = useHistory();
    console.log('b', board)
    console.log('p', player2)
    useEffect(async () => {
        const boardResponse = await fetch('https://reactmarathon-api.netlify.app/api/board')
        const boardRequest = await boardResponse.json()
        setBoard(boardRequest.data)
        const pl2Response = await fetch('https://reactmarathon-api.netlify.app/api/create-player')
        const pl2Request = await pl2Response.json();
        setPlayer2(pl2Request.data.map( item => ({...item, possession: 'red'})));
    }, []);
    const handleClickBoardPlate = async (position) => {
        console.log('p', position)
        console.log('c', choiceCard)
        if (choiceCard) {
            const params = {
                position,
                card: choiceCard,
                board
            }
            const res = await fetch('https://reactmarathon-api.netlify.app/api/players-turn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
            })
            const request = await res.json();
            console.log('res', request)
            setBoard(request.data)
            setSteps(prevState => prevState + 1)
            if (choiceCard.player === 1){
                setPlayer1(prevState => prevState.filter(item => item.id !== choiceCard.id))
            }
            if (choiceCard.player === 2){
                setPlayer2(prevState => prevState.filter(item => item.id !== choiceCard.id))
            }
        }
    }
    if (Object.keys(pokemons).length < 5) {
        history.replace('/game');
    }

    useEffect(() => {
        if (steps === 9){
            const [p1, p2, count1, count2] = counterWIN(board, player1, player2)
            if (count1 > count2){
                alert('WIN')
            } else if (count1 < count2){
                alert('LOSE')
            } else {
                alert('DRAW')
            }
            pokemons.p1 = p1;
            pokemons.p2 = p2;
            pokemons.isFinished = true;
            history.push('/game/finish');
        }
    }, [steps])

    return (
        <div>
            <div className={s.root}>
                <div className={s.playerOne}>
                    <PlayerBoard player={1} cards={player1}
                                 onClickCard = {(card) => setChoiceCard(card)}/>
                </div>
                <div className={s.playerTwo}>
                    <PlayerBoard player={2} cards={player2} onClickCard = {(card) => setChoiceCard(card)}/>
                </div>
                <div className={s.board}>
                    {
                        board.map(
                            item =>
                                <div key={item.position}
                                     className={s.boardPlate}
                                     onClick={()=>!item.card && handleClickBoardPlate(item.position)}>
                                    {item.card && <PokemonCard {...item.card} isActive minimize />}
                                </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default BoardPage;