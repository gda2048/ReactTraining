import {useState, useEffect} from 'react';
import s from './style.module.css';
import YouWin from './assets/you-win.png';
import YouLose from './assets/you-lose.png';
import Draw from './assets/draw.png';
import {useHistory} from "react-router-dom";

const Result = ({ type }) => {
   console.log(type, 'type')
    const [url, setUrl] = useState(null);
   const history = useHistory()

   useEffect(() => {
       switch (type) {
           case 'WIN':
               setUrl(YouWin);
               break;
           case 'LOSE':
               setUrl(YouLose);
               break;
           case 'DRAW':
               setUrl(Draw);
               break;
           default:
               setUrl(YouWin);
       }
   }, [type]);

    return (
        <div className={s.result}>
            <img src={url} alt="result" />
            <button onClick={() => {history.replace('/game/finish')}}>End Game</button>
        </div>
    );
};

export default Result;
