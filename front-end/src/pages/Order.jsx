import { useDispatch, useSelector } from "react-redux";
import useGetAllOrders from "../hooks/useGetAllOrders";
import axios from "axios";
import Cookies from "js-cookie";
import { setOrders } from "../redux/orderSlice";
import { useState } from "react";
import { toast } from "react-toastify";

export const Order = () => {
  useGetAllOrders();
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const [isLoading, setIsLoading] = useState(false);

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
    <>
      <section className="myOrderSection">
        <div className="container">
          {orders.length === 0 ? (
            <h1 className="text-danger  text-center">No Orders!</h1>
          ) : (
            orders.map((order, i) => {
              return (
                <div key={i} className="row">
                  <h2 className="total-amount mb-4 ">
                    Total Amount: {order.totalPrice}
                  </h2>
                  {order.items.map((item, index) => (
                    <div
                      className="col-12 col-md-6 mb-5 col-xl-4 px-4"
                      key={index}
                    >
                      <div className="card mb-3">
                        <img
                          src={item.imageURL}
                          className="card-img-top"
                          alt="..."
                        />
                        <div className="card-body">
                          <h5 className="card-title">{item.name}</h5>
                          <span className="fs-5 my-2 qtyANDsize d-inline-block">
                            {item.quantity} {item.size}
                          </span>
                          <p className="card-text">
                            <small className="text-muted">{order.date}</small>
                          </p>
                        </div>
                        <button
                          id={order._id}
                          onClick={(e) =>
                            handleCancelOrder(
                              item.cartItemID,
                              e.currentTarget.id
                            )
                          }
                          className="cancelBtn border-0 outline-0 w-100 text-light"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <span className="loader"></span>
                          ) : (
                            "Order Cancel"
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })
          )}{" "}
        </div>
      </section>
    </>
  );
};
