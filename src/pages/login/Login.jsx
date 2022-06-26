import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/apiCalls";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import "./login.scss";

const Login = () => {
  const dispatch = useDispatch();
  const { isFetching } = useSelector((state) => state.user);

  const initialState = {
    username: "",
    password: "",
  };
  const [state, setState] = useState(initialState);
  const [error, setError] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    login(dispatch, state, setError);
  };
  const handleChange = (e) => {
    setState((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const user = useSelector((state) => state.user.currentUser);
  console.log(user);
  return (
    <div className="login">
      <div className="right">
        <img src="https://www.tripbaligo.com/wp-content/uploads/2020/09/149-Converted.png"></img>
      </div>
      <div className="left">
        <div className="login-container">
          <h1>Login Admin</h1>
          <form onSubmit={handleLogin}>
            <div className="formInput">
              <label htmlFor="">Username</label>
              <input
                type="text"
                name="username"
                onChange={handleChange}
                placeholder="Masukan Username Admin"
              />
            </div>
            <div className="formInput">
              <label htmlFor="">Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Masukan Password Anda"
              />
            </div>
            <button type="submit" onClick={handleLogin} disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="inherit" size="1.6rem" thickness={5} />
              ) : (
                "Login"
              )}
            </button>
          </form>
          {error && <p className="error">Username / Password Salah</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
