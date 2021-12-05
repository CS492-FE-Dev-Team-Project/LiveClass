import axios from 'axios';

import * as dotenv from 'dotenv';

dotenv.config();

const MAX_NUM = 10;

const getPlayListItems = async (playlistID: string) => {
  const result = await axios.get(
    `https://www.googleapis.com/youtube/v3/playlistItems`,
    {
      params: {
        part: 'id,snippet',
        maxResults: MAX_NUM,
        playlistId: playlistID,
        key: process.env.REACT_APP_YOUTUBE_API_KEY
      }
    }
  );
  return result.data;
};

export { getPlayListItems };
