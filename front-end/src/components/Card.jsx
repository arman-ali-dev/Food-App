import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../redux/cartSlice";
import { toast } from "react-toastify";

export const Card = ({ item }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(Object.keys(item.price)[0]);
  const [price, setPrice] = useState(Object.values(item.price)[0]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    if (user) {
      try {
        const { data } = await axios.post(
          "https://arman-food-app.onrender.com/api/carts/add",
          {
            foodID: item._id,
            imageURL: item.imageUrl,
            qty,
            name: item.name,
            size,
            price,
          },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );

        let isItemExists = cart?.some(
          (elem) => elem.foodID == item._id && elem.size == size
        );

        var updatedCartItems;
        if (isItemExists) {
          updatedCartItems = cart.map((elem) =>
            elem.foodID == item._id && elem.size == size
              ? {
                  ...elem,
                  quantity: elem.quantity + Number(qty),
                  ["price"]: elem.price + price,
                }
              : elem
          );
          isItemExists = undefined;
        } else {
          updatedCartItems = [
            {
              _id: data.cartItem._id,
              foodID: item._id,
              userID: user?._id,
              imageURL: item.imageUrl,
              name: item.name,
              quantity: Number(qty),
              size,
              price,
            },
            ...cart,
          ];
        }

        dispatch(setCart(updatedCartItems));

        toast.success("item added in cart!", {
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
    } else {
      setIsLoading(false);
      return toast.error("Please Login!", {
        position: "top-center",
        autoClose: 800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <>
      <div className="col-12 col-md-6 mb-5 col-xl-4 px-4">
        <div className="card border-0">
          <img src={item.imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{item.name}</h5>
            <div className="description-text">
              <p className="card-text">{item.description}</p>
            </div>

            <div className="d-flex justify-content-between gap-3">
              <select
                value={qty}
                onChange={(e) => {
                  setQty(e.target.value);
                  setPrice(item.price[size] * e.target.value);
                }}
                className="selectBox qty text-white  px-2 py-1 cursor-pointer"
              >
                {Array.from(Array(7)).map((_, index) => {
                  return (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  );
                })}
              </select>

              <select
                value={size}
                onChange={(e) => {
                  setSize(e.target.value);
                  setPrice(item?.price[e.target.value] * qty);
                }}
                className="selectBox text-white px-2 py-1"
              >
                {Object.keys(item.price).map((size) => {
                  return (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="mt-3">
              <h4 className="price">Total Price: ₹{price}/-</h4>
            </div>
          </div>

          <div className="bottom">
            <button
              onClick={handleAddToCart}
              className="w-100 border-0 outline-0  py-2 text-light"
              disabled={isLoading}
            >
              {isLoading ? <span className="loader"></span> : "Add to cart"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
