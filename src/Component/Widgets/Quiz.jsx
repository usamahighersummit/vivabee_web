import React, { useEffect, useState } from "react";
import Speech from "react-speech";
import ReadAndHighlight from "./ReadAndHighlight";
import mic from "../../images/mic.png";
import stop from "../../images/stop.png";
import axios from "axios";
import loading from "../../images/loading.json";
import Lottie from "react-lottie";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
const Quiz = ({ index, question, setIndex }) => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [evaluationModel, setEvaluationModel] = useState("");
  const [evaluationIdentity, setEvaluationIdentity] = useState("");
  const [evaluationExample, setEvaluationExample] = useState("");
  const [evaluationQuery, setEvaluationQuery] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [count, setCount] = useState(0);
  const [replay, setReplay] = useState(false);
  const [rotate, setRotate] = useState(false);
  const startListening = () => {
    if (!listening) {
      SpeechRecognition.startListening({ continuous: true });
    } else {
      SpeechRecognition.stopListening();
      if (transcript.length > 0) {
        getFeedback();
      } else {
        alert("Please speak something");
      }
    }
  };

  const onNextQuestion = () => {
    resetTranscript();
    setReplay(false);
    setFeedback("");
    setIndex(index + 1);
  };
  const getData = () => {
    // alert(
    //   "question length=" +
    //     JSON.stringify(question.data?.length) +
    //     "Index=" +
    //     JSON.stringify(index)
    // );
    axios.defaults.baseURL = process.env.REACT_APP_REST_API_BASE_URL;
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios
      .get(process.env.REACT_APP_REST_API_BASE_URL + "/get_question_prompts", {
        method: "GET",
      })
      .then((res) => {
        console.log("data here : ", res.data.data[0]);

        setEvaluationModel(res.data.data[0].evaluation_model);
        setEvaluationIdentity(res.data.data[0].evaluation_identity);
        setEvaluationExample(res.data.data[0].evaluation_example);
        setEvaluationQuery(res.data.data[0].evaluation_query);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  const getFeedback = () => {
    setIsAnalyzing(true);
    let quiz_content = {
      question: question ? question.data[index].question : "",
      student_answer: transcript > 0 ? transcript : "",
      answer: question ? question.data[index].answer : "",
      rubric: question ? question.data[index].rubric : "",
    };
    axios.defaults.baseURL = process.env.REACT_APP_REST_API_BASE_URL;
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios
      .post(process.env.REACT_APP_REST_API_BASE_URL + "/get_feedback", {
        method: "POST",
        evaluation_model: evaluationModel,
        evaluation_identity: evaluationIdentity,
        evaluation_example: evaluationExample,
        evaluation_query: evaluationQuery,
        quiz_content: JSON.stringify(quiz_content),
      })
      .then((res) => {
        console.log("feedback is : ", res.data);
        const interval = setInterval(() => {
          setCount((prevCount) => {
            if (prevCount >= 3) {
              clearInterval(interval);
              setIsAnalyzing(false);
              setFeedback(res.data);
            }
            return prevCount + 1;
          });
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleReplay = () => {
    window.speechSynthesis.cancel();

    setReplay(true);
    setRotate(true);
  };
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice", // Adjust as needed
    },
  };
  return (
    <>
      <div className=" h-[100vh] md:w-[30%] sm:w-[60%] sticky justify-center items-center md:mt-[120px] md:ml-[500px] md:mr-[0px] sm:ml-[8px] sm:mr-[8px]">
        <button className="mb-[8px] mt-[8px]" onClick={handleReplay}>
          <svg
            className={rotate ? "rotate" : ""}
            width="22"
            height="22"
            viewBox="0 0 17 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.52942 15.05C1.16994 14.4167 0.900335 13.7667 0.720597 13.1C0.540858 12.4333 0.450989 11.75 0.450989 11.05C0.450989 8.81667 1.21079 6.91667 2.7304 5.35C4.25001 3.78333 6.10458 3 8.29413 3H8.46569L6.89707 1.4L8.26962 0L12.1912 4L8.26962 8L6.89707 6.6L8.46569 5H8.29413C6.66014 5 5.27125 5.5875 4.12746 6.7625C2.98367 7.9375 2.41177 9.36667 2.41177 11.05C2.41177 11.4833 2.46079 11.9083 2.55883 12.325C2.65687 12.7417 2.80393 13.15 3.00001 13.55L1.52942 15.05ZM8.31864 22L4.39707 18L8.31864 14L9.69118 15.4L8.12256 17H8.29413C9.92811 17 11.317 16.4125 12.4608 15.2375C13.6046 14.0625 14.1765 12.6333 14.1765 10.95C14.1765 10.5167 14.1275 10.0917 14.0294 9.675C13.9314 9.25833 13.7843 8.85 13.5882 8.45L15.0588 6.95C15.4183 7.58333 15.6879 8.23333 15.8677 8.9C16.0474 9.56667 16.1373 10.25 16.1373 10.95C16.1373 13.1833 15.3775 15.0833 13.8579 16.65C12.3382 18.2167 10.4837 19 8.29413 19H8.12256L9.69118 20.6L8.31864 22Z"
              fill="#DBD2DD"
              fill-opacity="0.54"
            />
          </svg>
        </button>

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
          Question {index + 1}.
        </h5>
        <p
          className="md:w-[40%]"
          style={{
            color: "rgba(255, 255, 255)",
            opacity: "70%",
            fontFamily: "Roboto",
            fontSize: "22px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "28px" /* 127.273% */,
            letterSpacing: "0.022px",
            width: "125%",
          }}
        >
          <ReadAndHighlight
            paragraph={question ? question.data[index].question : "n/a"}
            replay={replay}
            setReplay={setReplay}
            setRotate={setRotate}
          />
        </p>

        <h5
          style={{
            color: "rgba(255, 255, 255, 0.84)",
            marginTop: "52px",
            fontFamily: "Roboto",
            fontSize: "28px",
            fontStyle: "normal",
            fontWeight: "700",
            lineHeight: "28px" /* 100% */,
            letterSpacing: "0.028px",
            marginBottom: "22px",
          }}
        >
          {transcript.length > 0 ? "Your answer." : null}
        </h5>

        <p
          className="md:w-[40%]"
          style={{
            color: "rgba(255, 255, 255)",
            opacity: "70%",
            fontFamily: "Roboto",
            fontSize: "22px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "28px" /* 127.273% */,
            letterSpacing: "0.022px",
            width: "125%",
            marginBottom: "36px",
          }}
        >
          {transcript}
        </p>
        <div
          className="container bg-[#5E526B] p-[12px]"
          style={{
            display: feedback.length > 0 ? "block" : "none",
            height: "25%",
            overflowY: "auto",
          }}
        >
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
            Feedback.
          </h5>

          <p
            className="md:w-[40%]"
            style={{
              color: "#FFF",
              fontFamily: "Roboto",
              fontSize: "22px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "28px" /* 127.273% */,
              letterSpacing: "0.022px",
              width: "100%",
            }}
          >
            <ReadAndHighlight
              paragraph={feedback.replace(/##/g, " ")}
              replay={replay}
              setReplay={setReplay}
              setRotate={setRotate}
            />
          </p>
        </div>
        <div style={{ display: !isAnalyzing ? "none" : "block" }}>
          <center>
            <div
              style={{
                backgroundColor: "#D9D9D9",
                color: "#403151",
                fontFamily: "Roboto",
                fontSize: "15px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "28px",
                letterSpacing: "0.015px",
                width: "320px",
                padding: "40px",
                borderRadius: "4px",
              }}
            >
              <center>
                {" "}
                <Lottie options={defaultOptions} height={150} width={150} /> (
                {count}/3) analyzing...
              </center>
            </div>
          </center>
        </div>
        <button
          className="float-right mt-[12px]"
          style={{
            display: feedback.length > 0 ? "inline-flex" : "none",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            borderRadius: "4px",
            backgroundColor:
              question.data?.length === index + 1 ? "transparent" : "#F1F1F1",
            color: question.data?.length === index + 1 ? "#F1F1F1" : "#32263F",
            fontFamily: "Roboto",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: "20px",
            letterSpacing: "0.1px",
            padding: "8px",
            width: "137px",
          }}
          disabled={question.data?.length === index + 1}
          onClick={onNextQuestion}
        >
          <b>
            {question.data?.length === index + 1
              ? "Completed"
              : "Next question"}
          </b>
        </button>
      </div>

      <div className="">
        <button
          style={{
            position: "fixed",
            zIndex: 1000,
            bottom: "60px",
            left: "50%",
            transform: "translateX(-50%)",
            display: feedback.length === 0 && !isAnalyzing ? "block" : "none",
            // Add default button size, then adjust in media query as needed
            height: "70px",
            width: "70px",
          }}
          className={listening ? "blinking mic" : "mic"}
          onClick={startListening}
        >
          <img
            height="100%"
            width="100%"
            src={mic}
            alt="Microphone"
            style={{
              maxWidth: "70px",
              maxHeight: "70px",
              display: listening ? "none" : "inline",
            }}
          />
          <img
            height="100%"
            width="100%"
            src={stop}
            alt="stop"
            style={{
              maxWidth: "70px",
              maxHeight: "70px",
              display: listening ? "inline" : "none",
            }}
          />
        </button>
      </div>
    </>
  );
};

export default Quiz;
