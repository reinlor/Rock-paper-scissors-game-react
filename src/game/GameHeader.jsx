import React, {useContext} from 'react'
import logo from '../assets/images/logo.svg'
import style from './game.module.css'

import { gameContext } from '../App'

function Gameheader(){

    const gameScore = useContext(gameContext);
    
    return(
        <div className={style.gameHeader}>
            <img id={style.gameHeaderLogo} src={logo}/>

            <div className={style.scoreBoard}>
                <p id={style.score}>SCORE</p>
                <p id={style.scorepoint}> {gameScore}</p> 
            </div>
        </div>
    )
}

export default Gameheader