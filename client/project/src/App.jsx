import LoginForm from "./components/LoginForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import CreateHolidayForm from "./components/CreateHolidayForm";
import Homepage from "./components/Homepage";
import CreateAccount from "./components/CreateAccount";
//import LoginForm from "./components/LoginForm";

function App() {
  return (
    <>
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<LoginForm/>}/>
      <Route path='/CreateAccount' element={<CreateAccount/>}/>
      <Route path='/Homepage' element={<Homepage/>}/>
      {/* <Route path="/holidays" element={<p>All Holidays</p>} />
      <Route path="/holidays/new" element={<CreateHolidayForm />} /> */}
    </Routes>
  </BrowserRouter>
    </>
    

  );
}

export default App;