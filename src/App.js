import { Route, Routes } from "react-router";
import Home from "./components/Home";
import AddUser from "./components/spesific/AddUser";
import UpdateUser from "./components/spesific/UpdateUser";
import Alert from "./components/spesific/SuccessAlert";
import SuccessAlert from "./components/spesific/SuccessAlert";
import ErrorAlert from "./components/spesific/ErrorAlert";
function App() {
  return (
    <div>
      <div className="w-full h-[100vh] flex justify-center items-start lg:items-center">
      <Home/>
      <SuccessAlert/>
      <ErrorAlert/>
      </div>
  <Routes>
  <Route path="/updateUser/:id" element={<UpdateUser/>}></Route>
    <Route path="/AddNewUser" element={<AddUser/>}></Route>
  </Routes>
    </div>
  );
}

export default App;
