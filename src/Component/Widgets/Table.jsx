import { useState } from "react";
import React from "react";
import axios from "axios";
const Table = ({ data, getData, openModal, setEditData }) => {
  const handleDelete = (id) => {
    axios.defaults.baseURL = process.env.REACT_APP_REST_API_BASE_URL;
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios
      .post(process.env.REACT_APP_REST_API_BASE_URL + "/question_delete", {
        method: "POST",
        question_id: id,
      })
      .then((res) => {
        console.log("Question Deleted : ", res);
        alert("Question Deleted");
        getData();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleEdit = (id) => {
    axios.defaults.baseURL = process.env.REACT_APP_REST_API_BASE_URL;
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios
      .post(process.env.REACT_APP_REST_API_BASE_URL + "/get_question_id", {
        method: "POST",
        question_id: id,
      })
      .then((res) => {
        console.log("Edited Data : ", res.data);
        setEditData(res.data);
        openModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Question
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Answer
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rubric
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          {data?.data?.map((item, index) => (
            <tr class="hover:bg-gray-100" key={index}>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div class="line-clamp-3">{index + 1}</div>
              </td>
              <td class="px-6 py-4 whitespace-normal text-sm text-gray-500 max-w-xs">
                <div class="line-clamp-3">{item.question}</div>
              </td>
              <td class="px-6 py-4 whitespace-normal text-sm text-gray-500 max-w-xs">
                <div class="line-clamp-3">{item.answer}</div>
              </td>
              <td class="px-6 py-4 whitespace-normal text-sm text-gray-500 max-w-xs">
                <div class="line-clamp-3">{item.rubric}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => handleEdit(item.questions_id)}
                  class="px-2 py-2 bg-blue-500 text-white rounded-md mr-2"
                >
                  Edit
                </button>
                <button
                  class="px-2 py-2 bg-red-500 text-white rounded-md"
                  onClick={() => handleDelete(item.questions_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
