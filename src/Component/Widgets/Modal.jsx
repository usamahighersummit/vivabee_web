import React, { useEffect, useState } from "react";
import Model from "react-modal";
import axios from "axios";
const Modal = ({ isOpen, closeModal, getData, editData }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [rubric, setRubric] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.defaults.baseURL = process.env.REACT_APP_REST_API_BASE_URL;
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios
      .post(process.env.REACT_APP_REST_API_BASE_URL + "/question_insert", {
        method: "POST",
        question: question,
        answer: answer,
        rubric: rubric,
      })
      .then((res) => {
        console.log("Question Added : ", res);
        alert("Question Added");
        setQuestion("");
        setAnswer("");
        setRubric("");
        getData();
        closeModal();
      })
      .catch((error) => {
        console.log(error);
      });
    // Handle form submission here (e.g., send data to an API)
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    axios.defaults.baseURL = process.env.REACT_APP_REST_API_BASE_URL;
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios
      .post(process.env.REACT_APP_REST_API_BASE_URL + "/question_update", {
        method: "POST",
        question_id: editData.data?.questions_id,
        question: question,
        answer: answer,
        rubric: rubric,
      })
      .then((res) => {
        console.log("Question Updated : ", res);
        alert("Question Updated");
        setQuestion("");
        setAnswer("");
        setRubric("");
        getData();
        closeModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (editData?.length === 0) {
      setQuestion("");
      setAnswer("");
      setRubric("");
    } else {
      setQuestion(editData?.data?.question);
      setAnswer(editData?.data?.answer);
      setRubric(editData?.data?.rubric);
    }
  }, [editData]);

  return (
    <div>
      <Model
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Question Modal"
        className="modal w-[100%] "
        overlayClassName="overlay"
        shouldCloseOnOverlayClick={true}
      >
        <center>
          <div className="w-[50%] mt-[24px]">
            <center>
              <h2 className="mb-[12px]">
                <b>{editData?.length === 0 ? "Add" : "Edit"} Question</b>
              </h2>
            </center>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="question"
                  className="block text-gray-700 text-sm font-bold mb-2 float-left"
                >
                  Question
                </label>
                <textarea
                  type="text"
                  id="question"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your question"
                  value={question}
                  onChange={(e) => {
                    setQuestion(e.target.value);
                  }}
                  rows={5}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="answer"
                  className="block text-gray-700 text-sm font-bold mb-2 float-left"
                >
                  Answer
                </label>
                <textarea
                  type="text"
                  id="answer"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter the answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  rows={5}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="rubric"
                  className="block text-gray-700 text-sm font-bold mb-2 float-left"
                >
                  Rubric
                </label>
                <textarea
                  type="text"
                  id="rubric"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter the rubric"
                  value={rubric}
                  onChange={(e) => setRubric(e.target.value)}
                  rows={5}
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-left mb-[24px]"
                onClick={closeModal}
              >
                Close
              </button>
              {editData?.length === 0 ? (
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right mb-[24px]"
                  onClick={handleSubmit}
                >
                  Save
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right mb-[24px]"
                  onClick={handleUpdate}
                >
                  Update
                </button>
              )}
            </form>
          </div>
        </center>
      </Model>
    </div>
  );
};
export default Modal;
