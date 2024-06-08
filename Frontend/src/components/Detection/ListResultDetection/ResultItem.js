import "./ListResultDetection.scss";

function ResultItem({
  children,
  leftIcon,
  rightIcon,
  handleOnChangeImage,
  chosen,
  handleOnClick,
  key_,
}) {
  return (
    <div
      onClick={() => {
        handleOnChangeImage();
        handleOnClick(key_);
      }}
      className={`result-item-container d-flex ${chosen ? "chosen" : ""}`}
    >
      {leftIcon && <span className={"icon"}>{leftIcon}</span>}
      <span className={"title text-center w-100"}>{children}</span>
      {rightIcon && <span className={"icon"}>{rightIcon}</span>}
    </div>
  );
}

export default ResultItem;
