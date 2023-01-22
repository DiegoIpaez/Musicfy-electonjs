import { Routes as Switch, Route } from "react-router-dom";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" element={<h2>Top bar</h2>} />
      <Route path="/artists" element={<h2>Artists</h2>} />
      <Route path="/settings" element={<h2>Settings</h2>} />
    </Switch>
  );
}
