import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { deleteCartItem, setCart } from "../redux/cartSlice";
import useGetAllCartItems from "../hooks/useGetAllCartItems";
import { toast } from "react-toastify";

export const Cart = () => {
  useGetAllCartItems();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteCartItem = async (id) => {
    setIsLoading(true);
    try {
      await axios.delete(
        `https://arman-food-app.onrender.com/api/carts/delete/${id}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      dispatch(deleteCartItem({ id }));
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  var totalPrice = cart.reduce((prev, next) => prev + next.price, 0);

  const handleBookOrders = async () => {
    try {
      await axios.post(
        "https://arman-food-app.onrender.com/api/orders/add",
        {
          totalPrice,
          cartItems: cart,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      dispatch(setCart([]));

      toast.success("order successfully placed!", {
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
    }
  };

  return (
    <>
      <section className="cart-section py-5">
        <div className="container">
          {cart.length === 0 ? (
            <h1 className="text-center">Cart is empty!</h1>
          ) : (
            <>
              <table width="100%">
                <thead>
                  <tr className="cart-headings">
                    <th className="col-1">ID</th>
                    <th className="col-3">Name</th>
                    <th className="col-3">Quantity</th>
                    <th className="col-3">Size</th>
                    <th className="col-3">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => (
                    <tr key={index} className="cartValue">
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.size}</td>
                      <td>{item.price}</td>
                      <td>
                        <button
                          onClick={() => handleDeleteCartItem(item._id)}
                          className="border-0"
                          disabled={isLoading}
                        >
                          <i className="fa-solid fa-trash text-danger"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

                <tfoot>
                  <tr>
                    <td colSpan="6" align="center" style={{ height: "150px" }}>
                      <h2 className="total-amount">
                        Total Amount: {totalPrice}
                      </h2>
                    </td>
                  </tr>
                </tfoot>
              </table>

              <button
                onClick={handleBookOrders}
                className="orderBtn btn px-4 text-light"
              >
                {isLoading ? <span className="loader"></span> : "Order Now"}
              </button>
            </>
          )}
        </div>
      </section>
    </>
  );
};
