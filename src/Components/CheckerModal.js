/* eslint-disable react/prop-types */
import Button from 'react-bootstrap/Button';

const CheckerModal = ({
  currentQuestion,
  setCurrentQuestion,
  numberCorrect,
  setNumberCorrect,
  chosenAnswer,
  correctAnswer,
  setShow,
}) => {
  // Handles logic to move to next question
  const handleNextQuestion = () => {
    // Track the number of correct answers
    if (correctAnswer === chosenAnswer) {
      setNumberCorrect(numberCorrect + 1);
    }
    // If 10 questions haven't been asked, play on
    if (currentQuestion < 9) {
      setCurrentQuestion(currentQuestion + 1);
      setShow('question');
    } else {
      // Else, end the game
      setShow('gameOver');
    }
  };

  return (
    <div className="buttonContainer">
      <div>
        <h2>{correctAnswer === chosenAnswer ? 'Correct!' : 'Incorrect'}</h2>
      </div>
      <button
        type="button"
        className="choice-button"
        onClick={() => handleNextQuestion()}
      >
        Next Question
      </button>
    </div>
  );
};

export default CheckerModal;
