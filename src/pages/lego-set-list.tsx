import axios from "axios";
import { useEffect, useState } from "react";
import { LegoSet } from "../components/types";
import DataTable from "react-data-table-component";

export function LegoSetListe() {
  const [sets, setSets] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9090/api/set/list", {})
      .then((response) => {
        setSets(response.data);
        // console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const sortIcon = " < ";

  const paginationComponentOptions = {
    rowsPerPageText: "Zeilen pro Seite",
    rangeSeparatorText: "von",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Alle Lego Sets",
  };

  const columns = [
    {
      name: "ID",
      selector: (row: LegoSet) => row.id,
      sortable: true,
    },
    {
      name: "Nummer",
      selector: (row: LegoSet) => row.setid,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row: LegoSet) => row.setname,
      sortable: true,
    },
    {
      name: "EAN",
      selector: (row: LegoSet) => row.ean,
      sortable: true,
    },
  ];
  return (
    <div>
      <DataTable
        // selectableRows
        defaultSortFieldId={1}
        // sortIcon={sortIcon}
        pagination
        paginationComponentOptions={paginationComponentOptions}
        columns={columns}
        data={sets}
      />
      {/* <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nummer</th>
            <th>Name</th>
            <th>EAN</th>
          </tr>
        </thead>
        <tbody>
          {sets.map((legoset: LegoSet) => {
            return (
              <tr>
                <td>{legoset.id}</td>
                <td>{legoset.setid}</td>
                <td>{legoset.setname}</td>
                <td>{legoset.ean}</td>
              </tr>
            );
          })}
        </tbody>
      </table> */}
    </div>
  );
}
