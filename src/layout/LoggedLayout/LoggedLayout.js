import "./loggedLayout.scss";
import { Grid } from "semantic-ui-react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "../../routes/Routes";
import MenuLeft from "../../components/MenuLeft";
import TopBar from "../../components/TopBar";
import Player from "../../components/Player";

const { Row, Column } = Grid;

export default function LoggedLayout({ user }) {
  return (
    <Router>
      <Grid className="logged-layout">
        <Row>
          <Column width={3}>
            <MenuLeft user={user} />
          </Column>
          <Column width={13} className="content">
            <TopBar user={user} />
            <Routes user={user} />
          </Column>
        </Row>
        <Row>
          <Column width={16}>
            <Player />
          </Column>
        </Row>
      </Grid>
    </Router>
  );
}
