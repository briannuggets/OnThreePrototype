import { useEffect, useRef } from "react";
import Hero from "../general/Hero";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  // ------- SCROLL TEXT ------- //
  const textRef = useRef<HTMLHeadingElement>(null);
  const parameters = {
    textProgress: 0,
  };

  // Wrap the text in spans to animate each character
  const constructHeader = (text: string) => {
    const words = text.split(" ");
    const wordsArray: Array<Array<JSX.Element>> = [];

    for (const word of words) {
      const chars: Array<JSX.Element> = [];
      for (let i = 0; i < word.length; i++) {
        chars.push(
          <span key={i} className="scroll-text-char">
            {word[i]}
          </span>
        );
      }
      wordsArray.push(chars);
    }

    const header = [];
    for (let i = 0; i < wordsArray.length; i++) {
      header.push(
        <span className="home-section-word" key={i}>
          {wordsArray[i]}
        </span>
      );
      if (i < wordsArray.length - 1) {
        header.push(<span key={i + wordsArray.length}>&nbsp;</span>);
      }
    }
    return header;
  };

  // GSAP animation to fade in each character as the user scrolls
  useEffect(() => {
    if (textRef.current === null) {
      return;
    }

    const chars: Array<Element> = [];
    for (const word of textRef.current.children) {
      if (word.className === "home-section-word") {
        for (const char of word.children) {
          chars.push(char);
        }
      }
    }

    gsap.to(parameters, {
      textProgress: 1,
      duration: 2,
      scrollTrigger: {
        trigger: "#scroll-text",
        scrub: true,
        end: "bottom 40%",
        start: "top 80%",
      },
      onUpdate: () => {
        for (let i = 0; i < chars.length; i++) {
          if (i < parameters.textProgress * chars.length) {
            (chars[i] as HTMLElement).style.opacity = "1";
          } else {
            (chars[i] as HTMLElement).style.opacity = "0.1";
          }
        }
      },
    });
  }, []);

  return (
    <div id="home">
      <Hero />
      <section id="home-section-1">
        <div>
          <h2>
            We are
            <br />
            On Three.
          </h2>
        </div>
        <div>
          <h3 id="scroll-text" ref={textRef}>
            {constructHeader(
              "From corporate gatherings to social affairs, we professionally capture the space while you enjoy the main event. Our goal is to capture your brand raw and true to you. We want to tell your story in a natural setting and whether your business is from your home or in the office there is always something interesting to capture."
            )}
          </h3>
        </div>
        <svg
          width="170"
          height="84"
          viewBox="0 0 170 84"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 2.5C1 2.5 40 -3 69.5 12C88.3886 21.6044 104 43.5 98.5 67.5C95.0965 82.3517 60.5 83 69.5 55C78.5 27 167.5 83 167.5 83M167.5 83L162 71.5M167.5 83H155"
            stroke="black"
            strokeWidth="2"
          />
        </svg>
      </section>
    </div>
  );
};

export default Home;
