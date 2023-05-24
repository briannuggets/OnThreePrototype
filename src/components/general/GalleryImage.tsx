import { FC } from "react";

interface ImageProps {
  id?: number;
  href?: string;
  placeholder?: boolean;
}

const GalleryImage: FC<ImageProps> = ({ id, href, placeholder }) => {
  const visit = () => {
    window.open(href, "_blank");
  };

  if (placeholder) {
    return <img className="gallery-image" src="./gallery/0.jpg" />;
  }
  return (
    <img
      className="gallery-image interactable"
      src={`./gallery/${id}.jpg`}
      onClick={visit}
    />
  );
};

export default GalleryImage;
