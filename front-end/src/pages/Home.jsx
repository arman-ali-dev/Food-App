import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { Crousel } from "../components/Crousel";
import useGetAllFoodItems from "../hooks/useGetAllFoodItems";
import { useSelector } from "react-redux";

export function Home() {
  useGetAllFoodItems();

  const { foods } = useSelector((state) => state.food);
  const [searchedKeywords, setSearchedKeyword] = useState("");
  const [searchedFoods, setSearchedFoods] = useState(foods || []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchedKeyword(value);

    if (value) {
      const filteredFoods = foods?.filter((elem) => {
        return (
          elem?.name.toLowerCase().includes(value.toLowerCase()) ||
          elem?.category.some(
            (item) => item.toLowerCase() == value.toLowerCase()
          )
        );
      });

      setSearchedFoods(filteredFoods);
    } else {
      setSearchedFoods(foods);
    }
  };

  return (
    <>
      <Crousel />

      <div className="searchMain">
        <form className="d-flex align-items-center justify-content-center">
          <input
            value={searchedKeywords}
            onChange={handleSearch}
            type="search"
            className="searchInput"
            placeholder="Search any type of food..."
          />
          <button className="btn searchBtn d-none d-md-block bg-light px-4">
            Search
          </button>
        </form>
      </div>

      <section>
        <div className="container">
          <div className="row">
            {searchedFoods?.length !== 0 &&
              searchedFoods?.map((item) => {
                return <Card key={item._id} item={item} />;
              })}
          </div>
        </div>
      </section>
    </>
  );
}
