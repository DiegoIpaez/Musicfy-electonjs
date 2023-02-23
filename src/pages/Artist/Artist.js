import './artist.scss'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";
import { ref, getDownloadURL } from "firebase/storage";
import { Loader } from "semantic-ui-react";
import { db, storage } from "../../utils/firebase";
import BannerArtist from "../../components/Artist/BannerArtist";
import BasicSlider from "../../components/Sliders/BasicSlider";

export default function Artist() {
  const { id } = useParams();
  const [artist, setArtist] = useState({});
  const [loading, setLoading] = useState(true);

  const getImg = async (idBanner) => {
    try {
      const storageRef = ref(storage, `artist/${idBanner}`);
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (error) {
      return null;
    }
  };

  const getAlbumsByIdArtist = async (idArtist) => {
    try {
      const albumQuery = query(
        collection(db, "albums"),
        where("idArtist", "==", idArtist)
      );
      const querySnapshot = await getDocs(albumQuery);
      const albumsByIdArtistDocs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return albumsByIdArtistDocs;
    } catch (error) {
      return [];
    }
  };

  useEffect(() => {
    const getDataById = async () => {
      try {
        const docuRef = doc(db, `artists/${id}`);
        const query = await getDoc(docuRef);
        const artist = query.data();

        const imgURL = await getImg(artist?.idBanner);
        if (!imgURL) {
          return setArtist({ ...artist });
        }
        const albums = await getAlbumsByIdArtist(id);
        return setArtist({ imgURL, albums, ...artist });
      } catch (error) {
        setArtist({});
      } finally {
        setLoading(false);
      }
    };
    getDataById();
  }, [id]);

  if (loading) return <Loader active>Cargando...</Loader>;

  return (
    <div className="artist">
      <BannerArtist artist={artist} />
      {artist?.albums?.length > 3 ? (
        <div className="artist__content">
          <BasicSlider
            className='artist__content__slider'
            data={artist?.albums}
            folderImage="album"
            linkTo="album"
            title="Álbumes"
            slidesToShow={artist?.albums?.length - 1}
            centerMode={false}
          />
        </div>
      ) : (
        <h4 style={{ textAlign: "center" }}>No hay álbumes disponibles...</h4>
      )}
    </div>
  );
}
