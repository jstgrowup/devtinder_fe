import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Login from "./routes/Login";
import Feed from "./routes/Feed";
import Profile from "./routes/Profile";
import Body from "./routes/Body";
function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
