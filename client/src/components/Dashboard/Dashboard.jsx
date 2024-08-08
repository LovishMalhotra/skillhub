import React from "react";
import {BarGraph,  PieChart } from "./BarGraph";
import { PrimeReactProvider } from 'primereact/api';
import TemplateDemo from "./Navbar";
import {Training} from "./Cards";
import Table from "./Table";


const Dashboard = () => {
    return (<>
<PrimeReactProvider>
       
        <TemplateDemo />
        <Training />
        <div className="d-flex  justify-content-center">
        <BarGraph />
        <PieChart />
        </div>
        <div className="d-flex  justify-content-center">
            <Table/>
        </div>
        </PrimeReactProvider>
    </>
    )
};
export default Dashboard;