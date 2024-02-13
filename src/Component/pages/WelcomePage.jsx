import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReadAndHighlight from '../Widgets/ReadAndHighlight';

const WelcomePage = (props) => {
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [replay, setReplay] = useState(false);
  const [rotate, setRotate] = useState(false);
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const viva_id = params.get("id");
  const isValidEmail = (email) => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  function scrollToBottomSmoothly() {
    var contentDiv = document.querySelector(".main-content-divs"); // Adjust the selector as needed

    contentDiv.scrollTop = contentDiv?.scrollHeight;
  }

  const getData = () => {
    axios.post(`${process.env.REACT_APP_REST_API_BASE_URL}/get_welcome`, {
      method: "POST",
  
      viva_id: viva_id,
  })
      .then((res) => {
        console.log("data here : ", res.data);
        setText(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = () => {
    localStorage.setItem("email",email);
    props.setIsStarted(true);
  };

  return (
    <div className="justify-center items-center sm:mt-[44px] md:mt-[190px] w-[100%]">
      <center>
        <p style={{
          color: "rgba(255, 255, 255, 0.84)",
          fontFamily: "Roboto",
          fontSize: "28px",
          fontStyle: "normal",
          fontWeight: "700",
          lineHeight: "28px",
          letterSpacing: "0.028px",
          marginBottom: "22px",
        }}> <ReadAndHighlight
        paragraph={text ? text.data[0].welcomeText    : "n/a"}
        replay={replay}
        setReplay={setReplay}
        setRotate={setRotate}
        scrollToBottomSmoothly={scrollToBottomSmoothly}


      /></p>
        <p className="main-content-divs md:w-[40%]" style={{
          color: "rgba(255, 255, 255)",
          opacity: "70%",
          fontFamily: "Roboto",
          fontSize: "22px",
          fontStyle: "normal",
          fontWeight: "400",
          lineHeight: "28px",
          letterSpacing: "0.022px",
          width: "100%",
        }}>
         Email Here
        </p>
        <input
          className="mt-[0px] shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value) }}
          required
        />
        <p className="md:w-[40%] mt-[24px]" style={{
          color: "rgba(255, 255, 255)",
          opacity: "70%",
          fontFamily: "Roboto",
          fontSize: "22px",
          fontStyle: "normal",
          fontWeight: "400",
          lineHeight: "28px",
          letterSpacing: "0.022px",
          width: "100%",
        }}>
        
        </p>
        <button
          className="mt-[24px]"
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            borderRadius: "4px",
            backgroundColor: "white",
            color: "#32263F",
            fontFamily: "Roboto",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: "20px",
            letterSpacing: "0.1px",
            padding: "8px",
            width: "137px",
            marginBottom: "24px",
            opacity: isValidEmail(email) ? "" : "0.4"
          }}
          onClick={handleSubmit}
          disabled={!isValidEmail(email)}
        >
          Start Quiz
        </button>
      </center>
    </div>
  );
};

export default WelcomePage;
