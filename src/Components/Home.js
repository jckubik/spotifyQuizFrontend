/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { grabRandomSongs, getArtists } from '../utils/gameLogic';
import WhoSingsThis from './QuestionTypes/WhoSingsThis';
import CheckerModal from './CheckerModal';
import GameOver from './GameOver';
import '../App.css';

const Home = () => {
  const [top50, setTop50] = useState();
  const [songList, setSongList] = useState([]);
  const [artistList, setArtistList] = useState([]);
  const [numberCorrect, setNumberCorrect] = useState(0);
  const [show, setShow] = useState('start');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState();
  const [chosenAnswer, setChosenAnswer] = useState();
  const [correctArtistIndex, setCorrectArtistIndex] = useState();

  // Grab the top50 tracks on page load
  useEffect(() => {
    const tracks = localStorage.getItem('top50');
    setTop50(JSON.parse(tracks));
  }, []);

  // Populate songList
  useEffect(() => {
    setSongList(grabRandomSongs(10, 50));
  }, []);

  // Populate the artistList once top50 is populated
  useEffect(() => {
    if (top50) {
      setArtistList(getArtists(top50));

      // Set correctAnswer
      setCorrectAnswer(top50[songList[currentQuestion]].artists[0].name);
      setCorrectArtistIndex(
        artistList.findIndex(
          (artist) =>
            artist.name === top50[songList[currentQuestion]].artists[0].name
        )
      );
    }
  }, [top50, currentQuestion]);

  return (
    <div>
      {show === 'start' ? (
        <div className="align-center">
          <button
            className="choice-button"
            type="button"
            onClick={() => setShow('question')}
          >
            Start Quiz
          </button>
        </div>
      ) : null}
      {show === 'question' ? (
        <WhoSingsThis
          top50={top50}
          setTop50={setTop50}
          songList={songList}
          currentQuestion={currentQuestion}
          artistList={artistList}
          setShow={setShow}
          setChosenAnswer={setChosenAnswer}
        />
      ) : null}
      {show === 'check' ? (
        <CheckerModal
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          numberCorrect={numberCorrect}
          setNumberCorrect={setNumberCorrect}
          chosenAnswer={chosenAnswer}
          correctAnswer={correctAnswer}
          setShow={setShow}
        />
      ) : null}
      {show === 'gameOver' ? (
        <GameOver
          numberCorrect={numberCorrect}
          setNumberCorrect={setNumberCorrect}
          setCurrentQuestion={setCurrentQuestion}
          setSongList={setSongList}
          setShow={setShow}
        />
      ) : null}
    </div>
  );
};

export default Home;
