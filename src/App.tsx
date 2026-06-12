import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MoviesDetails from "./pages/MoviesDetails";
import Favorites from "./pages/Favorites";
import "./index.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favorites" element={<Favorites/>} />
      <Route path="/movie/:id" element={<MoviesDetails />  } />
    </Routes>
  );  
}

export default App;