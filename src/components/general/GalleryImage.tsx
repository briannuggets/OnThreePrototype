import { FC } from "react";

interface ImageProps {
  id?: number;
  href?: string;
}

const GalleryImage: FC<ImageProps> = ({ id, href }) => {
  const visit = () => {
    window.open(href, "_blank");
  };

  return (
    <img
      className="gallery-image interactable"
      src={`./gallery/${id}.jpg`}
      onClick={visit}
    />
  );
};

export default GalleryImage;
