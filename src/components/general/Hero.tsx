import ShiftingLink from "./ShiftingLink";

const Hero = () => {
  const constructHeader = (text: string) => {
    const spans: Array<JSX.Element> = [];
    for (let i = 0; i < text.length; i++) {
      spans.push(
        <span key={i} className="test">
          {text[i]}
        </span>
      );
    }
    return spans;
  };

  return (
    <div id="hero">
      <h1 id="hero-header">{constructHeader("CAPTURE YOUR CULTURE")}</h1>
      <div id="hero-content">
        <h2 id="hero-subheader">Framing your story one moment at a time.</h2>
        <div id="hero-cta">
          <ShiftingLink
            text="See our work"
            stagger
            href="google.com"
            id="hero-work"
            className="hero-cta-link"
          />
          <ShiftingLink
            text="Contact us"
            stagger
            href="google.com"
            id="hero-contact"
            className="hero-cta-link"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
