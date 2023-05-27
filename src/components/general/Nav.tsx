import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const Nav = React.forwardRef<HTMLDivElement>((props, ref) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const tlRef = useRef<gsap.core.Timeline>();

  const handleMenu = (open: boolean) => {
    if (menuRef.current === null) {
      return;
    }
    if (tlRef.current === null || tlRef.current === undefined) {
      return;
    }

    if (open) {
      tlRef.current.play();
      menuRef.current.classList.add("active");
    } else {
      tlRef.current.reverse();
      menuRef.current.classList.remove("active");
    }
  };

  useEffect(() => {
    if (hamburgerRef.current === null) {
      return;
    }
    const hamburger = [];
    for (const child of hamburgerRef.current.children) {
      hamburger.push(child);
    }

    tlRef.current = gsap.timeline({ paused: true });
    tlRef.current
      .to(menuRef.current, {
        duration: 0.7,
        y: "0",
        ease: "power4.in",
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
        duration: 0.1,
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
      );
  }, []);

  useEffect(() => {
    if (menuOpen) {
      handleMenu(true);
    } else {
      handleMenu(false);
    }
  }, [menuOpen]);

  return (
    <nav ref={ref}>
      <div id="menu" ref={menuRef}></div>
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
