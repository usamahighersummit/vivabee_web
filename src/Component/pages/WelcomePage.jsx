import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReadAndHighlight from '../Widgets/ReadAndHighlightwelcome';

const WelcomePage = (props) => {
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [replay, setReplay] = useState(false);
  const [rotate, setRotate] = useState(false);
  const [isValid, setIsValid] = useState(true); // State to track email validity
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const viva_id = params.get("id");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
    if(emailRegex.test(email)) {
      setIsValid(true);
      localStorage.setItem("email", email);
      props.setIsStarted(true);
    } else {
      setIsValid(false);
    }
  };

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
  };

  return (
    <div className="main-content-divs flex justify-center items-center">
      <div className="md:w-[40%] lg:w-[40%] xl:w-[60%] sm:w-[100%] sm:mt-[62px] md:mt-[160px] sm:mr-[20px] md:mr-[0px] sm:ml-[20px] md:ml-[0px]">
        <center>
          <p className="text-white font-roboto text-2xl font-semibold mb-4 text-left">
            <ReadAndHighlight
          paragraph={text ?  text.data[0].welcomeText  : "n/a" }
              replay={replay}
              setReplay={setReplay}
              setRotate={setRotate}
              scrollToBottomSmoothly={scrollToBottomSmoothly}
            />
          </p>
          <input
            className="mt-2 shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full h-12"
            type="email"
            value={email}
            placeholder="Type your email here..."
            onChange={handleEmailChange}
            required
          />
          {!isValid && <p className="text-red-500 mt-1 text-sm">Enter valid email!</p>}
          <button
            className="mt-2 flex items-center justify-center gap-2 rounded bg-white text-[#32263F] font-roboto font-medium text-base px-6 py-2 w-full"
            style={{ opacity: email.length ? "" : "0.81" }}
            onClick={handleSubmit}
            disabled={email.length === 0}
          >
            <span  style={{ opacity: email.length ? "" : "0.62" }}>Start Now</span>
          </button>
        </center>
      </div>
    </div>
  );
};

export default WelcomePage;
