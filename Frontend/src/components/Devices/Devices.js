import "./Devices.scss";
import ContainerWrapper from "../ContainerWrapper/ContainerWrapper";
import images from "../../assets/images";
import { ToggleOffIcon, ToggleOnIcon } from "../Icon/Icon";
import { useState } from "react";

function Devices() {
  const [isOnWebcam, setIsOnWebcam] = useState(false);
  const [isOnMq2, setIsOnMq2] = useState(false);
  const handleToggleOnOffWebCam = () => {
    setIsOnWebcam(!isOnWebcam);
  };

  const handleToggleOnOffMq2 = () => {
    setIsOnMq2(!isOnMq2);
  };
  return (
    <div className="devices-container pt-4 pb-3">
      <div className="container mt-5 p-3">
        <div class="row">
          <div class="col-md-4">
            <ContainerWrapper>
              <div className="img-device text-center">
                <img src={images.webcam} alt="" />
              </div>
              <span className="title-device">Webcam Logitech C270</span>
            </ContainerWrapper>
            <div
              className="toggle-icon text-center mt-2"
              onClick={() => handleToggleOnOffWebCam()}
            >
              {isOnWebcam ? <ToggleOnIcon /> : <ToggleOffIcon />}
            </div>
          </div>
          <div class="col-md-4">
            <ContainerWrapper>
              <div className="img-device text-center">
                <img src={images.mq2} alt="" />
              </div>
              <span className="title-device">Cảm biến khí ga MQ-2</span>
            </ContainerWrapper>
            <div
              className="toggle-icon text-center mt-2"
              onClick={() => handleToggleOnOffMq2()}
            >
              {isOnMq2 ? <ToggleOnIcon /> : <ToggleOffIcon />}
            </div>
          </div>
          <div class="col-md-4">
            <ContainerWrapper>
              <div className="img-device text-center">
                <img src={images.raspberry} alt="" />
              </div>
              <span className="title-device">Raspberry Pi 4 4GB</span>
            </ContainerWrapper>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-md-4 offset-md-2">
            <ContainerWrapper>
              <div className="img-device text-center">
                <img src={images.lcd} alt="" />
              </div>
              <span className="title-device">Màn hình LCD</span>
            </ContainerWrapper>
          </div>
          <div class="col-md-4">
            <ContainerWrapper>
              <div className="img-device text-center">
                <img src={images.led} alt="" />
              </div>
              <span className="title-device">Đèn led</span>
            </ContainerWrapper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Devices;
