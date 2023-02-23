import "./home.scss";
import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore/lite";
import { db } from "../../utils/firebase";
import { commonMessages } from "../../utils/globalConfig";
import { messageWarning } from "../../utils/toast";
import { Loader } from 'semantic-ui-react'
import BannerHome from "../../components/BannerHome";
import BasicSlider from "../../components/Sliders/BasicSlider";

export default function Home() {
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
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
      }
    };
    getAlbums();
  }, []);

  if (loading) return <Loader active>Cargando...</Loader>;

  return (
    <>
      <BannerHome />
      <div className="home">
        <BasicSlider
          data={artists}
          folderImage="artist"
          linkTo="artist"
          title="Ultimos artistas"
        />
      </div>
      <div className="home">
        <BasicSlider
          data={albums}
          folderImage="album"
          linkTo="album"
          title="Ultimos álbumes"
        />
      </div>
    </>
  );
}
