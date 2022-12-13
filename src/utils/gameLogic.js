import Spotify from 'spotify-web-api-js';

const spotifyAPI = new Spotify();

// Generate the random list of songs to use
const grabRandomSongs = (numberOfSongs, numbersMax, excludeList = []) => {
  const list = [];
  const exclusions = [...excludeList];
  let number;

  // Generates a random number
  function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
  }

  // Pick random songs that have not been chosen already
  for (let i = 0; i < numberOfSongs; i++) {
    number = getRandomNumber(numbersMax);

    if (!list.includes(number) && !exclusions.includes(number)) {
      list[i] = number;
    } else {
      i--;
    }
  }

  return list;
};

// Grabs the top tracks for each artist
async function getTopTracks(artistId, artistList, setArtistList, index) {
  let tracks = [];
  // Await for spotifyAPI response
  await spotifyAPI.getArtistTopTracks(artistId, 'US').then((result) => {
    tracks = result.tracks.map((track) => track.name);
  });
  // Add tracks to the artist at index
  artistList[index].topTracks = tracks;
  setArtistList(artistList);
}

// Get a full list of all artists in the playlist without duplicates
function getArtists(top50) {
  const set = new Set();
  // Map top50 into { name, id }
  return top50
    .map((track, index) => {
      let id = track.artists[0].uri;
      id = id.substring(id.lastIndexOf(':') + 1);
      return { name: track.artists[0].name, id, topTracks: [] };
    })
    .filter((obj) => {
      // Filter using set to get unqiue values
      const duplicate = set.has(obj.name);
      set.add(obj.name);
      return !duplicate;
    });
}

export { grabRandomSongs, getTopTracks, getArtists };
