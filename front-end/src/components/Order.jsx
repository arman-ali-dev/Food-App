import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setOrders } from "../redux/orderSlice";
import { toast } from "react-toastify";

export default function Order({
  imageURL,
  name,
  quantity,
  size,
  date,
  _id,
  cartItemID,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);

  const handleCancelOrder = async (cartItemID, orderID) => {
    setIsLoading(true);
    try {
      await axios.delete(
        `https://arman-food-app.onrender.com/api/orders/cancel/${cartItemID}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      const updatedOrderData = orders
        .map((elem) =>
          elem._id == orderID
            ? {
                ...elem,
                items: elem.items.filter(
                  (item) => item.cartItemID != cartItemID
                ),
                totalPrice:
                  elem.totalPrice -
                  elem.items.find((item) => item.cartItemID == cartItemID)
                    ?.price,
              }
            : elem
        )
        .filter((elem) => elem.items.length > 0);

      dispatch(setOrders(updatedOrderData));

      toast.success("order canceled!", {
        position: "bottom-right",
        autoClose: 600,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="col-12 col-md-6 mb-5 col-xl-4 px-4">
      <div className="card mb-3">
        <img src={imageURL} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <span className="fs-5 my-2 qtyANDsize d-inline-block">
            {quantity} {size}
          </span>
          <p className="card-text">
            <small className="text-muted">{date}</small>
          </p>
        </div>
        <button
          id={_id}
          onClick={(e) => handleCancelOrder(cartItemID, e.currentTarget.id)}
          className="cancelBtn border-0 outline-0 w-100 text-light"
          disabled={isLoading}
        >
          {isLoading ? <span className="loader"></span> : "Order Cancel"}
        </button>
      </div>
    </div>
  );
}
