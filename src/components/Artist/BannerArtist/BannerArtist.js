import "./bannerArtist.scss";

export default function BannerArtist({ artist }) {
  return (
    <div
      className="banner-artist"
      style={{ backgroundImage: `url('${artist?.imgURL})` }}
    >
      <div className="banner-artist__gradient" />
      <div className="banner-artist__info">
        <h1>{artist.name}</h1>
      </div>
    </div>
  );
}
