import React, { useState, createContext } from 'react'
import GameHeader from './game/GameHeader.jsx'
import MainGame from './game/MainGame.jsx';
import styles from './popupModal.module.css';

import rulesImg from './assets/images/image-rules.svg'

export const gameContext = createContext();

function App() {

  const [gameScore, setGameScore] = useState(0)
  const [show, setShow] = useState(false);

  const toggleModal = () => {
    setShow(!show);
  };

  const handleScoreChange = (newScore) => {
    setGameScore(newScore);
  };

  const addScore = () => {
    setGameScore(gameScore + 1)
  }

  return (
    <div className='gameContainer'>
      <gameContext.Provider value={gameScore}>
        <GameHeader />
        <MainGame onScoreChange={handleScoreChange}/>
      </gameContext.Provider>

      <button className={styles.rulesButton} onClick={toggleModal}>
        RULES
      </button>

      {show && (
        <div className={`${styles.modalOverlay} ${show ? styles.fadeIn : ''}`}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>RULES</h2>
              <button className={styles.closeButton} onClick={toggleModal}>
                ✕
              </button>
            </div>
            <div className={styles.rulesImage}>
              <img src={rulesImg} alt="Rules" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
