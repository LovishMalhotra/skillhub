import React from "react";
import {BarGraph,  PieChart } from "./BarGraph";
import { PrimeReactProvider } from 'primereact/api';
import TemplateDemo from "./Navbar";
import {Training} from "./Cards";


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
        </div>
        </PrimeReactProvider>
    </>
    )
};
export default Dashboard;