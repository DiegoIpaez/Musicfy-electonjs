import { Routes as Switch, Route } from "react-router-dom";
import Artist from "../pages/Artist";
import Home from "../pages/Home";
import Settings from "../pages/Settings/Settings";

export default function Routes({ user }) {
  return (
    <Switch>
      <Route path="/" element={<Home/>} />
      <Route path="/artists" element={<h2>Artists</h2>} />
      <Route path="/artist/:id" element={<Artist/>} />
      <Route path="/settings" element={<Settings user={user} />} />
    </Switch>
  );
}
