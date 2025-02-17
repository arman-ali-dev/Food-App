import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFoods } from "../redux/foodSlice";

export default function useGetAllFoodItems() {
  const dispatch = useDispatch();
  const fetchFoods = async () => {
    try {
      const { data } = await axios.get(
        "https://arman-food-app.onrender.com/api/foods/all"
      );
      dispatch(setFoods(data.foods));
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);
}
