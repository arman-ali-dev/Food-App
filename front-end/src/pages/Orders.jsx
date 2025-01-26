import useGetAllOrders from "../hooks/useGetAllOrders";
import Order from "../components/Order";
import { useSelector } from "react-redux";

export const Orders = () => {
  useGetAllOrders();
  const { orders } = useSelector((state) => state.order);

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
                    <Order
                      key={index}
                      imageURL={item.imageURL}
                      name={item.name}
                      quantity={item.quantity}
                      size={item.size}
                      date={order.date}
                      _id={order._id}
                      cartItemID={item.cartItemID}
                    />
                  ))}
                </div>
              );
            })
          )}
        </div>
      </section>
    </>
  );
};
