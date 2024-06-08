import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";

import { ToastContainer } from "react-toastify";
import { publicRoutes } from "./routes/routes";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Switch>
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              const Layout = route.layout;
              return (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.path === "/"}
                  render={() => (
                    <Layout>
                      <Page />
                    </Layout>
                  )}
                />
              );
            })}
          </Switch>
        </div>
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ zIndex: 9999999 }}
      />
    </>
  );
}

export default App;
