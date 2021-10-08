import s from './style.module.css';
import {useEffect, useState} from "react";
import PokemonCard from "../../../../PokemonCard";
import {useHistory} from "react-router-dom";
import PlayerBoard from "./component/PlayerBoard";
import ArrowChoice from "./component/ArrowChoice";
import Result from "./component/Result";
import {useDispatch, useSelector} from "react-redux";
import {selectSelectedPokemons, selectPokemonsData} from "../../../../../store/pokemons";
import {fill, selectPlayer1, setPlayer2} from "../../../../../store/board";
import request from "../../../../../services/requests";


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

export const returnBoard = (board) => {
    return board.map((item, index) => {
        let card = null;
        if (typeof item === 'object'){
            card =  {
                ...item.poke,
                 possession: (item.holder === 'p1') ? 'blue': 'red'
            }
        }
        return {
            position: index + 1,
            card
        }
    })
}

const BoardPage = () => {
    const history = useHistory();
    const dispatch = useDispatch()
    const player1Selector = useSelector(selectPlayer1)
    const pokemonsSelectedSelector = useSelector(selectSelectedPokemons)
    const pokemonsSelector = useSelector(selectPokemonsData)

    if (Object.keys(pokemonsSelectedSelector).length < 5) {
        history.replace('/game');
    }

    const [playerTurn, setTurn] = useState(1)

    const [board, setBoard] = useState([]);
    const [player1, setPlayer1State] = useState(Object.values(player1Selector).map(item => ({...item, possession: 'blue'})))
    const [player2, setPlayer2State] = useState([]);
    const [choiceCard, setChoiceCard] = useState(null);
    const [steps, setSteps] = useState(0);
    const [serverBoard, setServerBoard] = useState([0,0,0, 0,0,0, 0,0,0])

    const [end, setEnd] = useState(null);

    useEffect(async () => {
        const boardRequest = await request.getBoard()
        setBoard(boardRequest.data)
        const player2Request = await request.gameStart({
            pokemons: Object.values(pokemonsSelector)
        });
        setTimeout(() => {
            setTurn(Math.floor(Math.random() * 2) + 1)
        },2000)

        dispatch(setPlayer2(player2Request.data))
        setPlayer2State(player2Request.data.map( item => ({...item, possession: 'red'})));
    }, []);

    const handleClickBoardPlate = async (position) => {
        if (typeof choiceCard === 'object') {
            const params = {
                currentPlayer: 'p1',
                hands: {
                    p1: player1,
                    p2: player2
                },
                move: {
                    poke: {
                        ...choiceCard
                    },
                    position
                },
                board: serverBoard
            }
            if (choiceCard.player === 1) {
                setPlayer1State(prevState => prevState.filter(item => item.id !== choiceCard.id))
            }

            setBoard(prevState => prevState.map(item => {
                if (position === item.position) {
                    return {...item, card: choiceCard}
                }
                return item;
            }))

            const game = await request.game(params);
            setBoard(returnBoard(game.oldBoard))

            setSteps(prevState => prevState + 1)
            setTurn(prevState => (prevState === 1) ? 2 : 1)
            if (game.move !== null) {
                const idAi = game.move.poke.id;
                setTimeout( () => {
                        setPlayer2State(prevState => prevState.map(item => {
                            if (item.id === idAi){
                                return {
                                    ...item,
                                    selected: true
                                }
                            }
                            return item;
                        }))
                    }, 1000
                )
                setTimeout(() => {
                    setPlayer2State(() => game.hands.p2.pokes.map(item=>item.poke))
                    setServerBoard(game.board)
                    setBoard(returnBoard(game.board))
                    setSteps(prevState => prevState + 1)
                }, 1500)

            }
        }
    }

    useEffect(() => {
        if (steps === 9){
            const [p1, p2, count1, count2] = counterWIN(board, player1, player2)
            const isFinished = true;
            if (count1 > count2){
                setEnd('WIN')
            } else if (count1 < count2){
                setEnd('LOSE')
            } else {
                setEnd('DRAW')
            }
            dispatch(fill({p1, p2, isFinished}))
        }
    }, [steps, board, player1, player2])
    return (
        <div>
            <div className={s.root}>
                <ArrowChoice side={playerTurn} stop={player1Selector.isFinished}/>
                <div className={s.playerOne}>
                    <PlayerBoard player={1} cards={player1} turn={playerTurn}
                                 onClickCard = {(card) => {setChoiceCard(card)}}/>
                </div>
                <div className={s.playerTwo}>
                    <PlayerBoard player={2} cards={player2} turn={playerTurn}
                                 onClickCard = {(card) => {setChoiceCard(card)}}/>
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
                {end && <Result type={end}/>}
            </div>
        </div>
    );
};

export default BoardPage;