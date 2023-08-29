import axios from "axios";
import { Category, Price } from "./types";
import { CategorySelect } from "./category-select";

export function LegoPrice1({
  prices,
  categories,
  setPrices,
}: {
  prices: Array<Price>;
  categories: Array<Category>;
  setPrices: any;
}) {
  // const [postArr, setPosts] = useState(posts);

  const handleSubmit = function (event: any) {
    const formData = new FormData(event.currentTarget);
    event.preventDefault();
    const postObj = {
      setname: formData.get("setname"),
      ean: formData.get("ean"),
      setid: formData.get("setid"),
      category_id: formData.get("category_id"),
    };

    axios
      .post("http://localhost:9090/api/set", postObj)
      .then((response) => {
        if (response.status === 200) {
          prices = prices.filter(
            (price: Price) => price.ean !== response.data.ean
          );
          console.log(prices);
          setPrices(prices);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Bild</th>
          <th>ean</th>
        </tr>
      </thead>
      <tbody>
        {prices.map((price: Price) => {
          const regex = /([A-Za-z ®-]*) {1}([0-9]{5,8})\w* /g;
          const set = regex.exec(price.product_name);
          let name = "";
          if (set) {
            name = price.product_name.replace(set[0], "");
          }

          return (
            <tr key={price.id}>
              <td>{price.id}</td>
              <td>
                <b>{price.product_name}</b>
                <form onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <div className="col-6">
                      <label className="form-label">Set Nummer</label>
                      <input
                        className="form-control"
                        defaultValue={set ? set[2] : "xxx"}
                        name="setid"
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label">Set Name</label>
                      <input
                        className="form-control"
                        defaultValue={name}
                        name="setname"
                      />
                    </div>
                  </div>
                  <CategorySelect categories={categories} />
                  <input
                    className="form-control"
                    defaultValue={price.ean}
                    name="ean"
                  />
                  <button type="submit" className=" btn btn-primary">
                    submit
                  </button>
                </form>
              </td>
              <td>
                <img src={price.image_url} height="50px" />
              </td>
              <td>{price.ean}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
