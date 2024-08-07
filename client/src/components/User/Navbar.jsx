import React from "react";
import { Menubar } from "primereact/menubar";
import { Badge } from "primereact/badge";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { useNavigate } from 'react-router-dom';
export default function TemplateDemo() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/listing');
      };
  const itemRenderer = (item) => (
    <a className="flex align-items-center p-menuitem-link">
      <span className={item.icon} />
      <span className="mx-2">{item.label}</span>
      {item.badge && <Badge className="ml-auto" value={item.badge} />}
      {item.shortcut && (
        <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">
          {item.shortcut}
        </span>
      )}
    </a>
  );
  const items = [
   
    
  ];

  const start = (
    <div className="d-flex align-items-center ">
      <img
        alt="logo"
        src="https://primefaces.org/cdn/primereact/images/logo.png"
        height="40"
        className="mr-2 mx-5"
      ></img>
      <Button icon="pi pi-search"  text raised label="Search" aria-label="Search"  className="rounded mx-5 col-7" style={{width:"100%"}}/>
    </div>  
  );

  const end = (
    
    <div className="d-flex align-items-center gap-2 m-2">
        <Button icon="pi pi-user"  text raised label="Listing" aria-label="Search"  className="rounded mx-5" onClick={handleClick}/>
      <Avatar
        image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
        shape="circle"
        className="mr-2"
        
      />
<i className="pi pi-cog mx-4 flex " style={{fontSize:"120%"}} ></i>
    
    </div>
  );

  return (
    <div className="mx-5 mt-2 color-nav" >
      <Menubar model={items} start={start} end={end} />
      </div>
  );
}
