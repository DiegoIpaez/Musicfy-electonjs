import "./loggedLayout.scss";
import { Grid } from "semantic-ui-react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "../../routes/Routes";
import MenuLeft from "../../components/MenuLeft";

const { Row, Column } = Grid;

export default function LoggedLayout(props) {
  const { user } = props;

  return (
    <Router>
      <Grid className="logged-layout">
        <Row>
          <Column width={3}>
            <MenuLeft user={user} />
          </Column>
          <Column width={13} className="content">
            <h2>Top bar</h2>
            <Routes />
          </Column>
        </Row>
        <Row>
          <Column width={16}>
            <h2>Player</h2>
          </Column>
        </Row>
      </Grid>
    </Router>
  );
}
