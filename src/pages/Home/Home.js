import "./home.scss";
import { useState, useEffect } from "react";
import {
  getDocs,
  collection,
  limit,
  query,
  orderBy,
} from "firebase/firestore/lite";
import { db } from "../../utils/firebase";
import { messageWarning } from "../../utils/toast";
import { Loader } from "semantic-ui-react";
import BannerHome from "../../components/BannerHome";
import BasicSlider from "../../components/Sliders/BasicSlider";

export default function Home() {
  const limitDocs = 6;

  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getArtists = async () => {
      try {
        const docRef = query(
          collection(db, "artists"),
          limit(limitDocs),
          orderBy("name", "asc")
        );
        const querySnapshot = await getDocs(docRef);
        const artistDocs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setArtists(artistDocs);
      } catch (error) {
        messageWarning("Error al cargar los artistas");
      } finally {
        setLoading(false);
      }
    };
    getArtists();
  }, []);

  useEffect(() => {
    const getAlbums = async () => {
      try {
        const docRef = query(
          collection(db, "albums"),
          limit(limitDocs),
          orderBy("name", "asc")
        );
        const querySnapshot = await getDocs(docRef);
        const albumDocs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAlbums(albumDocs);
      } catch (error) {
        messageWarning("Error al cargar los albumes");
      }
    };
    getAlbums();
  }, []);

  useEffect(() => {
    const getSongs = async () => {
      try {
        const docRef = query(
          collection(db, "songs"),
          limit(limitDocs),
          orderBy("name", "asc")
        );
        const querySnapshot = await getDocs(docRef);
        const songsDoc = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSongs(songsDoc);
      } catch (error) {
        messageWarning("Error al cargar las canciones");
      } finally {
        setLoading(false);
      }
    };
    getSongs();
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
