import Login from "../Login/Login";
import "./Home.scss";

function Home(props) {
  return (
    <div className="home-container">
      <div className="home-content">
        <div class="row mx-5">
          <div class="col-lg-7"></div>
          <div class="col-lg-5 col-md-12 col-sm-12">
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
