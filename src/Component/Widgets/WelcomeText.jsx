import React, { useEffect, useState } from 'react'
import axios from 'axios';
import 'quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'
var modules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
   
     
      [
    
     
        { align: [] }
      ],
     
    ]
  };
  var formats = [
    "header", "height", "bold", "italic",
    "underline", "strike", "blockquote",
    "list", "color", "bullet", "indent",
    "link", "image", "align", "size"
  ];
const WelcomeText = () => {
    const [welcomeText, setWelcomeText] = useState("");
    const [data, setData] = useState([]);
    const [editItemId, setEditItemId] = useState(null);
    const [newText, setNewText] = useState();
    const [bold, setBold] = useState(false);
    const [italic, setItalic] = useState(false);
    const [underline, setUnderline] = useState(false);
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const viva_id = params.get("id");
    var length;
    const handleAdd = (e) => {
        e.preventDefault();
   if(!newText){
        axios.post(`${process.env.REACT_APP_REST_API_BASE_URL}/welcome_insert`, {
            method: "POST",
            welcomeText: welcomeText,
            viva_id: viva_id,
        })
        .then((res) => {
            console.log("inserted Data : ", res.data);
            alert("inserted");
            getData();
            setNewText("");
            setWelcomeText("")
      
        })
        .catch((error) => {
            console.log(error);
        });
    }
    else {
       
        handleSave(editItemId, newText);
      }
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
            setWelcomeText("")
        })
        .catch((error) => {
            console.log(error);
        });
        setEditItemId(null);
        setNewText("");
    }
    const handleProcedureContentChange = (content) => {
 
        if(newText){
            setNewText(content);
        }
        else{

            setWelcomeText(content);
        }
      };
      
    return (
        <div>
            <form className="w-full max-w-lg ">
                <div className="mb-4 mt-[24px] sm:ml-2 sm:mr-2 md:ml-0 md:mr-0">
                    <label className="block text-gray-700 text-sm font-bold mb- float-left "  htmlFor="evaluation-identity">
                        Welcome Text of Viva:
                    </label>
                <br></br>
        <ReactQuill
     
          theme="snow"
          modules={modules}
          formats={formats}
          value={newText ? newText : welcomeText}
          placeholder="Enter Your welcome text"
          onChange={handleProcedureContentChange}
          style={{ height: "220px",}}
        
        >
        </ReactQuill>
     
                </div>
                <button
              
                    style={{
                        display: newText ? "none" : 'inline',
                        backgroundColor: welcomeText.length === 0 ? "grey" : "",
                color:welcomeText.length === 0 ? "white" : "white" ,
            opacity: welcomeText.length === 0 ? "0.3" : "" }}
                    className="sm:mt-[80px] md:mt-[60px] bg-blue-500 hover:bg-blue-700 w-[100%] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline float-right"
                    onClick={handleAdd}
                    disabled={welcomeText.length === 0 }
                >
                  Add 
                </button>
                <button
              
              style={{
                display: !newText ? "none" : 'inline',
              
         }}
              className="sm:mt-[80px] md:mt-[60px] bg-blue-500 hover:bg-blue-700 w-[100%] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline float-right"
              onClick={handleAdd}
      
          >
           Update
          </button>
            </form>
            <div className="overflow-x-auto md:mt-[124px] sm:mt-[180px]">
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
                                 
                                        <div className="line-clamp-3"  dangerouslySetInnerHTML={{__html: item.welcomeText}}/>
                         
                                </td>
                                
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                 
                                        <button
                                            onClick={() => handleEdit(item.welcome_text_id,item.welcomeText)}
                                            className="px-2 py-2 bg-blue-500 text-white rounded-md mr-2"
                                        >
                                            Edit
                                        </button>
                                
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
