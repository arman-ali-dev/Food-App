import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../redux/cartSlice";

export default function useGetAllCartItems() {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const fetchCartItems = async () => {
    try {
      const { data } = await axios.get(
        "https://arman-food-app.onrender.com/api/carts/fetch",
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      dispatch(setCart(data.cartItems));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCartItems();
    }
  }, [user]);
}
