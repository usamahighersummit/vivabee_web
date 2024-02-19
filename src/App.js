import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Component/screens/Login";
import Admin from "./Component/screens/Admin";
import User from "./Component/screens/User";
import ViewContent from "./Component/screens/ViewContent";
import 'quill/dist/quill.snow.css'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/admin" element={<Admin />}></Route>
          <Route path="/home" element={<User />}></Route>
          <Route path="/view-content" element={<ViewContent />}></Route>
    
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
