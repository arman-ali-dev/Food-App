import { Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import Header from "./components/Header";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Error } from "./pages/Error";
import { Order } from "./pages/Order";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route
          path="myOrder"
          element={
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
      <Footer />
    </>
  );
};

export default App;
