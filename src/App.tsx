import { Route, Routes } from "react-router-dom";
import { useRef, useState } from "react";
import { MdArrowOutward, MdPlayArrow } from "react-icons/md";
import Nav from "./components/general/Nav";
import Home from "./components/page/Home";
import Work from "./components/page/Work";
import About from "./components/page/About";
import Contact from "./components/page/Contact";

function App() {
  window.onbeforeunload = () => {
    window.scrollTo(0, 0);
  };

  const trailerRef = useRef<HTMLDivElement>(null);
  const [hoverVid, setHoverVid] = useState<boolean>(false);
  window.onmousemove = (e) => {
    if (trailerRef.current === null) {
      return;
    }
    if (e.target === null) {
      return;
    }

    const interactable = (e.target as Element).closest(".interactable");

    if (interactable !== null) {
      trailerRef.current.children[0].classList.add("visible");
      if (interactable.classList.contains("video")) {
        setHoverVid(true);
      } else {
        setHoverVid(false);
      }
    } else {
      trailerRef.current.children[0].classList.remove("visible");
    }

    trailerRef.current.animate(
      {
        transform: `translate(${
          e.clientX - trailerRef.current.offsetWidth
        }px, ${e.clientY - trailerRef.current.offsetHeight}px) scale(${
          interactable !== null ? 8 : 1
        })`,
      },
      { duration: 200, fill: "forwards" }
    );
  };

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      {!isMobile && (
        <div id="mouse-trailer" ref={trailerRef}>
          {hoverVid ? <MdPlayArrow size={5} /> : <MdArrowOutward size={5} />}
        </div>
      )}
    </div>
  );
}

export default App;
