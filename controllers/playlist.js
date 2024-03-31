const getUser = async (req, res) => {
  if (process.env.access_token.length > 0) {
    const headers = {
      Authorization: `Bearer ${process.env.access_token}`,
    };
    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: headers,
      });
      const data = await response.json();
      const responseJSON = {
        id: data.id,
        name: data.display_name,
      };
      res.json(responseJSON);
    } catch (error) {
      res.json(error);
    }
  } else {
    res.json({ error: "Token has expired" });
  }
};

const getAllPlaylists = async (req, res) => {
  if (process.env.access_token.length > 0) {
    const headers = {
      Authorization: `Bearer ${process.env.access_token}`,
    };
    try {
      const response = await fetch("https://api.spotify.com/v1/me/playlists", {
        headers: headers,
      });
      const data = await response.json();
      const playlists = data.items.map((playlist) => {
        return {
          id: playlist.id,
          name: playlist.name,
          thumbnail: playlist.images[1].url,
          count: playlist.tracks.total,
        };
      });
      const responseJSON = {
        count: data.total,
        items: playlists,
      };
      res.json(responseJSON);
    } catch (error) {
      res.json(error);
    }
  } else {
    res.json({ error: "Token has expired" });
  }
};

module.exports = { getUser, getAllPlaylists };
