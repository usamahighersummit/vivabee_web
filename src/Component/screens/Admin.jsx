import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Addviva from "../Widgets/Addviva";


const Admin = () => {

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
    } else {
      navigate("/");
    }
  
  }, []);

  return (
    <>
      <div>
        <center>
          <h1 className="text-center mt-[16px] text-[40px]">ADMIN PANEL</h1>
        </center>
      </div>
      <Tabs>
        <TabList>
          <Tab>Add and View Viva</Tab>

        </TabList>

           <TabPanel><Addviva /></TabPanel>
      </Tabs>
    </>
  );
};
export default Admin;
