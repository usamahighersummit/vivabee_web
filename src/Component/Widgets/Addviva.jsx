import React, { useState,useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Addviva = () => {
    const [vivaName, setVivaName] = useState("");
    const navigate = useNavigate();

    const [data, setData] = useState();
    const [newText, setNewText] = useState("")
    const [editItemId, setEditItemId] = useState(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_REST_API_BASE_URL}/viva_insert`, {
            method: "POST",
            viva_name: vivaName,
        })
        .then((res) => {
            console.log("inserted Data : ", res.data);
            alert("inserted");
         getData();
        })
        .catch((error) => {
            alert("alert the error is "+ JSON.stringify(error))
            console.log(error);
        });

    }
    const handleDelete = (id) => {
        axios.post(`${process.env.REACT_APP_REST_API_BASE_URL}/viva_delete`, {
            method: "POST",
            viva_id: id,
        })
        .then((res) => {
            console.log("text Deleted : ", res);
            alert("Text Deleted");
            getData();
        })
        .catch((error) => {
            console.log(error);
        });
    };
    const getData = () => {
        axios.get(`${process.env.REACT_APP_REST_API_BASE_URL}/get_viva`)
        .then((res) => {
            console.log("data here : ", res.data);
            setData(res.data);
        })
        .catch((error) => {
            console.log(error);
        });
    };

    useEffect(() => {
      
        getData();
    }, []);
    const handleEdit = (id,text) => {
        setNewText(text);
        setEditItemId(id);
    }
    const handleSave = (id, newText) => {
   
       
        axios.post(`${process.env.REACT_APP_REST_API_BASE_URL}/viva_update`, {
            method: "POST",
            viva_id: id,
            viva_text: newText,
        })
        .then((res) => {
            console.log("Text Updated: ", res);
            alert("updated")
            getData();
            setNewText("");
        })
        .catch((error) => {
            console.log(error);
        });
        setEditItemId(null);
    }
  return (
    <div className=' mt-[44px]'>
    <center>
    <form  className="w-full max-w-lg ">
       
        <div className="mb-4 sm:ml-2 sm:mr-2 md:ml-0 md:mr-0">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 float-left"
            htmlFor="evaluation-identity"
          >
            Enter Viva Name:
          </label>
          <textarea
        
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
             value={vivaName}
             onChange={(e)=> setVivaName(e.target.value)}
            rows={1}
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline float-right"
           onClick={handleSubmit}
        >
          Add Viva
        </button>
      </form>
      <div className="overflow-x-auto mt-[124px]">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                               Viva Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                               Viva Content
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data?.data?.map((item, index) => (
                            <tr className="hover:bg-gray-100" key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="line-clamp-3">{index + 1}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 max-w-xs">
                                    {editItemId === item.viva_id ? (
                                        <input
                                        style={{border: "1px solid black"}}
                                            type='text'
                                             value={newText}
                                             onChange={(e) => setNewText(e.target.value)}
                                        />
                                    ) : (
                                        <div className="line-clamp-3"><a style={{color:'blue'}} href={`/home?id=${item.viva_id}`}><u>{item.viva_text}</u></a></div>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium"><a style={{color:'blue'}} href={`/view-content?id=${item.viva_id}`}><u>View Viva Content</u> </a> </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    {editItemId === item.viva_id ? (
                                        <button
                                            onClick={() => handleSave(item.viva_id, newText)}
                                            className="px-2 py-2 bg-green-500 text-white rounded-md mr-2"
                                        >
                                            edit
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleEdit(item.viva_id,item.viva_text)}
                                            className="px-2 py-2 bg-blue-500 text-white rounded-md mr-2"
                                        >
                                            Edit
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(item.viva_id)}
                                        className="px-2 py-2 bg-red-500 text-white rounded-md"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </center>
    </div>
  )
}

export default Addviva
