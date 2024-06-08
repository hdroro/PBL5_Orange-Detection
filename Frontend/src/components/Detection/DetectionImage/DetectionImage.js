import { useEffect, useRef, useState } from "react";
import { ChevLeftIcon, ChevRightIcon } from "../../Icon/Icon";
import "./DetectionImage.scss";

function DetectionImage({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageRef = useRef();
  const changeSrcImage = (image_path) => {
    imageRef.current.src = `data:image/png;base64,${image_path}`;
  };
  useEffect(() => {
    setCurrentIndex(0);
  }, [images]);
  const moveToNextImage = () => {
    if (currentIndex < images["list_images"].length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  const moveToPreviousImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  return (
    <div className="detection-image-container">
      <div className="top-content d-flex justify-content-between align-items-center">
        <div
          onClick={moveToPreviousImage}
          className={
            images && currentIndex > 0 ? "back-left" : "back-left disable"
          }
        >
          <ChevLeftIcon className="icon-action" />
        </div>
        <div className="image-detect-main">
          <img
            ref={imageRef}
            src={
              images &&
              `data:image/png;base64,${images["list_images"][currentIndex]["image_path"]}`
            }
            alt=""
          />
        </div>
        <div
          className={
            images && currentIndex < images["list_images"].length - 1
              ? "back-right"
              : "back-right disable"
          }
          onClick={moveToNextImage}
        >
          <ChevRightIcon className="icon-action" />
        </div>
      </div>
      <div className="bottom-content mt-4 d-flex justify-content-center gap-3">
        {images &&
          images["list_images"].map((item, index) => {
            return (
              <div
                key={index}
                className="image-detect-small"
                onClick={() => changeSrcImage(item["image_path"])}
              >
                <img
                  src={images && `data:image/png;base64,${item["image_path"]}`}
                  alt=""
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default DetectionImage;
