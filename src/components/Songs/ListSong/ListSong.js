import "./listSong.scss";
import { Table, Icon } from "semantic-ui-react";
import { useEffect, useState, useContext } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../../utils/firebase";
import { PlayerSongContext } from "../../../provider/PlayerSongProvider";

const { Header, HeaderCell, Body, Row, Cell } = Table;

export default function ListSong({ album }) {
  if (album?.songs?.length === 0) return <p>No hay canciones disponibles...</p>;
  return (
    <Table inverted className="list-songs">
      <Header>
        <Row>
          <HeaderCell />
          <HeaderCell>Titulo</HeaderCell>
        </Row>
      </Header>
      <Body>
        {album.songs.map(({ id, name, idFile }) => (
          <Song key={id} songName={name} albumImg={album?.imgURL} id={idFile} />
        ))}
      </Body>
    </Table>
  );
}

const Song = ({ songName, albumImg, id }) => {
  // eslint-disable-next-line no-unused-vars
  const [_, playerSong] = useContext(PlayerSongContext);
  const [songUrl, setSongUrl] = useState(null);

  useEffect(() => {
    const getSongURL = async () => {
      try {
        const storageRef = ref(storage, `song/${id}`);
        const url = await getDownloadURL(storageRef);
        setSongUrl(url);
      } catch (error) {
        setSongUrl(null);
      }
    };
    getSongURL();
  }, [id]);

  const onPlay = () => playerSong(albumImg, songName, songUrl);

  return (
    <Row onClick={() => onPlay()}>
      <Cell collapsing>
        <Icon name="play circle outline" />
      </Cell>
      <Cell>{songName}</Cell>
    </Row>
  );
};
