import { FC, useState } from "react";

interface LinkProps {
  text: string;
  href: string;
  stagger?: boolean;
  id?: string;
  className?: string;
  newTab?: boolean;
}

const ShiftingLink: FC<LinkProps> = ({
  text,
  href,
  stagger,
  id,
  className,
  newTab,
}) => {
  // Wrap each character in a span tag for shifting animation
  const constructLink = () => {
    const spans: Array<JSX.Element> = [];
    for (let i = 0; i < text.length; i++) {
      if (text[i] === " ") {
        spans.push(
          <span
            key={i}
            className="link-char"
            style={{
              ["--content" as string]: `" "`,
              ["--stagger" as string]: `${stagger ? i * 0.01 : 0}s`,
              ["--stagger-reverse" as string]: `${
                stagger ? text.length * 0.01 - i * 0.01 : 0
              }s`,
            }}
          >
            &nbsp;
          </span>
        );
      } else {
        spans.push(
          <span
            key={i}
            className="link-char"
            style={{
              ["--content" as string]: `"${text[i]}"`,
              ["--stagger" as string]: `${stagger ? i * 0.01 : 0}s`,
              ["--stagger-reverse" as string]: `${
                stagger ? text.length * 0.01 - i * 0.01 : 0
              }s`,
            }}
          >
            {text[i]}
          </span>
        );
      }
    }
    return spans;
  };

  // Hover state
  const [hovered, setHovered] = useState(false);

  return (
    <a
      id={id}
      className={`shifting-link ${className ? className : ""}`}
      href={href}
      target={newTab ? "_blank" : "_self"}
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
    >
      <span className={`shifting-link-chars ${hovered ? "hover" : ""}`}>
        {constructLink()}
      </span>
    </a>
  );
};

export default ShiftingLink;
