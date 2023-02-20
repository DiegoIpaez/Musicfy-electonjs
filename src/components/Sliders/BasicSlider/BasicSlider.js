import "./basicSlider.scss";
import Slider from "react-slick";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../../utils/firebase";

export default function BasicSlider({
  centerMode = true,
  children,
  data,
  folderImage,
  slidesToShow = 5,
  title,
  linkTo,
}) {
  const settings = {
    centerMode,
    className: "basic-slider__list",
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
  };
  return (
    <div className="basic-slider">
      <h2>{title}</h2>
      <Slider {...settings}>
        {children
          ? children
          : data?.length > 0 &&
            data.map((item) => (
              <RenderItem
                key={item?.id}
                item={item}
                folderImage={folderImage}
                linkTo={linkTo}
              />
            ))}
      </Slider>
    </div>
  );
}

const RenderItem = ({ item, folderImage, linkTo }) => {
  const { id, idBanner, name } = item;
  const [imgURL, setImgURL] = useState(null);
  useEffect(() => {
    const start = async () => {
      try {
        const storageRef = ref(storage, `${folderImage}/${idBanner}`);
        const url = await getDownloadURL(storageRef);
        setImgURL(url);
      } catch (error) {
        setImgURL(null);
      }
    };
    start();
  }, [folderImage, idBanner]);

  return (
    <div className="basic-slider__list-item">
      <Link to={`/${linkTo}/${id}`}>
        <div
          className="avatar"
          style={{ backgroundImage: `url('${imgURL}')` }}
        />
        <h3 className="item-title">{name}</h3>
      </Link>
    </div>
  );
};
