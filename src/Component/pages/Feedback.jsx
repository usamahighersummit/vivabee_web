import React, { useRef, useState } from 'react'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Feedback = () => {
const [message, setMessage] = useState("");
const [isSubmitting, setIsSubmitting] = useState(false);
const [show, setShow] = React.useState(false);
const search = window.location.search;
  const params = new URLSearchParams(search);
  const viva_id = params.get("id");
const handleAdd = (e) => {
 
    e.preventDefault();
    setIsSubmitting(true);
    let email = localStorage.getItem('email')
    axios.post(`${process.env.REACT_APP_REST_API_BASE_URL}/feedback_insert`, {
        method: "POST",
        email: email,
        feedback_text: message,
        viva_id: viva_id,
    })
    .then((res) => {
        console.log("inserted Data : ", res.data);
      localStorage.removeItem("email")
   
     setTimeout(() => {
          setIsSubmitting(false);
          setMessage("");
          toast.success("Feedback submitted successfully!", { autoClose: 3000 });
        }, 3000); 
    
    })
    .catch((error) => {
        console.log(error);
         toast.error("An error occurred. Please try again later.");
        setIsSubmitting(false);
        setMessage("");
    });
  
}
  return (
    
    <div>
       <ToastContainer />
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
                className='md:ml-[0px] md:mr-[0px] sm:ml-[10px] sm:mr-[10px]'
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
                  {isSubmitting ? (
                <div role="status">
    <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>) :   "Submit"}
                </button>
            </form>
            </center>
    </div>
  )
}

export default Feedback
