import "./artists.scss";
import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore/lite";
import { Link } from "react-router-dom";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../utils/firebase";
import { commonMessages } from "../../utils/globalConfig";
import { messageWarning } from "../../utils/toast";
import { Grid, Loader } from "semantic-ui-react";

export default function Artists() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getArtists = async () => {
      try {
        const docRef = collection(db, "artists");
        const querySnapshot = await getDocs(docRef);
        const artistDocs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setArtists(artistDocs);
      } catch (error) {
        messageWarning(commonMessages.generalError);
      } finally {
        setLoading(false);
      }
    };
    getArtists();
  }, []);

  if (loading) return <Loader active>Cargando...</Loader>;

  return (
    <div className="artists">
      <h1>Artistas</h1>
      <Grid>
        {artists.length > 0 &&
          artists.map((artist) => (
            <Grid.Column key={artist.id} mobile={8} tablet={4} computer={3}>
              <Artist item={artist} />
            </Grid.Column>
          ))}
      </Grid>
    </div>
  );
}

const Artist = ({ item }) => {
  const { id, idBanner, name } = item;
  const [imgURL, setImgURL] = useState(null);
  useEffect(() => {
    const start = async () => {
      try {
        const storageRef = ref(storage, `artist/${idBanner}`);
        const url = await getDownloadURL(storageRef);
        setImgURL(url);
      } catch (error) {
        setImgURL(null);
      }
    };
    start();
  }, [idBanner]);

  return (
    <div className="artists__item">
      <Link to={`/artist/${id}`}>
        <div
          className="avatar"
          style={{ backgroundImage: `url('${imgURL}')` }}
        />
        <h3 className="item-title">{name}</h3>
      </Link>
    </div>
  );
};
