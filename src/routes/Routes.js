import { Routes as Switch, Route } from "react-router-dom";
import Artist from "../pages/Artist";
import Home from "../pages/Home";
import Settings from "../pages/Settings/Settings";
import Artists from '../pages/Artists'

export default function Routes({ user }) {
  return (
    <Switch>
      <Route path="/" element={<Home/>} />
      <Route path="/artists" element={<Artists/>} />
      <Route path="/artist/:id" element={<Artist/>} />
      <Route path="/settings" element={<Settings user={user} />} />
    </Switch>
  );
}
