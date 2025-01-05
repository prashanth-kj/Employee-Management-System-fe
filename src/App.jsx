
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import EmployeeRoutes from "./Routes/EmployeeRoutes";
import AdminRoutes from "./Routes/AdminRoutes";
import Forgetpassword from "./components/Forgetpassword";
import Resetpassword from "./components/Resetpassword";
function App() {

  return (
    <>
      <BrowserRouter>
       <Routes>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/forgetpassword" element={<Forgetpassword/>}/>
        <Route path="/resetpassword" element={<Resetpassword/>}/>
        <Route path="/employee/*" element={<EmployeeRoutes/>}/>
        <Route path="/admin/*" element={<AdminRoutes/>}/>
        <Route path="/" element={<Signin/>}/>
       </Routes>
      </BrowserRouter>
    </>
  )
}


export default App
