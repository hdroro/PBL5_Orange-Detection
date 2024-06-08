/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import { EyeIconClose, EyeIconOpen } from "../Icon/Icon";
import "./Login.scss";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");

  const [isToggleassword, setIsToggleassword] = useState(false);

  const handleTogglePassword = () => {
    setIsToggleassword(!isToggleassword);
  };

  const defaultValidInput = {
    isValidEmail: true,
    isValidPassword: true,
  };

  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

  const isValidInputs = () => {
    setObjCheckInput(defaultValidInput);
    let re = /\S+@\S+\.\S+/;
    if (!email) {
      toast.error("Email is required !");
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
      return false;
    }
    if (!re.test(email)) {
      toast.error("Please enter a valid email address !");
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
      return false;
    }

    if (!passWord) {
      toast.error("Password is required !");
      setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
      return false;
    }

    return true;
  };

  const handleLogin = () => {
    const check = isValidInputs();
    if (check) {
      if (email === "admin@gmail.com" && passWord === "admin@123") {
        toast.success("Login successfully!");
        history.push("/detection");
      } else {
        toast.error("The email address or password is incorrect!");
      }
    }
  };
  const handlePressEnter = (event) => {
    if (event.charCode === 13 && event.code === "Enter") {
      handleLogin();
    }
  };
  return (
    <div className="form-login ">
      <div className="title">Login</div>
      <div className="mb-3 text-white-color ">
        <label for="email" className="form-label">
          Email address <span className="shrink-star">(*)</span>
        </label>
        <div className="form-group">
          <input
            type="email"
            className={`form-control ${
              objCheckInput.isValidEmail ? "" : "is-invalid"
            }`}
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="mb-3 text-white-color">
        <label for="password" className="form-label">
          Password <span className="shrink-star">(*)</span>
        </label>
        <div className="form-group d-flex align-items-center bg-white-color">
          <input
            type={`${isToggleassword ? "text" : "password"}`}
            className={`form-control ${
              objCheckInput.isValidPassword ? "" : "is-invalid"
            }`}
            id="password"
            value={passWord}
            onChange={(e) => setPassWord(e.target.value)}
            onKeyPress={(event) => handlePressEnter(event)}
          />
          {isToggleassword ? (
            <EyeIconOpen
              className="mx-3"
              onClick={() => handleTogglePassword()}
            />
          ) : (
            <EyeIconClose
              className="mx-3"
              onClick={() => handleTogglePassword()}
            />
          )}
        </div>
      </div>

      <div className="d-flex gap-2 justify-content-end">
        <button
          className="btn btn-warning btn-login"
          onClick={() => handleLogin()}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
