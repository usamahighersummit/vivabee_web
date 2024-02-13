import React, { useState } from 'react'
import axios from 'axios';
const Feedback = () => {
const [message, setMessage] = useState("");
const search = window.location.search;
  const params = new URLSearchParams(search);
  const viva_id = params.get("id");
const handleAdd = (e) => {
    let email = localStorage.getItem('email')
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_REST_API_BASE_URL}/feedback_insert`, {
        method: "POST",
        email: email,
        feedback_text: message,
        viva_id: viva_id,
    })
    .then((res) => {
        console.log("inserted Data : ", res.data);
        alert("inserted");
        localStorage.removeItem("email")
    })
    .catch((error) => {
        console.log(error);
    });
  
}
  return (
    <div>
        <center>
      <form className="w-full max-w-lg flex justify-center item-center flex-col">
                <div className="mb-4 mt-[24px] sm:ml-2 sm:mr-2 md:ml-0 md:mr-0">
                <h5
            style={{
              color: "rgba(255, 255, 255, 0.84)",

              fontFamily: "Roboto",
              fontSize: "28px",
              fontStyle: "normal",
              fontWeight: "700",
              lineHeight: "28px" /* 100% */,
              letterSpacing: "0.028px",
              marginBottom: "22px",
            }}
          >
            Feedback
          </h5>
                    <label className="block text-white-700 text-sm font-bold mb-2 float-left" htmlFor="evaluation-identity"   style={{
                fontFamily: "Roboto",
                fontSize: "20px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "20px",
                letterSpacing: "0.1px",
                padding: "8px",
              
                color: "#F1F1F1",
       
              }}>
                       <b> Text:</b>
                    </label>
                    <textarea
                        id="evaluation-query"
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                         value={message}
                         onChange={(e) => setMessage(e.target.value)}
                        rows={8}
                    ></textarea>
                </div>
                <button
           style={{

            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            borderRadius: "4px",
            backgroundColor:  message.length === 0 ? "white":
            "#F1F1F1",
            color: message.length === 0 ? "#32263F" :
             "#32263F",
            fontFamily: "Roboto",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: "20px",
            letterSpacing: "0.1px",
            padding: "8px",
            opacity:  message.length === 0 ? "0.4" : "",
          
            marginBottom: "24px",}}
                     onClick={handleAdd}
                     disabled={message.length === 0}
                >
                    Submit
                </button>
            </form>
            </center>
    </div>
  )
}

export default Feedback
