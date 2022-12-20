/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import Spotify from 'spotify-web-api-js';
import { grabRandomSongs, getArtists } from '../utils/gameLogic';
import WhoSingsThis from './QuestionTypes/WhoSingsThis';
import CheckerModal from './CheckerModal';
import GameOver from './GameOver';
import '../App.css';

const Home = () => {
  const [top50, setTop50] = useState(
    localStorage.getItem('top50')
      ? JSON.parse(localStorage.getItem('top50'))
      : null
  );
  const [songList, setSongList] = useState(grabRandomSongs(10, 50));
  const [artistList, setArtistList] = useState(
    localStorage.getItem('artistList')
      ? JSON.parse(localStorage.getItem('artistList'))
      : []
  );
  const [numberCorrect, setNumberCorrect] = useState(0);
  const [show, setShow] = useState('start');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState();
  const [chosenAnswer, setChosenAnswer] = useState();
  const [correctArtistIndex, setCorrectArtistIndex] = useState();
  const spotifyAPI = new Spotify();

  // Grabs the current Top 50 USA songs
  // Playlist id: 37i9dQZEVXbLp5XoPON0wI
  async function getTop50(setMethod) {
    // Get the Spotify authToken from Netlify Graph
    // Uses Netlify function getSpotifyAuth
    const token = await fetch('.netlify/functions/getSpotifyAuth')
      .then((response) => response.json())
      .then((json) => json.token);

    // Set the token to the Spotify API wrapper
    spotifyAPI.setAccessToken(token);

    // Get the playlist data using the API
    await spotifyAPI
      .getPlaylist('37i9dQZEVXbLp5XoPON0wI', { fields: 'tracks.items.track' })
      // Turn nested track objects into just array of track data
      .then((result) => result.tracks.items.map((obj) => obj.track))
      .then((tracks) => {
        localStorage.setItem('top50', JSON.stringify(tracks));
        setMethod(tracks);
      });
  }

  // Populate the artistList once top50 is populated
  useEffect(() => {
    if (top50) {
      // If the artistList isn't populated, populate it
      if (artistList.length < 1) {
        const artists = getArtists(top50);
        setArtistList(artists);
        localStorage.setItem('artistList', JSON.stringify(artists));
      }
    } else {
      getTop50(setTop50);
    }
  }, [top50, currentQuestion]);

  return (
    <div>
      {show === 'start' ? (
        <div className="align-center">
          <button
            className="choice-button"
            type="button"
            onClick={() => {
              setShow('question');
            }}
          >
            Start Quiz
          </button>
        </div>
      ) : null}
      {show === 'question' ? (
        <WhoSingsThis
          top50={top50}
          songList={songList}
          currentQuestion={currentQuestion}
          artistList={artistList}
          setShow={setShow}
          setChosenAnswer={setChosenAnswer}
          setCorrectAnswer={setCorrectAnswer}
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
