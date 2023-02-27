import "./bannerHome.scss";
import { useState, useEffect } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../utils/firebase";

export default function BannerHome() {
  const [bannerUrl, setBannerUrl] = useState(null);

  useEffect(() => {
    const getBannerUrl = async () => {
      try {
        const storageRef = ref(storage, "other/banner-home.jpg");
        const url = await getDownloadURL(storageRef);
        setBannerUrl(url);
      } catch (error) {
        setBannerUrl(null);
      }
    };
    getBannerUrl();
  }, []);

  if (!bannerUrl) return null;
  return (
    <div
      className="banner-home"
      style={{ backgroundImage: `url('${bannerUrl}')` }}
    />
  );
}
