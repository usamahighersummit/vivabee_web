import React, { useEffect, useState } from 'react'
import axios from 'axios';

const WelcomeText = () => {
    const [welcomeText, setWelcomeText] = useState("");
    const [data, setData] = useState([]);
    const [editItemId, setEditItemId] = useState(null);
    const [newText, setNewText] = useState();
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const viva_id = params.get("id");
    const handleAdd = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_REST_API_BASE_URL}/welcome_insert`, {
            method: "POST",
            welcomeText: welcomeText,
            viva_id: viva_id,
        })
        .then((res) => {
            console.log("inserted Data : ", res.data);
            alert("inserted");
            getData();
        })
        .catch((error) => {
            console.log(error);
        });
        setWelcomeText("")
    }

    const handleDelete = (id) => {
        axios.post(`${process.env.REACT_APP_REST_API_BASE_URL}/welcome_delete`, {
            method: "POST",
            welcome_text_id: id,
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
        axios.post(`${process.env.REACT_APP_REST_API_BASE_URL}/get_welcome`, {
            method: "POST",
            viva_id: viva_id,
        })
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
       
        axios.post(`${process.env.REACT_APP_REST_API_BASE_URL}/welcome_update`, {
            method: "POST",
            welcome_text_id: id,
            welcomeText: newText,
            viva_id: viva_id,
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
        <div>
            <form className="w-full max-w-lg">
                <div className="mb-4 mt-[24px] sm:ml-2 sm:mr-2 md:ml-0 md:mr-0">
                    <label className="block text-gray-700 text-sm font-bold mb-2 float-left" htmlFor="evaluation-identity">
                        Welcome Text of Viva:
                    </label>
                    <textarea
                        id="evaluation-query"
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={welcomeText}
                        onChange={(e) => setWelcomeText(e.target.value)}
                        rows={8}
                    ></textarea>
                </div>
                <button
                    style={{backgroundColor: welcomeText.length === 0 ? "grey" : "",
                color:welcomeText.length === 0 ? "white" : "white" ,
            opacity: welcomeText.length === 0 ? "0.3" : "" }}
                    className="bg-blue-500 hover:bg-blue-700 w-[100%] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline float-right"
                    onClick={handleAdd}
                    disabled={welcomeText.length === 0}
                >
                    Add
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
                                Welcome Text
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
                                    {editItemId === item.welcome_text_id ? (
                                        <input
                                        style={{border: "1px solid black"}}
                                            type='text'
                                            value={newText}
                                            onChange={(e) => setNewText(e.target.value)}
                                        />
                                    ) : (
                                        <div className="line-clamp-3">{item.welcomeText}</div>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    {editItemId === item.welcome_text_id ? (
                                        <button
                                            onClick={() => handleSave(item.welcome_text_id, newText)}
                                            className="px-2 py-2 bg-green-500 text-white rounded-md mr-2"
                                        >
                                            edit
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleEdit(item.welcome_text_id,item.welcomeText)}
                                            className="px-2 py-2 bg-blue-500 text-white rounded-md mr-2"
                                        >
                                            Edit
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(item.welcome_text_id)}
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
        </div>
    )
}

export default WelcomeText;
