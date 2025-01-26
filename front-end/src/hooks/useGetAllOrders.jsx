import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrders } from "../redux/orderSlice";

export default function useGetAllOrders() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/orders/fetch",
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      dispatch(setOrders(data.orders));
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);
}
