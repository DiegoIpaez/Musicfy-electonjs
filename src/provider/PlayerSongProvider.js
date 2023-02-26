import { createContext, useState } from "react";

export const PlayerSongContext = createContext();

const PlayerSongProvider = ({ children }) => {
  const [songData, setSongData] = useState({
    image: null,
    name: null,
    url: null,
  });

  const playerSong = (albumImage, songName, songUrl) =>
    setSongData({
      image: albumImage,
      name: songName,
      url: songUrl,
    });

  return (
    <PlayerSongContext.Provider value={[songData, playerSong]}>
      {children}
    </PlayerSongContext.Provider>
  );
};

export default PlayerSongProvider;
