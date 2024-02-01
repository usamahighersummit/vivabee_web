import React, { useState, useEffect } from "react";
import axios from "axios";
import Quiz from "../Widgets/Quiz";
import { useNavigate } from "react-router-dom";
const User = () => {
  const [question, setQuestion] = useState("");
  const [index, setIndex] = useState(0);
  const [pause, setPause] = useState(false);
  const navigate = useNavigate();
  const getData = () => {
    axios.defaults.baseURL = process.env.REACT_APP_REST_API_BASE_URL;
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios
      .get(process.env.REACT_APP_REST_API_BASE_URL + "/get_question", {
        method: "GET",
      })
      .then((res) => {
        console.log("data here : ", res.data?.data[0]?.question);
        setQuestion(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onHandlePause = () => {
    if (!pause) {
      window.speechSynthesis.pause();
      setPause(true);
    } else {
      window.speechSynthesis.resume();
      setPause(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-[#403151] ">
      <div className="fix">
        <div className="flex  ml-[20px]" style={{ gap: "16px" }}>
          <button
            className="bg-[#7E418B70] mt-[20px]"
            style={{
              display: "flex",
              padding: "10px 12px",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
              borderRadius: "4px",
            }}
            onClick={() => navigate("/")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <mask
                id="mask0_6_1610"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="24"
                height="24"
              >
                <rect width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_6_1610)">
                <path d="M4 21V9L12 3L20 9V21H14V14H10V21H4Z" fill="#DBD2DD" />
              </g>
            </svg>
          </button>
          <button
            className="bg-[#7E418B70] mt-[20px]"
            style={{
              display: "flex",
              padding: "10px 12px",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
              borderRadius: "4px",
            }}
            onClick={onHandlePause}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              style={{ display: pause ? "none" : "inline" }}
            >
              <mask
                id="mask0_6_1620"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="24"
                height="24"
              >
                <rect width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_6_1620)">
                <path d="M14 19V5H18V19H14ZM6 19V5H10V19H6Z" fill="#DBD2DD" />
              </g>
            </svg>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ display: !pause ? "none" : "inline" }}
            >
              <mask
                id="mask0_79_16"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="24"
                height="24"
              >
                <rect width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_79_16)">
                <path d="M8 19V5L19 12L8 19Z" fill="#DBD2DD" />
              </g>
            </svg>
          </button>
        </div>
      </div>
      <Quiz index={index} setIndex={setIndex} question={question} />
    </div>
  );
};
export default User;
