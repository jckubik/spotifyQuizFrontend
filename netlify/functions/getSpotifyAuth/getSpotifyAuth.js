const { Handler, getSecrets, NetlifySecrets } = require('@netlify/functions');

// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
exports.handler = async (event, context) => {
  let secrets = {};

  // Get all secrets for the Netlify Graph session
  secrets = await getSecrets(event);

  // If the Spotify token exists, send it as a response
  if (secrets.spotify) {
    return {
      statusCode: 200,
      body: JSON.stringify({ token: secrets.spotify.bearerToken }),
    };
  }

  // Else, couldn't find the Spotify token
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Could not get Spotify information.' }),
  };
};
