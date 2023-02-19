import { Routes as Switch, Route } from "react-router-dom";
import Home from "../pages/Home";
import Settings from "../pages/Settings/Settings";

export default function Routes({ user }) {
  return (
    <Switch>
      <Route path="/" element={<Home/>} />
      <Route path="/artists" element={<h2>Artists</h2>} />
      <Route path="/settings" element={<Settings user={user} />} />
    </Switch>
  );
}
