import LoginForm from "./components/LoginForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import CreateHolidayForm from "./components/CreateHolidayForm";
import Homepage from "./components/Homepage";
import CreateAccount from "./components/CreateAccount";
import Income from "./components/Income";
import { useState } from "react";
import IncomeList from "./components/IncomeList";
//import LoginForm from "./components/LoginForm";

function App() {

  //const [userid, setUserid] = useState("hello")
  return (
    <>
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<LoginForm /> }/>
      <Route path='/CreateAccount' element={<CreateAccount/>}/>
      <Route path='/Homepage' element={<Homepage />}/>
      <Route path='/Homepage/Income' element={<Income/>}/>
      <Route path='/Homepage/Incomelist' element={<IncomeList/>}/>
      {/* <Route path="/holidays" element={<p>All Holidays</p>} />
      <Route path="/holidays/new" element={<CreateHolidayForm />} /> */}
    </Routes>
  </BrowserRouter>
    </>
    

  );
}

export default App;