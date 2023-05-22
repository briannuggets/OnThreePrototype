import { Route, Routes } from "react-router-dom";
import Nav from "./components/general/Nav";
import Home from "./components/page/Home";
import Work from "./components/page/Work";
import About from "./components/page/About";
import Contact from "./components/page/Contact";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
