import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore/lite";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../utils/firebase";
import BannerArtist from "../../components/Artist/BannerArtist";

export default function Artist() {
  const { id } = useParams();
  const [artist, setArtist] = useState({});

  const getImg = async (idBanner) => {
    try {
      const storageRef = ref(storage, `artist/${idBanner}`);
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (error) {
      return null;
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
        return setArtist({ imgURL, ...artist });
      } catch (error) {
        setArtist({});
      }
    };
    getDataById();
  }, [id]);

  return (
    <div className="artist">
      <BannerArtist artist={artist} />
      <h2>Mas...</h2>
    </div>
  );
}
