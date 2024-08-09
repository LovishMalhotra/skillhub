import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Table() {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
  const paginatorRight = <Button type="button" icon="pi pi-download" text />;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8080/user/getAll");
      // console.log(response.data);
      setUser(response.data);
    };
    fetchData();
  }, []);
  console.log(user);
  const handleClick = (id) => {
    navigate(`/userProfile/${id}`);
    console.log(id);
  };
  const formatTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const detailsButtonTemplate = (rowData) => {
    return <Button label="Details" onClick={() => handleClick(rowData.user._id)} />;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  return (
    <>
      <div className="card container mx-5 mt-5 p-4" style={{ maxWidth: "90%" }}>
        <DataTable
          value={user}
          paginator
          rows={10}
          rowsPerPageOptions={[10, 25, 50]}
          tableStyle={{ minWidth: "60rem" }}
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
          paginatorLeft={paginatorLeft}
          paginatorRight={paginatorRight}
        >
          <Column
            field="name"
            header="Employee Name"
            style={{ width: "15%" }}
          />

          <Column field="user.email" header="Email" style={{ width: "10%" }} />
          <Column
            field="department"
            header="Department"
            style={{ width: "15%" }}
          />
          <Column
            field="designation"
            header="Designation"
            style={{ width: "15%" }}
          />
          <Column
            field="designation"
            header="Designation"
            style={{ width: "15%" }}
          />
          <Column
            body={detailsButtonTemplate}
            style={{ width: "15%" }}
          />
        </DataTable>
      </div>
    </>
  );
}
