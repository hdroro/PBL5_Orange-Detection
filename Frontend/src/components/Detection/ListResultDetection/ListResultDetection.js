import { useState } from "react";
import {
  Checkicon,
  ChevDownIcon,
  ChevRightIcon,
  CloseIcon,
} from "../../Icon/Icon";
import "./ListResultDetection.scss";
import ResultItem from "./ResultItem";

function ListResultDetection({ keyList, handleOnChangeImage, imageData }) {
  const [isToggleListResult, setIsToggleResult] = useState(true);
  const [chosenIndex, setChosenIndex] = useState(0);

  const handleToggleListResult = () => {
    setIsToggleResult(!isToggleListResult);
  };
  const handleOnClick = (chosenIndex) => {
    setChosenIndex(chosenIndex);
  };
  return (
    <div className="list-results-container">
      <div
        className="title-results d-flex gap-2 justify-content-center align-items-center"
        onClick={() => handleToggleListResult()}
      >
        <span>Kết quả nhận dạng</span>{" "}
        {isToggleListResult ? (
          <ChevDownIcon />
        ) : (
          <ChevRightIcon width="20" height="20" color="#e8b12d" />
        )}
      </div>
      {isToggleListResult && keyList ? (
        <div className="list-results mt-3">
          {keyList.map((item, index) => {
            return (
              <ResultItem
                chosen={chosenIndex === index}
                key={index}
                key_={index}
                handleOnClick={handleOnClick}
                handleOnChangeImage={() => handleOnChangeImage(item)}
                leftIcon={
                  imageData[item].result === 0 ? (
                    <Checkicon color="#15CB53" />
                  ) : (
                    <CloseIcon color="red" />
                  )
                }
              >
                <div className="d-flex flex-column">
                  <span className="text-start d-flex justify-content-between align-items-center">
                    {imageData[item].result == 0 ? "Đạt" : "Không đạt"}
                    <span className="update">
                      {imageData[item].update == 1 && "Edited"}
                    </span>
                  </span>
                  <span className="time">
                    {imageData[item]["time_predict"].split(".")[0]}
                  </span>
                </div>
              </ResultItem>
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ListResultDetection;
