/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spotify from 'spotify-web-api-js';
import '../App.css';

const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const spotifyAPI = new Spotify();

  // Parses the querystring
  function getHashParams() {
    const hashParams = {};
    let e;
    const r = /([^&;=]+)=?([^&;]*)/g;
    const q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }

    // If an access token was returned, set it to be used
    if (hashParams.access_token) {
      spotifyAPI.setAccessToken(hashParams.access_token);
      setLoggedIn(true);
    }

    return hashParams;
  }

  // Grabs the current Top 50 USA songs
  // Playlist id: 37i9dQZEVXbLp5XoPON0wI
  function getTop50() {
    spotifyAPI
      .getPlaylist('37i9dQZEVXbLp5XoPON0wI', { fields: 'tracks.items.track' })
      // Turn nested track objects into just array of track data
      .then((result) =>
        localStorage.setItem(
          'top50',
          JSON.stringify(result.tracks.items.map((obj) => obj.track))
        )
      );
  }

  // Set access token and grab the playlist
  useEffect(() => {
    getHashParams();

    // If the user loggedIn, use account to grab playlist data
    if (loggedIn) {
      getTop50();
      navigate('/home', {
        state: { top50: JSON.parse(localStorage.getItem('top50')) },
      });
    }
  }, [loggedIn]);

  return (
    <div className="App">
      <div>
        <a href="https://spotifyquiz-authserver.netlify.app/">
          <button className="choice-button" type="button">
            Login with Spotify
          </button>
        </a>
      </div>
    </div>
  );
};

export default Login;
