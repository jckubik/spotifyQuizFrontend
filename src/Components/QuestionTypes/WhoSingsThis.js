/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { grabRandomSongs } from '../../utils/gameLogic';
import Loader from '../Loader';

const WhoSingsThis = ({
  top50,
  songList,
  currentQuestion,
  artistList,
  setShow,
  setChosenAnswer,
  setCorrectAnswer,
}) => {
  const [choices, setChoices] = useState([]);
  const [isBusy, setIsBusy] = useState(true);
  // const [top50, setTop50] = useState(
  //   localStorage.getItem('top50')
  //     ? JSON.parse(localStorage.getItem('top50'))
  //     : null
  // );

  // Gets the choices of artists for the user to choose from
  const getArtistChoices = () => {
    // Set the correct artist as correctAnswer
    setCorrectAnswer(top50[songList[currentQuestion]].artists[0].name);
    // Get the index of the correct artist in the artistList
    let correctArtistIndex = 0;
    artistList.forEach((artist, index) => {
      if (artist.name === top50[songList[currentQuestion]].artists[0].name) {
        correctArtistIndex = index;
      }
    });

    // Generate random placement for the correct answer
    const randomCorrectAnswerIndex = Math.floor(Math.random() * 6);

    // Grab 4 random indices for 4 random artists, excluding correct artist
    const randomList = grabRandomSongs(4, artistList.length, [
      correctArtistIndex,
    ]);

    // Add the correct artist into the random spot
    randomList.splice(randomCorrectAnswerIndex, 0, correctArtistIndex);

    // Map the random indices to actual artists
    const randomArtists = randomList.map((number) => artistList[number].name);

    // return randomArtists;
    setChoices(randomArtists);
  };

  // Updates the user's choice on click
  const handleClick = (artist) => {
    setChosenAnswer(artist);

    // Change to the checkerModal
    setShow('check');
  };

  // If the top50 exists, then set correct answer and get chocies
  useEffect(() => {
    if (top50) {
      // Grab the choices
      getArtistChoices();
    }
  }, [top50]);

  // Switch busy status
  useEffect(() => {
    if (choices.length > 0) {
      // No longer busy
      setIsBusy(false);
    }
  }, [choices]);

  return (
    <div>
      {isBusy ? (
        <Loader />
      ) : (
        <div className="question-container">
          <h2 className="question-text">{`Which artist sings "${
            top50[songList[currentQuestion]].name
          }"?`}</h2>
          <div className="buttonContainer align-center">
            {choices.map((artist) => (
              <button
                type="button"
                key={`choice${artist}`}
                className="choice-button"
                onClick={() => {
                  handleClick(artist);
                }}
              >
                {artist}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WhoSingsThis;
