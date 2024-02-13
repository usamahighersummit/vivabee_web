import React, { useState, useEffect } from "react";
import Modal from "../Widgets/Modal";
import axios from "axios";
import Table from "../Widgets/Table";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import FORM from "../Widgets/Form";
import { useLocation, useNavigate } from "react-router-dom";
import WelcomeText from "../Widgets/WelcomeText";
import ViewFeed from "../pages/ViewFeed";

const ViewContent = () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const id = params.get("id");
    const location = useLocation();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState();
    const [editData, setEditData] = useState();
    const getData = () => {
      axios.defaults.baseURL = process.env.REACT_APP_REST_API_BASE_URL;
      axios.defaults.headers.post["Content-Type"] =
        "application/json;charset=utf-8";
      axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
      axios
        .post(process.env.REACT_APP_REST_API_BASE_URL + "/get_question", {
          method: "POST",
          viva_id:  id,
        })
        .then((res) => {
          console.log("data here : ", res.data);
          setData(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
    useEffect(() => {
if(location.state ){
    navigate("/")
}
      getData();
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
            <Tab>Questions</Tab>
            <Tab>Prompt</Tab>
            <Tab>Welcome Text</Tab>
            <Tab>Feedback</Tab>
          </TabList>
          <TabPanel>
            <div className="w-[100%]">
              <Modal
                isOpen={isModalOpen}
                closeModal={closeModal}
                getData={getData}
                editData={editData}
                id={id}
              />
            </div>
            <div className="mt-[24px] ">
              <Table
                data={data}
                getData={getData}
                openModal={openModal}
                setEditData={setEditData}
              />
            </div>
            <center>
              {" "}
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-[24px]"
                onClick={() => {
                  setEditData([]);
                  openModal();
                }}
              >
                Add Question
              </button>
            </center>
          </TabPanel>
          <TabPanel>
            <center>
              <FORM />
            </center>
          </TabPanel>
          <TabPanel>
            <center>
              <WelcomeText />
            </center>
          </TabPanel>
          <TabPanel>
            <center>
              <ViewFeed />
            </center>
          </TabPanel>
        </Tabs>
      </>
    );
  };

export default ViewContent;
