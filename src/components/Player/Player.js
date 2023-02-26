import "./player.scss";
import { Grid, Progress, Icon, Input, Image } from "semantic-ui-react";
import ReactPlayer from "react-player";
import { useState, useContext } from "react";
import { PlayerSongContext } from "../../provider/PlayerSongProvider";

const { Column } = Grid;

export default function Player() {
  const [songData] = useContext(PlayerSongContext);
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
