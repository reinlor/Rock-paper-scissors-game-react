import React, { useState, useEffect } from 'react'
import style from './game.module.css'
import battleStyle from './battleStyle.module.css'
// Pictures
import triangleBg from '../assets/images/bg-triangle.svg'
import rockImg from '../assets/images/icon-rock.svg'
import paperImg from '../assets/images/icon-paper.svg'
import scissorsImg from '../assets/images/icon-scissors.svg'

function MainGame({ onScoreChange }) {
    const [isVisible, setIsVisible] = useState(true);
    const [shouldRender, setShouldRender] = useState(true);
    const [userPick, setUserPick] = useState();
    const [computerPick, setComputerPick] = useState()
    const [message, setMessage] = useState();

    const picks = ['Rock', 'Paper', 'Scissors'];
    const [totalScore, setTotalScore] = useState(0);

    const [showBattle, setShowBattle] = useState(false);
    const [showComputer, setShowComputer] = useState(false);
    const [spreadPick, setSpreadPick] = useState(false);
    const [showResult, setShowResult] = useState(false);

    const isWinner = (pickType) => {
        if (!message) return false;
        if (message === 'DRAW') return false;
        if (message === 'YOU WIN' && pickType === 'user') return true;
        if (message === 'YOU LOSE' && pickType === 'computer') return true;
        return false;
    };

    const handleButtonPick = (pick) => {
        setIsVisible(false);
        setUserPick(pick === 'Rock' ? rockImg : pick === 'Paper' ? paperImg : scissorsImg);
        setTimeout(() => {
            setShowBattle(true);
        }, 500);

        const comp = picks[Math.floor(Math.random() * 3)];
        setTimeout(() => {
            setComputerPick(comp);
            setShowComputer(true);
        }, 1000);

        setTimeout(() => {
            setSpreadPick(true);
        }, 1500);

        setTimeout(() => {
            setShowResult(true);
            if (comp === pick) {
                setMessage('DRAW');
            } else if (
                (pick === 'Rock' && comp === 'Scissors') ||
                (pick === 'Paper' && comp === 'Rock') ||
                (pick === 'Scissors' && comp === 'Paper')
            ) {
                setMessage('YOU WIN');
                setTotalScore(ts => {
                    const updated = ts + 1;
                    onScoreChange(updated); 
                    return updated;
                });
            } else {
                setMessage('YOU LOSE');
                setTotalScore(ts => {
                    const updated = ts > 0 ? ts - 1 : 0;
                    onScoreChange(updated);
                    return updated;
                });
            }
        }, 2000);
    }

        const getComputerImg = (pick) => {
            switch (pick) {
                case 'Rock':
                    return rockImg;
                case 'Paper':
                    return paperImg;
                case 'Scissors':
                    return scissorsImg;
                default:
                    return '';
            }
        };

        const resetGame = () => {
            setIsVisible(true);
            setShowBattle(false);
            setShowComputer(false);
            setSpreadPick(false);
            setShowResult(false);
            setUserPick(null);
            setComputerPick(null);
            setMessage('');
        };

        const pick = () => {
            if (computerPick === 'Rock') return battleStyle.Rock;
            else if (computerPick === 'Paper') return battleStyle.Paper;
            else if (computerPick === 'Scissors') return battleStyle.Scissors;
        }

        const pickUser = () => {
            if (userPick === rockImg) return battleStyle.Rock;
            else if (userPick === paperImg) return battleStyle.Paper;
            else if (userPick === scissorsImg) return battleStyle.Scissors;
        }

        useEffect(() => {
            if (!isVisible) {
                const timeout = setTimeout(() => setShouldRender(false), 500);
                return () => clearTimeout(timeout);
            } else {
                setShouldRender(true);
            }
        }, [isVisible]);

        return (
            <>
                {shouldRender && (
                    <div className={`${style.maingameContainer} ${isVisible ? style.fadeIn : style.fadeOut}`}>
                        <img className={style.triangleBg} src={triangleBg} alt="background" />
                        <button className={style.rock}>
                            <img className={style.gameBtn} src={rockImg} alt="Rock" onClick={() => handleButtonPick('Rock')} />
                        </button>
                        <button className={style.paper}>
                            <img className={style.gameBtn} src={paperImg} alt="Paper" onClick={() => handleButtonPick('Paper')} />
                        </button>
                        <button className={style.scissors}>
                            <img className={style.gameBtn} src={scissorsImg} alt="Scissors" onClick={() => handleButtonPick('Scissors')} />
                        </button>
                    </div>
                )}

                <div className={`${battleStyle.battlepick} ${showBattle ? battleStyle.show : ''}`}>
                    <div className={battleStyle.pickGroup}>
                        <p>YOU PICKED</p>
                        <div className={`${battleStyle.pickCircle} ${pickUser()} ${isWinner('user') ? battleStyle.winnerOuter : ''}`}>
                            <div className={battleStyle.innerCircle}>
                                <img src={userPick} alt="Your Pick" />
                            </div>
                        </div>
                    </div>

                    {showResult && (
                        <div className={`${battleStyle.resultMessage} ${showResult ? battleStyle.show : ''}`}>
                            <h1>{message}</h1>
                            <button onClick={resetGame}>PLAY AGAIN</button>
                        </div>
                    )}

                    <div className={battleStyle.pickGroup}>
                        <p>THE HOUSE PICKED</p>
                        {showComputer && (
                            <div className={`${battleStyle.pickCircle} ${pick()} ${battleStyle.fadeIn} ${isWinner('computer') ? battleStyle.winnerOuter : ''}`}>
                                <div className={battleStyle.innerCircle}>
                                    <img
                                        src={getComputerImg(computerPick)}
                                        alt="Computer Pick"
                                    />
                                </div>
                            </div>
                        )}

                    </div>
                </div>

            </>
        );
    }

    export default MainGame;