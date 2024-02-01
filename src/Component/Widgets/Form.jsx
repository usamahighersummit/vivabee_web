import React, { useEffect, useState } from "react";
import axios from "axios";
const Form = () => {
  const [id, setId] = useState(1);
  const [evaluationModel, setEvaluationModel] = useState("");
  const [evaluationIdentity, setEvaluationIdentity] = useState("");
  const [evaluationExample, setEvaluationExample] = useState("");
  const [evaluationQuery, setEvaluationQuery] = useState("");

  const handleModelChange = (event) => {
    setEvaluationModel(event.target.value);
  };

  const handleIdentityChange = (event) => {
    setEvaluationIdentity(event.target.value);
  };

  const handleExampleChange = (event) => {
    setEvaluationExample(event.target.value);
  };

  const handleQueryChange = (event) => {
    setEvaluationQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.defaults.baseURL = process.env.REACT_APP_REST_API_BASE_URL;
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios
      .post(process.env.REACT_APP_REST_API_BASE_URL + "/prompt_update", {
        method: "POST",
        prompt_id: id,
        evaluation_model: evaluationModel,
        evaluation_identity: evaluationIdentity,
        evaluation_example: evaluationExample,
        evaluation_query: evaluationQuery,
      })
      .then((res) => {
        console.log("updated Data : ", res.data);
        alert("Updated");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getData = () => {
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
        setId(1);
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
  return (
    <div className=" justify-center items-center h-screen mt-[44px] w-[100%] ">
      <form onSubmit={handleSubmit} className="w-full max-w-lg ">
        <div className="mb-4 sm:mr-2 sm:ml-2 md:ml-0 md:mr-0">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 float-left"
            htmlFor="evaluation-model"
          >
            Evaluation Model:
          </label>
          <select
            id="evaluation-model"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={evaluationModel}
            onChange={handleModelChange}
          >
            <option value="">Select Model</option>
            <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
            <option value="gpt-3.5-turbo-16k">gpt-3.5-turbo-16k</option>
            <option value="gpt-4">gpt-4</option>
          </select>
        </div>

        <div className="mb-4 sm:ml-2  sm:mr-2 md:ml-0 md:mr-0">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 float-left"
            htmlFor="evaluation-identity"
          >
            Evaluation Identity:
          </label>
          <textarea
            id="evaluation-identity"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={evaluationIdentity}
            onChange={handleIdentityChange}
            rows={8}
          ></textarea>
        </div>
        <div className="mb-4 sm:ml-2  sm:mr-2 md:ml-0 md:mr-0">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 float-left"
            htmlFor="evaluation-identity"
          >
            Evaluation Example:
          </label>
          <textarea
            id="evaluation-example"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={evaluationExample}
            onChange={handleExampleChange}
            rows={8}
          ></textarea>
        </div>
        <div className="mb-4 sm:ml-2 sm:mr-2 md:ml-0 md:mr-0">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 float-left"
            htmlFor="evaluation-identity"
          >
            Evaluation Query:
          </label>
          <textarea
            id="evaluation-query"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={evaluationQuery}
            onChange={handleQueryChange}
            rows={8}
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline float-right"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
