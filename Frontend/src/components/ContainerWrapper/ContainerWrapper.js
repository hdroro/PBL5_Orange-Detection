import "./ContainerWrapper.scss";

function ContainerWrapper({ children, className }) {
  return <div className={`container-wrapper ${className}`}>{children}</div>;
}

export default ContainerWrapper;
