import React, { useState } from "react";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let classCode = useRef();
  const navigate = useNavigate();
  const handleClickContinue = () => {
    axios.defaults.baseURL = process.env.REACT_APP_REST_API_BASE_URL;
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios
      .post(process.env.REACT_APP_REST_API_BASE_URL + "/login", {
        method: "POST",
        web_user_class_code: classCode.current,
      })
      .then((res) => {
        console.log("classroom : ", res.data.web_user_auth_type[0]);
        document.getElementById("login").style.backgroundColor = "black";

        document.getElementById("login").innerHTML = "Loading....";
        if (res.data.web_user_auth_type[0] === 2) {
          setTimeout(function () {
            navigate(`/admin`);
          }, 2000);
        } else if (res.data.web_user_auth_type[0] === 1) {
          setTimeout(function () {
            navigate(`/home`);
          }, 2000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [code, setCode] = useState(["", "", "", ""]);
  const inputRefs = [];

  const handleChange = (index, event) => {
    const input = event.target.value;
    if (input.length <= 1) {
      const newCode = [...code];
      newCode[index] = input;
      setCode(newCode);
      if (index < inputRefs.length - 1 && input.length === 1) {
        inputRefs[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && code[index] === "" && index > 0) {
      const newCode = [...code];
      newCode[index - 1] = "";
      setCode(newCode);
      inputRefs[index - 1].focus();
    }
  };
  const handlePaste = (index, event) => {
    event.preventDefault();
    const pastedText = event.clipboardData.getData("text").trim();

    if (pastedText.length <= 8 - index) {
      const newCode = [...code];
      for (let i = 0; i < pastedText.length; i++) {
        newCode[index + i] = pastedText[i];
      }
      setCode(newCode);

      for (let i = index + pastedText.length; i < inputRefs.length; i++) {
        if (newCode[i] === "") {
          inputRefs[i].focus();
          break;
        }
      }
    }
  };

  classCode.current = code.join("");
  return (
    <div className="w-full h-full bg-white centered md:h-[90vh] p- md:p-36 sm:p-5 mt-16 justify-center text-center flex">
      <div className="main-content-div w-full sm:w-[360px] md:w-full">
        <div className="w-full h-full  justify-center items-center">
          <div className="enter-classcode">Enter your Admin code</div>
          <div className="classcode-instruction mt-[8px]">
            Please enter the code
          </div>
          <div>
            {" "}
            <div className="flex justify-center mt-[24px]">
              <center>
                <div className="cLasscode-input pt-[15px] pl-[2px] pb- w-[284px] text-black">
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      ref={(ref) => (inputRefs[index] = ref)}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(event) => handleChange(index, event)}
                      onKeyDown={(event) => handleKeyDown(index, event)}
                      onPaste={(event) => handlePaste(index, event)}
                      style={{
                        outline: "none",
                        width: "50px",
                        gap: "8px",
                        marginRight: "5px",
                        textAlign: "center",
                        borderBottom: "1px solid black",
                      }}
                    />
                  ))}
                </div>
              </center>
            </div>
          </div>
          <div className=" flex justify-center mt-[24px]">
            <button
              id="login"
              className={`login-button float-none w-[284px] h-[40px] p-5 ${
                !classCode.current ? "cursor-not-allowed" : "hover:bg-[#555555]"
              }`}
              onClick={handleClickContinue}
              disabled={classCode.current.length < 4}
              style={
                classCode.current.length < 4
                  ? {
                      backgroundColor: "rgba(29, 27, 32, 0.16)",
                      color: "rgba(29, 27, 32, 0.50)",
                    }
                  : {}
              }
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
