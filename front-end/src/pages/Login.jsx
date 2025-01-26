import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { setAuthUser } from "../redux/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const inputHandler = (e) => {
    const { name, value } = e.target;

    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/users/login",
        userInfo
      );

      Cookies.set("token", data.token, {
        expires: 30,
        secure: true,
        sameSite: "Strict",
      });

      dispatch(setAuthUser(data.user));
      setUserInfo({
        email: "",
        password: "",
      });

      navigate("/");
    } catch (error) {
      if (error.response) {
        return toast.error(error.response.data.msg, {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        console.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <section className="login-section">
        <div className="container">
          <div className="formLayout">
            <h2 className="fs-2 text-center text-light fw-bold">Log In</h2>
            <form onSubmit={loginHandler}>
              <div className="mt-4">
                <input
                  value={userInfo.email}
                  onChange={inputHandler}
                  type="text"
                  placeholder="Enter email..."
                  className="px-2 py-2"
                  name="email"
                />
              </div>

              <div className="mt-4">
                <input
                  value={userInfo.password}
                  onChange={inputHandler}
                  type="password"
                  placeholder="Enter password..."
                  className="px-2 py-2"
                  name="password"
                />
              </div>

              <div style={{ textAlign: "center", marginTop: "35px" }}>
                <button
                  type="submit"
                  className="btn px-4 text-light formBtn"
                  disabled={isLoading}
                >
                  {isLoading ? <span className="loader"></span> : "Log In"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
