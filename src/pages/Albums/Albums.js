import "./albums.scss";
import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore/lite";
import { Link } from "react-router-dom";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../utils/firebase";
import { commonMessages } from "../../utils/globalConfig";
import { messageWarning } from "../../utils/toast";
import { Grid, Loader } from "semantic-ui-react";

export default function Albums() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAlbums = async () => {
      try {
        const docRef = collection(db, "albums");
        const querySnapshot = await getDocs(docRef);
        const albumDocs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAlbums(albumDocs);
      } catch (error) {
        messageWarning(commonMessages.generalError);
      } finally {
        setLoading(false);
      }
    };
    getAlbums();
  }, []);

  if (loading) return <Loader active>Cargando...</Loader>;

  return (
    <div className="albums">
      <h1>Álbumes</h1>
      <Grid>
        {albums.length > 0 &&
          albums.map((album) => (
            <Grid.Column key={album.id} mobile={8} tablet={4} computer={3}>
              <Album item={album} />
            </Grid.Column>
          ))}
      </Grid>
    </div>
  );
}

const Album = ({ item }) => {
  const { id, idBanner, name } = item;
  const [imgURL, setImgURL] = useState(null);
  useEffect(() => {
    const start = async () => {
      try {
        const storageRef = ref(storage, `album/${idBanner}`);
        const url = await getDownloadURL(storageRef);
        setImgURL(url);
      } catch (error) {
        setImgURL(null);
      }
    };
    start();
  }, [idBanner]);

  return (
    <div className="albums__item">
      <Link to={`/album/${id}`}>
        <div
          className="avatar"
          style={{ backgroundImage: `url('${imgURL}')` }}
        />
        <h3 className="item-title">{name}</h3>
      </Link>
    </div>
  );
};
