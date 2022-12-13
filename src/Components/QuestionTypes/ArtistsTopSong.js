import { get } from "http";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ArtistsTopSong = ({ 
  spotify, 
  top50, 
  songList, 
  currentQuestion, 
  artistList,
  grabRandomSongs, 
}) => {

  const navigate = useNavigate();
  const [trackNumber, setTrackNumber] = useState(songList[currentQuestion]);
  const [theArtist, setTheArtist] = useState(artistList.filter(artist => {
    return artist.name === top50[trackNumber].artists[0].name;
  })[0]);
  const [correctAnswer, setCorrectAnswer] = useState();
  const [chosenAnswer, setChosenAnswer] = useState();
  const [choices, setChoices] = useState([]);

  const getChoices = () => {
    // Generate random placement for the correct answer
    const randomCorrectAnswerIndex = Math.floor(Math.random() * 6);
    // Get 4 random top tracks
    const randomList = grabRandomSongs(4, 10, [0]).map(index => {
      return topTracks[index];
    });
    console.log(randomList);
    // Add correct track to random spot in the list
    randomList.splice(randomCorrectAnswerIndex, 0, topTracks[0]);

    return randomList;
  }

  // TODO: How to figure out what to do if artist doesn't have enough top tracks to choose from
  // Currently trying to redo the top tracks with a new trackNumber - getting extra buttons
  const getTopTracks = (trackNum) => {
    let tracks = [];

    if (tracks.length < 10) {
      return setTrackNumber(trackNumber + 1);
    } else {
      return tracks;
    }
  }

  // If topTracks exists, get correctAnswer
  useEffect(() => {
    if (artistList) {
      setCorrectAnswer(theArtist.topTracks[0]);
      // Grab the choices
      setChoices(getChoices());
    }
  }, [trackNumber]);

  // Updates the usersChoice on click
  const handleClick = (track) => {
    setChosenAnswer(track);
  }

  // When the user has chosen, navigate to the CheckerModal
  useEffect(() => {
    if (chosenAnswer) {
        navigate('/checker', { state: { correctAnswer: correctAnswer, chosenAnswer: chosenAnswer } });
    }
  }, [chosenAnswer]);

  useEffect(() => {

    console.log('Top tracks:', topTracks);
    console.log('Choices:', choices);
  }, [topTracks, choices]);

  return (
    <div className="buttonContainer">
      <h2>{`Which is ${theArtist.name}'s top track?`}</h2>
      <div className="buttonContainer">
        {   
          choices.map((track) => (
              <button
              key={`choice${track}`}
              onClick={() => {
                  handleClick(track);
              }}
              >{track}</button>
          ))
        }
      </div>
    </div>
  );
};

export default ArtistsTopSong;