import Sidebar from "./components/Sidebar";

import React, { useState } from "react";
import PropTypes from "prop-types";
import { ToggleSidebar } from "../components/Icon/Icon";

function SidebarOnly({ children }) {
  const [isShowToggleSidebarHidden, setIsShowToggleSidebarHidden] =
    useState(false);
  const [isShowingSidebar, setIsShowingSidebar] = useState(true);

  const handleToggleSidebar = () => {
    setIsShowingSidebar(!isShowingSidebar);
    setIsShowToggleSidebarHidden(!isShowToggleSidebarHidden);
  };

  return (
    <div className="sidebar-wrapper">
      <div className="col-lg-12 col-md-12 col-sm-12">
        <div className="d-flex">
          {isShowToggleSidebarHidden && (
            <div className="col-lg-1 col-md-1 col-sm-1 position-fixed">
              <button className="toggle-sidebar d-flex hidden">
                <ToggleSidebar onClick={() => handleToggleSidebar()} />
              </button>
            </div>
          )}
          {isShowingSidebar && (
            <div className="col-lg-3 col-md-3 col-sm-3 position-fixed">
              <Sidebar handleToggleSidebar={handleToggleSidebar} />
            </div>
          )}
          <div
            style={
              isShowToggleSidebarHidden
                ? { marginLeft: "5%" }
                : { marginLeft: "25%" }
            }
            className={`${
              isShowToggleSidebarHidden
                ? "col-lg-11 col-md-11 col-sm-11"
                : "col-lg-9 col-md-9 col-sm-9"
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

SidebarOnly.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SidebarOnly;
