import "./album.scss";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore/lite";
import { ref, getDownloadURL } from "firebase/storage";
import { Loader } from "semantic-ui-react";
import { db, storage } from "../../utils/firebase";
import ListSong from "../../components/Songs/ListSong";

export default function Album() {
  const { id } = useParams();
  const [album, setAlbum] = useState({});
  const [loading, setLoading] = useState(true);

  const getImg = async (idBanner) => {
    try {
      const storageRef = ref(storage, `album/${idBanner}`);
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (error) {
      return null;
    }
  };
  const getArtist = async (idArtist) => {
    try {
      const docuRef = doc(db, `artists/${idArtist}`);
      const queryArtist = await getDoc(docuRef);
      const artist = queryArtist.data();
      return artist;
    } catch (error) {
      return null;
    }
  };

  const getSongsByIdAlbum = async (idAlbum) => {
    try {
      const songsQuery = query(
        collection(db, "songs"),
        where("idAlbum", "==", idAlbum)
      );
      const querySnapshot = await getDocs(songsQuery);
      const songsByIdAlbumDocs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return songsByIdAlbumDocs;
    } catch (error) {
      return [];
    }
  };

  useEffect(() => {
    const getDataById = async () => {
      const extraData = {};
      try {
        const docuRef = doc(db, `albums/${id}`);
        const query = await getDoc(docuRef);
        const album = query.data();

        const imgURL = await getImg(album?.idBanner);
        const artist = await getArtist(album?.idArtist);
        const songs = await getSongsByIdAlbum(id);

        if (imgURL) extraData.imgURL = imgURL;
        if (artist) extraData.artist = artist;
        if (songs) extraData.songs = songs;

        return setAlbum({ ...extraData, ...album });
      } catch (error) {
        setAlbum({});
      } finally {
        setLoading(false);
      }
    };
    getDataById();
  }, [id]);

  if (loading) return <Loader active>Cargando...</Loader>;

  return (
    <div className="album">
      <div className="album__header">
        <HeaderAlbum album={album} />
      </div>
      <div className="album__songs">
        <ListSong album={album} />
      </div>
    </div>
  );
}

const HeaderAlbum = ({ album }) => {
  return (
    <>
      <div
        className="image"
        style={{ backgroundImage: `url('${album?.imgURL}')` }}
      />
      <div className="info">
        <h1>{album?.name}</h1>
        <p>
          De{" "}
          <Link to={`/artist/${album.idArtist}`}>
            <span>{album?.artist?.name || "-"}</span>
          </Link>
        </p>
      </div>
    </>
  );
};
