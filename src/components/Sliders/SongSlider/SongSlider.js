import "./songSlider.scss";
import Slider from "react-slick";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ref, getDownloadURL } from "firebase/storage";
import { doc, getDoc } from "firebase/firestore/lite";
import { db, storage } from "../../../utils/firebase";
import { Icon } from "semantic-ui-react";
import { PlayerSongContext } from "../../../provider/PlayerSongProvider";

const folderImage = "album";

export default function SongSlider({
  centerMode = true,
  children,
  data,
  slidesToShow = 5,
  title,
  linkTo,
}) {
  const settings = {
    centerMode,
    className: "song-slider__list",
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
  };
  return (
    <div className="song-slider">
      <h2>{title}</h2>
      <Slider {...settings}>
        {children
          ? children
          : data?.length > 0 &&
            data.map((item) => (
              <RenderItem
                key={item?.id}
                item={item}
                linkTo={linkTo}
              />
            ))}
      </Slider>
    </div>
  );
}

const RenderItem = ({ item, linkTo }) => {
  const { id, name, idAlbum, idFile } = item;
  const [imgURL, setImgURL] = useState(null);
  const [songUrl, setSongUrl] = useState(null);

  const [_, playerSong] = useContext(PlayerSongContext);

  useEffect(() => {
    const getAlbumImg = async () => {
      try {
        const docuRef = doc(db, `albums/${idAlbum}`);
        const query = await getDoc(docuRef);
        const album = query.data();
        const storageRef = ref(storage, `${folderImage}/${album.idBanner}`);
        const url = await getDownloadURL(storageRef);
        setImgURL(url);
      } catch (error) {
        setImgURL(null);
      }
    };
    getAlbumImg();
  }, [idAlbum]);

  useEffect(() => {
    const getAlbumImg = async () => {
      try {
        const storageRef = ref(storage, `song/${idFile}`);
        const url = await getDownloadURL(storageRef);
        setSongUrl(url);
      } catch (error) {
        setSongUrl(null);
      }
    };
    getAlbumImg();
  }, [idFile]);

  const onPlay = () => playerSong(imgURL, name, songUrl);

  return (
    <div className="song-slider__list-item">
      <div
        className="avatar"
        style={{ backgroundImage: `url('${imgURL}')` }}
        onClick={() => onPlay()}
      >
        <Icon name="play circle outline" />
      </div>
      <Link to={`/${linkTo}/${id}`}>
        <h3 className="item-title">{name}</h3>
      </Link>
    </div>
  );
};
