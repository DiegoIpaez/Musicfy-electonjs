import "./player.scss";
import { Grid, Progress, Icon, Input, Image } from "semantic-ui-react";
import ReactPlayer from "react-player";
import { useState } from "react";

const { Column } = Grid;
const songData = {
  image: "https://i.scdn.co/image/ab67616d0000b273de3c04b5fc750b68899b20a9",
  name: "Jigsaw falling into place",
  url: "https://firebasestorage.googleapis.com/v0/b/musicfy-electr0n.appspot.com/o/song%2Fyt5s.io%20-%20Radiohead%20-%20Jigsaw%20Falling%20Into%20Place%20(128%20kbps).mp3?alt=media&token=8c8ded3b-f5d1-447b-ab1d-acc301d1451c",
};

export default function Player() {
  const [playing, setPlaying] = useState(false);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(120);
  const [volume, setVolume] = useState(0.3);

  const onStart = () => setPlaying(true);
  const onPause = () => setPlaying(false);
  const onProgress = ({ playedSeconds, loadedSeconds }) => {
    setPlayedSeconds(playedSeconds);
    setTotalSeconds(loadedSeconds);
  };

  return (
    <div className="player">
      <Grid>
        <Column width={4} className="left">
          <Image src={songData?.image} />
          {songData?.name}
        </Column>
        <Column width={8} className="center">
          <div className="controls">
            {playing ? (
              <Icon name="pause circle outline" onClick={() => onPause()} />
            ) : (
              <Icon name="play circle outline" onClick={() => onStart()} />
            )}
          </div>
          <Progress
            progress="value"
            value={playedSeconds}
            total={totalSeconds}
            size="tiny"
          />
        </Column>
        <Column width={4} className="right">
          <Input
            name="volume"
            label={<Icon name="volume up" />}
            type="range"
            step={0.01}
            min={0}
            max={10}
            onChange={(_, data) => setVolume(data.value)}
            value={volume}
          />
        </Column>
      </Grid>
      <ReactPlayer
        className="react-player"
        url={songData?.url}
        playing={playing}
        height={0}
        width={0}
        // volume={volume}
        onProgress={(e) => onProgress(e)}
      />
    </div>
  );
}
