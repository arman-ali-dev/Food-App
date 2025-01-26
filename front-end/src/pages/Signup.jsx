import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const inputHandler = (e) => {
    const { name, value } = e.target;

    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await axios.post(
        "https://arman-food-app.onrender.com/api/users/signup",
        userInfo
      );

      Cookies.set("token", data.token, {
        expires: 30,
        secure: true,
        sameSite: "Strict",
      });

      dispatch(setAuthUser(data.user));
      setUserInfo({
        name: "",
        email: "",
        password: "",
        location: "",
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
      <section className="signUp-section">
        <div className="container">
          <div className="formLayout">
            <h2 className="fs-2 text-cente  r fw-bold fs-1 text-light">
              Sign UP
            </h2>
            <form onSubmit={signupHandler}>
              <div className="mt-4">
                <input
                  value={userInfo.name}
                  onChange={inputHandler}
                  type="text"
                  placeholder="Enter name..."
                  className="px-2 py-2"
                  name="name"
                />
              </div>

              <div className="mt-4">
                <input
                  value={userInfo.email}
                  onChange={inputHandler}
                  type="email"
                  placeholder="Enter email..."
                  className="px-2 py-2"
                  name="email"
                />
              </div>

              <div className="mt-4">
                <input
                  value={userInfo.location}
                  onChange={inputHandler}
                  type="text"
                  placeholder="Enter location..."
                  className="px-2 py-2"
                  name="location"
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
                  className="btn formBtn px-4 text-light"
                  disabled={isLoading}
                >
                  {isLoading ? <span className="loader"></span> : "Sign Up"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
