import { Routes as Switch, Route } from "react-router-dom";
import Settings from "../pages/Settings/Settings";

export default function Routes({ user }) {
  return (
    <Switch>
      <Route path="/" element={<h2>Top bar</h2>} />
      <Route path="/artists" element={<h2>Artists</h2>} />
      <Route path="/settings" element={<Settings user={user} />} />
    </Switch>
  );
}
