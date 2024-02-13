import React, { useEffect, useState } from 'react'
import axios from 'axios';
const ViewFeed = () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const id = params.get("id");

    const [data,setData] = useState("")
    const getData = () => {
        axios.defaults.baseURL = process.env.REACT_APP_REST_API_BASE_URL;
        axios.defaults.headers.post["Content-Type"] =
          "application/json;charset=utf-8";
        axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
        axios
          .post(process.env.REACT_APP_REST_API_BASE_URL + "/get_feedback", {
            method: "POST",
            viva_id: id,
          })
          .then((res) => {
            console.log("data here : ", res.data);
            setData(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      };
useEffect(()=>{
    getData();
},[])

  return (
    <>
    <h1 style={{fontSize:'36px', marginBottom:"24px"}}><b>Feedback</b></h1>
    <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            ID
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
       Email
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
           Feedback text
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
              <div class="line-clamp-3">{item.email}</div>
            </td>
            <td class="px-6 py-4 whitespace-normal text-sm text-gray-500 max-w-xs">
              <div class="line-clamp-3">{item.feedback_text}</div>
            </td>
        
          
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  </>
  )
}

export default ViewFeed
