import React, { useState, useEffect, useRef } from "react";
import ShiftingLink from "./ShiftingLink";
import { gsap } from "gsap";

const Nav = React.forwardRef<HTMLDivElement>((props, ref) => {
  props = { ...props, ref: ref };
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const linkRef = useRef<HTMLDivElement>(null);
  const aImageRef = useRef<HTMLImageElement>(null);
  const bImageRef = useRef<HTMLImageElement>(null);
  const menuButtonTl = useRef<gsap.core.Timeline>();

  // Play animations on menu open/close
  // Disable scrolling when menu is open
  const handleMenu = (open: boolean) => {
    if (menuRef.current === null) {
      return;
    }
    if (menuButtonTl.current === null || menuButtonTl.current === undefined) {
      return;
    }

    if (open) {
      menuButtonTl.current.play();
      menuRef.current.classList.add("active");
    } else {
      menuButtonTl.current.reverse();
      menuRef.current.classList.remove("active");
    }
  };

  useEffect(() => {
    if (menuOpen) {
      handleMenu(true);
    } else {
      handleMenu(false);
    }
  }, [menuOpen]);

  // GSAP menu animations
  useEffect(() => {
    if (hamburgerRef.current === null) {
      return;
    }
    const hamburger = [];
    for (const child of hamburgerRef.current.children) {
      hamburger.push(child);
    }

    const links = [];
    if (linkRef.current === null) {
      return;
    }
    for (const child of linkRef.current.children) {
      links.push(child.children[0]);
    }

    menuButtonTl.current = gsap.timeline({ paused: true });
    menuButtonTl.current
      .to(menuRef.current, {
        duration: 0.5,
        y: "0",
        ease: "power4.inOut",
      })
      .to(
        [hamburger[0], hamburger[2]],
        {
          duration: 0.2,
          top: "50%",
        },
        "<"
      )
      .to([hamburger[0], hamburger[1], hamburger[2]], {
        duration: 0.5,
        rotate: "360deg",
        borderTop: "3px solid white",
        ease: "power4.in",
      })
      .to(hamburger[0], {
        duration: 0.2,
        rotate: "315deg",
        delay: 0.3,
      })
      .to(
        [hamburger[2], hamburger[1]],
        { duration: 0.2, rotate: "405deg" },
        "<"
      )
      .to(
        links[0],
        {
          y: "0",
          duration: 0.5,
          ease: "power4.out",
        },
        "<"
      )
      .to(
        links[1],
        {
          y: "0",
          duration: 0.5,
          ease: "power4.out",
        },
        "<0.1"
      )
      .to(
        links[2],
        {
          y: "0",
          duration: 0.5,
          ease: "power4.out",
        },
        "<0.1"
      )
      .to(
        links[3],
        {
          y: "0",
          duration: 0.5,
          ease: "power4.out",
        },
        "<0.1"
      )
      .to(
        aImageRef.current,
        {
          duration: 0.5,
          opacity: 1,
          ease: "power4.out",
        },
        "<"
      )
      .to(
        bImageRef.current,
        {
          duration: 0.5,
          opacity: 1,
          ease: "power4.out",
        },
        "<0.2"
      );
  }, []);

  // Give link of current page a different style
  useEffect(() => {
    if (linkRef.current === null) {
      return;
    }

    const links = [];
    for (const child of linkRef.current.children) {
      links.push(child.children[0]);
    }
    for (const link of linkRef.current.children) {
      link.classList.remove("current");
    }
    for (const link of links) {
      if (link.getAttribute("href") === window.location.pathname) {
        link.classList.add("current");
      }
    }
  }, [window.location.href]);

  // Change menu image on link hover
  const [currentImage, setCurrentImage] = useState(0);
  const hoverLink = (index: number) => {
    if (aImageRef.current === null || bImageRef.current === null) {
      return;
    }
    if (currentImage === index) {
      return;
    }

    setCurrentImage(index);
    if (aImageRef.current.classList.contains("current")) {
      bImageRef.current.src = `./menu/${index}.jpg`;
      aImageRef.current.classList.remove("current");
      bImageRef.current.classList.add("current");
      gsap.fromTo(
        bImageRef.current,
        {
          opacity: 0,
          rotate: "-5deg",
        },
        {
          opacity: 1,
          rotate: "5deg",
          duration: 0.4,
          ease: "power4.out",
        }
      );
    } else {
      aImageRef.current.src = `./menu/${index}.jpg`;
      aImageRef.current.classList.add("current");
      bImageRef.current.classList.remove("current");
      gsap.fromTo(
        aImageRef.current,
        {
          opacity: 0,
          rotate: "5deg",
        },
        {
          opacity: 1,
          rotate: "-5deg",
          duration: 0.4,
          ease: "power4.out",
        }
      );
    }
  };

  return (
    <nav ref={ref}>
      <div id="menu" ref={menuRef}>
        <div id="menu-images" className="menu-section">
          <img src="./menu/1.jpg" ref={aImageRef} />
          <img src="./menu/0.jpg" ref={bImageRef} className="current" />
        </div>
        <div id="menu-links" className="menu-section" ref={linkRef}>
          <div
            onMouseEnter={() => {
              hoverLink(0);
            }}
          >
            <ShiftingLink text="HOME" stagger href="/" />
          </div>
          <div
            onMouseEnter={() => {
              hoverLink(1);
            }}
          >
            <ShiftingLink text="WORK" stagger href="/work" />
          </div>
          <div
            onMouseEnter={() => {
              hoverLink(2);
            }}
          >
            <ShiftingLink text="ABOUT" stagger href="/about" />
          </div>
          <div
            onMouseEnter={() => {
              hoverLink(3);
            }}
          >
            <ShiftingLink text="CONTACT" stagger href="/contact" />
          </div>
        </div>
      </div>
      <a href="./">
        <img src="logo.svg" alt="On Three Logo" id="nav-logo" />
      </a>
      <button
        id="menu-button"
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
        ref={hamburgerRef}
      >
        <div className="hamburger top" />
        <div className="hamburger mid" />
        <div className="hamburger bot" />
      </button>
    </nav>
  );
});

export default Nav;
