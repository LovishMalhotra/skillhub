import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from "axios";
import mockEmployees from './MOCK_DATA.json'; 

export default function Table() {
    const [employees, setEmployees] = useState([]);

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:8080/attendance/");
            console.log(response.data);
            setEmployees(response.data)
          };
          fetchData();
        // setEmployees(mockEmployees);
    }, []);

    const detailsTemplate = (rowData) => {
        return (
            <Button label="Details" severity="info" className='rounded-6' outlined onClick={() => handleDetailsClick(rowData)} />
        );
    };
    const handleDetailsClick = (rowData) => {
        alert(`Details of ${rowData.name}`);
    };
    const formatTime = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit'});
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    return (
        <>
        <div className="card container mx-5 mt-5 p-4" style={{ maxWidth: '90%' }}>
            <DataTable 
                value={employees} 
                paginator 
                rows={10} 
                rowsPerPageOptions={[10, 25, 50]} 
                tableStyle={{ minWidth: '60rem' }}
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} to {last} of {totalRecords}" 
                paginatorLeft={paginatorLeft} 
                paginatorRight={paginatorRight}
            >
                {/* <Column field="employeeId._id" header="Employee ID" style={{ width: '15%' }} /> */}
                <Column field="employeeId.name" header="Employee Name" style={{ width: '15%' }} />
                <Column field="employeeId.designation" header="Designation" style={{ width: '15%' }} />
                <Column field="employeeId.email" header="Email" style={{ width: '10%' }} />
                <Column field="employeeId.phone" header="Phone" style={{ width: '10%' }} />
                <Column field="status" header="Status" style={{ width: '10%' }} />
                <Column field="date" header="Date" body={(rowData) => formatDate(rowData.date)} style={{ width: '10%' }} />
                <Column field="clockInTime" header="Check In Time" body={(rowData) => formatTime(rowData.clockInTime)} style={{ width: '10%' }} />
                <Column field="clockOutTime" header="Clock Out Time" body={(rowData) => formatTime(rowData.clockOutTime)} style={{ width: '10%' }} />
            </DataTable>
        </div>
        </>
    );
}
