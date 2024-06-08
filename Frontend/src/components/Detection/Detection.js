import ContainerWrapper from "../ContainerWrapper/ContainerWrapper";
import "./Detection.scss";
import DetectionImage from "./DetectionImage/DetectionImage";
import ListResultDetection from "./ListResultDetection/ListResultDetection";

import database from "../../config/firebaseConfig";
import { useEffect, useRef, useState } from "react";
import { ref, child, get, onValue, update } from "firebase/database";
import { EditIcon } from "../Icon/Icon";

function Detection() {
  const [currentKey, setCurrentKey] = useState();
  const [cbbResult, setCbbResult] = useState();
  const [imageData, setImageData] = useState();
  const [imageKeyList, setImageKeyList] = useState([]);
  const [currentImages, setCurrentImages] = useState(null);
  const checkUpdateRef = useRef(0);

  const dbRef = ref(database);
  useEffect(() => {
    onValue(dbRef, (sns) => {
      get(child(dbRef, "images_info"))
        .then((snapshot) => {
          console.log(currentKey);
          if (snapshot.exists()) {
            const imageInfo = snapshot.val();
            if (imageInfo) {
              setImageData(imageInfo);
              const keyList = Object.keys(imageInfo).reverse();
              setImageKeyList(keyList);

              if (+checkUpdateRef.current === 1) {
                checkUpdateRef.current = 0;
              } else {
                setCurrentImages(imageInfo[keyList[0]]);
                setCurrentKey(keyList[0]);
                setCbbResult(imageInfo[keyList[0]].result);
              }
            } else {
              setImageKeyList([]);
              setCurrentImages(null);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, []);

  const handleOnChangeImage = (key) => {
    setCurrentKey(key);
    setCurrentImages(imageData[key]);
    setCbbResult(imageData[key].result);
  };

  const handleOnUpdate = () => {
    const data = imageData[currentKey];

    data.result = Number(cbbResult);
    data.update = Number(1);
    checkUpdateRef.current = 1;
    setCurrentKey(currentKey);
    update(child(dbRef, `/images_info/${currentKey}`), data)
      .then(() => {
        console.log("Dữ liệu đã được cập nhật thành công!");
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật dữ liệu:", error);
      });
  };

  return (
    <div className="detection-container pt-5 ">
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-9 col-md-9 col-sm-12">
            <ContainerWrapper>
              <div className="p-4 pb-0">
                <div className="time-detection text-center mb-4 ">
                  <span className="fst-italic">
                    Thời gian nhận dạng:{" "}
                    {currentImages &&
                      currentImages["time_predict"].split(".")[0]}
                  </span>
                </div>
                <DetectionImage images={currentImages && currentImages} />
                <div className="final-result text-center mt-3">
                  <b>Kết quả: </b>
                  <select
                    style={{ marginTop: "0.5rem" }}
                    className="cbb-result"
                    value={cbbResult}
                    onChange={(e) => {
                      setCbbResult(e.target.value);
                      console.log(e.target.value);
                    }}
                  >
                    <option value={0}>Đạt</option>
                    <option value={1}>Không đạt</option>
                  </select>
                  <EditIcon
                    onClick={handleOnUpdate}
                    className={"edit-icon"}
                    width="1.3rem"
                    height="1.3rem"
                  />
                </div>
              </div>
            </ContainerWrapper>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-0">
            <ContainerWrapper>
              <ListResultDetection
                handleOnChangeImage={handleOnChangeImage}
                keyList={imageKeyList}
                imageData={imageData}
              />
            </ContainerWrapper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detection;
