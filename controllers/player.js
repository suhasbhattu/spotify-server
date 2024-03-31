const transferPlayback = async (req, res) => {
  if (process.env.access_token.length > 0) {
    const headers = {
      Authorization: `Bearer ${process.env.access_token}`,
    };
    const deviceId = req.params.deviceId;
    const body = {
      device_ids: [deviceId],
    };
    try {
      await fetch("https://api.spotify.com/v1/me/player", {
        method: "PUT",
        body: JSON.stringify(body),
        headers: headers,
      });
      res.json({});
    } catch (error) {
      res.json(error);
    }
  } else {
    res.json({ error: "Token has expired" });
  }
};

const resumePlayback = async (req, res) => {
  if (process.env.access_token.length > 0) {
    const headers = {
      Authorization: `Bearer ${process.env.access_token}`,
    };
    const deviceId = req.params.deviceId;
    const contextUri = req.body.contextUri;
    const params = new URLSearchParams({ device_id: deviceId });
    const body = contextUri ? { context_uri: contextUri } : {};
    try {
      await fetch(`https://api.spotify.com/v1/me/player/play?${params}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(body),
      });
      res.json({});
    } catch (error) {
      res.json(error);
    }
  } else {
    res.json({ error: "Token has expired" });
  }
};

const pausePlayback = async (req, res) => {
  if (process.env.access_token.length > 0) {
    const headers = {
      Authorization: `Bearer ${process.env.access_token}`,
    };
    const deviceId = req.params.deviceId;
    const params = new URLSearchParams({ device_id: deviceId });
    try {
      await fetch(`https://api.spotify.com/v1/me/player/pause?${params}`, {
        method: "PUT",
        headers: headers,
      });
      res.json({});
    } catch (error) {
      res.json(error);
    }
  } else {
    res.json({ error: "Token has expired" });
  }
};

const nextPlayback = async (req, res) => {
  if (process.env.access_token.length > 0) {
    const headers = {
      Authorization: `Bearer ${process.env.access_token}`,
    };
    const deviceId = req.params.deviceId;
    const params = new URLSearchParams({ device_id: deviceId });
    try {
      await fetch(`https://api.spotify.com/v1/me/player/next?${params}`, {
        method: "POST",
        headers: headers,
      });
      res.json({});
    } catch (error) {
      res.json(error);
    }
  } else {
    res.json({ error: "Token has expired" });
  }
};

const previousPlayback = async (req, res) => {
  if (process.env.access_token.length > 0) {
    const headers = {
      Authorization: `Bearer ${process.env.access_token}`,
    };
    const deviceId = req.params.deviceId;
    const params = new URLSearchParams({ device_id: deviceId });
    try {
      await fetch(`https://api.spotify.com/v1/me/player/previous?${params}`, {
        method: "POST",
        headers: headers,
      });
      res.json({});
    } catch (error) {
      res.json(error);
    }
  } else {
    res.json({ error: "Token has expired" });
  }
};

const seekPlayback = async (req, res) => {
  if (process.env.access_token.length > 0) {
    const headers = {
      Authorization: `Bearer ${process.env.access_token}`,
    };
    const deviceId = req.params.deviceId;
    const position = req.body.position;
    const params = new URLSearchParams({
      device_id: deviceId,
      position_ms: position * 1000,
    });
    try {
      await fetch(`https://api.spotify.com/v1/me/player/seek?${params}`, {
        method: "PUT",
        headers: headers,
      });
      res.json({});
    } catch (error) {
      res.json(error);
    }
  } else {
    res.json({ error: "Token has expired" });
  }
};

const volumePlayback = async (req, res) => {
  if (process.env.access_token.length > 0) {
    const headers = {
      Authorization: `Bearer ${process.env.access_token}`,
    };
    const deviceId = req.params.deviceId;
    const volume = req.body.volume;
    const params = new URLSearchParams({
      device_id: deviceId,
      volume_percent: volume,
    });
    try {
      await fetch(`https://api.spotify.com/v1/me/player/volume?${params}`, {
        method: "PUT",
        headers: headers,
      });
      res.json({});
    } catch (error) {
      res.json(error);
    }
  } else {
    res.json({ error: "Token has expired" });
  }
};

module.exports = {
  transferPlayback,
  resumePlayback,
  pausePlayback,
  nextPlayback,
  previousPlayback,
  seekPlayback,
  volumePlayback,
};
