/* eslint-disable react/prop-types */
import { grabRandomSongs } from '../utils/gameLogic';

const GameOver = ({
  numberCorrect,
  setNumberCorrect,
  setCurrentQuestion,
  setSongList,
  setShow,
}) => {
  // Reset the game and return to home
  function handleRestart() {
    setCurrentQuestion(0);
    setNumberCorrect(0);
    setSongList(grabRandomSongs(10, 50));
    setShow('start');
  }

  return (
    <div className="buttonContainer">
      <h2 className="title">Game Over</h2>
      <p className="title">{`Final Score: ${numberCorrect}/10`}</p>
      <div>
        <button
          className="choice-button"
          type="button"
          onClick={() => handleRestart()}
        >
          Try Again?
        </button>
      </div>
    </div>
  );
};

export default GameOver;
