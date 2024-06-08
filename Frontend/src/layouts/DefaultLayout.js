import NavHeader from "../components/Navigation/NavHeader";

function DefaultLayout({ children }) {
  return (
    <>
      <div className={"wrapper"}>
        <div className={"grid"}>
          <NavHeader />
          <div className={"content"}>{children}</div>
        </div>
      </div>
    </>
  );
}

export default DefaultLayout;
