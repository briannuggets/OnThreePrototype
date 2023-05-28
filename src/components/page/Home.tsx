import { useEffect, useRef, useState } from "react";
import Hero from "../general/Hero";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ShiftingLink from "../general/ShiftingLink";
import GalleryImage from "../general/GalleryImage";
import { MdLocationOn, MdClose } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  // GSAP Parameters
  const parameters = {
    textProgress: 0,
  };

  // ------- SECTION 1 ------- //
  const textRef = useRef<HTMLHeadingElement>(null);

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

  // ------- SECTION 2 ------- //

  const marqueeRef = useRef<HTMLDivElement>(null);

  // GSAP animation to move the marquee as the user scrolls
  useEffect(() => {
    if (marqueeRef.current === null) {
      return;
    }

    let i = 0;

    // Offset adjustments for responsive layout
    let offsets = ["-40%", "-80%", "-75%"];
    if (window.innerWidth < 400) {
      offsets = ["-200%", "-170%", "-250%"];
    } else if (window.innerWidth < 450) {
      offsets = ["-160%", "-160%", "-220%"];
    } else if (window.innerWidth < 600) {
      offsets = ["-120%", "-170%", "-140%"];
    } else if (window.innerWidth < 700) {
      offsets = ["-100%", "-80%", "-100%"];
    }
    for (const marquee of marqueeRef.current.children) {
      gsap.to(marquee, {
        transform: `translateX(${offsets[i]})`,
        scrollTrigger: {
          trigger: "#home-section-2",
          scrub: true,
        },
      });
      i++;
    }
  }, []);

  // ------- SECTION 3 ------- //
  const rightGalleryRef = useRef<HTMLDivElement>(null);
  const leftGalleryRef = useRef<HTMLDivElement>(null);
  const gallerySectionRef = useRef<HTMLDivElement>(null);
  const galleryHeaderRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (rightGalleryRef.current === null) {
      return;
    }
    if (gallerySectionRef.current === null) {
      return;
    }
    if (galleryHeaderRef.current === null) {
      return;
    }

    // Custom variable to offset the marquee animation
    rightGalleryRef.current.style.setProperty(
      "--offset",
      `${gallerySectionRef.current.offsetHeight}px`
    );

    // Animate gallery header text on viewport intersection
    gsap.to(galleryHeaderRef.current, {
      transform: "rotate3d(1, 0, 0, 0deg) translateY(0)",
      opacity: 1,
      duration: 3,
      ease: "power4.out",
      scrollTrigger: {
        trigger: galleryHeaderRef.current,
        start: "top 85%",
      },
    });

    gsap.to("#gallery-link", {
      opacity: 1,
      duration: 2,
      ease: "power4.out",
      delay: 0.5,
      scrollTrigger: {
        trigger: galleryHeaderRef.current,
        start: "top 65%",
      },
    });
  }, []);

  // ------- SECTION 4 ------- //
  const [videoPlaying, setVideoPlaying] = useState(false);

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
          <ShiftingLink text="About Us &#8594;" href="about" stagger />
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
      <section id="home-section-2">
        <div ref={marqueeRef}>
          <span>
            <span>
              Events Events <span className="highlight">Events</span> Events
              Events
            </span>
          </span>
          <span>
            <span>
              Portrait Portrait <span className="highlight">Portrait</span>{" "}
              Portrait Portrait
            </span>
          </span>
          <span>
            <span>
              Lifestyle Lifestyle <span className="highlight">Lifestyle</span>{" "}
              Lifestyle Lifestyle
            </span>
          </span>
        </div>
      </section>
      <section id="home-section-3" ref={gallerySectionRef}>
        <div id="section-3-header">
          <h2 ref={galleryHeaderRef}>
            <span>For any occasion</span>
            <br />
            <span>We do it all and more.</span>
          </h2>
          <ShiftingLink
            text="View Work &#8594;"
            href="work"
            stagger
            id="gallery-link"
          />
        </div>
        <div className="scrolling-gallery left" ref={leftGalleryRef}>
          <GalleryImage id={1} href="work" />
          <GalleryImage id={2} href="work" />
          <GalleryImage id={3} href="work" />
          <GalleryImage id={4} href="work" />
          <GalleryImage id={5} href="work" />
          <GalleryImage id={1} href="work" />
          <GalleryImage id={2} href="work" />
          <GalleryImage id={3} href="work" />
          <GalleryImage id={4} href="work" />
          <GalleryImage id={5} href="work" />
        </div>
        <div className="scrolling-gallery right" ref={rightGalleryRef}>
          <GalleryImage id={10} href="work" />
          <GalleryImage id={9} href="work" />
          <GalleryImage id={8} href="work" />
          <GalleryImage id={7} href="work" />
          <GalleryImage id={6} href="work" />
          <GalleryImage id={10} href="work" />
          <GalleryImage id={9} href="work" />
          <GalleryImage id={8} href="work" />
          <GalleryImage id={7} href="work" />
          <GalleryImage id={6} href="work" />
        </div>
      </section>
      <section
        id="home-section-4"
        className="interactable video"
        onClick={() => {
          setVideoPlaying(true);
        }}
      >
        <video src="./video/intro.mp4" autoPlay muted loop playsInline />
        <h2>
          Framing your story
          <br />
          One moment at a time.
        </h2>
      </section>
      {videoPlaying && (
        <div id="video-modal">
          <video src="./video/full.mp4" controls autoPlay />
          <MdClose
            size={40}
            color="white"
            onClick={() => {
              setVideoPlaying(false);
            }}
          />
        </div>
      )}
      <section id="home-section-5">
        <div id="footer-wrapper">
          <div className="footer left">
            <h2>Interested in a shoot?</h2>
            <h3>
              Give us the details of your project and we'll get back to you
              soon.
            </h3>
            <div id="footer-links">
              <ShiftingLink
                text="Instagram   &#8599;"
                href="https://www.instagram.com/onthreephotography/?hl=en"
                stagger
                newTab
              />
              <ShiftingLink
                text="LinkedIn     &#8599;"
                href="https://www.linkedin.com/company/onthreephotography/"
                stagger
                newTab
              />
            </div>
          </div>
          <form
            className="footer right"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              type="text"
              placeholder="Name"
              className="form-small"
              name="name"
              autoComplete="off"
            />
            <input
              type="text"
              placeholder="Email"
              className="form-small"
              name="email"
              autoComplete="off"
            />
            <input
              type="text"
              placeholder="Phone"
              className="form-small"
              name="phone"
              autoComplete="off"
            />
            <textarea
              placeholder="This is a sample form, it will not submit anything."
              className="form-large"
              name="message"
            />
            <div className="form-small" id="submit-container">
              <span>
                <MdLocationOn size={30} />
                &nbsp;Richmond, VA
              </span>
              <div>
                <input
                  type="submit"
                  value="Send"
                  className="form-submit"
                  name="submit"
                />
              </div>
            </div>
          </form>
          <div id="footer-marquee">
            <div>
              <span>ON THREE</span>
              <span>&#183;</span>
              <span>ON THREE</span>
              <span>&#183;</span>
              <span>ON THREE</span>
              <span>&#183;</span>
              <span>ON THREE</span>
              <span>&#183;</span>
              <span>ON THREE</span>
              <span>&#183;</span>
              <span>ON THREE</span>
              <span>&#183;</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
