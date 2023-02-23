import "./album.scss";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore/lite";
import { ref, getDownloadURL } from "firebase/storage";
import { Loader } from "semantic-ui-react";
import { db, storage } from "../../utils/firebase";

export default function Album() {
  const { id } = useParams();
  const [album, setAlbum] = useState({});
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    const getDataById = async () => {
      const extraData = {};
      try {
        setLoading(true);
        const docuRef = doc(db, `albums/${id}`);
        const query = await getDoc(docuRef);
        const album = query.data();

        const imgURL = await getImg(album?.idBanner);
        const artist = await getArtist(album?.idArtist);
        if (imgURL) extraData.imgURL = imgURL;
        if (artist) extraData.artist = artist;

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
        <p>Lista de canciones</p>
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
