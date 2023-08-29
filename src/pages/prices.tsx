import axios from "axios";
import { useEffect, useState } from "react";
import { LegoPrice1 } from "../components/lego-price";

export function Prices() {
  const [prices, setPrices] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9090/api/legoprices", {})
      .then((response) => {
        setPrices(response.data);
        // console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("http://localhost:9090/api/categories", {})
      .then((response) => {
        setCategories(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className="">
        <LegoPrice1
          prices={prices}
          categories={categories}
          setPrices={setPrices}
        />
      </div>
    </>
  );
}
