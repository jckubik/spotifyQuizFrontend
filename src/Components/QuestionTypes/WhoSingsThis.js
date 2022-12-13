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
}) => {
  const [choices, setChoices] = useState([]);
  const [isBusy, setIsBusy] = useState(true);

  // Gets the choices of artists for the user to choose from
  const getArtistChoices = () => {
    // Get the index of the artist in the artistList
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

  // Updates the usersChoice on click
  const handleClick = (artist) => {
    setChosenAnswer(artist);
    setShow('check');
  };

  // If the top50 exists, then set correct answer and get chocies
  useEffect(() => {
    if (top50) {
      // Grab the choices
      getArtistChoices();

      // No longer busy
      setIsBusy(false);
    }
  }, [top50]);

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
