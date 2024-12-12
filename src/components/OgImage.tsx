import "./OgImage.scss";
import type React from "react";
import { useFigletDisplay } from "../hooks/useFigletText";
import html2canvas from "html2canvas";

const IMAGE_ID = "site-og-image";

/**
 * This is a silly component that I temporarily add to the page, click download, then save the file
 * to the repo as a static og image. There's 100% a better, automated way to do this, but 🤷‍♂️
 */
export const OgImage: React.FC = () => {
  const display = useFigletDisplay("figlet", "Fraktur", true);

  const downloadImage = async () => {
    const element = document.getElementById(IMAGE_ID);
    if (!element) return;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");
    const link = document.createElement("a");

    link.href = data;
    link.download = "og-image.png";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="ogImage" id={IMAGE_ID}>
        <pre>{display}</pre>
        <div className="overlay">
          Browser
          <div>Find your favorite font!</div>
        </div>
      </div>
      <p className="text-center">
        <button type="button" onClick={downloadImage}>
          Download Image
        </button>
      </p>
    </>
  );
};
